"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shapeHelper = require("./shapeHelper");

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
  name: 'fibonacciLine',
  totalStep: 3,
  checkEventCoordinateOnShape: function checkEventCoordinateOnShape(_ref) {
    var dataSource = _ref.dataSource,
        eventCoordinate = _ref.eventCoordinate;
    return (0, _shapeHelper.checkCoordinateOnStraightLine)(dataSource[0], dataSource[1], eventCoordinate);
  },
  createShapeDataSource: function createShapeDataSource(_ref2) {
    var points = _ref2.points,
        coordinates = _ref2.coordinates,
        viewport = _ref2.viewport,
        precision = _ref2.precision;

    if (coordinates.length > 0) {
      var lines = [];
      var texts = [];
      var startX = 0;
      var endX = viewport.width;

      if (coordinates.length > 1) {
        var percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
        var yDif = coordinates[0].y - coordinates[1].y;
        var valueDif = points[0].value - points[1].value;
        percents.forEach(function (percent) {
          var y = coordinates[1].y + yDif * percent;
          var value = (points[1].value + valueDif * percent).toFixed(precision.price);
          lines.push([{
            x: startX,
            y: y
          }, {
            x: endX,
            y: y
          }]);
          texts.push({
            x: startX,
            y: y,
            text: "".concat(value, " (").concat((percent * 100).toFixed(1), "%)")
          });
        });
      }

      return [{
        type: 'line',
        isDraw: true,
        isCheck: true,
        dataSource: lines
      }, {
        type: 'text',
        isDraw: true,
        isCheck: false,
        dataSource: texts
      }];
    }

    return [];
  }
};
exports.default = _default;