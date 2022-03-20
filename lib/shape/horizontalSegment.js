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
  name: 'horizontalSegment',
  totalStep: 3,
  checkEventCoordinateOnShape: function checkEventCoordinateOnShape(_ref) {
    var dataSource = _ref.dataSource,
        eventCoordinate = _ref.eventCoordinate;
    return (0, _shapeHelper.checkCoordinateOnSegment)(dataSource[0], dataSource[1], eventCoordinate);
  },
  createShapeDataSource: function createShapeDataSource(_ref2) {
    var coordinates = _ref2.coordinates;
    var lines = [];

    if (coordinates.length === 2) {
      lines = [coordinates];
    }

    return [{
      type: 'line',
      isDraw: true,
      isCheck: true,
      dataSource: lines
    }];
  },
  performEventPressedMove: function performEventPressedMove(_ref3) {
    var points = _ref3.points,
        pressPoint = _ref3.pressPoint;
    points[0].value = pressPoint.value;
    points[1].value = pressPoint.value;
  },
  performEventMoveForDrawing: function performEventMoveForDrawing(_ref4) {
    var step = _ref4.step,
        points = _ref4.points,
        movePoint = _ref4.movePoint;

    if (step === 2) {
      points[0].value = movePoint.value;
    }
  }
};
exports.default = _default;