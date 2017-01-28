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
                jchess.pickSquare(+e.target.dataset.file, +e.target.dataset.rank);
                drawBoard(jchess);
            });
            board.appendChild(square);
        }
    }
    wrap.appendChild(board);
    return true;
}

function drawBoard(jchess) {
    var squares = document.getElementsByClassName('board__square');
    for (var i = 0; i < squares.length; i++) {
        var file = squares[i].dataset.file,
            rank = squares[i].dataset.rank;
        if (squares[i].dataset.selected != jchess.isSquareSelected(file, rank)) {
            drawSquare(squares[i], jchess, file, rank);
        }
        if (squares[i].dataset.marked != jchess.isSquareMarked(file, rank)) {
            drawSquare(squares[i], jchess, file, rank);
        }
    }
    return true;
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
    square.dataset.marked = +jchess.isSquareMarked(file, rank);
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
    if (square.dataset.marked == 1) {
        square.classList.add('board__square_marked');
    }
    if (square.dataset.piece == 1) {
        square.classList.add('board__square_' + jchess.getPieceType(file, rank) + '_' + jchess.getPieceColor(file, rank));
    }
    return true;
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
    // jchess.setUpInitial();
    jchess.setUpPosition([{
        file: 0,
        rank: 1,
        piece: {
            type: 'pawn',
            color: 'white'
        }
    }, {
        file: 1,
        rank: 1,
        piece: {
            type: 'pawn',
            color: 'white'
        }
    }, {
        file: 4,
        rank: 1,
        piece: {
            type: 'pawn',
            color: 'white'
        }
    }, {
        file: 5,
        rank: 3,
        piece: {
            type: 'pawn',
            color: 'white'
        }
    }, {
        file: 6,
        rank: 2,
        piece: {
            type: 'pawn',
            color: 'white'
        }
    }, {
        file: 7,
        rank: 1,
        piece: {
            type: 'pawn',
            color: 'white'
        }
    }, {
        file: 3,
        rank: 4,
        piece: {
            type: 'pawn',
            color: 'white'
        }
    }, {
        file: 3,
        rank: 5,
        piece: {
            type: 'pawn',
            color: 'white'
        }
    }, {
        file: 2,
        rank: 4,
        piece: {
            type: 'pawn',
            color: 'black'
        }
    }, {
        file: 7,
        rank: 3,
        piece: {
            type: 'pawn',
            color: 'black'
        }
    }, {
        file: 2,
        rank: 2,
        piece: {
            type: 'knight',
            color: 'black'
        }
    }, {
        file: 5,
        rank: 4,
        piece: {
            type: 'knight',
            color: 'black'
        }
    }]);
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
        this._initBoard(this.board);
        this._paintBoard(this.board);
    }

    _createClass(JChess, [{
        key: '_initBoard',
        value: function _initBoard(board) {
            for (var i = 0; i < 8; i++) {
                board[i] = [];
                for (var j = 0; j < 8; j++) {
                    board[i][j] = {
                        selected: false,
                        marked: false,
                        piece: {
                            type: null,
                            color: null
                        }
                    };
                }
            }
        }
    }, {
        key: '_paintBoard',
        value: function _paintBoard(board) {
            var countSquare = 0;
            for (var i = 0; i < 8; i++) {
                countSquare++;
                for (var j = 0; j < 8; j++) {
                    board[i][j].color = countSquare++ % 2 ? 'black' : 'white';
                }
            }
        }
    }, {
        key: 'getSquare',
        value: function getSquare(file, rank) {
            return this._getSquare(this.board, file, rank);
        }
    }, {
        key: '_getSquare',
        value: function _getSquare(board, file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            return board[file][rank];
        }
    }, {
        key: 'getSquareColor',
        value: function getSquareColor(file, rank) {
            return this._getSquare(this.board, file, rank) && this._getSquare(this.board, file, rank).color;
        }
    }, {
        key: 'getPieceType',
        value: function getPieceType(file, rank) {
            return this._getPieceType(this.board, file, rank);
        }
    }, {
        key: '_getPieceType',
        value: function _getPieceType(board, file, rank) {
            return this._getSquare(board, file, rank) && this._getSquare(board, file, rank).piece.type;
        }
    }, {
        key: 'getPieceColor',
        value: function getPieceColor(file, rank) {
            return this._getPieceColor(this.board, file, rank);
        }
    }, {
        key: '_getPieceColor',
        value: function _getPieceColor(board, file, rank) {
            return this._getSquare(board, file, rank) && this._getSquare(board, file, rank).piece.color;
        }
    }, {
        key: 'pickSquare',
        value: function pickSquare(file, rank) {
            return this._pickSquare(this.board, file, rank);
        }
    }, {
        key: '_pickSquare',
        value: function _pickSquare(board, file, rank) {
            var square = this._getSquare(board, file, rank);
            if (!square) return null;
            this._resetSelect(board);
            square.selected = true;
            this._markMoves(board, file, rank);
            return true;
        }
    }, {
        key: '_markMoves',
        value: function _markMoves(board, file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            this._resetMarks(board);
            if (!!this._getPieceType(board, file, rank)) {
                var moves = this._getMovesPawn(board, file, rank);
                if (!moves) return null;
                moves.forEach(function (item) {
                    board[item.file][item.rank].marked = true;
                });
            }
        }
    }, {
        key: '_resetSelect',
        value: function _resetSelect(board) {
            board.forEach(function (file) {
                file.forEach(function (square) {
                    square.selected = false;
                });
            });
        }
    }, {
        key: '_resetMarks',
        value: function _resetMarks(board) {
            board.forEach(function (file) {
                file.forEach(function (square) {
                    square.marked = false;
                });
            });
        }
    }, {
        key: 'isSquareSelected',
        value: function isSquareSelected(file, rank) {
            return this._isSquareSelected(this.board, file, rank);
        }
    }, {
        key: '_isSquareSelected',
        value: function _isSquareSelected(board, file, rank) {
            var square = this._getSquare(board, file, rank);
            if (!square) return null;
            return square.selected;
        }
    }, {
        key: 'isSquareMarked',
        value: function isSquareMarked(file, rank) {
            return this._isSquareMarked(this.board, file, rank);
        }
    }, {
        key: '_isSquareMarked',
        value: function _isSquareMarked(board, file, rank) {
            var square = this._getSquare(board, file, rank);
            if (!square) return null;
            return square.marked;
        }
    }, {
        key: 'setUpInitial',
        value: function setUpInitial() {
            this._setUpInitial(this.board);
        }
    }, {
        key: '_setUpInitial',
        value: function _setUpInitial(board) {
            this._setUpPosition(board, JChess.INITIAL_POSITION);
        }
    }, {
        key: 'setUpPosition',
        value: function setUpPosition(pieceSet) {
            this._setUpPosition(this.board, pieceSet);
        }
    }, {
        key: '_setUpPosition',
        value: function _setUpPosition(board, pieceSet) {
            var _this = this;

            pieceSet.forEach(function (item) {
                _this._setUpPiece(board, item.file, item.rank, item.piece.type, item.piece.color);
            });
        }
    }, {
        key: '_setUpPiece',
        value: function _setUpPiece(board, file, rank, type, color) {
            if (!this._validateSquare(file, rank)) return null;
            board[file][rank].piece = {
                type: type,
                color: color,
                getMoves: this._getMovesPawn
            };
            return true;
        }
    }, {
        key: '_getMovesPawn',
        value: function _getMovesPawn(board, file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this._getPieceType(board, file, rank) === 'pawn')) return null;
            var result = [];
            var moveDirection = this._getPieceColor(board, file, rank) === 'white' ? 1 : -1;

            if (this._validateSquare(file, rank + moveDirection)) {
                if (!this._getPieceType(board, file, rank + moveDirection)) {
                    var move = {
                        file: file,
                        rank: rank + moveDirection
                    };
                    result.push(move);
                    if (moveDirection * rank === 1 || moveDirection * rank === -6) {
                        if (!this._getPieceType(board, file, rank + 2 * moveDirection)) {
                            var _move = {
                                file: file,
                                rank: rank + 2 * moveDirection
                            };
                            result.push(_move);
                        }
                    }
                }
            }

            if (result.length) return result;
            return null;
        }
    }, {
        key: '_validateSquare',
        value: function _validateSquare(file, rank) {
            return file >= 0 && file <= 7 && rank >= 0 && rank <= 7;
        }
    }]);

    return JChess;
}();

