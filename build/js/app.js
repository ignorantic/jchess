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

    /*
     *   INITIALIZATION
     */

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

        /*
         *   SETUP
         */

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

        /*
         *   GETTER
         */

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

        /*
         *   PICK
         */

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

        /*
         *   SELECT
         */

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

        /*
         *   MARK
         */

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

        /*
         *   MARK FOR MOVE
         */

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
        key: '_getMovesPawn',
        value: function _getMovesPawn(board, file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this._getPieceType(board, file, rank) === 'pawn')) return null;
            var result = [];
            var moveDirection = this._getPieceColor(board, file, rank) === 'white' ? 1 : -1;

            var targetFile = file;
            var targetRank = rank + moveDirection;

            if (this._validateSquare(targetFile, targetRank)) {

                if (!this._getPieceType(board, targetFile, targetRank)) {
                    pushMove(targetFile, targetRank);

                    if (moveDirection * rank === 1 || moveDirection * rank === -6) {

                        targetRank = rank + 2 * moveDirection;
                        if (!this._getPieceType(board, targetFile, targetRank)) {
                            pushMove(targetFile, targetRank);
                        }
                    }
                }
            }

            targetRank = rank + moveDirection;
            targetFile = file - 1;
            checkCapture(this, targetFile, targetRank);
            targetFile = file + 1;
            checkCapture(this, targetFile, targetRank);

            if (result.length) return result;
            return null;

            function checkCapture(self, file, rank) {
                if (self._validateSquare(file, rank)) {
                    if (isCapture(self, file, rank)) {
                        pushMove(file, rank);
                    }
                }
            }

            function isCapture(self, file, rank) {
                return self._getPieceColor(board, file, rank) == 'black' && moveDirection == 1 || self._getPieceColor(board, file, rank) == 'white' && moveDirection == -1;
            }

            function pushMove(file, rank) {
                var move = {
                    file: file,
                    rank: rank
                };
                result.push(move);
            }
        }

        /*
         *   MOVE
         */

    }, {
        key: '_doMove',
        value: function _doMove(startSquare, finishSquare) {}

        /*
         *   VALIDATORS
         */

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pjaGVzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ093QixTOztBQU54Qjs7Ozs7O0FBTWUsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCO0FBQ3RDOztBQUVBLFFBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBWDtBQUFBLFFBQ0ksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FEWjtBQUVBLFVBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixPQUFwQjtBQUNBLFNBQUssSUFBSSxPQUFPLENBQWhCLEVBQW1CLE9BQU8sQ0FBMUIsRUFBNkIsTUFBN0IsRUFBcUM7QUFDakMsYUFBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxnQkFBSSxTQUFTLFVBQVUsTUFBVixFQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFiO0FBQ0EsbUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFDSSxVQUFDLENBQUQsRUFBTztBQUNILHVCQUFPLFVBQVAsQ0FBa0IsQ0FBQyxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLElBQXBDLEVBQTBDLENBQUMsRUFBRSxNQUFGLENBQVMsT0FBVCxDQUFpQixJQUE1RDtBQUNBLDBCQUFVLE1BQVY7QUFDSCxhQUpMO0FBTUEsa0JBQU0sV0FBTixDQUFrQixNQUFsQjtBQUNIO0FBQ0o7QUFDRCxTQUFLLFdBQUwsQ0FBaUIsS0FBakI7QUFDQSxXQUFPLElBQVA7QUFDSDs7QUFFRCxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDdkIsUUFBSSxVQUFVLFNBQVMsc0JBQVQsQ0FBZ0MsZUFBaEMsQ0FBZDtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFB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RUEwTXRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBMU1zQixFQWtOdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0FsTnNCLEVBME50QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQTFOc0IsRUFrT3RCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBbE9zQixFQTBPdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0ExT3NCLEVBa1B0QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQWxQc0IsRUEwUHRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBMVBzQixDO2tCQUZULE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKlxuICogICAgIGJvYXJkLmpzIGZvciBqQ2hlc3MgcHJvamVjdFxuICogICAgIDIwMTYgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qY2hlc3MuZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdEJvYXJkKGpjaGVzcykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLXdyYXAnKSxcbiAgICAgICAgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmQnKTtcbiAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICBmb3IgKGxldCByYW5rID0gMDsgcmFuayA8IDg7IHJhbmsrKykge1xuICAgICAgICAgICAgbGV0IHNxdWFyZSA9IG5ld1NxdWFyZShqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBqY2hlc3MucGlja1NxdWFyZSgrZS50YXJnZXQuZGF0YXNldC5maWxlLCArZS50YXJnZXQuZGF0YXNldC5yYW5rKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0JvYXJkKGpjaGVzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd3JhcC5hcHBlbmRDaGlsZChib2FyZCk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGRyYXdCb2FyZChqY2hlc3MpIHtcbiAgICBsZXQgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkX19zcXVhcmUnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGZpbGUgPSBzcXVhcmVzW2ldLmRhdGFzZXQuZmlsZSxcbiAgICAgICAgICAgIHJhbmsgPSBzcXVhcmVzW2ldLmRhdGFzZXQucmFuaztcbiAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5zZWxlY3RlZCAhPSBqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBqY2hlc3MsIGZpbGUsIHJhbmspXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5tYXJrZWQgIT0gamNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuaylcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gbmV3U3F1YXJlKGpjaGVzcywgZmlsZSwgcmFuaykge1xuICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcXVhcmUuZGF0YXNldC5maWxlID0gZmlsZTtcbiAgICBzcXVhcmUuZGF0YXNldC5yYW5rID0gcmFuaztcbiAgICBkcmF3U3F1YXJlKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICByZXR1cm4gc3F1YXJlO1xufVxuXG5mdW5jdGlvbiBkcmF3U3F1YXJlKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKSB7XG4gICAgc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPSAramNoZXNzLmlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuayk7XG4gICAgc3F1YXJlLmRhdGFzZXQubWFya2VkID0gK2pjaGVzcy5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKTtcbiAgICBzcXVhcmUuZGF0YXNldC5waWVjZSA9ICshIWpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuayk7XG4gICAgc2V0Q2xhc3NlcyhzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNldENsYXNzZXMoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspIHtcbiAgICBzcXVhcmUucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlJyk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGpjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgaWYgKHNxdWFyZS5kYXRhc2V0LnNlbGVjdGVkID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgaWYgKHNxdWFyZS5kYXRhc2V0Lm1hcmtlZCA9PSAxKSB7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlX21hcmtlZCcpO1xuICAgIH1cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQucGllY2UgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV8nICsgamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSArICdfJ1xuICAgICAgICAgICAgKyBqY2hlc3MuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufSIsImltcG9ydCBKQ2hlc3MgZnJvbSAnLi4vbGliL2pjaGVzcyc7XG5pbXBvcnQgaW5pdEJvYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvYm9hcmQvYm9hcmQnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGxldCBqY2hlc3MgPSBuZXcgSkNoZXNzO1xuICAgIC8vIGpjaGVzcy5zZXRVcEluaXRpYWwoKTtcbiAgICBqY2hlc3Muc2V0VXBQb3NpdGlvbihbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiAzLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDIsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDUsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAzLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDIsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXSk7XG4gICAgaW5pdEJvYXJkKGpjaGVzcyk7XG59KSIsIlxuLypcbiAqICAgICBqQ2hlc3MgfiBqY2hlc3MuanNcbiAqICAgICAyMDE1LTIwMTYgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpDaGVzcyB7XG5cbiAgICBzdGF0aWMgSU5JVElBTF9QT1NJVElPTiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICAvKlxuICAgICAqICAgSU5JVElBTElaQVRJT05cbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5faW5pdEJvYXJkKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLl9wYWludEJvYXJkKHRoaXMuYm9hcmQpO1xuICAgIH1cblxuICAgIF9pbml0Qm9hcmQoYm9hcmQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0ge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcGFpbnRCb2FyZChib2FyZCkge1xuICAgICAgICBsZXQgY291bnRTcXVhcmUgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgY291bnRTcXVhcmUrK1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXS5jb2xvciA9IChjb3VudFNxdWFyZSsrICUgMikgPyAnYmxhY2snIDogJ3doaXRlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVRVUFxuICAgICAqL1xuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLl9zZXRVcEluaXRpYWwodGhpcy5ib2FyZCk7XG4gICAgfVxuXG4gICAgX3NldFVwSW5pdGlhbChib2FyZCkge1xuICAgICAgICB0aGlzLl9zZXRVcFBvc2l0aW9uKGJvYXJkLCBKQ2hlc3MuSU5JVElBTF9QT1NJVElPTik7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuICAgICAgICB0aGlzLl9zZXRVcFBvc2l0aW9uKHRoaXMuYm9hcmQsIHBpZWNlU2V0KVxuICAgIH1cblxuICAgIF9zZXRVcFBvc2l0aW9uKGJvYXJkLCBwaWVjZVNldCkge1xuICAgICAgICBwaWVjZVNldC5mb3JFYWNoKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRVcFBpZWNlKGJvYXJkLCBpdGVtLmZpbGUsIGl0ZW0ucmFuaywgaXRlbS5waWVjZS50eXBlLCBpdGVtLnBpZWNlLmNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9zZXRVcFBpZWNlKGJvYXJkLCBmaWxlLCByYW5rLCB0eXBlLCBjb2xvcikge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgYm9hcmRbZmlsZV1bcmFua10ucGllY2UgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgZ2V0TW92ZXM6IHRoaXMuX2dldE1vdmVzUGF3blxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVRURVJcbiAgICAgKi9cblxuICAgIGdldFNxdWFyZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTcXVhcmUodGhpcy5ib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgX2dldFNxdWFyZShib2FyZCwgZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGJvYXJkW2ZpbGVdW3JhbmtdO1xuICAgIH1cblxuICAgIGdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNxdWFyZSh0aGlzLmJvYXJkLCBmaWxlLCByYW5rKSAmJiB0aGlzLl9nZXRTcXVhcmUodGhpcy5ib2FyZCwgZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBpZWNlVHlwZSh0aGlzLmJvYXJkLCBmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBfZ2V0UGllY2VUeXBlKGJvYXJkLCBmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTcXVhcmUoYm9hcmQsIGZpbGUsIHJhbmspICYmIHRoaXMuX2dldFNxdWFyZShib2FyZCwgZmlsZSwgcmFuaykucGllY2UudHlwZTtcbiAgICB9XG5cbiAgICBnZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBpZWNlQ29sb3IodGhpcy5ib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgX2dldFBpZWNlQ29sb3IoYm9hcmQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNxdWFyZShib2FyZCwgZmlsZSwgcmFuaykgJiYgdGhpcy5fZ2V0U3F1YXJlKGJvYXJkLCBmaWxlLCByYW5rKS5waWVjZS5jb2xvcjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgUElDS1xuICAgICAqL1xuXG4gICAgcGlja1NxdWFyZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrU3F1YXJlKHRoaXMuYm9hcmQsIGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIF9waWNrU3F1YXJlKGJvYXJkLCBmaWxlLCByYW5rKSB7XG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLl9nZXRTcXVhcmUoYm9hcmQsIGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KGJvYXJkKVxuICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9tYXJrTW92ZXMoYm9hcmQsIGZpbGUsIHJhbmspO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VMRUNUXG4gICAgICovXG5cbiAgICBfcmVzZXRTZWxlY3QoYm9hcmQpIHtcbiAgICAgICAgYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNTcXVhcmVTZWxlY3RlZCh0aGlzLmJvYXJkLCBmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBfaXNTcXVhcmVTZWxlY3RlZChib2FyZCwgZmlsZSwgcmFuaykge1xuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5fZ2V0U3F1YXJlKGJvYXJkLCBmaWxlLCByYW5rKTtcbiAgICAgICAgaWYgKCFzcXVhcmUpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gc3F1YXJlLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBNQVJLXG4gICAgICovXG5cbiAgICBfcmVzZXRNYXJrcyhib2FyZCkge1xuICAgICAgICBib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBmaWxlLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5tYXJrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3F1YXJlTWFya2VkKHRoaXMuYm9hcmQsIGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIF9pc1NxdWFyZU1hcmtlZChib2FyZCwgZmlsZSwgcmFuaykge1xuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5fZ2V0U3F1YXJlKGJvYXJkLCBmaWxlLCByYW5rKTtcbiAgICAgICAgaWYgKCFzcXVhcmUpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gc3F1YXJlLm1hcmtlZDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgTUFSSyBGT1IgTU9WRVxuICAgICAqL1xuXG4gICAgX21hcmtNb3Zlcyhib2FyZCwgZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRNYXJrcyhib2FyZCk7XG4gICAgICAgIGlmICghIXRoaXMuX2dldFBpZWNlVHlwZShib2FyZCwgZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGxldCBtb3ZlcyA9IHRoaXMuX2dldE1vdmVzUGF3bihib2FyZCwgZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBpZiAoIW1vdmVzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIG1vdmVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRbaXRlbS5maWxlXVtpdGVtLnJhbmtdLm1hcmtlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldE1vdmVzUGF3bihib2FyZCwgZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCEodGhpcy5fZ2V0UGllY2VUeXBlKGJvYXJkLCBmaWxlLCByYW5rKSA9PT0gJ3Bhd24nKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IG1vdmVEaXJlY3Rpb24gPSAodGhpcy5fZ2V0UGllY2VDb2xvcihib2FyZCwgZmlsZSwgcmFuaykgPT09ICd3aGl0ZScpID8gMSA6IC0xXG5cbiAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBmaWxlO1xuICAgICAgICBsZXQgdGFyZ2V0UmFuayA9IHJhbmsgKyBtb3ZlRGlyZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZVNxdWFyZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2dldFBpZWNlVHlwZShib2FyZCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcbiAgICAgICAgICAgICAgICBwdXNoTW92ZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcblxuICAgICAgICAgICAgICAgIGlmICgobW92ZURpcmVjdGlvbiAqIHJhbmsgPT09IDEpIHx8IChtb3ZlRGlyZWN0aW9uICogcmFuayA9PT0gLTYpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UmFuayA9IHJhbmsgKyAyICogbW92ZURpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9nZXRQaWVjZVR5cGUoYm9hcmQsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoTW92ZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcbiAgICAgICAgdGFyZ2V0RmlsZSA9IGZpbGUgLSAxO1xuICAgICAgICBjaGVja0NhcHR1cmUodGhpcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaylcbiAgICAgICAgdGFyZ2V0RmlsZSA9IGZpbGUgKyAxO1xuICAgICAgICBjaGVja0NhcHR1cmUodGhpcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaylcblxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tDYXB0dXJlKHNlbGYsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgICAgIGlmIChzZWxmLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0NhcHR1cmUoc2VsZiwgZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaE1vdmUoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNDYXB0dXJlKHNlbGYsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgICAgIHJldHVybiAoc2VsZi5fZ2V0UGllY2VDb2xvcihib2FyZCwgZmlsZSwgcmFuaykgPT0gJ2JsYWNrJyAmJiBtb3ZlRGlyZWN0aW9uID09IDEpIHx8XG4gICAgICAgICAgICAoc2VsZi5fZ2V0UGllY2VDb2xvcihib2FyZCwgZmlsZSwgcmFuaykgPT0gJ3doaXRlJyAmJiBtb3ZlRGlyZWN0aW9uID09IC0xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1c2hNb3ZlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgICAgIGxldCBtb3ZlID0ge1xuICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG1vdmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIE1PVkVcbiAgICAgKi9cblxuICAgIF9kb01vdmUoc3RhcnRTcXVhcmUsIGZpbmlzaFNxdWFyZSkge1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFZBTElEQVRPUlNcbiAgICAgKi9cblxuICAgIF92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiAoZmlsZSA+PSAwICYmIGZpbGUgPD0gNyAmJiByYW5rID49IDAgJiYgcmFuayA8PSA3KTtcbiAgICB9XG59Il19
