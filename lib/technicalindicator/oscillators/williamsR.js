"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _calcHnLn = _interopRequireDefault(require("../calcHnLn"));

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
 * WR
 * 公式 WR(N) = 100 * [ C - HIGH(N) ] / [ HIGH(N)-LOW(N) ]
 */
var _default = {
  name: 'WR',
  shortName: 'WR',
  calcParams: [6, 10, 14],
  shouldCheckParamCount: false,
  plots: [{
    key: 'wr1',
    title: 'WR1: ',
    type: 'line'
  }, {
    key: 'wr2',
    title: 'WR2: ',
    type: 'line'
  }, {
    key: 'wr3',
    title: 'WR3: ',
    type: 'line'
  }],
  regeneratePlots: function regeneratePlots(params) {
    return params.map(function (_, i) {
      return {
        key: "wr".concat(i + 1),
        title: "WR".concat(i + 1, ": "),
        type: 'line'
      };
    });
  },
  calcTechnicalIndicator: function calcTechnicalIndicator(dataList, _ref) {
    var params = _ref.params,
        plots = _ref.plots;
    return dataList.map(function (kLineData, i) {
      var wr = {};
      var close = kLineData.close;
      params.forEach(function (param, index) {
        var p = param - 1;

        if (i >= p) {
          var hln = (0, _calcHnLn.default)(dataList.slice(i - p, i + 1));
          var hn = hln.hn;
          var ln = hln.ln;
          var hnSubLn = hn - ln;
          wr[plots[index].key] = hnSubLn === 0 ? 0 : (close - hn) / hnSubLn * 100;
        }
      });
      return wr;
    });
  }
};
exports.default = _default;