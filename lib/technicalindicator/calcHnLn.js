"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calcHnLn;

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
 * 计算n周期内最高和最低
 * @param dataList
 * @returns {{ln: number, hn: number}}
 */
function calcHnLn() {
  var dataList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var hn = Number.MIN_SAFE_INTEGER;
  var ln = Number.MAX_SAFE_INTEGER;
  dataList.forEach(function (data) {
    hn = Math.max(data.high, hn);
    ln = Math.min(data.low, ln);
  });
  return {
    hn: hn,
    ln: ln
  };
}