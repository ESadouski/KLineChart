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
 * RSI
 * RSI = SUM(MAX(CLOSE - REF(CLOSE,1),0),N) / SUM(ABS(CLOSE - REF(CLOSE,1)),N) × 100
 */
var _default = {
  name: 'RSI',
  shortName: 'RSI',
  calcParams: [6, 12, 24],
  shouldCheckParamCount: false,
  plots: [{
    key: 'rsi1',
    title: 'RSI1: ',
    type: 'line'
  }, {
    key: 'rsi2',
    title: 'RSI2: ',
    type: 'line'
  }, {
    key: 'rsi3',
    title: 'RSI3: ',
    type: 'line'
  }],
  regeneratePlots: function regeneratePlots(params) {
    return params.map(function (_, index) {
      var num = index + 1;
      return {
        key: "rsi".concat(num),
        title: "RSI".concat(num, ": "),
        type: 'line'
      };
    });
  },
  calcTechnicalIndicator: function calcTechnicalIndicator(dataList, _ref) {
    var params = _ref.params,
        plots = _ref.plots;
    var sumCloseAs = [];
    var sumCloseBs = [];
    return dataList.map(function (kLineData, i) {
      var rsi = {};
      var preClose = (dataList[i - 1] || kLineData).close;
      var tmp = kLineData.close - preClose;
      params.forEach(function (p, index) {
        if (tmp > 0) {
          sumCloseAs[index] = (sumCloseAs[index] || 0) + tmp;
        } else {
          sumCloseBs[index] = (sumCloseBs[index] || 0) + Math.abs(tmp);
        }

        if (i >= p - 1) {
          if (sumCloseBs[index] !== 0) {
            rsi[plots[index].key] = 100 - 100.0 / (1 + sumCloseAs[index] / sumCloseBs[index]);
          } else {
            rsi[plots[index].key] = 0;
          }

          var agoData = dataList[i - (p - 1)];
          var agoPreData = dataList[i - p] || agoData;
          var agoTmp = agoData.close - agoPreData.close;

          if (agoTmp > 0) {
            sumCloseAs[index] -= agoTmp;
          } else {
            sumCloseBs[index] -= Math.abs(agoTmp);
          }
        }
      });
      return rsi;
    });
  }
};
exports.default = _default;