JChess.INITIAL_POSITION = [{
    file: 0,
    rank: 0,
    piece: {
        type: 'rook',
        color: 'white'
    }
}, {
    file: 1,
    rank: 0,
    piece: {
        type: 'knight',
        color: 'white'
    }
}, {
    file: 2,
    rank: 0,
    piece: {
        type: 'bishop',
        color: 'white'
    }
}, {
    file: 3,
    rank: 0,
    piece: {
        type: 'queen',
        color: 'white'
    }
}, {
    file: 4,
    rank: 0,
    piece: {
        type: 'king',
        color: 'white'
    }
}, {
    file: 5,
    rank: 0,
    piece: {
        type: 'bishop',
        color: 'white'
    }
}, {
    file: 6,
    rank: 0,
    piece: {
        type: 'knight',
        color: 'white'
    }
}, {
    file: 7,
    rank: 0,
    piece: {
        type: 'rook',
        color: 'white'
    }
}, {
    file: 0,
    rank: 7,
    piece: {
        type: 'rook',
        color: 'black'
    }
}, {
    file: 1,
    rank: 7,
    piece: {
        type: 'knight',
        color: 'black'
    }
}, {
    file: 2,
    rank: 7,
    piece: {
        type: 'bishop',
        color: 'black'
    }
}, {
    file: 3,
    rank: 7,
    piece: {
        type: 'queen',
        color: 'black'
    }
}, {
    file: 4,
    rank: 7,
    piece: {
        type: 'king',
        color: 'black'
    }
}, {
    file: 5,
    rank: 7,
    piece: {
        type: 'bishop',
        color: 'black'
    }
}, {
    file: 6,
    rank: 7,
    piece: {
        type: 'knight',
        color: 'black'
    }
}, {
    file: 7,
    rank: 7,
    piece: {
        type: 'rook',
        color: 'black'
    }
}, {
    file: 0,
    rank: 1,
    piece: {
        type: 'pawn',
        color: 'white'
    }
}, {
    file: 1,
    rank: 1,
    piece: {
        type: 'pawn',
        color: 'white'
    }
}, {
    file: 2,
    rank: 1,
    piece: {
        type: 'pawn',
        color: 'white'
    }
}, {
    file: 3,
    rank: 1,
    piece: {
        type: 'pawn',
        color: 'white'
    }
}, {
    file: 4,
    rank: 1,
    piece: {
        type: 'pawn',
        color: 'white'
    }
}, {
    file: 5,
    rank: 1,
    piece: {
        type: 'pawn',
        color: 'white'
    }
}, {
    file: 6,
    rank: 1,
    piece: {
        type: 'pawn',
        color: 'white'
    }
}, {
    file: 7,
    rank: 1,
    piece: {
        type: 'pawn',
        color: 'white'
    }
}, {
    file: 0,
    rank: 6,
    piece: {
        type: 'pawn',
        color: 'black'
    }
}, {
    file: 1,
    rank: 6,
    piece: {
        type: 'pawn',
        color: 'black'
    }
}, {
    file: 2,
    rank: 6,
    piece: {
        type: 'pawn',
        color: 'black'
    }
}, {
    file: 3,
    rank: 6,
    piece: {
        type: 'pawn',
        color: 'black'
    }
}, {
    file: 4,
    rank: 6,
    piece: {
        type: 'pawn',
        color: 'black'
    }
}, {
    file: 5,
    rank: 6,
    piece: {
        type: 'pawn',
        color: 'black'
    }
}, {
    file: 6,
    rank: 6,
    piece: {
        type: 'pawn',
        color: 'black'
    }
}, {
    file: 7,
    rank: 6,
    piece: {
        type: 'pawn',
        color: 'black'
    }
}];
exports.default = JChess;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pjaGVzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ093QixTOztBQU54Qjs7Ozs7O0FBTWUsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCO0FBQ3RDOztBQUVBLFFBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBWDtBQUFBLFFBQ0ksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FEWjtBQUVBLFVBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixPQUFwQjtBQUNBLFNBQUssSUFBSSxPQUFPLENBQWhCLEVBQW1CLE9BQU8sQ0FBMUIsRUFBNkIsTUFBN0IsRUFBcUM7QUFDakMsYUFBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxnQkFBSSxTQUFTLFVBQVUsTUFBVixFQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFiO0FBQ0EsbUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFDSSxVQUFDLENBQUQsRUFBTztBQUNILHVCQUFPLFVBQVAsQ0FBa0IsQ0FBQyxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLElBQXBDLEVBQTBDLENBQUMsRUFBRSxNQUFGLENBQVMsT0FBVCxDQUFpQixJQUE1RDtBQUNBLDBCQUFVLE1BQVY7QUFDSCxhQUpMO0FBTUEsa0JBQU0sV0FBTixDQUFrQixNQUFsQjtBQUNIO0FBQ0o7QUFDRCxTQUFLLFdBQUwsQ0FBaUIsS0FBakI7QUFDQSxXQUFPLElBQVA7QUFDSDs7QUFFRCxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDdkIsUUFBSSxVQUFVLFNBQVMsc0JBQVQsQ0FBZ0MsZUFBaEMsQ0FBZDtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFB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SCxlQUFPO0FBRko7QUFIWCxDQTFMc0IsRUFrTXRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBbE1zQixFQTBNdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0ExTXNCLEVBa050QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQWxOc0IsRUEwTnRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBMU5zQixFQWtPdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0FsT3NCLEVBME90QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQTFPc0IsRUFrUHRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBbFBzQixFQTBQdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0ExUHNCLEM7a0JBVFQsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8qXG4gKiAgICAgYm9hcmQuanMgZm9yIGpDaGVzcyBwcm9qZWN0XG4gKiAgICAgMjAxNiBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pjaGVzcy5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0Qm9hcmQoamNoZXNzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtd3JhcCcpLFxuICAgICAgICBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZCcpO1xuICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gbmV3U3F1YXJlKGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGpjaGVzcy5waWNrU3F1YXJlKCtlLnRhcmdldC5kYXRhc2V0LmZpbGUsICtlLnRhcmdldC5kYXRhc2V0LnJhbmspO1xuICAgICAgICAgICAgICAgICAgICBkcmF3Qm9hcmQoamNoZXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3cmFwLmFwcGVuZENoaWxkKGJvYXJkKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZHJhd0JvYXJkKGpjaGVzcykge1xuICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmRfX3NxdWFyZScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3F1YXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZmlsZSA9IHNxdWFyZXNbaV0uZGF0YXNldC5maWxlLFxuICAgICAgICAgICAgcmFuayA9IHNxdWFyZXNbaV0uZGF0YXNldC5yYW5rO1xuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0LnNlbGVjdGVkICE9IGpjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuaylcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0Lm1hcmtlZCAhPSBqY2hlc3MuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgamNoZXNzLCBmaWxlLCByYW5rKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBuZXdTcXVhcmUoamNoZXNzLCBmaWxlLCByYW5rKSB7XG4gICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNxdWFyZS5kYXRhc2V0LmZpbGUgPSBmaWxlO1xuICAgIHNxdWFyZS5kYXRhc2V0LnJhbmsgPSByYW5rO1xuICAgIGRyYXdTcXVhcmUoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgIHJldHVybiBzcXVhcmU7XG59XG5cbmZ1bmN0aW9uIGRyYXdTcXVhcmUoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspIHtcbiAgICBzcXVhcmUuZGF0YXNldC5zZWxlY3RlZCA9ICtqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICBzcXVhcmUuZGF0YXNldC5tYXJrZWQgPSAramNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspO1xuICAgIHNxdWFyZS5kYXRhc2V0LnBpZWNlID0gKyEhamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKTtcbiAgICBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2xhc3NlcyhzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuaykge1xuICAgIHNxdWFyZS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmUnKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV8nICsgamNoZXNzLmdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspKTtcbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9zZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQubWFya2VkID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfbWFya2VkJyk7XG4gICAgfVxuICAgIGlmIChzcXVhcmUuZGF0YXNldC5waWVjZSA9PSAxKSB7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlXycgKyBqY2hlc3MuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspICsgJ18nXG4gICAgICAgICAgICArIGpjaGVzcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59IiwiaW1wb3J0IEpDaGVzcyBmcm9tICcuLi9saWIvamNoZXNzJztcbmltcG9ydCBpbml0Qm9hcmQgZnJvbSAnLi4vY29tcG9uZW50cy9ib2FyZC9ib2FyZCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbGV0IGpjaGVzcyA9IG5ldyBKQ2hlc3M7XG4gICAgLy8gamNoZXNzLnNldFVwSW5pdGlhbCgpO1xuICAgIGpjaGVzcy5zZXRVcFBvc2l0aW9uKFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDMsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogMixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDMsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogMixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdKTtcbiAgICBpbml0Qm9hcmQoamNoZXNzKTtcbn0pIiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpjaGVzcy5qc1xuICogICAgIDIwMTUtMjAxNiBieSBBbmRyaWkgU29yb2tpblxuICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkNoZXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5faW5pdEJvYXJkKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLl9wYWludEJvYXJkKHRoaXMuYm9hcmQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBJTklUSUFMX1BPU0lUSU9OID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVlbicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIF9pbml0Qm9hcmQoYm9hcmQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0ge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcGFpbnRCb2FyZChib2FyZCkge1xuICAgICAgICBsZXQgY291bnRTcXVhcmUgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgY291bnRTcXVhcmUrK1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXS5jb2xvciA9IChjb3VudFNxdWFyZSsrICUgMikgPyAnYmxhY2snIDogJ3doaXRlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNxdWFyZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTcXVhcmUodGhpcy5ib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgX2dldFNxdWFyZShib2FyZCwgZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGJvYXJkW2ZpbGVdW3JhbmtdO1xuICAgIH1cblxuICAgIGdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNxdWFyZSh0aGlzLmJvYXJkLCBmaWxlLCByYW5rKSAmJiB0aGlzLl9nZXRTcXVhcmUodGhpcy5ib2FyZCwgZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBpZWNlVHlwZSh0aGlzLmJvYXJkLCBmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBfZ2V0UGllY2VUeXBlKGJvYXJkLCBmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTcXVhcmUoYm9hcmQsIGZpbGUsIHJhbmspICYmIHRoaXMuX2dldFNxdWFyZShib2FyZCwgZmlsZSwgcmFuaykucGllY2UudHlwZTtcbiAgICB9XG5cbiAgICBnZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBpZWNlQ29sb3IodGhpcy5ib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgX2dldFBpZWNlQ29sb3IoYm9hcmQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNxdWFyZShib2FyZCwgZmlsZSwgcmFuaykgJiYgdGhpcy5fZ2V0U3F1YXJlKGJvYXJkLCBmaWxlLCByYW5rKS5waWVjZS5jb2xvcjtcbiAgICB9XG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tTcXVhcmUodGhpcy5ib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgX3BpY2tTcXVhcmUoYm9hcmQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuX2dldFNxdWFyZShib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRTZWxlY3QoYm9hcmQpXG4gICAgICAgIHNxdWFyZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX21hcmtNb3Zlcyhib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9tYXJrTW92ZXMoYm9hcmQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuX3Jlc2V0TWFya3MoYm9hcmQpO1xuICAgICAgICBpZiAoISF0aGlzLl9nZXRQaWVjZVR5cGUoYm9hcmQsIGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBsZXQgbW92ZXMgPSB0aGlzLl9nZXRNb3Zlc1Bhd24oYm9hcmQsIGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgaWYgKCFtb3ZlcykgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBtb3Zlcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkW2l0ZW0uZmlsZV1baXRlbS5yYW5rXS5tYXJrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9yZXNldFNlbGVjdChib2FyZCkge1xuICAgICAgICBib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBmaWxlLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuXG4gICAgX3Jlc2V0TWFya3MoYm9hcmQpIHtcbiAgICAgICAgYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUubWFya2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBpc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3F1YXJlU2VsZWN0ZWQodGhpcy5ib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgX2lzU3F1YXJlU2VsZWN0ZWQoYm9hcmQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuX2dldFNxdWFyZShib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBpc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1NxdWFyZU1hcmtlZCh0aGlzLmJvYXJkLCBmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBfaXNTcXVhcmVNYXJrZWQoYm9hcmQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuX2dldFNxdWFyZShib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5tYXJrZWQ7XG4gICAgfVxuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLl9zZXRVcEluaXRpYWwodGhpcy5ib2FyZCk7XG4gICAgfVxuXG4gICAgX3NldFVwSW5pdGlhbChib2FyZCkge1xuICAgICAgICB0aGlzLl9zZXRVcFBvc2l0aW9uKGJvYXJkLCBKQ2hlc3MuSU5JVElBTF9QT1NJVElPTik7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuICAgICAgICB0aGlzLl9zZXRVcFBvc2l0aW9uKHRoaXMuYm9hcmQsIHBpZWNlU2V0KVxuICAgIH1cblxuICAgIF9zZXRVcFBvc2l0aW9uKGJvYXJkLCBwaWVjZVNldCkge1xuICAgICAgICBwaWVjZVNldC5mb3JFYWNoKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRVcFBpZWNlKGJvYXJkLCBpdGVtLmZpbGUsIGl0ZW0ucmFuaywgaXRlbS5waWVjZS50eXBlLCBpdGVtLnBpZWNlLmNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9zZXRVcFBpZWNlKGJvYXJkLCBmaWxlLCByYW5rLCB0eXBlLCBjb2xvcikge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgYm9hcmRbZmlsZV1bcmFua10ucGllY2UgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgZ2V0TW92ZXM6IHRoaXMuX2dldE1vdmVzUGF3blxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9nZXRNb3Zlc1Bhd24oYm9hcmQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghKHRoaXMuX2dldFBpZWNlVHlwZShib2FyZCwgZmlsZSwgcmFuaykgPT09ICdwYXduJykpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBtb3ZlRGlyZWN0aW9uID0gKHRoaXMuX2dldFBpZWNlQ29sb3IoYm9hcmQsIGZpbGUsIHJhbmspID09PSAnd2hpdGUnKSA/IDEgOiAtMVxuXG4gICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rICsgbW92ZURpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZ2V0UGllY2VUeXBlKGJvYXJkLCBmaWxlLCByYW5rICsgbW92ZURpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogcmFuayArIG1vdmVEaXJlY3Rpb25cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG1vdmUpO1xuICAgICAgICAgICAgICAgIGlmICgobW92ZURpcmVjdGlvbiAqIHJhbmsgPT09IDEpIHx8IChtb3ZlRGlyZWN0aW9uICogcmFuayA9PT0gLTYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZ2V0UGllY2VUeXBlKGJvYXJkLCBmaWxlLCByYW5rICsgMiAqIG1vdmVEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6IHJhbmsgKyAyICogbW92ZURpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG1vdmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGgpIHJldHVybiByZXN1bHQ7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiAoZmlsZSA+PSAwICYmIGZpbGUgPD0gNyAmJiByYW5rID49IDAgJiYgcmFuayA8PSA3KTtcbiAgICB9XG59Il19
