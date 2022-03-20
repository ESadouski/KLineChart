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
  name: 'straightLine',
  totalStep: 3,
  checkEventCoordinateOnShape: function checkEventCoordinateOnShape(_ref) {
    var dataSource = _ref.dataSource,
        eventCoordinate = _ref.eventCoordinate;
    return (0, _shapeHelper.checkCoordinateOnStraightLine)(dataSource[0], dataSource[1], eventCoordinate);
  },
  createShapeDataSource: function createShapeDataSource(_ref2) {
    var coordinates = _ref2.coordinates,
        viewport = _ref2.viewport;

    if (coordinates.length < 2 || coordinates[0].x === coordinates[1].x) {
      return [{
        type: 'line',
        isDraw: true,
        isCheck: true,
        dataSource: [[{
          x: coordinates[0].x,
          y: 0
        }, {
          x: coordinates[0].x,
          y: viewport.height
        }]]
      }];
    }

    return [{
      type: 'line',
      isDraw: true,
      isCheck: true,
      dataSource: [[{
        x: 0,
        y: (0, _shapeHelper.getLinearYFromCoordinates)(coordinates[0], coordinates[1], {
          x: 0,
          y: coordinates[0].y
        })
      }, {
        x: viewport.width,
        y: (0, _shapeHelper.getLinearYFromCoordinates)(coordinates[0], coordinates[1], {
          x: viewport.width,
          y: coordinates[0].y
        })
      }]]
    }];
  }
};
exports.default = _default;