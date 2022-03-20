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
 * BIAS
 * 乖离率=[(当日收盘价-N日平均价)/N日平均价]*100%
 */
var _default = {
  name: 'BIAS',
  shortName: 'BIAS',
  calcParams: [6, 12, 24],
  shouldCheckParamCount: false,
  plots: [{
    key: 'bias6',
    title: 'BIAS6: ',
    type: 'line'
  }, {
    key: 'bias12',
    title: 'BIAS12: ',
    type: 'line'
  }, {
    key: 'bias24',
    title: 'BIAS24: ',
    type: 'line'
  }],
  regeneratePlots: function regeneratePlots(params) {
    return params.map(function (p) {
      return {
        key: "bias".concat(p),
        title: "BIAS".concat(p, ": "),
        type: 'line'
      };
    });
  },
  calcTechnicalIndicator: function calcTechnicalIndicator(dataList, _ref) {
    var params = _ref.params,
        plots = _ref.plots;
    var closeSums = [];
    return dataList.map(function (kLineData, i) {
      var bias = {};
      var close = kLineData.close;
      params.forEach(function (p, index) {
        closeSums[index] = (closeSums[index] || 0) + close;

        if (i >= p - 1) {
          var mean = closeSums[index] / params[index];
          bias[plots[index].key] = (close - mean) / mean * 100;
          closeSums[index] -= dataList[i - (p - 1)].close;
        }
      });
      return bias;
    });
  }
};
exports.default = _default;