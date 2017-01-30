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
        if (squares[i].dataset.piece != jchess.getPieceType(file, rank)) {
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
        square.classList.add('board__square_marked_' + jchess.getSquareColor(file, rank));
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
        file: 7,
        rank: 4,
        piece: {
            type: 'bishop',
            color: 'white'
        }
    }, {
        file: 5,
        rank: 2,
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
        file: 0,
        rank: 5,
        piece: {
            type: 'bishop',
            color: 'black'
        }
    }, {
        file: 3,
        rank: 3,
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
        file: 0,
        rank: 4,
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
                        enPassant: false,
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
    }, {
        key: '_getEnPassant',
        value: function _getEnPassant(file, rank) {
            return this.getSquare(file, rank) && this.getSquare(file, rank).enPassant;
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
    }, {
        key: '_setEnPassant',
        value: function _setEnPassant(file, rank, value) {
            if (!this._validateSquare(file, rank)) return null;
            this.board[file][rank].enPassant = value;
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

                if (this._getEnPassant(file, rank)) {
                    this.setPieceType(file, this.selectRank, null);
                    this.setPieceColor(file, this.selectRank, null);
                }

                this._resetEnPassant();

                if (this.getPieceType(this.selectFile, this.selectRank) == 'pawn' && Math.abs(rank - this.selectRank) == 2) {
                    var passRank = (rank + this.selectRank) / 2;
                    this._setEnPassant(file, passRank, true);
                }

                this._doMove(this.selectFile, this.selectRank, file, rank);

                this.selectFile = null;
                this.selectRank = null;
                this._resetMarks();
                this._resetSelect();
            } else {

                this._resetSelect();
                square.selected = true;
                this.selectFile = file;
                this.selectRank = rank;
                this._markMoves(file, rank);
            }

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
        key: '_resetEnPassant',
        value: function _resetEnPassant() {
            this.board.forEach(function (file) {
                file.forEach(function (square) {
                    square.enPassant = false;
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
         *   MARK MOVES
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

        /*
         *   GET MOVES
         */

    }, {
        key: '_getMoves',
        value: function _getMoves(file, rank) {
            switch (this.getPieceType(file, rank)) {
                case 'pawn':
                    return this._getMovesPawn(file, rank);
                    break;
                case 'knight':
                    return this._getMovesKnight(file, rank);
                    break;
                case 'king':
                    return this._getMovesKing(file, rank);
                    break;
                case 'rook':
                    return this._getMovesRook(file, rank);
                    break;
                case 'bishop':
                    return this._getMovesBishop(file, rank);
                    break;
                case 'queen':
                    return this._getMovesQueen(file, rank);
                    break;
                default:
                    return null;
            }
        }

        /*
         *   DO MOVE
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
         *   GET PAWN MOVES
         */

    }, {
        key: '_getMovesPawn',
        value: function _getMovesPawn(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'pawn')) return null;

            var result = [];
            var pawnColor = this.getPieceColor(file, rank);
            var moveDirection = pawnColor == 'white' ? 1 : -1;

            var targetFile = file;
            var targetRank = rank + moveDirection;

            if (this._validateSquare(targetFile, targetRank)) {

                if (!this.getPieceType(targetFile, targetRank)) {
                    this._pushMove(result, targetFile, targetRank);

                    if (pawnColor == 'white' && rank == 1 || pawnColor == 'black' && rank == 6) {

                        targetRank = rank + 2 * moveDirection;
                        if (!this.getPieceType(targetFile, targetRank)) {
                            this._pushMove(result, targetFile, targetRank);
                        }
                    }
                }
            }

            targetRank = rank + moveDirection;

            targetFile = file - 1;
            if (this._isFoe(pawnColor, targetFile, targetRank) || this._isEnPassant(targetFile, targetRank)) {
                this._pushMove(result, targetFile, targetRank);
            }

            targetFile = file + 1;
            if (this._isFoe(pawnColor, targetFile, targetRank) || this._isEnPassant(targetFile, targetRank)) {
                this._pushMove(result, targetFile, targetRank);
            }

            if (result.length) return result;
            return null;
        }

        /*
         *   GET KNIGHT MOVES
         */

    }, {
        key: '_getMovesKnight',
        value: function _getMovesKnight(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'knight')) return null;

            return this._getMovesPiece(file, rank, JBoard.KNIGHT_MOVES, 1);
        }

        /*
         *   GET KING MOVES
         */

    }, {
        key: '_getMovesKing',
        value: function _getMovesKing(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'king')) return null;

            return this._getMovesPiece(file, rank, JBoard.KING_MOVES, 1);
        }

        /*
         *   GET ROOK MOVES
         */

    }, {
        key: '_getMovesRook',
        value: function _getMovesRook(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'rook')) return null;

            return this._getMovesPiece(file, rank, JBoard.ROOK_MOVES, 7);
        }

        /*
         *   GET BISHOP MOVES
         */

    }, {
        key: '_getMovesBishop',
        value: function _getMovesBishop(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'bishop')) return null;

            return this._getMovesPiece(file, rank, JBoard.BISHOP_MOVES, 7);
        }

        /*
         *   GET QUEEN MOVES
         */

    }, {
        key: '_getMovesQueen',
        value: function _getMovesQueen(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'queen')) return null;

            return this._getMovesPiece(file, rank, JBoard.KING_MOVES, 7);
        }

        /*
         *   GET PIECE MOVES
         */

    }, {
        key: '_getMovesPiece',
        value: function _getMovesPiece(file, rank, pattern, count) {
            var _this4 = this;

            var result = [];
            var pieceColor = this.getPieceColor(file, rank);

            pattern.forEach(function (item) {
                var i = 0;
                while (i < count) {
                    i++;
                    var targetFile = file + i * item.file;
                    var targetRank = rank + i * item.rank;
                    if (_this4._validateSquare(targetFile, targetRank)) {
                        if (!_this4._isFriend(pieceColor, targetFile, targetRank)) {
                            _this4._pushMove(result, targetFile, targetRank);
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                    if (_this4._isFoe(pieceColor, targetFile, targetRank)) break;
                }
            });

            if (result.length > 0) return result;
            return null;
        }

        /*
         *   VALIDATORS
         */

    }, {
        key: '_validateSquare',
        value: function _validateSquare(file, rank) {
            return file >= 0 && file <= 7 && rank >= 0 && rank <= 7;
        }

        /*
         *   SERVICES
         */

    }, {
        key: '_pushMove',
        value: function _pushMove(result, file, rank) {
            var move = {
                file: file,
                rank: rank
            };
            result.push(move);
        }
    }, {
        key: '_isFriend',
        value: function _isFriend(color, file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!this.getPieceType(file, rank)) return false;
            return color === this.getPieceColor(file, rank);
        }
    }, {
        key: '_isFoe',
        value: function _isFoe(color, file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!this.getPieceType(file, rank)) return false;
            return color != this.getPieceColor(file, rank);
        }
    }, {
        key: '_isEnPassant',
        value: function _isEnPassant(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            return this._getEnPassant(file, rank);
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
JBoard.KNIGHT_MOVES = [{
    file: 1,
    rank: 2
}, {
    file: 2,
    rank: 1
}, {
    file: 2,
    rank: -1
}, {
    file: 1,
    rank: -2
}, {
    file: -1,
    rank: -2
}, {
    file: -2,
    rank: -1
}, {
    file: -2,
    rank: 1
}, {
    file: -1,
    rank: 2
}];
JBoard.KING_MOVES = [{
    file: 0,
    rank: 1
}, {
    file: 1,
    rank: 1
}, {
    file: 1,
    rank: 0
}, {
    file: 1,
    rank: -1
}, {
    file: 0,
    rank: -1
}, {
    file: -1,
    rank: -1
}, {
    file: -1,
    rank: 0
}, {
    file: -1,
    rank: 1
}];
JBoard.ROOK_MOVES = [{
    file: 0,
    rank: 1
}, {
    file: 1,
    rank: 0
}, {
    file: 0,
    rank: -1
}, {
    file: -1,
    rank: 0
}];
JBoard.BISHOP_MOVES = [{
    file: 1,
    rank: 1
}, {
    file: 1,
    rank: -1
}, {
    file: -1,
    rank: -1
}, {
    file: -1,
    rank: 1
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pib2FyZC5qcyIsImRldi9saWIvamNoZXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDT3dCLFM7O0FBTnhCOzs7Ozs7QUFNZSxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDdEM7O0FBRUEsUUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFYO0FBQUEsUUFDSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQURaO0FBRUEsVUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLE9BQXBCO0FBQ0EsU0FBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxhQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLGdCQUFJLFNBQVMsVUFBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCLElBQXhCLENBQWI7QUFDQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUNJLFVBQUMsQ0FBRCxFQUFPO0FBQ0gsdUJBQU8sVUFBUCxDQUFrQixDQUFDLEVBQUUsTUFBRixDQUFTLE9BQVQsQ0FBaUIsSUFBcEMsRUFBMEMsQ0FBQyxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLElBQTVEO0FBQ0EsMEJBQVUsTUFBVjtBQUNILGFBSkw7QUFNQSxrQkFBTSxXQUFOLENBQWtCLE1BQWxCO0FBQ0g7QUFDSjtBQUNELFNBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUVELFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQjtBQUN2QixRQUFJLFVBQVUsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxDQUFkO0FBQ0EsU0FB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QXdDLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBcUMsS0FBckMsQ0FBMkMsS0FBMUY7QUFDSDs7QUFFRDs7Ozs7O21DQUlXLEksRUFBTSxJLEVBQU07QUFDbkIsaUJBQUssU0FBTCxDQUFlLFVBQWYsQ0FBMEIsSUFBMUIsRUFBZ0MsSUFBaEM7QUFDSDs7QUFFRDs7Ozs7O3lDQUlpQixJLEVBQU0sSSxFQUFNO0FBQ3pCLG1CQUFPLEtBQUssU0FBTCxDQUFlLGdCQUFmLENBQWdDLElBQWhDLEVBQXNDLElBQXRDLENBQVA7QUFDSDs7QUFFRDs7Ozs7O3VDQUllLEksRUFBTSxJLEVBQU07QUFDdkIsbUJBQU8sS0FBSyxTQUFMLENBQWUsY0FBZixDQUE4QixJQUE5QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0g7Ozs7OztrQkFoRWdCLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKlxuICogICAgIGJvYXJkLmpzIGZvciBqQ2hlc3MgcHJvamVjdFxuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qY2hlc3MuZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdEJvYXJkKGpjaGVzcykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLXdyYXAnKSxcbiAgICAgICAgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmQnKTtcbiAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICBmb3IgKGxldCByYW5rID0gMDsgcmFuayA8IDg7IHJhbmsrKykge1xuICAgICAgICAgICAgbGV0IHNxdWFyZSA9IG5ld1NxdWFyZShqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBqY2hlc3MucGlja1NxdWFyZSgrZS50YXJnZXQuZGF0YXNldC5maWxlLCArZS50YXJnZXQuZGF0YXNldC5yYW5rKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0JvYXJkKGpjaGVzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd3JhcC5hcHBlbmRDaGlsZChib2FyZCk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGRyYXdCb2FyZChqY2hlc3MpIHtcbiAgICBsZXQgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkX19zcXVhcmUnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGZpbGUgPSBzcXVhcmVzW2ldLmRhdGFzZXQuZmlsZSxcbiAgICAgICAgICAgIHJhbmsgPSBzcXVhcmVzW2ldLmRhdGFzZXQucmFuaztcbiAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5zZWxlY3RlZCAhPSBqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBqY2hlc3MsIGZpbGUsIHJhbmspXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5tYXJrZWQgIT0gamNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuaylcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0LnBpZWNlICE9IGpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgamNoZXNzLCBmaWxlLCByYW5rKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBuZXdTcXVhcmUoamNoZXNzLCBmaWxlLCByYW5rKSB7XG4gICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNxdWFyZS5kYXRhc2V0LmZpbGUgPSBmaWxlO1xuICAgIHNxdWFyZS5kYXRhc2V0LnJhbmsgPSByYW5rO1xuICAgIGRyYXdTcXVhcmUoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgIHJldHVybiBzcXVhcmU7XG59XG5cbmZ1bmN0aW9uIGRyYXdTcXVhcmUoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspIHtcbiAgICBzcXVhcmUuZGF0YXNldC5zZWxlY3RlZCA9ICtqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICBzcXVhcmUuZGF0YXNldC5tYXJrZWQgPSAramNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspO1xuICAgIHNxdWFyZS5kYXRhc2V0LnBpZWNlID0gKyEhamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKTtcbiAgICBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2xhc3NlcyhzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuaykge1xuICAgIHNxdWFyZS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmUnKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV8nICsgamNoZXNzLmdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspKTtcbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9zZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQubWFya2VkID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfbWFya2VkXycgKyBqY2hlc3MuZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykpO1xuICAgIH1cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQucGllY2UgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV8nICsgamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSArICdfJ1xuICAgICAgICAgICAgKyBqY2hlc3MuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufSIsImltcG9ydCBKQ2hlc3MgZnJvbSAnLi4vbGliL2pjaGVzcyc7XG5pbXBvcnQgaW5pdEJvYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvYm9hcmQvYm9hcmQnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGxldCBqY2hlc3MgPSBuZXcgSkNoZXNzO1xuICAgIGpjaGVzcy5zZXRVcFBvc2l0aW9uKFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiAyLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDIsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA1LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAyLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiA1LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF0pO1xuICAgIGluaXRCb2FyZChqY2hlc3MpO1xufSkiLCJcbi8qXG4gKiAgICAgakNoZXNzIH4gamJvYXJkLmpzXG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpCb2FyZCB7XG5cbiAgICAvKlxuICAgICAqICAgQ09OU1RBTlRTXG4gICAgICovXG5cbiAgICBzdGF0aWMgSU5JVElBTF9QT1NJVElPTiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF07XG4gICAgc3RhdGljIEtOSUdIVF9NT1ZFUyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiAtMlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgIHJhbms6IC0yXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IC0yLFxuICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogLTIsXG4gICAgICAgICAgICByYW5rOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgcmFuazogMlxuICAgICAgICB9XG4gICAgXTtcbiAgICBzdGF0aWMgS0lOR19NT1ZFUyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgcmFuazogMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgfVxuICAgIF07XG4gICAgc3RhdGljIFJPT0tfTU9WRVMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgfVxuICAgIF07XG4gICAgc3RhdGljIEJJU0hPUF9NT1ZFUyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICByYW5rOiAxXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgLypcbiAgICAgKiAgIENPTlNUUlVDVE9SXG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgICAgICB0aGlzLl9pbml0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5fcGFpbnRCb2FyZCgpO1xuICAgICAgICB0aGlzLnNlbGVjdEZpbGUgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdFJhbmsgPSBudWxsO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgX2luaXRCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtYXJrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlblBhc3NhbnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3BhaW50Qm9hcmQoKSB7XG4gICAgICAgIGxldCBjb3VudFNxdWFyZSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudFNxdWFyZSsrXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0uY29sb3IgPSAoY291bnRTcXVhcmUrKyAlIDIpID8gJ2JsYWNrJyA6ICd3aGl0ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVVBcbiAgICAgKi9cblxuICAgIHNldFVwSW5pdGlhbCgpIHtcbiAgICAgICAgdGhpcy5zZXRVcFBvc2l0aW9uKEpCb2FyZC5JTklUSUFMX1BPU0lUSU9OKTtcbiAgICB9XG5cbiAgICBzZXRVcFBvc2l0aW9uKHBpZWNlU2V0KSB7XG4gICAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgICAgICBwaWVjZVNldC5mb3JFYWNoKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRVcFBpZWNlKGl0ZW0uZmlsZSwgaXRlbS5yYW5rLCBpdGVtLnBpZWNlLnR5cGUsIGl0ZW0ucGllY2UuY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVzZXRQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5ib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGl0ZW0sIGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUsIHJhbmspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFVwUGllY2UoZmlsZSwgcmFuaywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfc2V0VXBQaWVjZShmaWxlLCByYW5rLCB0eXBlLCBjb2xvcikge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBjb2xvcjogY29sb3JcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdO1xuICAgIH1cblxuICAgIGdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS50eXBlO1xuICAgIH1cblxuICAgIGdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykucGllY2UuY29sb3I7XG4gICAgfVxuXG4gICAgX2dldEVuUGFzc2FudChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5lblBhc3NhbnQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNFVFRFUlNcbiAgICAgKi9cblxuICAgIHNldFBpZWNlVHlwZShmaWxlLCByYW5rLCB0eXBlKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLnR5cGUgPSB0eXBlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmssIGNvbG9yKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9zZXRFblBhc3NhbnQoZmlsZSwgcmFuaywgdmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10uZW5QYXNzYW50ID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBQSUNLXG4gICAgICovXG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2dldEVuUGFzc2FudChmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGllY2VUeXBlKGZpbGUsIHRoaXMuc2VsZWN0UmFuaywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQaWVjZUNvbG9yKGZpbGUsIHRoaXMuc2VsZWN0UmFuaywgbnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0RW5QYXNzYW50KCk7XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5nZXRQaWVjZVR5cGUodGhpcy5zZWxlY3RGaWxlLCB0aGlzLnNlbGVjdFJhbmspID09ICdwYXduJykgJiZcbiAgICAgICAgICAgICAgICAoTWF0aC5hYnMocmFuayAtIHRoaXMuc2VsZWN0UmFuaykgPT0gMikpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFzc1JhbmsgPSAocmFuayArIHRoaXMuc2VsZWN0UmFuaykgLyAyO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldEVuUGFzc2FudChmaWxlLCAgcGFzc1JhbmssICB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZG9Nb3ZlKHRoaXMuc2VsZWN0RmlsZSwgdGhpcy5zZWxlY3RSYW5rLCBmaWxlLCByYW5rKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RGaWxlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UmFuayA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZXNldE1hcmtzKCk7XG4gICAgICAgICAgICB0aGlzLl9yZXNldFNlbGVjdCgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KClcbiAgICAgICAgICAgIHNxdWFyZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZpbGUgPSBmaWxlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RSYW5rID0gcmFuaztcbiAgICAgICAgICAgIHRoaXMuX21hcmtNb3ZlcyhmaWxlLCByYW5rKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNFTEVDVFxuICAgICAqL1xuXG4gICAgX3Jlc2V0U2VsZWN0KCkge1xuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGZpbGUuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBpc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBzcXVhcmUuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIE1BUktcbiAgICAgKi9cblxuICAgIF9yZXNldE1hcmtzKCkge1xuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGZpbGUuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLm1hcmtlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuXG4gICAgX3Jlc2V0RW5QYXNzYW50KCkge1xuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGZpbGUuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLmVuUGFzc2FudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuXG4gICAgaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykge1xuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5tYXJrZWQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIE1BUksgTU9WRVNcbiAgICAgKi9cblxuICAgIF9tYXJrTW92ZXMoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpO1xuICAgICAgICBpZiAoISF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5fZ2V0TW92ZXMoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBpZiAoIW1vdmVzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIG1vdmVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpdGVtLmZpbGVdW2l0ZW0ucmFua10ubWFya2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXMoZmlsZSwgcmFuaykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBjYXNlICdwYXduJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAna25pZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNLbmlnaHQoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdraW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNLaW5nKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncm9vayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUm9vayhmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Jpc2hvcCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzQmlzaG9wKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncXVlZW4nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1F1ZWVuKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBETyBNT1ZFXG4gICAgICovXG5cbiAgICBfZG9Nb3ZlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShzdGFydEZpbGUsIHN0YXJ0UmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKHN0b3BGaWxlLCBzdG9wUmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICh0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspID09PSB0aGlzLmdldFBpZWNlQ29sb3Ioc3RvcEZpbGUsIHN0b3BSYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLmdldFBpZWNlVHlwZShzdGFydEZpbGUsIHN0YXJ0UmFuayk7XG4gICAgICAgIGxldCBjb2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcihzdGFydEZpbGUsIHN0YXJ0UmFuayk7XG5cbiAgICAgICAgdGhpcy5zZXRQaWVjZVR5cGUoc3RvcEZpbGUsIHN0b3BSYW5rLCB0eXBlKTtcbiAgICAgICAgdGhpcy5zZXRQaWVjZUNvbG9yKHN0b3BGaWxlLCBzdG9wUmFuaywgY29sb3IpO1xuICAgICAgICB0aGlzLnNldFBpZWNlVHlwZShzdGFydEZpbGUsIHN0YXJ0UmFuaywgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGllY2VDb2xvcihzdGFydEZpbGUsIHN0YXJ0UmFuaywgbnVsbCk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBQQVdOIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSAncGF3bicpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBwYXduQ29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuayk7XG4gICAgICAgIGxldCBtb3ZlRGlyZWN0aW9uID0gKHBhd25Db2xvciA9PSAnd2hpdGUnKSA/IDEgOiAtMVxuXG4gICAgICAgIGxldCB0YXJnZXRGaWxlID0gZmlsZTtcbiAgICAgICAgbGV0IHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVTcXVhcmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKHBhd25Db2xvciA9PSAnd2hpdGUnICYmIHJhbmsgPT0gMSkgfHwgKHBhd25Db2xvciA9PSAnYmxhY2snICYmIHJhbmsgPT0gNikpIHtcblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIDIgKiBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0UmFuayA9IHJhbmsgKyBtb3ZlRGlyZWN0aW9uO1xuXG4gICAgICAgIHRhcmdldEZpbGUgPSBmaWxlIC0gMTtcbiAgICAgICAgaWYgKHRoaXMuX2lzRm9lKHBhd25Db2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykgfHwgKHRoaXMuX2lzRW5QYXNzYW50KHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldEZpbGUgPSBmaWxlICsgMTtcbiAgICAgICAgaWYgKHRoaXMuX2lzRm9lKHBhd25Db2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykgfHwgKHRoaXMuX2lzRW5QYXNzYW50KHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgS05JR0hUIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNLbmlnaHQoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCEodGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykgPT09ICdrbmlnaHQnKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuaywgSkJvYXJkLktOSUdIVF9NT1ZFUywgMSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBLSU5HIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNLaW5nKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSAna2luZycpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rLCBKQm9hcmQuS0lOR19NT1ZFUywgMSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBST09LIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNSb29rKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSAncm9vaycpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rLCBKQm9hcmQuUk9PS19NT1ZFUywgNyk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBCSVNIT1AgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc0Jpc2hvcChmaWxlLCByYW5rKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoISh0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSA9PT0gJ2Jpc2hvcCcpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rLCBKQm9hcmQuQklTSE9QX01PVkVTLCA3KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIFFVRUVOIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNRdWVlbihmaWxlLCByYW5rKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoISh0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSA9PT0gJ3F1ZWVuJykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmssIEpCb2FyZC5LSU5HX01PVkVTLCA3KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIFBJRUNFIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rLCBwYXR0ZXJuLCBjb3VudCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBwaWVjZUNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIHBhdHRlcm4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCBjb3VudCkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RmlsZSA9IGZpbGUgKyBpICogaXRlbS5maWxlO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRSYW5rID0gcmFuayArIGkgKiBpdGVtLnJhbms7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbGlkYXRlU3F1YXJlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNGcmllbmQocGllY2VDb2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaylcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZvZShwaWVjZUNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgVkFMSURBVE9SU1xuICAgICAqL1xuXG4gICAgX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIChmaWxlID49IDAgJiYgZmlsZSA8PSA3ICYmIHJhbmsgPj0gMCAmJiByYW5rIDw9IDcpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVJWSUNFU1xuICAgICAqL1xuXG4gICAgIF9wdXNoTW92ZShyZXN1bHQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IG1vdmUgPSB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICB9O1xuICAgICAgICByZXN1bHQucHVzaChtb3ZlKTtcbiAgICB9XG5cbiAgICAgX2lzRnJpZW5kKGNvbG9yLCBmaWxlLCByYW5rKSB7XG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgIHJldHVybiAoY29sb3IgPT09IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuXG4gICAgIF9pc0ZvZShjb2xvciwgZmlsZSwgcmFuaykge1xuICAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICByZXR1cm4gKGNvbG9yICE9IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuXG4gICAgIF9pc0VuUGFzc2FudChmaWxlLCByYW5rKSB7XG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIHJldHVybiAodGhpcy5fZ2V0RW5QYXNzYW50KGZpbGUsIHJhbmspKTtcbiAgICB9XG59IiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpjaGVzcy5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5pbXBvcnQgSkJvYXJkIGZyb20gJy4vamJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkNoZXNzIHtcblxuICAgIC8qXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkID0gbmV3IEpCb2FyZDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVVBcbiAgICAgKi9cblxuICAgIHNldFVwSW5pdGlhbCgpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQuc2V0VXBJbml0aWFsKCk7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5zZXRVcFBvc2l0aW9uKHBpZWNlU2V0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBnZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmNvbG9yO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBQSUNLXG4gICAgICovXG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQucGlja1NxdWFyZShmaWxlLCByYW5rKVxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRUxFQ1RcbiAgICAgKi9cblxuICAgIGlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgTUFSS1xuICAgICAqL1xuXG4gICAgaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuayk7XG4gICAgfVxufSJdfQ==
