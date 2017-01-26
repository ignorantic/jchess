(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initBoard;

/*
 *     board.js for jChess project
 *     2016 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

function initBoard(jchess) {
    'use strict';

    var wrap = document.querySelector('.board-wrap'),
        board = document.createElement('section');
    board.classList.add('board');
    for (var file = 0; file < 8; file++) {
        for (var rank = 0; rank < 8; rank++) {
            var square = document.createElement('div');
            square.classList.add('board__square');
            if (rank === 1) {
                square.classList.add('board__piece');
            }
            square.classList.add('board__square_' + jchess.getSquareColor(file, rank).color);
            board.appendChild(square);
        }
    }
    wrap.appendChild(board);
}

},{}],2:[function(require,module,exports){
'use strict';

var _jchess = require('../lib/jchess');

var _jchess2 = _interopRequireDefault(_jchess);

var _board = require('../components/board/board');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
    var jchess = new _jchess2.default();
    (0, _board2.default)(jchess);
});

},{"../components/board/board":1,"../lib/jchess":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *     jChess ~ jchess.js
 *     2015-2016 by Andrii Sorokin
 */

var JChess = function () {
    function JChess() {
        _classCallCheck(this, JChess);

        this.board = [];
        JChess._paintBoard(this.board);
        JChess._setUpPieces(this.board);
    }

    _createClass(JChess, [{
        key: 'getSquareColor',
        value: function getSquareColor(file, rank) {
            return JChess._getSquareColor(this.board, file, rank);
        }
    }, {
        key: 'setUpPieces',
        value: function setUpPieces() {
            return JChess._setUpPieces(this.board);
        }
    }], [{
        key: '_paintBoard',
        value: function _paintBoard(board) {
            var countSquare = 0;
            for (var i = 0; i < 8; i++) {
                board[i] = [];
                countSquare++;
                for (var j = 0; j < 8; j++) {
                    board[i][j] = countSquare++ % 2 ? { color: 'black' } : { color: 'white' };
                }
            }
        }
    }, {
        key: '_getSquareColor',
        value: function _getSquareColor(board, file, rank) {
            if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
            return board[file][rank];
        }
    }, {
        key: '_setUpPieces',
        value: function _setUpPieces(board) {
            var pieceSet = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

            var _loop = function _loop(rank) {
                switch (rank) {
                    case 0:
                        board.forEach(function (item, index) {
                            return JChess._setUpPiece(board, index, rank, pieceSet[index], 'white');
                        });
                        break;
                    case 7:
                        board.forEach(function (item, index) {
                            return JChess._setUpPiece(board, index, rank, pieceSet[index], 'black');
                        });
                        break;
                    case 1:
                        for (var file = 0; file < 8; file++) {
                            JChess._setUpPiece(board, file, rank, 'pawn', 'white');
                        }
                        break;
                    case 6:
                        for (var _file = 0; _file < 8; _file++) {
                            JChess._setUpPiece(board, _file, rank, 'pawn', 'black');
                        }
                        break;
                    default:
                        for (var _file2 = 0; _file2 < 8; _file2++) {
                            JChess._setUpPiece(board, _file2, rank, null, null);
                        }

                }
            };

            for (var rank = 0; rank < 8; rank++) {
                _loop(rank);
            }
        }
    }, {
        key: '_setUpPiece',
        value: function _setUpPiece(board, file, rank, type, color) {
            if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
            board[file][rank].piece = {
                type: type,
                color: color
            };
            return true;
        }
    }]);

    return JChess;
}();

exports.default = JChess;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pjaGVzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ093QixTOztBQU54Qjs7Ozs7O0FBTWUsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCO0FBQ3RDOztBQUVBLFFBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBWDtBQUFBLFFBQ0ksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FEWjtBQUVBLFVBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixPQUFwQjtBQUNBLFNBQUssSUFBSSxPQUFPLENBQWhCLEVBQW1CLE9BQU8sQ0FBMUIsRUFBNkIsTUFBN0IsRUFBcUM7QUFDakMsYUFBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxnQkFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0EsbUJBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixlQUFyQjtBQUNBLGdCQUFJLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBckI7QUFDSDtBQUNELG1CQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsbUJBQW1CLE9BQU8sY0FBUCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixFQUFrQyxLQUExRTtBQUNBLGtCQUFNLFdBQU4sQ0FBa0IsTUFBbEI7QUFDSDtBQUNKO0FBQ0QsU0FBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0g7Ozs7O0FDekJEOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaEQsUUFBSSxTQUFTLHNCQUFiO0FBQ0EseUJBQVUsTUFBVjtBQUNILENBSEQ7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QixFQUE2QixNQUE3QixFQUFxQztBQUFBLHNCQUE1QixJQUE0QjtBQTRCcEM7QUFDSjs7O29DQUVrQixLLEVBQU8sSSxFQUFNLEksRUFBTSxJLEVBQU0sSyxFQUFPO0FBQy9DLGdCQUFJLE9BQU8sQ0FBUCxJQUFZLE9BQU8sQ0FBbkIsSUFBd0IsT0FBTyxDQUEvQixJQUFvQyxPQUFPLENBQS9DLEVBQWtELE9BQU8sSUFBUDtBQUNsRCxrQkFBTSxJQUFOLEVBQVksSUFBWixFQUFrQixLQUFsQixHQUEwQjtBQUN0QixzQkFBTSxJQURnQjtBQUV0Qix1QkFBTztBQUZlLGFBQTFCO0FBSUEsbUJBQU8sSUFBUDtBQUNIOzs7Ozs7a0JBekVnQixNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLypcbiAqICAgICBib2FyZC5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE2IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRCb2FyZChqY2hlc3MpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC13cmFwJyksXG4gICAgICAgIGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG4gICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgZm9yIChsZXQgcmFuayA9IDA7IHJhbmsgPCA4OyByYW5rKyspIHtcbiAgICAgICAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlJyk7XG4gICAgICAgICAgICBpZiAocmFuayA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fcGllY2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlXycgKyBqY2hlc3MuZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykuY29sb3IpO1xuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3cmFwLmFwcGVuZENoaWxkKGJvYXJkKTtcbn0iLCJpbXBvcnQgSkNoZXNzIGZyb20gJy4uL2xpYi9qY2hlc3MnO1xuaW1wb3J0IGluaXRCb2FyZCBmcm9tICcuLi9jb21wb25lbnRzL2JvYXJkL2JvYXJkJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBsZXQgamNoZXNzID0gbmV3IEpDaGVzcztcbiAgICBpbml0Qm9hcmQoamNoZXNzKTtcbn0pIiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpjaGVzcy5qc1xuICogICAgIDIwMTUtMjAxNiBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpDaGVzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIEpDaGVzcy5fcGFpbnRCb2FyZCh0aGlzLmJvYXJkKTtcbiAgICAgICAgSkNoZXNzLl9zZXRVcFBpZWNlcyh0aGlzLmJvYXJkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX3BhaW50Qm9hcmQoYm9hcmQpIHtcbiAgICAgICAgbGV0IGNvdW50U3F1YXJlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG4gICAgICAgICAgICBjb3VudFNxdWFyZSsrXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gKGNvdW50U3F1YXJlKysgJSAyKSA/IHsgY29sb3I6ICdibGFjaycgfSA6IHsgY29sb3I6ICd3aGl0ZScgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gSkNoZXNzLl9nZXRTcXVhcmVDb2xvcih0aGlzLmJvYXJkLCBmaWxlLCByYW5rKVxuICAgIH1cblxuICAgIHN0YXRpYyBfZ2V0U3F1YXJlQ29sb3IoYm9hcmQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKGZpbGUgPCAwIHx8IGZpbGUgPiA3IHx8IHJhbmsgPCAwIHx8IHJhbmsgPiA3KSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGJvYXJkW2ZpbGVdW3JhbmtdO1xuICAgIH1cblxuICAgIHNldFVwUGllY2VzKCkge1xuICAgICAgICByZXR1cm4gSkNoZXNzLl9zZXRVcFBpZWNlcyh0aGlzLmJvYXJkKVxuICAgIH1cblxuICAgIHN0YXRpYyBfc2V0VXBQaWVjZXMoYm9hcmQpIHtcbiAgICAgICAgbGV0IHBpZWNlU2V0ID0gWydyb29rJywgJ2tuaWdodCcsICdiaXNob3AnLCAncXVlZW4nLCAna2luZycsICdiaXNob3AnLCAna25pZ2h0JywgJ3Jvb2snXTtcbiAgICAgICAgZm9yIChsZXQgcmFuayA9IDA7IHJhbmsgPCA4OyByYW5rKyspIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuaykge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBKQ2hlc3MuX3NldFVwUGllY2UoYm9hcmQsIGluZGV4LCByYW5rLCBwaWVjZVNldFtpbmRleF0sICd3aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBKQ2hlc3MuX3NldFVwUGllY2UoYm9hcmQsIGluZGV4LCByYW5rLCBwaWVjZVNldFtpbmRleF0sICdibGFjaycpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEpDaGVzcy5fc2V0VXBQaWVjZShib2FyZCwgZmlsZSwgcmFuaywgJ3Bhd24nLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEpDaGVzcy5fc2V0VXBQaWVjZShib2FyZCwgZmlsZSwgcmFuaywgJ3Bhd24nLCAnYmxhY2snKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBKQ2hlc3MuX3NldFVwUGllY2UoYm9hcmQsIGZpbGUsIHJhbmssIG51bGwsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIF9zZXRVcFBpZWNlKGJvYXJkLCBmaWxlLCByYW5rLCB0eXBlLCBjb2xvcikge1xuICAgICAgICBpZiAoZmlsZSA8IDAgfHwgZmlsZSA+IDcgfHwgcmFuayA8IDAgfHwgcmFuayA+IDcpIHJldHVybiBudWxsO1xuICAgICAgICBib2FyZFtmaWxlXVtyYW5rXS5waWVjZSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBjb2xvcjogY29sb3JcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59Il19
