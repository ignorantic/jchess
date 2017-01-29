(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initBoard;

/*
 *     board.js for jChess project
 *     2017 by Andrii Sorokin
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
        file: 2,
        rank: 2,
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
        file: 5,
        rank: 4,
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
    }]);
    (0, _board2.default)(jchess);
});

},{"../components/board/board":1,"../lib/jchess":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *     jChess ~ jboard.js
 *     2017 by Andrii Sorokin
 */

var JBoard = function () {

    /*
     *   CONSTRUCTOR
     */

    function JBoard() {
        _classCallCheck(this, JBoard);

        this.board = [];
        this._initBoard();
        this._paintBoard();
        this.selectFile = null;
        this.selectRank = null;
    }

    /*
     *   INITIALIZATION
     */

    /*
     *   CONSTANTS
     */

    _createClass(JBoard, [{
        key: '_initBoard',
        value: function _initBoard() {
            for (var i = 0; i < 8; i++) {
                this.board[i] = [];
                for (var j = 0; j < 8; j++) {
                    this.board[i][j] = {
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
        value: function _paintBoard() {
            var countSquare = 0;
            for (var i = 0; i < 8; i++) {
                countSquare++;
                for (var j = 0; j < 8; j++) {
                    this.board[i][j].color = countSquare++ % 2 ? 'black' : 'white';
                }
            }
        }

        /*
         *   SETUP
         */

    }, {
        key: 'setUpInitial',
        value: function setUpInitial() {
            this.setUpPosition(JBoard.INITIAL_POSITION);
        }
    }, {
        key: 'setUpPosition',
        value: function setUpPosition(pieceSet) {
            var _this = this;

            this.resetPosition();
            pieceSet.forEach(function (item) {
                _this._setUpPiece(item.file, item.rank, item.piece.type, item.piece.color);
            });
        }
    }, {
        key: 'resetPosition',
        value: function resetPosition() {
            var _this2 = this;

            this.board.forEach(function (item, file) {
                item.forEach(function (square, rank) {
                    _this2._setUpPiece(file, rank, null, null);
                });
            });
        }
    }, {
        key: '_setUpPiece',
        value: function _setUpPiece(file, rank, type, color) {
            if (!this._validateSquare(file, rank)) return null;
            this.board[file][rank].piece = {
                type: type,
                color: color
            };
            return true;
        }

        /*
         *   GETTERS
         */

    }, {
        key: 'getSquare',
        value: function getSquare(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            return this.board[file][rank];
        }
    }, {
        key: 'getSquareColor',
        value: function getSquareColor(file, rank) {
            return this.getSquare(file, rank) && this.getSquare(file, rank).color;
        }
    }, {
        key: 'getPieceType',
        value: function getPieceType(file, rank) {
            return this.getSquare(file, rank) && this.getSquare(file, rank).piece.type;
        }
    }, {
        key: 'getPieceColor',
        value: function getPieceColor(file, rank) {
            return this.getSquare(file, rank) && this.getSquare(file, rank).piece.color;
        }

        /*
         *   SETTERS
         */

    }, {
        key: 'setPieceType',
        value: function setPieceType(file, rank, type) {
            if (!this._validateSquare(file, rank)) return null;
            this.board[file][rank].piece.type = type;
            return true;
        }
    }, {
        key: 'setPieceColor',
        value: function setPieceColor(file, rank, color) {
            if (!this._validateSquare(file, rank)) return null;
            this.board[file][rank].piece.color = color;
            return true;
        }

        /*
         *   PICK
         */

    }, {
        key: 'pickSquare',
        value: function pickSquare(file, rank) {
            var square = this.getSquare(file, rank);
            if (!square) return null;

            if (this.isSquareMarked(file, rank)) {

                this._doMove(this.selectFile, this.selectRank, file, rank);

                this.selectFile = null;
                this.selectRank = null;
                this._resetMarks();
                this._resetSelect();
                return true;
            }

            this._resetSelect();
            square.selected = true;
            this.selectFile = file;
            this.selectRank = rank;
            this._markMoves(file, rank);

            return true;
        }

        /*
         *   SELECT
         */

    }, {
        key: '_resetSelect',
        value: function _resetSelect() {
            this.board.forEach(function (file) {
                file.forEach(function (square) {
                    square.selected = false;
                });
            });
        }
    }, {
        key: 'isSquareSelected',
        value: function isSquareSelected(file, rank) {
            var square = this.getSquare(file, rank);
            if (!square) return null;
            return square.selected;
        }

        /*
         *   MARK
         */

    }, {
        key: '_resetMarks',
        value: function _resetMarks() {
            this.board.forEach(function (file) {
                file.forEach(function (square) {
                    square.marked = false;
                });
            });
        }
    }, {
        key: 'isSquareMarked',
        value: function isSquareMarked(file, rank) {
            var square = this.getSquare(file, rank);
            if (!square) return null;
            return square.marked;
        }

        /*
         *   MARK FOR MOVE
         */

    }, {
        key: '_markMoves',
        value: function _markMoves(file, rank) {
            var _this3 = this;

            if (!this._validateSquare(file, rank)) return null;
            this._resetMarks();
            if (!!this.getPieceType(file, rank)) {
                var moves = this._getMoves(file, rank);
                if (!moves) return null;
                moves.forEach(function (item) {
                    _this3.board[item.file][item.rank].marked = true;
                });
            }
        }
    }, {
        key: '_getMoves',
        value: function _getMoves(file, rank) {
            switch (this.getPieceType(file, rank)) {
                case 'pawn':
                    return this._getMovesPawn(file, rank);
                    break;
                default:
                    return null;
            }
        }
    }, {
        key: '_getMovesPawn',
        value: function _getMovesPawn(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'pawn')) return null;
            var result = [];
            var moveDirection = this.getPieceColor(file, rank) === 'white' ? 1 : -1;

            var targetFile = file;
            var targetRank = rank + moveDirection;

            if (this._validateSquare(targetFile, targetRank)) {

                if (!this.getPieceType(targetFile, targetRank)) {
                    pushMove(targetFile, targetRank);

                    if (moveDirection * rank == 1 || moveDirection * rank == -6) {

                        targetRank = rank + 2 * moveDirection;
                        if (!this.getPieceType(targetFile, targetRank)) {
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
                return self.getPieceColor(file, rank) == 'black' && moveDirection == 1 || self.getPieceColor(file, rank) == 'white' && moveDirection == -1;
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
        value: function _doMove(startFile, startRank, stopFile, stopRank) {
            if (!this._validateSquare(startFile, startRank)) return null;
            if (!this._validateSquare(stopFile, stopRank)) return null;
            if (!this.getPieceType(startFile, startRank)) return null;
            if (this.getPieceColor(startFile, startRank) === this.getPieceColor(stopFile, stopRank)) return null;

            var type = this.getPieceType(startFile, startRank);
            var color = this.getPieceColor(startFile, startRank);

            this.setPieceType(stopFile, stopRank, type);
            this.setPieceColor(stopFile, stopRank, color);
            this.setPieceType(startFile, startRank, null);
            this.setPieceColor(startFile, startRank, null);

            return true;
        }

        /*
         *   VALIDATORS
         */

    }, {
        key: '_validateSquare',
        value: function _validateSquare(file, rank) {
            return file >= 0 && file <= 7 && rank >= 0 && rank <= 7;
        }
    }]);

    return JBoard;
}();

JBoard.INITIAL_POSITION = [{
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
exports.default = JBoard;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/*
 *     jChess ~ jchess.js
 *     2017 by Andrii Sorokin
 */

var _jboard = require('./jboard');

var _jboard2 = _interopRequireDefault(_jboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JChess = function () {

    /*
     *   INITIALIZATION
     */

    function JChess() {
        _classCallCheck(this, JChess);

        this.mainBoard = new _jboard2.default();
    }

    /*
     *   SETUP
     */

    _createClass(JChess, [{
        key: 'setUpInitial',
        value: function setUpInitial() {
            this.mainBoard.setUpInitial();
        }
    }, {
        key: 'setUpPosition',
        value: function setUpPosition(pieceSet) {
            this.mainBoard.setUpPosition(pieceSet);
        }

        /*
         *   GETTERS
         */

    }, {
        key: 'getSquare',
        value: function getSquare(file, rank) {
            return this.mainBoard.getSquare(file, rank);
        }
    }, {
        key: 'getSquareColor',
        value: function getSquareColor(file, rank) {
            return this.mainBoard.getSquare(file, rank) && this.mainBoard.getSquare(file, rank).color;
        }
    }, {
        key: 'getPieceType',
        value: function getPieceType(file, rank) {
            return this.mainBoard.getSquare(file, rank) && this.mainBoard.getSquare(file, rank).piece.type;
        }
    }, {
        key: 'getPieceColor',
        value: function getPieceColor(file, rank) {
            return this.mainBoard.getSquare(file, rank) && this.mainBoard.getSquare(file, rank).piece.color;
        }

        /*
         *   PICK
         */

    }, {
        key: 'pickSquare',
        value: function pickSquare(file, rank) {
            this.mainBoard.pickSquare(file, rank);
        }

        /*
         *   SELECT
         */

    }, {
        key: 'isSquareSelected',
        value: function isSquareSelected(file, rank) {
            return this.mainBoard.isSquareSelected(file, rank);
        }

        /*
         *   MARK
         */

    }, {
        key: 'isSquareMarked',
        value: function isSquareMarked(file, rank) {
            return this.mainBoard.isSquareMarked(file, rank);
        }
    }]);

    return JChess;
}();

exports.default = JChess;

},{"./jboard":3}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pib2FyZC5qcyIsImRldi9saWIvamNoZXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDT3dCLFM7O0FBTnhCOzs7Ozs7QUFNZSxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDdEM7O0FBRUEsUUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFYO0FBQUEsUUFDSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQURaO0FBRUEsVUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLE9BQXBCO0FBQ0EsU0FBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxhQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLGdCQUFJLFNBQVMsVUFBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCLElBQXhCLENBQWI7QUFDQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUNJLFVBQUMsQ0FBRCxFQUFPO0FBQ0gsdUJBQU8sVUFBUCxDQUFrQixDQUFDLEVBQUUsTUFBRixDQUFTLE9BQVQsQ0FBaUIsSUFBcEMsRUFBMEMsQ0FBQyxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLElBQTVEO0FBQ0EsMEJBQVUsTUFBVjtBQUNILGFBSkw7QUFNQSxrQkFBTSxXQUFOLENBQWtCLE1BQWxCO0FBQ0g7QUFDSjtBQUNELFNBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUVELFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQjtBQUN2QixRQUFJLFVBQVUsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxDQUFkO0FBQ0EsU0FB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QUF5QixJQUF6QixFQUErQixJQUEvQixLQUF3QyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLEtBQXJDLENBQTJDLElBQTFGO0FBQ0g7OztzQ0FFYSxJLEVBQU0sSSxFQUFNO0FBQ3RCLG1CQUFPLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsS0FBd0MsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQyxLQUFyQyxDQUEyQyxLQUExRjtBQUNIOztBQUVEOzs7Ozs7bUNBSVcsSSxFQUFNLEksRUFBTTtBQUNuQixpQkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixJQUExQixFQUFnQyxJQUFoQztBQUNIOztBQUVEOzs7Ozs7eUNBSWlCLEksRUFBTSxJLEVBQU07QUFDekIsbUJBQU8sS0FBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7dUNBSWUsSSxFQUFNLEksRUFBTTtBQUN2QixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxjQUFmLENBQThCLElBQTlCLEVBQW9DLElBQXBDLENBQVA7QUFDSDs7Ozs7O2tCQWhFZ0IsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8qXG4gKiAgICAgYm9hcmQuanMgZm9yIGpDaGVzcyBwcm9qZWN0XG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pjaGVzcy5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0Qm9hcmQoamNoZXNzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtd3JhcCcpLFxuICAgICAgICBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZCcpO1xuICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gbmV3U3F1YXJlKGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGpjaGVzcy5waWNrU3F1YXJlKCtlLnRhcmdldC5kYXRhc2V0LmZpbGUsICtlLnRhcmdldC5kYXRhc2V0LnJhbmspO1xuICAgICAgICAgICAgICAgICAgICBkcmF3Qm9hcmQoamNoZXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3cmFwLmFwcGVuZENoaWxkKGJvYXJkKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZHJhd0JvYXJkKGpjaGVzcykge1xuICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmRfX3NxdWFyZScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3F1YXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZmlsZSA9IHNxdWFyZXNbaV0uZGF0YXNldC5maWxlLFxuICAgICAgICAgICAgcmFuayA9IHNxdWFyZXNbaV0uZGF0YXNldC5yYW5rO1xuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0LnNlbGVjdGVkICE9IGpjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuaylcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0Lm1hcmtlZCAhPSBqY2hlc3MuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgamNoZXNzLCBmaWxlLCByYW5rKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBuZXdTcXVhcmUoamNoZXNzLCBmaWxlLCByYW5rKSB7XG4gICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNxdWFyZS5kYXRhc2V0LmZpbGUgPSBmaWxlO1xuICAgIHNxdWFyZS5kYXRhc2V0LnJhbmsgPSByYW5rO1xuICAgIGRyYXdTcXVhcmUoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgIHJldHVybiBzcXVhcmU7XG59XG5cbmZ1bmN0aW9uIGRyYXdTcXVhcmUoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspIHtcbiAgICBzcXVhcmUuZGF0YXNldC5zZWxlY3RlZCA9ICtqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICBzcXVhcmUuZGF0YXNldC5tYXJrZWQgPSAramNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspO1xuICAgIHNxdWFyZS5kYXRhc2V0LnBpZWNlID0gKyEhamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKTtcbiAgICBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2xhc3NlcyhzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuaykge1xuICAgIHNxdWFyZS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmUnKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV8nICsgamNoZXNzLmdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspKTtcbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9zZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQubWFya2VkID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfbWFya2VkJyk7XG4gICAgfVxuICAgIGlmIChzcXVhcmUuZGF0YXNldC5waWVjZSA9PSAxKSB7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlXycgKyBqY2hlc3MuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspICsgJ18nXG4gICAgICAgICAgICArIGpjaGVzcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59IiwiaW1wb3J0IEpDaGVzcyBmcm9tICcuLi9saWIvamNoZXNzJztcbmltcG9ydCBpbml0Qm9hcmQgZnJvbSAnLi4vY29tcG9uZW50cy9ib2FyZC9ib2FyZCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbGV0IGpjaGVzcyA9IG5ldyBKQ2hlc3M7XG4gICAgLy8gamNoZXNzLnNldFVwSW5pdGlhbCgpO1xuICAgIGpjaGVzcy5zZXRVcFBvc2l0aW9uKFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDIsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAyLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiA1LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF0pO1xuICAgIGluaXRCb2FyZChqY2hlc3MpO1xufSkiLCJcbi8qXG4gKiAgICAgakNoZXNzIH4gamJvYXJkLmpzXG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpCb2FyZCB7XG5cbiAgICAvKlxuICAgICAqICAgQ09OU1RBTlRTXG4gICAgICovXG5cbiAgICBzdGF0aWMgSU5JVElBTF9QT1NJVElPTiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICAvKlxuICAgICAqICAgQ09OU1RSVUNUT1JcbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIHRoaXMuX2luaXRCb2FyZCgpO1xuICAgICAgICB0aGlzLl9wYWludEJvYXJkKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0RmlsZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0UmFuayA9IG51bGw7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIElOSVRJQUxJWkFUSU9OXG4gICAgICovXG5cbiAgICBfaW5pdEJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0ge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcGFpbnRCb2FyZCgpIHtcbiAgICAgICAgbGV0IGNvdW50U3F1YXJlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50U3F1YXJlKytcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXS5jb2xvciA9IChjb3VudFNxdWFyZSsrICUgMikgPyAnYmxhY2snIDogJ3doaXRlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVRVUFxuICAgICAqL1xuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLnNldFVwUG9zaXRpb24oSkJvYXJkLklOSVRJQUxfUE9TSVRJT04pO1xuICAgIH1cblxuICAgIHNldFVwUG9zaXRpb24ocGllY2VTZXQpIHtcbiAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG4gICAgICAgIHBpZWNlU2V0LmZvckVhY2goXG4gICAgICAgICAgICAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFVwUGllY2UoaXRlbS5maWxlLCBpdGVtLnJhbmssIGl0ZW0ucGllY2UudHlwZSwgaXRlbS5waWVjZS5jb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZXNldFBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoaXRlbSwgZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSwgcmFuaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0VXBQaWVjZShmaWxlLCByYW5rLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9zZXRVcFBpZWNlKGZpbGUsIHJhbmssIHR5cGUsIGNvbG9yKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvclxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVRURVJTXG4gICAgICovXG5cbiAgICBnZXRTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmRbZmlsZV1bcmFua107XG4gICAgfVxuXG4gICAgZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS5jb2xvcjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVEVSU1xuICAgICAqL1xuXG4gICAgc2V0UGllY2VUeXBlKGZpbGUsIHJhbmssIHR5cGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZSA9IHR5cGU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHNldFBpZWNlQ29sb3IoZmlsZSwgcmFuaywgY29sb3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFBJQ0tcbiAgICAgKi9cblxuICAgIHBpY2tTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICB0aGlzLl9kb01vdmUodGhpcy5zZWxlY3RGaWxlLCB0aGlzLnNlbGVjdFJhbmssIGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZpbGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RSYW5rID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0TWFya3MoKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KClcbiAgICAgICAgc3F1YXJlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RGaWxlID0gZmlsZTtcbiAgICAgICAgdGhpcy5zZWxlY3RSYW5rID0gcmFuaztcbiAgICAgICAgdGhpcy5fbWFya01vdmVzKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRUxFQ1RcbiAgICAgKi9cblxuICAgIF9yZXNldFNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5ib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBmaWxlLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuXG4gICAgaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSB7XG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICAgICAgaWYgKCFzcXVhcmUpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gc3F1YXJlLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBNQVJLXG4gICAgICovXG5cbiAgICBfcmVzZXRNYXJrcygpIHtcbiAgICAgICAgdGhpcy5ib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBmaWxlLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5tYXJrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBzcXVhcmUubWFya2VkO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBNQVJLIEZPUiBNT1ZFXG4gICAgICovXG5cbiAgICBfbWFya01vdmVzKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuX3Jlc2V0TWFya3MoKTtcbiAgICAgICAgaWYgKCEhdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGxldCBtb3ZlcyA9IHRoaXMuX2dldE1vdmVzKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgaWYgKCFtb3ZlcykgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBtb3Zlcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaXRlbS5maWxlXVtpdGVtLnJhbmtdLm1hcmtlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldE1vdmVzKGZpbGUsIHJhbmspIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgY2FzZSAncGF3bic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGF3bihmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSAncGF3bicpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgbW92ZURpcmVjdGlvbiA9ICh0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykgPT09ICd3aGl0ZScpID8gMSA6IC0xXG5cbiAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBmaWxlO1xuICAgICAgICBsZXQgdGFyZ2V0UmFuayA9IHJhbmsgKyBtb3ZlRGlyZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZVNxdWFyZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgcHVzaE1vdmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKG1vdmVEaXJlY3Rpb24gKiByYW5rID09IDEpIHx8IChtb3ZlRGlyZWN0aW9uICogcmFuayA9PSAtNikpIHtcblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIDIgKiBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoTW92ZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcbiAgICAgICAgdGFyZ2V0RmlsZSA9IGZpbGUgLSAxO1xuICAgICAgICBjaGVja0NhcHR1cmUodGhpcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaylcbiAgICAgICAgdGFyZ2V0RmlsZSA9IGZpbGUgKyAxO1xuICAgICAgICBjaGVja0NhcHR1cmUodGhpcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaylcblxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tDYXB0dXJlKHNlbGYsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgICAgIGlmIChzZWxmLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0NhcHR1cmUoc2VsZiwgZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaE1vdmUoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNDYXB0dXJlKHNlbGYsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgICAgIHJldHVybiAoc2VsZi5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspID09ICdibGFjaycgJiYgbW92ZURpcmVjdGlvbiA9PSAxKSB8fFxuICAgICAgICAgICAgICAgIChzZWxmLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykgPT0gJ3doaXRlJyAmJiBtb3ZlRGlyZWN0aW9uID09IC0xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1c2hNb3ZlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgICAgIGxldCBtb3ZlID0ge1xuICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG1vdmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIE1PVkVcbiAgICAgKi9cblxuICAgIF9kb01vdmUoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoc3RvcEZpbGUsIHN0b3BSYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoc3RhcnRGaWxlLCBzdGFydFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VDb2xvcihzdGFydEZpbGUsIHN0YXJ0UmFuaykgPT09IHRoaXMuZ2V0UGllY2VDb2xvcihzdG9wRmlsZSwgc3RvcFJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuZ2V0UGllY2VUeXBlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcblxuICAgICAgICB0aGlzLnNldFBpZWNlVHlwZShzdG9wRmlsZSwgc3RvcFJhbmssIHR5cGUpO1xuICAgICAgICB0aGlzLnNldFBpZWNlQ29sb3Ioc3RvcEZpbGUsIHN0b3BSYW5rLCBjb2xvcik7XG4gICAgICAgIHRoaXMuc2V0UGllY2VUeXBlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQaWVjZUNvbG9yKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBudWxsKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgVkFMSURBVE9SU1xuICAgICAqL1xuXG4gICAgX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIChmaWxlID49IDAgJiYgZmlsZSA8PSA3ICYmIHJhbmsgPj0gMCAmJiByYW5rIDw9IDcpO1xuICAgIH1cbn0iLCJcbi8qXG4gKiAgICAgakNoZXNzIH4gamNoZXNzLmpzXG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmltcG9ydCBKQm9hcmQgZnJvbSAnLi9qYm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQ2hlc3Mge1xuXG4gICAgLypcbiAgICAgKiAgIElOSVRJQUxJWkFUSU9OXG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQgPSBuZXcgSkJvYXJkO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVRVUFxuICAgICAqL1xuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5zZXRVcEluaXRpYWwoKTtcbiAgICB9XG5cbiAgICBzZXRVcFBvc2l0aW9uKHBpZWNlU2V0KSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkLnNldFVwUG9zaXRpb24ocGllY2VTZXQpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVRURVJTXG4gICAgICovXG5cbiAgICBnZXRTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIGdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykucGllY2UudHlwZTtcbiAgICB9XG5cbiAgICBnZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykucGllY2UuY29sb3I7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFBJQ0tcbiAgICAgKi9cblxuICAgIHBpY2tTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5waWNrU3F1YXJlKGZpbGUsIHJhbmspXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNFTEVDVFxuICAgICAqL1xuXG4gICAgaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBNQVJLXG4gICAgICovXG5cbiAgICBpc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKTtcbiAgICB9XG59Il19
