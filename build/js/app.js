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
        file: 3,
        rank: 0,
        piece: {
            type: 'knight',
            color: 'black'
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
        file: 4,
        rank: 7,
        piece: {
            type: 'king',
            color: 'black'
        }
    }, {
        file: 3,
        rank: 5,
        piece: {
            type: 'bishop',
            color: 'white'
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

    /*
     *   CONSTANTS
     */

    function JBoard() {
        _classCallCheck(this, JBoard);

        this.board = [];

        this._initBoard();
        this._paintBoard();

        this.selectFile = null;
        this.selectRank = null;

        this.enPassant = null;

        this.castling = {
            white: 3,
            black: 3
        };
    }

    /*
     *   INITIALIZATION
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
         *   SQUARE GETTERS
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
         *   SQUARE SETTERS
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
         *   EN PASSANT
         */

    }, {
        key: '_checkEnPassant',
        value: function _checkEnPassant(file, rank) {

            var piece = this.getPieceType(this.selectFile, this.selectRank);

            if (piece == 'pawn') {

                if (this._isEnPassant(file, rank)) {

                    this.setPieceType(file, this.selectRank, null);
                    this.setPieceColor(file, this.selectRank, null);
                }

                this._setEnPassant(null);

                var color = this.getPieceColor(this.selectFile, this.selectRank);

                if (color === 'white') {

                    rank == 3 && this._setEnPassant(file, 2);
                } else {

                    rank == 4 && this._setEnPassant(file, 5);
                }

                return true;
            }

            this._setEnPassant(null);
            return false;
        }
    }, {
        key: '_getEnPassant',
        value: function _getEnPassant() {
            return this.enPassant;
        }
    }, {
        key: '_setEnPassant',
        value: function _setEnPassant(file, rank) {

            if (!this._validateSquare(file, rank) || rank != 2 && rank != 5) {
                this.enPassant = null;
                return false;
            }

            this.enPassant = {
                file: file,
                rank: rank
            };

            return true;
        }
    }, {
        key: '_isEnPassant',
        value: function _isEnPassant(file, rank) {

            var pass = this._getEnPassant();
            if (!pass) return false;
            return pass.file == file && pass.rank == rank;
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
         *   MARK MOVES
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

            if (!this._validateSquare(file, rank)) return null;

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

            this._checkEnPassant(stopFile, stopRank);

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
                        this.getPieceType(targetFile, targetRank) || this._pushMove(result, targetFile, targetRank);
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
            return this._getMovesPiece(file, rank);
        }

        /*
         *   GET KING MOVES
         */

    }, {
        key: '_getMovesKing',
        value: function _getMovesKing(file, rank) {
            var _this4 = this;

            var moves = this._getMovesPiece(file, rank);
            var color = this.getPieceColor(file, rank);

            return moves.filter(function (item) {
                return !_this4._isSquareAttacked(color, item.file, item.rank);
            });
        }

        /*
         *   GET ROOK MOVES
         */

    }, {
        key: '_getMovesRook',
        value: function _getMovesRook(file, rank) {
            return this._getMovesPiece(file, rank);
        }

        /*
         *   GET BISHOP MOVES
         */

    }, {
        key: '_getMovesBishop',
        value: function _getMovesBishop(file, rank) {
            return this._getMovesPiece(file, rank);
        }

        /*
         *   GET QUEEN MOVES
         */

    }, {
        key: '_getMovesQueen',
        value: function _getMovesQueen(file, rank) {
            return this._getMovesPiece(file, rank);
        }

        /*
         *   GET PIECE MOVES
         */

    }, {
        key: '_getMovesPiece',
        value: function _getMovesPiece(file, rank) {

            var piece = this.getPieceType(file, rank);
            var color = this.getPieceColor(file, rank);

            return this._getAttackedSquares(piece, color, file, rank);
        }
    }, {
        key: '_getAttackedSquares',
        value: function _getAttackedSquares(piece, color, file, rank) {
            var _this5 = this;

            var moves = JBoard.MOVES[piece];
            var count = piece == 'king' || piece == 'knight' ? 1 : 7;
            var result = [];

            moves.forEach(function (item) {
                var i = 0;
                while (i < count) {

                    i++;
                    var targetFile = file + i * item.file;
                    var targetRank = rank + i * item.rank;

                    if (_this5._validateSquare(targetFile, targetRank)) {

                        if (_this5._isFriend(color, targetFile, targetRank)) {

                            break;
                        } else {

                            _this5._pushMove(result, targetFile, targetRank);
                        }
                    } else {

                        break;
                    }

                    if (_this5._isFoe(color, targetFile, targetRank)) break;
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
            return file !== null && rank !== null && file >= 0 && file <= 7 && rank >= 0 && rank <= 7;
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
        key: '_isSquareAttacked',
        value: function _isSquareAttacked(color, file, rank) {
            var _this6 = this;

            if (!this._validateSquare(file, rank)) return null;

            var result = false;

            if (this._isSquareAttackedByPawn(color, file, rank)) {

                result = true;
            } else {

                var pieces = ['rook', 'knight', 'bishop', 'queen', 'king'];

                pieces.forEach(function (type) {

                    var squares = _this6._getAttackedSquares(type, color, file, rank);

                    squares && squares.forEach(function (item) {

                        if (_this6.getPieceType(item.file, item.rank) == type) result = true;
                    });
                });
            }

            return result;
        }
    }, {
        key: '_isSquareAttackedByPawn',
        value: function _isSquareAttackedByPawn(color, file, rank) {
            var _this7 = this;

            if (!this._validateSquare(file, rank)) return null;

            var targetRank = color == 'white' ? rank + 1 : rank - 1;
            var targetFile = [file - 1, file + 1];

            var result = targetFile.filter(function (item) {
                return _this7.getPieceType(item, targetRank) == 'pawn' && _this7._isFoe(color, item, targetRank);
            });

            return result.length > 0;
        }
    }, {
        key: '_isCheck',
        value: function _isCheck(color) {

            switch (color) {

                case 'white':
                    return false;
                    break;

                case 'black':
                    return false;
                    break;

                default:
                    return null;

            }
        }
    }, {
        key: '_getKing',
        value: function _getKing(color) {

            switch (color) {

                case 'white':
                    return false;
                    break;

                case 'black':
                    return false;
                    break;

                default:
                    return null;

            }
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
JBoard.MOVES = {
    rook: [{
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
    }],
    knight: [{
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
    }],
    bishop: [{
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
    }],
    queen: [{
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
    }],
    king: [{
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
    }]
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pib2FyZC5qcyIsImRldi9saWIvamNoZXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDT3dCLFM7O0FBTnhCOzs7Ozs7QUFNZSxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDdEM7O0FBRUEsUUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFYO0FBQUEsUUFDSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQURaO0FBRUEsVUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLE9BQXBCO0FBQ0EsU0FBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxhQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLGdCQUFJLFNBQVMsVUFBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCLElBQXhCLENBQWI7QUFDQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUNJLFVBQUMsQ0FBRCxFQUFPO0FBQ0gsdUJBQU8sVUFBUCxDQUFrQixDQUFDLEVBQUUsTUFBRixDQUFTLE9BQVQsQ0FBaUIsSUFBcEMsRUFBMEMsQ0FBQyxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLElBQTVEO0FBQ0EsMEJBQVUsTUFBVjtBQUNILGFBSkw7QUFNQSxrQkFBTSxXQUFOLENBQWtCLE1BQWxCO0FBQ0g7QUFDSjtBQUNELFNBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUVELFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQjtBQUN2QixRQUFJLFVBQVUsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxDQUFkO0FBQ0EsU0FB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LEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBcUMsS0FBcEY7QUFDSDs7O3FDQUVZLEksRUFBTSxJLEVBQU07QUFDckIsbUJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixLQUF3QyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLEtBQXJDLENBQTJDLElBQTFGO0FBQ0g7OztzQ0FFYSxJLEVBQU0sSSxFQUFNO0FBQ3RCLG1CQUFPLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsS0FBd0MsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQyxLQUFyQyxDQUEyQyxLQUExRjtBQUNIOztBQUVEOzs7Ozs7bUNBSVcsSSxFQUFNLEksRUFBTTtBQUNuQixpQkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixJQUExQixFQUFnQyxJQUFoQztBQUNIOztBQUVEOzs7Ozs7eUNBSWlCLEksRUFBTSxJLEVBQU07QUFDekIsbUJBQU8sS0FBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7dUNBSWUsSSxFQUFNLEksRUFBTTtBQUN2QixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxjQUFmLENBQThCLElBQTlCLEVBQW9DLElBQXBDLENBQVA7QUFDSDs7Ozs7O2tCQWhFZ0IsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8qXG4gKiAgICAgYm9hcmQuanMgZm9yIGpDaGVzcyBwcm9qZWN0XG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pjaGVzcy5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0Qm9hcmQoamNoZXNzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtd3JhcCcpLFxuICAgICAgICBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZCcpO1xuICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gbmV3U3F1YXJlKGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGpjaGVzcy5waWNrU3F1YXJlKCtlLnRhcmdldC5kYXRhc2V0LmZpbGUsICtlLnRhcmdldC5kYXRhc2V0LnJhbmspO1xuICAgICAgICAgICAgICAgICAgICBkcmF3Qm9hcmQoamNoZXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3cmFwLmFwcGVuZENoaWxkKGJvYXJkKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZHJhd0JvYXJkKGpjaGVzcykge1xuICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmRfX3NxdWFyZScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3F1YXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZmlsZSA9IHNxdWFyZXNbaV0uZGF0YXNldC5maWxlLFxuICAgICAgICAgICAgcmFuayA9IHNxdWFyZXNbaV0uZGF0YXNldC5yYW5rO1xuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0LnNlbGVjdGVkICE9IGpjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuaylcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0Lm1hcmtlZCAhPSBqY2hlc3MuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgamNoZXNzLCBmaWxlLCByYW5rKVxuICAgICAgICB9XG4gICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQucGllY2UgIT0gamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBqY2hlc3MsIGZpbGUsIHJhbmspXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG5ld1NxdWFyZShqY2hlc3MsIGZpbGUsIHJhbmspIHtcbiAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3F1YXJlLmRhdGFzZXQuZmlsZSA9IGZpbGU7XG4gICAgc3F1YXJlLmRhdGFzZXQucmFuayA9IHJhbms7XG4gICAgZHJhd1NxdWFyZShzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgcmV0dXJuIHNxdWFyZTtcbn1cblxuZnVuY3Rpb24gZHJhd1NxdWFyZShzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuaykge1xuICAgIHNxdWFyZS5kYXRhc2V0LnNlbGVjdGVkID0gK2pjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspO1xuICAgIHNxdWFyZS5kYXRhc2V0Lm1hcmtlZCA9ICtqY2hlc3MuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuayk7XG4gICAgc3F1YXJlLmRhdGFzZXQucGllY2UgPSArISFqY2hlc3MuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspO1xuICAgIHNldENsYXNzZXMoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKSB7XG4gICAgc3F1YXJlLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZScpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlXycgKyBqY2hlc3MuZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykpO1xuICAgIGlmIChzcXVhcmUuZGF0YXNldC5zZWxlY3RlZCA9PSAxKSB7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlX3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIGlmIChzcXVhcmUuZGF0YXNldC5tYXJrZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9tYXJrZWRfJyArIGpjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuICAgIGlmIChzcXVhcmUuZGF0YXNldC5waWVjZSA9PSAxKSB7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlXycgKyBqY2hlc3MuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspICsgJ18nXG4gICAgICAgICAgICArIGpjaGVzcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59IiwiaW1wb3J0IEpDaGVzcyBmcm9tICcuLi9saWIvamNoZXNzJztcbmltcG9ydCBpbml0Qm9hcmQgZnJvbSAnLi4vY29tcG9uZW50cy9ib2FyZC9ib2FyZCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbGV0IGpjaGVzcyA9IG5ldyBKQ2hlc3M7XG4gICAgamNoZXNzLnNldFVwUG9zaXRpb24oW1xuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiA1LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdKTtcbiAgICBpbml0Qm9hcmQoamNoZXNzKTtcbn0pIiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpib2FyZC5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQm9hcmQge1xuXG4gICAgLypcbiAgICAgKiAgIENPTlNUQU5UU1xuICAgICAqL1xuXG4gICAgc3RhdGljIElOSVRJQUxfUE9TSVRJT04gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVlbicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdO1xuICAgIHN0YXRpYyBNT1ZFUyA9IHtcbiAgICAgICAgcm9vazogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGtuaWdodDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IC0yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgIHJhbms6IC0yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0yLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0yLFxuICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogMlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBiaXNob3A6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHF1ZWVuOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBraW5nOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIENPTlNUUlVDVE9SXG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLmJvYXJkID0gW107XG5cbiAgICAgICAgdGhpcy5faW5pdEJvYXJkKCk7XG4gICAgICAgIHRoaXMuX3BhaW50Qm9hcmQoKTtcblxuICAgICAgICB0aGlzLnNlbGVjdEZpbGUgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdFJhbmsgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZW5QYXNzYW50ID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNhc3RsaW5nID0ge1xuICAgICAgICAgICAgd2hpdGU6IDMsXG4gICAgICAgICAgICBibGFjazogM1xuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIElOSVRJQUxJWkFUSU9OXG4gICAgICovXG5cbiAgICBfaW5pdEJvYXJkKCkge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW2ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWFya2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX3BhaW50Qm9hcmQoKSB7XG5cbiAgICAgICAgbGV0IGNvdW50U3F1YXJlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50U3F1YXJlKytcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXS5jb2xvciA9IChjb3VudFNxdWFyZSsrICUgMikgPyAnYmxhY2snIDogJ3doaXRlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNFVFVQXG4gICAgICovXG5cbiAgICBzZXRVcEluaXRpYWwoKSB7XG4gICAgICAgIHRoaXMuc2V0VXBQb3NpdGlvbihKQm9hcmQuSU5JVElBTF9QT1NJVElPTik7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuXG4gICAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgICAgICBwaWVjZVNldC5mb3JFYWNoKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRVcFBpZWNlKGl0ZW0uZmlsZSwgaXRlbS5yYW5rLCBpdGVtLnBpZWNlLnR5cGUsIGl0ZW0ucGllY2UuY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbiAgICB9XG5cbiAgICByZXNldFBvc2l0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChpdGVtLCBmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlLCByYW5rKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRVcFBpZWNlKGZpbGUsIHJhbmssIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbiAgICB9XG5cbiAgICBfc2V0VXBQaWVjZShmaWxlLCByYW5rLCB0eXBlLCBjb2xvcikge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvclxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNRVUFSRSBHRVRURVJTXG4gICAgICovXG5cbiAgICBnZXRTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmRbZmlsZV1bcmFua107XG4gICAgfVxuXG4gICAgZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS5jb2xvcjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU1FVQVJFIFNFVFRFUlNcbiAgICAgKi9cblxuICAgIHNldFBpZWNlVHlwZShmaWxlLCByYW5rLCB0eXBlKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZSA9IHR5cGU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgc2V0UGllY2VDb2xvcihmaWxlLCByYW5rLCBjb2xvcikge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEVOIFBBU1NBTlRcbiAgICAgKi9cblxuICAgIF9jaGVja0VuUGFzc2FudChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHBpZWNlID0gdGhpcy5nZXRQaWVjZVR5cGUodGhpcy5zZWxlY3RGaWxlLCB0aGlzLnNlbGVjdFJhbmspO1xuXG4gICAgICAgIGlmIChwaWVjZSA9PSAncGF3bicpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRW5QYXNzYW50KGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldFBpZWNlVHlwZShmaWxlLCB0aGlzLnNlbGVjdFJhbmssIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGllY2VDb2xvcihmaWxlLCB0aGlzLnNlbGVjdFJhbmssIG51bGwpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3NldEVuUGFzc2FudChudWxsKTtcblxuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKHRoaXMuc2VsZWN0RmlsZSwgdGhpcy5zZWxlY3RSYW5rKTtcblxuICAgICAgICAgICAgaWYgKGNvbG9yID09PSAnd2hpdGUnKSB7XG5cbiAgICAgICAgICAgICAgICByYW5rID09IDMgJiYgdGhpcy5fc2V0RW5QYXNzYW50KGZpbGUsIDIpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmFuayA9PSA0ICYmIHRoaXMuX3NldEVuUGFzc2FudChmaWxlLCA1KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0RW5QYXNzYW50KG51bGwpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBfZ2V0RW5QYXNzYW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lblBhc3NhbnQ7XG4gICAgfVxuXG4gICAgX3NldEVuUGFzc2FudChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSB8fCAocmFuayAhPSAyICYmIHJhbmsgIT0gNSkpIHtcbiAgICAgICAgICAgIHRoaXMuZW5QYXNzYW50ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5QYXNzYW50ID0ge1xuICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgIHJhbms6IHJhbmtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9pc0VuUGFzc2FudChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHBhc3MgPSB0aGlzLl9nZXRFblBhc3NhbnQoKTtcbiAgICAgICAgaWYgKCFwYXNzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBwYXNzLmZpbGUgPT0gZmlsZSAmJiBwYXNzLnJhbmsgPT0gcmFuaztcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBQSUNLXG4gICAgICovXG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICB0aGlzLl9kb01vdmUodGhpcy5zZWxlY3RGaWxlLCB0aGlzLnNlbGVjdFJhbmssIGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZpbGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RSYW5rID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0TWFya3MoKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5fcmVzZXRTZWxlY3QoKVxuICAgICAgICAgICAgc3F1YXJlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RmlsZSA9IGZpbGU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFJhbmsgPSByYW5rO1xuICAgICAgICAgICAgdGhpcy5fbWFya01vdmVzKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VMRUNUXG4gICAgICovXG5cbiAgICBfcmVzZXRTZWxlY3QoKSB7XG5cbiAgICAgICAgdGhpcy5ib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGZpbGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGZpbGUuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuXG4gICAgfVxuXG4gICAgaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBzcXVhcmUuc2VsZWN0ZWQ7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgTUFSSyBNT1ZFU1xuICAgICAqL1xuXG4gICAgX3Jlc2V0TWFya3MoKSB7XG5cbiAgICAgICAgdGhpcy5ib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGZpbGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGZpbGUuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLm1hcmtlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIClcblxuICAgIH1cblxuICAgIGlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5tYXJrZWQ7XG5cbiAgICB9XG5cbiAgICBfbWFya01vdmVzKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpO1xuICAgICAgICBpZiAoISF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5fZ2V0TW92ZXMoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBpZiAoIW1vdmVzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIG1vdmVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpdGVtLmZpbGVdW2l0ZW0ucmFua10ubWFya2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3ZlcyhmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgY2FzZSAncGF3bic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGF3bihmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2tuaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzS25pZ2h0KGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAna2luZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzS2luZyhmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Jvb2snOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1Jvb2soZmlsZSwgcmFuayk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiaXNob3AnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc0Jpc2hvcChmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3F1ZWVuJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNRdWVlbihmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBETyBNT1ZFXG4gICAgICovXG5cbiAgICBfZG9Nb3ZlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspIHtcblxuICAgICAgICB0aGlzLl9jaGVja0VuUGFzc2FudChzdG9wRmlsZSwgc3RvcFJhbmspO1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoc3RhcnRGaWxlLCBzdGFydFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShzdG9wRmlsZSwgc3RvcFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZShzdGFydEZpbGUsIHN0YXJ0UmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAodGhpcy5nZXRQaWVjZUNvbG9yKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSA9PT0gdGhpcy5nZXRQaWVjZUNvbG9yKHN0b3BGaWxlLCBzdG9wUmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5nZXRQaWVjZVR5cGUoc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuXG4gICAgICAgIHRoaXMuc2V0UGllY2VUeXBlKHN0b3BGaWxlLCBzdG9wUmFuaywgdHlwZSk7XG4gICAgICAgIHRoaXMuc2V0UGllY2VDb2xvcihzdG9wRmlsZSwgc3RvcFJhbmssIGNvbG9yKTtcbiAgICAgICAgdGhpcy5zZXRQaWVjZVR5cGUoc3RhcnRGaWxlLCBzdGFydFJhbmssIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmssIG51bGwpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBQQVdOIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBwYXduQ29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuayk7XG4gICAgICAgIGxldCBtb3ZlRGlyZWN0aW9uID0gKHBhd25Db2xvciA9PSAnd2hpdGUnKSA/IDEgOiAtMVxuXG4gICAgICAgIGxldCB0YXJnZXRGaWxlID0gZmlsZTtcbiAgICAgICAgbGV0IHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVTcXVhcmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKHBhd25Db2xvciA9PSAnd2hpdGUnICYmIHJhbmsgPT0gMSkgfHwgKHBhd25Db2xvciA9PSAnYmxhY2snICYmIHJhbmsgPT0gNikpIHtcblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIDIgKiBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSB8fCB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIG1vdmVEaXJlY3Rpb247XG5cbiAgICAgICAgdGFyZ2V0RmlsZSA9IGZpbGUgLSAxO1xuICAgICAgICBpZiAodGhpcy5faXNGb2UocGF3bkNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSB8fCAodGhpcy5faXNFblBhc3NhbnQodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0RmlsZSA9IGZpbGUgKyAxO1xuICAgICAgICBpZiAodGhpcy5faXNGb2UocGF3bkNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSB8fCAodGhpcy5faXNFblBhc3NhbnQodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGgpIHJldHVybiByZXN1bHQ7XG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBLTklHSFQgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc0tuaWdodChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgS0lORyBNT1ZFU1xuICAgICAqL1xuXG4gICAgX2dldE1vdmVzS2luZyhmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rKTtcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIHJldHVybiBtb3Zlcy5maWx0ZXIoXG5cbiAgICAgICAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEodGhpcy5faXNTcXVhcmVBdHRhY2tlZChjb2xvciwgaXRlbS5maWxlLCBpdGVtLnJhbmspKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICApXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBST09LIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNSb29rKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBCSVNIT1AgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc0Jpc2hvcChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgUVVFRU4gTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc1F1ZWVuKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBQSUVDRSBNT1ZFU1xuICAgICAqL1xuXG4gICAgX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBwaWVjZSA9IHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspO1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEF0dGFja2VkU3F1YXJlcyhwaWVjZSwgY29sb3IsIGZpbGUsIHJhbmspO1xuXG4gICAgfVxuXG4gICAgX2dldEF0dGFja2VkU3F1YXJlcyhwaWVjZSwgY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZXMgPSBKQm9hcmQuTU9WRVNbcGllY2VdO1xuICAgICAgICBsZXQgY291bnQgPSAocGllY2UgPT0gJ2tpbmcnIHx8IHBpZWNlID09ICdrbmlnaHQnKSA/IDEgOiA3O1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG5cbiAgICAgICAgbW92ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCBjb3VudCkge1xuXG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRGaWxlID0gZmlsZSArIGkgKiBpdGVtLmZpbGU7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFJhbmsgPSByYW5rICsgaSAqIGl0ZW0ucmFuaztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZVNxdWFyZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZyaWVuZChjb2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRm9lKGNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgVkFMSURBVE9SU1xuICAgICAqL1xuXG4gICAgX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIChmaWxlICE9PSBudWxsICYmIHJhbmsgIT09IG51bGwpICYmIChmaWxlID49IDAgJiYgZmlsZSA8PSA3ICYmIHJhbmsgPj0gMCAmJiByYW5rIDw9IDcpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVJWSUNFU1xuICAgICAqL1xuXG4gICAgIF9wdXNoTW92ZShyZXN1bHQsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZSA9IHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICByYW5rOiByYW5rXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdC5wdXNoKG1vdmUpO1xuXG4gICAgfVxuXG4gICAgIF9pc0ZyaWVuZChjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgIHJldHVybiAoY29sb3IgPT09IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG5cbiAgICB9XG5cbiAgICAgX2lzRm9lKGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgcmV0dXJuIChjb2xvciAhPSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykpO1xuXG4gICAgfVxuXG4gICAgX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzU3F1YXJlQXR0YWNrZWRCeVBhd24oY29sb3IsIGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHBpZWNlcyA9IFsncm9vaycsICdrbmlnaHQnLCAnYmlzaG9wJywgJ3F1ZWVuJywgJ2tpbmcnXTtcblxuICAgICAgICAgICAgcGllY2VzLmZvckVhY2goKHR5cGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBzcXVhcmVzID0gdGhpcy5fZ2V0QXR0YWNrZWRTcXVhcmVzKHR5cGUsIGNvbG9yLCBmaWxlLCByYW5rKTtcblxuICAgICAgICAgICAgICAgIHNxdWFyZXMgJiYgc3F1YXJlcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoaXRlbSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRQaWVjZVR5cGUoaXRlbS5maWxlLCBpdGVtLnJhbmspID09IHR5cGUpIHJlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIF9pc1NxdWFyZUF0dGFja2VkQnlQYXduKGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IHRhcmdldFJhbmsgPSAoY29sb3IgPT0gJ3doaXRlJykgPyByYW5rICsgMSA6IHJhbmsgLSAxO1xuICAgICAgICBsZXQgdGFyZ2V0RmlsZSA9IFtmaWxlIC0gMSwgZmlsZSArIDFdO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSB0YXJnZXRGaWxlLmZpbHRlcihcbiAgICAgICAgICAgIChpdGVtKSA9PiB0aGlzLmdldFBpZWNlVHlwZShpdGVtLCB0YXJnZXRSYW5rKSA9PSAncGF3bicgJiYgdGhpcy5faXNGb2UoY29sb3IsIGl0ZW0sIHRhcmdldFJhbmspXG5cbiAgICAgICAgKVxuXG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcblxuICAgIH1cblxuICAgIF9pc0NoZWNrKGNvbG9yKSB7XG5cbiAgICAgICAgc3dpdGNoIChjb2xvcikge1xuXG4gICAgICAgICAgICBjYXNlICd3aGl0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdibGFjayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX2dldEtpbmcoY29sb3IpIHtcblxuICAgICAgICBzd2l0Y2ggKGNvbG9yKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3doaXRlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2JsYWNrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJcbi8qXG4gKiAgICAgakNoZXNzIH4gamNoZXNzLmpzXG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmltcG9ydCBKQm9hcmQgZnJvbSAnLi9qYm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQ2hlc3Mge1xuXG4gICAgLypcbiAgICAgKiAgIElOSVRJQUxJWkFUSU9OXG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQgPSBuZXcgSkJvYXJkO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVRVUFxuICAgICAqL1xuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5zZXRVcEluaXRpYWwoKTtcbiAgICB9XG5cbiAgICBzZXRVcFBvc2l0aW9uKHBpZWNlU2V0KSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkLnNldFVwUG9zaXRpb24ocGllY2VTZXQpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVRURVJTXG4gICAgICovXG5cbiAgICBnZXRTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIGdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykucGllY2UudHlwZTtcbiAgICB9XG5cbiAgICBnZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykucGllY2UuY29sb3I7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFBJQ0tcbiAgICAgKi9cblxuICAgIHBpY2tTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5waWNrU3F1YXJlKGZpbGUsIHJhbmspXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNFTEVDVFxuICAgICAqL1xuXG4gICAgaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBNQVJLXG4gICAgICovXG5cbiAgICBpc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKTtcbiAgICB9XG59Il19
