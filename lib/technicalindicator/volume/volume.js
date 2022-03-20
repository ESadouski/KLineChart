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
  name: 'VOL',
  shortName: 'VOL',
  series: 'volume',
  calcParams: [5, 10, 20],
  shouldCheckParamCount: false,
  shouldFormatBigNumber: true,
  precision: 0,
  minValue: 0,
  plots: [{
    key: 'ma5',
    title: 'MA5: ',
    type: 'line'
  }, {
    key: 'ma10',
    title: 'MA10: ',
    type: 'line'
  }, {
    key: 'ma20',
    title: 'MA20: ',
    type: 'line'
  }, {
    key: 'volume',
    title: 'VOLUME: ',
    type: 'bar',
    baseValue: 0,
    color: function color(data, options) {
      var kLineData = data.current.kLineData || {};

      if (kLineData.close > kLineData.open) {
        return options.bar.upColor;
      } else if (kLineData.close < kLineData.open) {
        return options.bar.downColor;
      }

      return options.bar.noChangeColor;
    }
  }],
  regeneratePlots: function regeneratePlots(params) {
    var plots = params.map(function (p) {
      return {
        key: "ma".concat(p),
        title: "MA".concat(p, ": "),
        type: 'line'
      };
    });
    plots.push({
      key: 'volume',
      title: 'VOLUME: ',
      type: 'bar',
      baseValue: 0,
      color: function color(data, options) {
        var kLineData = data.current.kLineData || {};

        if (kLineData.close > kLineData.open) {
          return options.bar.upColor;
        } else if (kLineData.close < kLineData.open) {
          return options.bar.downColor;
        }

        return options.bar.noChangeColor;
      }
    });
    return plots;
  },
  calcTechnicalIndicator: function calcTechnicalIndicator(dataList, _ref) {
    var params = _ref.params,
        plots = _ref.plots;
    var volSums = [];
    return dataList.map(function (kLineData, i) {
      var volume = kLineData.volume || 0;
      var vol = {
        volume: volume
      };
      params.forEach(function (p, index) {
        volSums[index] = (volSums[index] || 0) + volume;

        if (i >= p - 1) {
          vol[plots[index].key] = volSums[index] / p;
          volSums[index] -= dataList[i - (p - 1)].volume;
        }
      });
      return vol;
    });
  }
};
exports.default = _default;