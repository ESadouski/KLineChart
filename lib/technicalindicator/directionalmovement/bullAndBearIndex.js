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

/**
 * 多空指标
 * 公式: BBI = (MA(CLOSE, M) + MA(CLOSE, N) + MA(CLOSE, O) + MA(CLOSE, P)) / 4
 *
 */
var _default = {
  name: 'BBI',
  shortName: 'BBI',
  series: 'price',
  precision: 2,
  calcParams: [3, 6, 12, 24],
  shouldCheckParamCount: true,
  shouldOhlc: true,
  plots: [{
    key: 'bbi',
    title: 'BBI: ',
    type: 'line'
  }],
  calcTechnicalIndicator: function calcTechnicalIndicator(dataList, _ref) {
    var params = _ref.params;
    var maxPeriod = Math.max.apply(null, params);
    var closeSums = [];
    var mas = [];
    return dataList.map(function (kLineData, i) {
      var bbi = {};
      var close = kLineData.close;
      params.forEach(function (p, index) {
        closeSums[index] = (closeSums[index] || 0) + close;

        if (i >= p - 1) {
          mas[index] = closeSums[index] / p;
          closeSums[index] -= dataList[i - (p - 1)].close;
        }
      });

      if (i >= maxPeriod - 1) {
        var maSum = 0;
        mas.forEach(function (ma) {
          maSum += ma;
        });
        bbi.bbi = maSum / 4;
      }

      return bbi;
    });
  }
};
exports.default = _default;