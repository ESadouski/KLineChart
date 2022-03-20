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
  name: 'AO',
  shortName: 'AO',
  calcParams: [5, 34],
  shouldCheckParamCount: true,
  plots: [{
    key: 'ao',
    title: 'AO: ',
    type: 'bar',
    baseValue: 0,
    color: function color(data, options) {
      var prev = data.prev,
          current = data.current;
      var preAo = (prev.technicalIndicatorData || {}).ao;
      var ao = (current.technicalIndicatorData || {}).ao;

      if (ao > preAo) {
        return options.bar.upColor;
      } else {
        return options.bar.downColor;
      }
    },
    isStroke: function isStroke(data) {
      var prev = data.prev,
          current = data.current;
      var preAo = (prev.technicalIndicatorData || {}).ao;
      var ao = (current.technicalIndicatorData || {}).ao;
      return ao > preAo;
    }
  }],
  calcTechnicalIndicator: function calcTechnicalIndicator(kLineDataList, _ref) {
    var params = _ref.params;
    var maxPeriod = Math.max(params[0], params[1]);
    var shortSum = 0;
    var longSum = 0;
    var short = 0;
    var long = 0;
    return kLineDataList.map(function (kLineData, i) {
      var ao = {};
      var middle = (kLineData.low + kLineData.high) / 2;
      shortSum += middle;
      longSum += middle;

      if (i >= params[0] - 1) {
        short = shortSum / params[0];
        var agoKLineData = kLineDataList[i - (params[0] - 1)];
        shortSum -= (agoKLineData.low + agoKLineData.high) / 2;
      }

      if (i >= params[1] - 1) {
        long = longSum / params[1];
        var _agoKLineData = kLineDataList[i - (params[1] - 1)];
        longSum -= (_agoKLineData.low + _agoKLineData.high) / 2;
      }

      if (i >= maxPeriod - 1) {
        ao.ao = short - long;
      }

      return ao;
    });
  }
};
exports.default = _default;