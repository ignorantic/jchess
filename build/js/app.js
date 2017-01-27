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
            var square = newSquare(jchess, file, rank);
            square.addEventListener('click', function (e) {
                jchess.pickSquare(e.target.dataset.file, e.target.dataset.rank);
                drawBoard(jchess);
            });
            board.appendChild(square);
        }
    }
    wrap.appendChild(board);
}

function drawBoard(jchess) {
    var squares = document.getElementsByClassName('board__square');
    for (var i = 0; i < squares.length; i++) {
        var file = squares[i].dataset.file,
            rank = squares[i].dataset.rank;
        if (squares[i].dataset.selected != jchess.isSquareSelected(file, rank)) {
            drawSquare(squares[i], jchess, file, rank);
        }
    }
}

function newSquare(jchess, file, rank) {
    var square = document.createElement('div');
    square.dataset.file = file;
    square.dataset.rank = rank;
    drawSquare(square, jchess, file, rank);
    return square;
}

function drawSquare(square, jchess, file, rank) {
    square.dataset.selected = +jchess.isSquareSelected(file, rank);
    square.dataset.piece = +!!jchess.getPieceType(file, rank);
    setClasses(square, jchess, file, rank);
    return true;
}

function setClasses(square, jchess, file, rank) {
    square.removeAttribute('class');
    square.classList.add('board__square');
    square.classList.add('board__square_' + jchess.getSquareColor(file, rank));
    if (square.dataset.selected == 1) {
        square.classList.add('board__square_selected');
    }
    if (square.dataset.piece == 1) {
        square.classList.add('board__square_' + jchess.getPieceType(file, rank) + '_' + jchess.getPieceColor(file, rank));
    }
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
        key: 'getSquare',
        value: function getSquare(file, rank) {
            return JChess._getSquare(this.board, file, rank);
        }
    }, {
        key: 'getSquareColor',
        value: function getSquareColor(file, rank) {
            return JChess._getSquare(this.board, file, rank) && JChess._getSquare(this.board, file, rank).color;
        }
    }, {
        key: 'getPieceType',
        value: function getPieceType(file, rank) {
            return JChess._getSquare(this.board, file, rank) && JChess._getSquare(this.board, file, rank).piece.type;
        }
    }, {
        key: 'getPieceColor',
        value: function getPieceColor(file, rank) {
            return JChess._getSquare(this.board, file, rank) && JChess._getSquare(this.board, file, rank).piece.color;
        }
    }, {
        key: 'setUpPieces',
        value: function setUpPieces() {
            return JChess._setUpPieces(this.board);
        }
    }, {
        key: 'pickSquare',
        value: function pickSquare(file, rank) {
            var square = JChess._getSquare(this.board, file, rank);
            if (!square) return null;
            this.board.forEach(function (file) {
                file.forEach(function (square) {
                    square.selected = false;
                });
            });
            square.selected = true;
            return true;
        }
    }, {
        key: 'isSquareMarked',
        value: function isSquareMarked(file, rank) {
            var square = JChess._getSquare(this.board, file, rank);
            if (!square) return null;
            return square.marked;
        }
    }, {
        key: 'isSquareSelected',
        value: function isSquareSelected(file, rank) {
            var square = JChess._getSquare(this.board, file, rank);
            if (!square) return null;
            return square.selected;
        }
    }], [{
        key: '_paintBoard',
        value: function _paintBoard(board) {
            var countSquare = 0;
            for (var i = 0; i < 8; i++) {
                board[i] = [];
                countSquare++;
                for (var j = 0; j < 8; j++) {
                    board[i][j] = countSquare++ % 2 ? {
                        color: 'black',
                        selected: false,
                        marked: false
                    } : {
                        color: 'white',
                        selected: false,
                        marked: false
                    };
                }
            }
        }
    }, {
        key: '_getSquare',
        value: function _getSquare(board, file, rank) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pjaGVzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ093QixTOztBQU54Qjs7Ozs7O0FBTWUsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCO0FBQ3RDOztBQUVBLFFBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBWDtBQUFBLFFBQ0ksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FEWjtBQUVBLFVBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixPQUFwQjtBQUNBLFNBQUssSUFBSSxPQUFPLENBQWhCLEVBQW1CLE9BQU8sQ0FBMUIsRUFBNkIsTUFBN0IsRUFBcUM7QUFDakMsYUFBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxnQkFBSSxTQUFTLFVBQVUsTUFBVixFQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFiO0FBQ0EsbUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFDSSxVQUFDLENBQUQsRUFBTztBQUNILHVCQUFPLFVBQVAsQ0FBa0IsRUFBRSxNQUFGLENBQVMsT0FBVCxDQUFpQixJQUFuQyxFQUF5QyxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLElBQTFEO0FBQ0EsMEJBQVUsTUFBVjtBQUNILGFBSkw7QUFNQSxrQkFBTSxXQUFOLENBQWtCLE1BQWxCO0FBQ0g7QUFDSjtBQUNELFNBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNIOztBQUVELFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQjtBQUN2QixRQUFJLFVBQVUsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxDQUFkO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFFBQVEsTUFBNUIsRUFBb0MsR0FBcEMsRUFBeUM7QUFDckMsWUFBSSxPQUFPLFFBQVEsQ0FBUixFQUFXLE9BQVgsQ0FBbUIsSUFBOUI7QUFBQSxZQUNJLE9BQU8sUUFBUSxDQUFSLEVBQVcsT0FBWCxDQUFtQixJQUQ5QjtBQUVBLFlBQUksUUFBUSxDQUFSLEVBQVcsT0FBWCxDQUFtQixRQUFuQixJQUErQixPQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBQThCLElBQTlCLENBQW5DLEVBQXdFO0FBQ3BFLHVCQUFXLFFBQVEsQ0FBUixDQUFYLEVBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDO0FBQ0g7QUFDSjtBQUNKOztBQUVELFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixJQUEzQixFQUFpQyxJQUFqQyxFQUF1QztBQUNuQyxRQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQSxXQUFPLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLElBQXRCO0FBQ0EsV0FBTyxPQUFQLENBQWUsSUFBZixHQUFzQixJQUF0QjtBQUNBLGVBQVcsTUFBWCxFQUFtQixNQUFuQixFQUEyQixJQUEzQixFQUFpQyxJQUFqQztBQUNBLFdBQU8sTUFBUDtBQUNIOztBQUVELFNBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QixNQUE1QixFQUFvQyxJQUFwQyxFQUEwQyxJQUExQyxFQUFnRDtBQUM1QyxXQUFPLE9BQVAsQ0FBZSxRQUFmLEdBQTBCLENBQUMsT0FBTyxnQkFBUCxDQUF3QixJQUF4QixFQUE4QixJQUE5QixDQUEzQjtBQUNBLFdBQU8sT0FBUCxDQUFlLEtBQWYsR0FBdUIsQ0FBQyxDQUFDLENBQUMsT0FBTyxZQUFQLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBQTFCO0FBQ0EsZUFBVyxNQUFYLEVBQW1CLE1BQW5CLEVBQTJCLElBQTNCLEVBQWlDLElBQWpDO0FBQ0EsV0FBTyxJQUFQO0FBQ0g7O0FBRUQsU0FBUyxVQUFULENBQW9CLE1BQXBCLEVBQTRCLE1BQTVCLEVBQW9DLElBQXBDLEVBQTBDLElBQTFDLEVBQWdEO0FBQzVDLFdBQU8sZUFBUCxDQUF1QixPQUF2QjtBQUNBLFdBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixlQUFyQjtBQUNBLFdBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixtQkFBbUIsT0FBTyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLElBQTVCLENBQXhDO0FBQ0EsUUFBSSxPQUFPLE9BQVAsQ0FBZSxRQUFmLElBQTJCLENBQS9CLEVBQWtDO0FBQzlCLGVBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQix3QkFBckI7QUFDSDtBQUNELFFBQUksT0FBTyxPQUFQLENBQWUsS0FBZixJQUF3QixDQUE1QixFQUErQjtBQUMzQixlQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsbUJBQW1CLE9BQU8sWUFBUCxDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUFuQixHQUFxRCxHQUFyRCxHQUNmLE9BQU8sYUFBUCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUROO0FBRUg7QUFFSjs7Ozs7QUNsRUQ7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNoRCxRQUFJLFNBQVMsc0JBQWI7QUFDQSx5QkFBVSxNQUFWO0FBQ0gsQ0FIRDs7Ozs7Ozs7Ozs7OztBQ0ZBOzs7OztJQU1xQixNO0FBRWpCLHNCQUFjO0FBQUE7O0FBRVYsYUFBSyxLQUFMLEdBQWEsRUFBYjtBQUNBLGVBQU8sV0FBUCxDQUFtQixLQUFLLEtBQXhCO0FBQ0EsZUFBTyxZQUFQLENBQW9CLEtBQUssS0FBekI7QUFDSDs7OztrQ0F1QlMsSSxFQUFNLEksRUFBTTtBQUNsQixtQkFBTyxPQUFPLFVBQVAsQ0FBa0IsS0FBSyxLQUF2QixFQUE4QixJQUE5QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0g7Ozt1Q0FFYyxJLEVBQU0sSSxFQUFNO0FBQ3ZCLG1CQUFPLE9BQU8sVUFBUCxDQUFrQixLQUFLLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEtBQTZDLE9BQU8sVUFBUCxDQUFrQixLQUFLLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEVBQTBDLEtBQTlGO0FBQ0g7OztxQ0FFWSxJLEVBQU0sSSxFQUFNO0FBQ3JCLG1CQUFPLE9BQU8sVUFBUCxDQUFrQixLQUFLLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEtBQTZDLE9BQU8sVUFBUCxDQUFrQixLQUFLLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEVBQTBDLEtBQTFDLENBQWdELElBQXBHO0FBQ0g7OztzQ0FFYSxJLEVBQU0sSSxFQUFNO0FBQ3RCLG1CQUFPLE9BQU8sVUFBUCxDQUFrQixLQUFLLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEtBQTZDLE9BQU8sVUFBUCxDQUFrQixLQUFLLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEVBQTBDLEtBQTFDLENBQWdELEtBQXBHO0FBQ0g7OztzQ0FFYTtBQUNWLG1CQUFPLE9BQU8sWUFBUCxDQUFvQixLQUFLLEtBQXpCLENBQVA7QUFDSDs7O21DQUVVLEksRUFBTSxJLEVBQU07QUFDbkIsZ0JBQUksU0FBUyxPQUFPLFVBQVAsQ0FBa0IsS0FBSyxLQUF2QixFQUE4QixJQUE5QixFQUFvQyxJQUFwQyxDQUFiO0FBQ0EsZ0JBQUksQ0FBQyxNQUFMLEVBQWEsT0FBTyxJQUFQO0FBQ2IsaUJBQUssS0FBTCxDQUFXLE9BQVgsQ0FDSSxVQUFDLElBQUQsRUFBVTtBQUNOLHFCQUFLLE9BQUwsQ0FDSSxVQUFDLE1BQUQsRUFBWTtBQUNSLDJCQUFPLFFBQVAsR0FBa0IsS0FBbEI7QUFDSCxpQkFITDtBQUtILGFBUEw7QUFTQSxtQkFBTyxRQUFQLEdBQWtCLElBQWxCO0FBQ0EsbUJBQU8sSUFBUDtBQUNIOzs7dUNBRWMsSSxFQUFNLEksRUFBTTtBQUN2QixnQkFBSSxTQUFTLE9BQU8sVUFBUCxDQUFrQixLQUFLLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLENBQWI7QUFDQSxnQkFBSSxDQUFDLE1BQUwsRUFBYSxPQUFPLElBQVA7QUFDYixtQkFBTyxPQUFPLE1BQWQ7QUFDSDs7O3lDQUVnQixJLEVBQU0sSSxFQUFNO0FBQ3pCLGdCQUFJLFNBQVMsT0FBTyxVQUFQLENBQWtCLEtBQUssS0FBdkIsRUFBOEIsSUFBOUIsRUFBb0MsSUFBcEMsQ0FBYjtBQUNBLGdCQUFJLENBQUMsTUFBTCxFQUFhLE9BQU8sSUFBUDtBQUNiLG1CQUFPLE9BQU8sUUFBZDtBQUNIOzs7b0NBbkVrQixLLEVBQU87QUFDdEIsZ0JBQUksY0FBYyxDQUFsQjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsR0FBdkIsRUFBNEI7QUFDeEIsc0JBQU0sQ0FBTixJQUFXLEVBQVg7QUFDQTtBQUNBLHFCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsR0FBdkIsRUFBNEI7QUFDeEIsMEJBQU0sQ0FBTixFQUFTLENBQVQsSUFBZSxnQkFBZ0IsQ0FBakIsR0FDVjtBQUNJLCtCQUFPLE9BRFg7QUFFSSxrQ0FBVSxLQUZkO0FBR0ksZ0NBQVE7QUFIWixxQkFEVSxHQU1WO0FBQ0ksK0JBQU8sT0FEWDtBQUVJLGtDQUFVLEtBRmQ7QUFHSSxnQ0FBUTtBQUhaLHFCQU5KO0FBV0g7QUFDSjtBQUNKOzs7bUNBa0RpQixLLEVBQU8sSSxFQUFNLEksRUFBTTtBQUNqQyxnQkFBSSxPQUFPLENBQVAsSUFBWSxPQUFPLENBQW5CLElBQXdCLE9BQU8sQ0FBL0IsSUFBb0MsT0FBTyxDQUEvQyxFQUFrRCxPQUFPLElBQVA7QUFDbEQsbUJBQU8sTUFBTSxJQUFOLEVBQVksSUFBWixDQUFQO0FBQ0g7OztxQ0FFbUIsSyxFQUFPO0FBQ3ZCLGdCQUFJLFdBQVcsQ0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixRQUFuQixFQUE2QixPQUE3QixFQUFzQyxNQUF0QyxFQUE4QyxRQUE5QyxFQUF3RCxRQUF4RCxFQUFrRSxNQUFsRSxDQUFmOztBQUR1Qix1Q0FFZCxJQUZjO0FBR25CLHdCQUFRLElBQVI7QUFDSSx5QkFBSyxDQUFMO0FBQ0ksOEJBQU0sT0FBTixDQUFjLFVBQUMsSUFBRCxFQUFPLEtBQVA7QUFBQSxtQ0FDVixPQUFPLFdBQVAsQ0FBbUIsS0FBbkIsRUFBMEIsS0FBMUIsRUFBaUMsSUFBakMsRUFBdUMsU0FBUyxLQUFULENBQXZDLEVBQXdELE9BQXhELENBRFU7QUFBQSx5QkFBZDtBQUdBO0FBQ0oseUJBQUssQ0FBTDtBQUNJLDhCQUFNLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBTyxLQUFQO0FBQUEsbUNBQ1YsT0FBTyxXQUFQLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWlDLElBQWpDLEVBQXVDLFNBQVMsS0FBVCxDQUF2QyxFQUF3RCxPQUF4RCxDQURVO0FBQUEseUJBQWQ7QUFHQTtBQUNKLHlCQUFLLENBQUw7QUFDSSw2QkFBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxtQ0FBTyxXQUFQLENBQW1CLEtBQW5CLEVBQTBCLElBQTFCLEVBQWdDLElBQWhDLEVBQXNDLE1BQXRDLEVBQThDLE9BQTlDO0FBQ0g7QUFDRDtBQUNKLHlCQUFLLENBQUw7QUFDSSw2QkFBSyxJQUFJLFFBQU8sQ0FBaEIsRUFBbUIsUUFBTyxDQUExQixFQUE2QixPQUE3QixFQUFxQztBQUNqQyxtQ0FBTyxXQUFQLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWdDLElBQWhDLEVBQXNDLE1BQXRDLEVBQThDLE9BQTlDO0FBQ0g7QUFDRDtBQUNKO0FBQ0ksNkJBQUssSUFBSSxTQUFPLENBQWhCLEVBQW1CLFNBQU8sQ0FBMUIsRUFBNkIsUUFBN0IsRUFBcUM7QUFDakMsbUNBQU8sV0FBUCxDQUFtQixLQUFuQixFQUEwQixNQUExQixFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxFQUE0QyxJQUE1QztBQUNIOztBQXhCVDtBQUhtQjs7QUFFdkIsaUJBQUssSUFBSSxPQUFPLENBQWhCLEVBQW1CLE9BQU8sQ0FBMUIsRUFBNkIsTUFBN0IsRUFBcUM7QUFBQSxzQkFBNUIsSUFBNEI7QUE0QnBDO0FBQ0o7OztvQ0FFa0IsSyxFQUFPLEksRUFBTSxJLEVBQU0sSSxFQUFNLEssRUFBTztBQUMvQyxnQkFBSSxPQUFPLENBQVAsSUFBWSxPQUFPLENBQW5CLElBQXdCLE9BQU8sQ0FBL0IsSUFBb0MsT0FBTyxDQUEvQyxFQUFrRCxPQUFPLElBQVA7QUFDbEQsa0JBQU0sSUFBTixFQUFZLElBQVosRUFBa0IsS0FBbEIsR0FBMEI7QUFDdEIsc0JBQU0sSUFEZ0I7QUFFdEIsdUJBQU87QUFGZSxhQUExQjtBQUlBLG1CQUFPLElBQVA7QUFDSDs7Ozs7O2tCQTNIZ0IsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8qXG4gKiAgICAgYm9hcmQuanMgZm9yIGpDaGVzcyBwcm9qZWN0XG4gKiAgICAgMjAxNiBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pjaGVzcy5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0Qm9hcmQoamNoZXNzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtd3JhcCcpLFxuICAgICAgICBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZCcpO1xuICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gbmV3U3F1YXJlKGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGpjaGVzcy5waWNrU3F1YXJlKGUudGFyZ2V0LmRhdGFzZXQuZmlsZSwgZS50YXJnZXQuZGF0YXNldC5yYW5rKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0JvYXJkKGpjaGVzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd3JhcC5hcHBlbmRDaGlsZChib2FyZCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdCb2FyZChqY2hlc3MpIHtcbiAgICBsZXQgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkX19zcXVhcmUnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGZpbGUgPSBzcXVhcmVzW2ldLmRhdGFzZXQuZmlsZSxcbiAgICAgICAgICAgIHJhbmsgPSBzcXVhcmVzW2ldLmRhdGFzZXQucmFuaztcbiAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5zZWxlY3RlZCAhPSBqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBqY2hlc3MsIGZpbGUsIHJhbmspXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5ld1NxdWFyZShqY2hlc3MsIGZpbGUsIHJhbmspIHtcbiAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3F1YXJlLmRhdGFzZXQuZmlsZSA9IGZpbGU7XG4gICAgc3F1YXJlLmRhdGFzZXQucmFuayA9IHJhbms7XG4gICAgZHJhd1NxdWFyZShzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgcmV0dXJuIHNxdWFyZTtcbn1cblxuZnVuY3Rpb24gZHJhd1NxdWFyZShzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuaykge1xuICAgIHNxdWFyZS5kYXRhc2V0LnNlbGVjdGVkID0gK2pjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspO1xuICAgIHNxdWFyZS5kYXRhc2V0LnBpZWNlID0gKyEhamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKTtcbiAgICBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2xhc3NlcyhzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuaykge1xuICAgIHNxdWFyZS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmUnKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV8nICsgamNoZXNzLmdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspKTtcbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9zZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQucGllY2UgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV8nICsgamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSArICdfJ1xuICAgICAgICAgICAgKyBqY2hlc3MuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IEpDaGVzcyBmcm9tICcuLi9saWIvamNoZXNzJztcbmltcG9ydCBpbml0Qm9hcmQgZnJvbSAnLi4vY29tcG9uZW50cy9ib2FyZC9ib2FyZCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbGV0IGpjaGVzcyA9IG5ldyBKQ2hlc3M7XG4gICAgaW5pdEJvYXJkKGpjaGVzcyk7XG59KSIsIlxuLypcbiAqICAgICBqQ2hlc3MgfiBqY2hlc3MuanNcbiAqICAgICAyMDE1LTIwMTYgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpDaGVzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIEpDaGVzcy5fcGFpbnRCb2FyZCh0aGlzLmJvYXJkKTtcbiAgICAgICAgSkNoZXNzLl9zZXRVcFBpZWNlcyh0aGlzLmJvYXJkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX3BhaW50Qm9hcmQoYm9hcmQpIHtcbiAgICAgICAgbGV0IGNvdW50U3F1YXJlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG4gICAgICAgICAgICBjb3VudFNxdWFyZSsrXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gKGNvdW50U3F1YXJlKysgJSAyKSA/XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9IDpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gSkNoZXNzLl9nZXRTcXVhcmUodGhpcy5ib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gSkNoZXNzLl9nZXRTcXVhcmUodGhpcy5ib2FyZCwgZmlsZSwgcmFuaykgJiYgSkNoZXNzLl9nZXRTcXVhcmUodGhpcy5ib2FyZCwgZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIEpDaGVzcy5fZ2V0U3F1YXJlKHRoaXMuYm9hcmQsIGZpbGUsIHJhbmspICYmIEpDaGVzcy5fZ2V0U3F1YXJlKHRoaXMuYm9hcmQsIGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiBKQ2hlc3MuX2dldFNxdWFyZSh0aGlzLmJvYXJkLCBmaWxlLCByYW5rKSAmJiBKQ2hlc3MuX2dldFNxdWFyZSh0aGlzLmJvYXJkLCBmaWxlLCByYW5rKS5waWVjZS5jb2xvcjtcbiAgICB9XG5cbiAgICBzZXRVcFBpZWNlcygpIHtcbiAgICAgICAgcmV0dXJuIEpDaGVzcy5fc2V0VXBQaWVjZXModGhpcy5ib2FyZClcbiAgICB9XG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IEpDaGVzcy5fZ2V0U3F1YXJlKHRoaXMuYm9hcmQsIGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSB7XG4gICAgICAgIGxldCBzcXVhcmUgPSBKQ2hlc3MuX2dldFNxdWFyZSh0aGlzLmJvYXJkLCBmaWxlLCByYW5rKTtcbiAgICAgICAgaWYgKCFzcXVhcmUpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gc3F1YXJlLm1hcmtlZDtcbiAgICB9XG5cbiAgICBpc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IEpDaGVzcy5fZ2V0U3F1YXJlKHRoaXMuYm9hcmQsIGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBzcXVhcmUuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc3RhdGljIF9nZXRTcXVhcmUoYm9hcmQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKGZpbGUgPCAwIHx8IGZpbGUgPiA3IHx8IHJhbmsgPCAwIHx8IHJhbmsgPiA3KSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGJvYXJkW2ZpbGVdW3JhbmtdO1xuICAgIH1cblxuICAgIHN0YXRpYyBfc2V0VXBQaWVjZXMoYm9hcmQpIHtcbiAgICAgICAgbGV0IHBpZWNlU2V0ID0gWydyb29rJywgJ2tuaWdodCcsICdiaXNob3AnLCAncXVlZW4nLCAna2luZycsICdiaXNob3AnLCAna25pZ2h0JywgJ3Jvb2snXTtcbiAgICAgICAgZm9yIChsZXQgcmFuayA9IDA7IHJhbmsgPCA4OyByYW5rKyspIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuaykge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBKQ2hlc3MuX3NldFVwUGllY2UoYm9hcmQsIGluZGV4LCByYW5rLCBwaWVjZVNldFtpbmRleF0sICd3aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBKQ2hlc3MuX3NldFVwUGllY2UoYm9hcmQsIGluZGV4LCByYW5rLCBwaWVjZVNldFtpbmRleF0sICdibGFjaycpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEpDaGVzcy5fc2V0VXBQaWVjZShib2FyZCwgZmlsZSwgcmFuaywgJ3Bhd24nLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEpDaGVzcy5fc2V0VXBQaWVjZShib2FyZCwgZmlsZSwgcmFuaywgJ3Bhd24nLCAnYmxhY2snKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBKQ2hlc3MuX3NldFVwUGllY2UoYm9hcmQsIGZpbGUsIHJhbmssIG51bGwsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIF9zZXRVcFBpZWNlKGJvYXJkLCBmaWxlLCByYW5rLCB0eXBlLCBjb2xvcikge1xuICAgICAgICBpZiAoZmlsZSA8IDAgfHwgZmlsZSA+IDcgfHwgcmFuayA8IDAgfHwgcmFuayA+IDcpIHJldHVybiBudWxsO1xuICAgICAgICBib2FyZFtmaWxlXVtyYW5rXS5waWVjZSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBjb2xvcjogY29sb3JcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59Il19
