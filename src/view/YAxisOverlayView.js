/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import View from './View'
import { getTextRectWidth, getTextRectHeight } from '../utils/canvas'
import { formatBigNumber, formatPrecision } from '../utils/format'
import { YAxisType } from '../options/styleOptions'
import { renderStrokeFillRoundRect } from '../renderer/rect'
import { renderText } from '../renderer/text'

export default class YAxisOverlayView extends View {
  constructor (container, chartStore, yAxis, paneId) {
    super(container, chartStore)
    this._yAxis = yAxis
    this._paneId = paneId
  }

  initialCoordinates = {
    asksChart: {
      x: 0,
      y: () => (this._yAxis.convertToPixel(0))(),
    },
    bidsChart: {
      x: 0,
      y: 0,
    },
  }


  _drawOrderChart(items, totalCount, chartType, styles) {
    this._drawOrderLine(items, totalCount, chartType, styles);
    this._drawOrdersArea(items, totalCount, chartType, styles);
  }

  _drawLine(orders, totalCount) {
    let currentX = 0;

    orders.forEach((order, index) => {
      currentX += this._convertXToPixels(order.count, totalCount);

      this._ctx.lineTo(currentX, this._yAxis.convertToPixel(order.price));
      if (orders[index + 1]) {
        this._ctx.lineTo(
          currentX,
          this._yAxis.convertToPixel(orders[index + 1].price),
        );
      }
    });

    return currentX;
  }

  _drawOrderLine(orders, totalCount, chartType, styles) {
    this._ctx.beginPath();
    this._ctx.strokeStyle = styles.lineColor;
    this._ctx.lineWidth = 3;

    let initialCoords = chartType === 'asks' ? this.initialCoordinates.asksChart : this.initialCoordinates.bidsChart;
    this._ctx.moveTo(initialCoords.x, initialCoords.y);

    this._ctx.lineTo(0, this._yAxis.convertToPixel(orders[0].price));
    this._drawLine(orders, totalCount);

    this._ctx.stroke();
    this._ctx.closePath();
  }

  _drawOrdersArea(orders, totalCount, chartType, styles) {
    this._ctx.beginPath();

    let initialCoords = chartType === 'asks' ? this.initialCoordinates.asksChart : this.initialCoordinates.bidsChart;
    this._ctx.moveTo(initialCoords.x, initialCoords.y);

    this._ctx.lineTo(0, this._yAxis.convertToPixel(orders[0].price));

    const currentX = this._drawLine(orders, totalCount);

    this._ctx.lineTo(currentX, chartType === 'asks' ? this._yAxis.convertToPixel(0) : 0);
    this._ctx.closePath();

    var my_gradient = this._ctx.createLinearGradient(500, 0, 0, 0);
    my_gradient.addColorStop(0, styles.colorRight);
    my_gradient.addColorStop(1, styles.colorLeft);
    this._ctx.fillStyle = my_gradient;

    this._ctx.fill();
  }

  _convertXToPixels(x, totalCount) {
    let fullWidth = this._yAxis.width();
    return (fullWidth / totalCount) * x;
  }

  _draw() {
    const asksBidsData = this._chartStore.getAsksBidsData();

    if (asksBidsData.asks && asksBidsData.bids) {
      const styles = this._chartStore.styleOptions().yAxis;
      this._drawOrderChart(asksBidsData.asks.items, asksBidsData.asks.totalCount, 'asks', styles.asksChart)
      this._drawOrderChart(asksBidsData.bids.items, asksBidsData.bids.totalCount, 'bids', styles.bidsChart)
    }

    this._ctx.textBaseline = 'middle';
    this._drawTag();
    this._drawCrossHairLabel();
  }

  /**
   * 绘制标签
   * @private
   */
  _drawTag () {
    const tags = this._chartStore.tagStore().get(this._paneId)
    if (tags) {
      tags.forEach(tag => {
        tag.drawText(this._ctx)
      })
    }
  }

  _drawCrossHairLabel () {
    const crosshair = this._chartStore.crosshairStore().get()
    if (crosshair.paneId !== this._paneId || this._chartStore.dataList().length === 0) {
      return
    }
    const styleOptions = this._chartStore.styleOptions()
    const crosshairOptions = styleOptions.crosshair
    const crosshairHorizontalOptions = crosshairOptions.horizontal
    const crosshairHorizontalTextOptions = crosshairHorizontalOptions.text
    if (!crosshairOptions.show || !crosshairHorizontalOptions.show || !crosshairHorizontalTextOptions.show) {
      return
    }
    const value = this._yAxis.convertFromPixel(crosshair.y)
    let text
    if (this._yAxis.yAxisType() === YAxisType.PERCENTAGE) {
      const fromData = (this._chartStore.visibleDataList()[0] || {}).data || {}
      text = `${((value - fromData.close) / fromData.close * 100).toFixed(2)}%`
    } else {
      const techs = this._chartStore.technicalIndicatorStore().instances(this._paneId)
      let precision = 0
      let shouldFormatBigNumber = false
      if (this._yAxis.isCandleYAxis()) {
        precision = this._chartStore.pricePrecision()
      } else {
        techs.forEach(tech => {
          precision = Math.max(tech.precision, precision)
          if (!shouldFormatBigNumber) {
            shouldFormatBigNumber = tech.shouldFormatBigNumber
          }
        })
      }
      text = formatPrecision(value, precision)
      if (shouldFormatBigNumber) {
        text = formatBigNumber(text)
      }
    }
    let rectStartX
    const borderSize = crosshairHorizontalTextOptions.borderSize

    const rectWidth = getTextRectWidth(this._ctx, text, crosshairHorizontalTextOptions)
    const rectHeight = getTextRectHeight(crosshairHorizontalTextOptions)
    if (this._yAxis.isFromYAxisZero()) {
      rectStartX = 0
    } else {
      rectStartX = this._width - rectWidth
    }

    const rectY = crosshair.y - borderSize - crosshairHorizontalTextOptions.paddingTop - crosshairHorizontalTextOptions.size / 2
    // 绘制y轴文字外的边框
    renderStrokeFillRoundRect(
      this._ctx,
      crosshairHorizontalTextOptions.backgroundColor,
      crosshairHorizontalTextOptions.borderColor,
      borderSize,
      rectStartX,
      rectY,
      rectWidth,
      rectHeight,
      crosshairHorizontalTextOptions.borderRadius
    )
    renderText(
      this._ctx,
      crosshairHorizontalTextOptions.color,
      rectStartX + borderSize + crosshairHorizontalTextOptions.paddingLeft,
      crosshair.y,
      text
    )
  }
}
