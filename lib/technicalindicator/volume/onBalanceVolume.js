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
 * OBV
 * OBV = REF(OBV) + sign * V
 */
var _default = {
  name: 'OBV',
  shortName: 'OBV',
  calcParams: [30],
  plots: [{
    key: 'obv',
    title: 'OBV: ',
    type: 'line'
  }, {
    key: 'maObv',
    title: 'MAOBV: ',
    type: 'line'
  }],
  calcTechnicalIndicator: function calcTechnicalIndicator(dataList, _ref) {
    var params = _ref.params;
    var obvSum = 0;
    var oldObv = 0;
    var result = [];
    dataList.forEach(function (kLineData, i) {
      var preKLineData = dataList[i - 1] || kLineData;

      if (kLineData.close < preKLineData.close) {
        oldObv -= kLineData.volume;
      } else if (kLineData.close > preKLineData.close) {
        oldObv += kLineData.volume;
      }

      var obv = {
        obv: oldObv
      };
      obvSum += oldObv;

      if (i >= params[0] - 1) {
        obv.maObv = obvSum / params[0];
        obvSum -= result[i - (params[0] - 1)].obv;
      }

      result.push(obv);
    });
    return result;
  }
};
exports.default = _default;