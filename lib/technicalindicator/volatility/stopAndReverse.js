"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
var _default = {
  name: 'SAR',
  shortName: 'SAR',
  series: 'price',
  calcParams: [2, 2, 20],
  precision: 2,
  shouldOhlc: true,
  plots: [{
    key: 'sar',
    title: 'SAR: ',
    type: 'circle',
    color: function color(data, options) {
      var current = data.current;
      var kLineData = current.kLineData || {};
      var technicalIndicatorData = current.technicalIndicatorData || {};
      var halfHL = (kLineData.high + kLineData.low) / 2;

      if (technicalIndicatorData.sar < halfHL) {
        return options.circle.upColor;
      }

      return options.circle.downColor;
    }
  }],
  calcTechnicalIndicator: function calcTechnicalIndicator(dataList, _ref) {
    var params = _ref.params;
    var startAf = params[0] / 100;
    var step = params[1] / 100;
    var maxAf = params[2] / 100; // 加速因子

    var af = startAf; // 极值

    var ep = -100; // 判断是上涨还是下跌  false：下跌

    var isIncreasing = false;
    var sar = 0;
    return dataList.map(function (kLineData, i) {
      // 上一个周期的sar
      var preSar = sar;
      var high = kLineData.high;
      var low = kLineData.low;

      if (isIncreasing) {
        // 上涨
        if (ep === -100 || ep < high) {
          // 重新初始化值
          ep = high;
          af = Math.min(af + step, maxAf);
        }

        sar = preSar + af * (ep - preSar);
        var lowMin = Math.min(dataList[Math.max(1, i) - 1].low, low);

        if (sar > kLineData.low) {
          sar = ep; // 重新初始化值

          af = startAf;
          ep = -100;
          isIncreasing = !isIncreasing;
        } else if (sar > lowMin) {
          sar = lowMin;
        }
      } else {
        if (ep === -100 || ep > low) {
          // 重新初始化值
          ep = low;
          af = Math.min(af + step, maxAf);
        }

        sar = preSar + af * (ep - preSar);
        var highMax = Math.max(dataList[Math.max(1, i) - 1].high, high);

        if (sar < kLineData.high) {
          sar = ep; // 重新初始化值

          af = 0;
          ep = -100;
          isIncreasing = !isIncreasing;
        } else if (sar < highMax) {
          sar = highMax;
        }
      }

      return {
        sar: sar
      };
    });
  }
};
exports.default = _default;