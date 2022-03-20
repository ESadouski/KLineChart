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
  name: 'priceLine',
  totalStep: 2,
  checkEventCoordinateOnShape: function checkEventCoordinateOnShape(_ref) {
    var dataSource = _ref.dataSource,
        eventCoordinate = _ref.eventCoordinate;
    return (0, _shapeHelper.checkCoordinateOnRayLine)(dataSource[0], dataSource[1], eventCoordinate);
  },
  createShapeDataSource: function createShapeDataSource(_ref2) {
    var coordinates = _ref2.coordinates,
        viewport = _ref2.viewport,
        precision = _ref2.precision,
        yAxis = _ref2.yAxis;
    return [{
      type: 'line',
      isDraw: true,
      isCheck: true,
      dataSource: [[coordinates[0], {
        x: viewport.width,
        y: coordinates[0].y
      }]]
    }, {
      type: 'text',
      isDraw: true,
      isCheck: false,
      dataSource: [{
        x: coordinates[0].x,
        y: coordinates[0].y,
        text: yAxis.convertFromPixel(coordinates[0].y).toFixed(precision.price)
      }]
    }];
  }
};
exports.default = _default;