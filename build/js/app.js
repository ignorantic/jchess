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

                this._isEnPassant(file, rank) && this._removePiece(file, this.selectRank);
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
            var _this4 = this;

            if (!this._validateSquare(file, rank)) return null;

            var result = void 0;

            switch (this.getPieceType(file, rank)) {

                case 'pawn':
                    result = this._getMovesPawn(file, rank);
                    break;

                case 'knight':
                    result = this._getMovesKnight(file, rank);
                    break;

                case 'king':
                    result = this._getMovesKing(file, rank);
                    break;

                case 'rook':
                    result = this._getMovesRook(file, rank);
                    break;

                case 'bishop':
                    result = this._getMovesBishop(file, rank);
                    break;

                case 'queen':
                    result = this._getMovesQueen(file, rank);
                    break;

            }

            if (!result) return null;

            return result.filter(function (item) {
                return _this4._checkMove(file, rank, item.file, item.rank);
            });
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
            this._removePiece(startFile, startRank);

            return true;
        }

        /*
         *   CHECK MOVE
         */

    }, {
        key: '_checkMove',
        value: function _checkMove(startFile, startRank, stopFile, stopRank) {

            var checkBoard = this._cloneBoard(this);

            if (checkBoard._doMove(startFile, startRank, stopFile, stopRank)) {

                return !checkBoard._isCheck(this.getPieceColor(startFile, startRank));
            } else {

                return null;
            }
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
            return this._getMovesPiece(file, rank);
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

            var king = this._getKing(color);

            if (king) {
                return this._isSquareAttacked(color, king.file, king.rank);
            }

            return null;
        }
    }, {
        key: '_getKing',
        value: function _getKing(color) {

            if (color != 'white' && color != 'black') return null;

            for (var file = 0; file < 8; file++) {
                for (var rank = 0; rank < 8; rank++) {
                    if (this.getPieceType(file, rank) == 'king' && this.getPieceColor(file, rank) == color) {
                        return {
                            file: file,
                            rank: rank
                        };
                    }
                }
            }
        }
    }, {
        key: '_removePiece',
        value: function _removePiece(file, rank) {

            this.setPieceType(file, rank, null);
            this.setPieceColor(file, rank, null);
        }
    }, {
        key: '_cloneBoard',
        value: function _cloneBoard(src) {

            var newBoard = new JBoard();

            if (src.enPassant) {

                newBoard.enPassant.file = src.enPassant.file;
                newBoard.enPassant.rank = src.enPassant.rank;
            } else {

                newBoard.enPassant = null;
            }

            newBoard.castling = {
                white: src.castling.white,
                black: src.castling.black
            };

            for (var file = 0; file < 8; file++) {
                for (var rank = 0; rank < 8; rank++) {

                    newBoard.board[file][rank].piece.type = src.board[file][rank].piece.type;
                    newBoard.board[file][rank].piece.color = src.board[file][rank].piece.color;
                }
            }

            return newBoard;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pib2FyZC5qcyIsImRldi9saWIvamNoZXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDT3dCLFM7O0FBTnhCOzs7Ozs7QUFNZSxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDdEM7O0FBRUEsUUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFYO0FBQUEsUUFDSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQURaOztBQUdBLFVBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixPQUFwQjtBQUNBLFNBQUssSUFBSSxPQUFPLENBQWhCLEVBQW1CLE9BQU8sQ0FBMUIsRUFBNkIsTUFBN0IsRUFBcUM7QUFDakMsYUFBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQzs7QUFFakMsZ0JBQUksU0FBUyxVQUFVLE1BQVYsRUFBa0IsSUFBbEIsRUFBd0IsSUFBeEIsQ0FBYjtBQUNBLG1CQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQ0ksVUFBQyxDQUFELEVBQU87QUFDSCx1QkFBTyxVQUFQLENBQWtCLENBQUMsRUFBRSxNQUFGLENBQVMsT0FBVCxDQUFpQixJQUFwQyxFQUEwQyxDQUFDLEVBQUUsTUFBRixDQUFTLE9BQVQsQ0FBaUIsSUFBNUQ7QUFDQSwwQkFBVSxNQUFWO0FBQ0gsYUFKTDtBQU1BLGtCQUFNLFdBQU4sQ0FBa0IsTUFBbEI7QUFFSDtBQUNKO0FBQ0QsU0FBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0EsV0FBTyxJQUFQO0FBQ0g7O0FBRUQsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCOztBQUV2QixRQUFJLFVBQVUsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxDQUFkOztBQUVB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QU07QUFDbkIsaUJBQUssU0FBTCxDQUFlLFVBQWYsQ0FBMEIsSUFBMUIsRUFBZ0MsSUFBaEM7QUFDSDs7QUFFRDs7Ozs7O3lDQUlpQixJLEVBQU0sSSxFQUFNO0FBQ3pCLG1CQUFPLEtBQUssU0FBTCxDQUFlLGdCQUFmLENBQWdDLElBQWhDLEVBQXNDLElBQXRDLENBQVA7QUFDSDs7QUFFRDs7Ozs7O3VDQUllLEksRUFBTSxJLEVBQU07QUFDdkIsbUJBQU8sS0FBSyxTQUFMLENBQWUsY0FBZixDQUE4QixJQUE5QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0g7Ozs7OztrQkFoRWdCLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKlxuICogICAgIGJvYXJkLmpzIGZvciBqQ2hlc3MgcHJvamVjdFxuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qY2hlc3MuZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdEJvYXJkKGpjaGVzcykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLXdyYXAnKSxcbiAgICAgICAgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG5cbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZCcpO1xuICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG5cbiAgICAgICAgICAgIGxldCBzcXVhcmUgPSBuZXdTcXVhcmUoamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgamNoZXNzLnBpY2tTcXVhcmUoK2UudGFyZ2V0LmRhdGFzZXQuZmlsZSwgK2UudGFyZ2V0LmRhdGFzZXQucmFuayk7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdCb2FyZChqY2hlc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgd3JhcC5hcHBlbmRDaGlsZChib2FyZCk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGRyYXdCb2FyZChqY2hlc3MpIHtcblxuICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmRfX3NxdWFyZScpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgbGV0IGZpbGUgPSBzcXVhcmVzW2ldLmRhdGFzZXQuZmlsZSxcbiAgICAgICAgICAgIHJhbmsgPSBzcXVhcmVzW2ldLmRhdGFzZXQucmFuaztcblxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0LnNlbGVjdGVkICE9IGpjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuaylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQubWFya2VkICE9IGpjaGVzcy5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBqY2hlc3MsIGZpbGUsIHJhbmspXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0LnBpZWNlICE9IGpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgamNoZXNzLCBmaWxlLCByYW5rKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxufVxuXG5mdW5jdGlvbiBuZXdTcXVhcmUoamNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3F1YXJlLmRhdGFzZXQuZmlsZSA9IGZpbGU7XG4gICAgc3F1YXJlLmRhdGFzZXQucmFuayA9IHJhbms7XG4gICAgZHJhd1NxdWFyZShzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgcmV0dXJuIHNxdWFyZTtcblxufVxuXG5mdW5jdGlvbiBkcmF3U3F1YXJlKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICBzcXVhcmUuZGF0YXNldC5zZWxlY3RlZCA9ICtqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICBzcXVhcmUuZGF0YXNldC5tYXJrZWQgPSAramNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspO1xuICAgIHNxdWFyZS5kYXRhc2V0LnBpZWNlID0gKyEhamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKTtcbiAgICBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICByZXR1cm4gdHJ1ZTtcblxufVxuXG5mdW5jdGlvbiBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICBzcXVhcmUucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlJyk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGpjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG5cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIGlmIChzcXVhcmUuZGF0YXNldC5tYXJrZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9tYXJrZWRfJyArIGpjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuXG4gICAgaWYgKHNxdWFyZS5kYXRhc2V0LnBpZWNlID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykgKyAnXydcbiAgICAgICAgICAgICsgamNoZXNzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufSIsImltcG9ydCBKQ2hlc3MgZnJvbSAnLi4vbGliL2pjaGVzcyc7XG5pbXBvcnQgaW5pdEJvYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvYm9hcmQvYm9hcmQnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGxldCBqY2hlc3MgPSBuZXcgSkNoZXNzO1xuICAgIGpjaGVzcy5zZXRVcFBvc2l0aW9uKFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiAyLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDIsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA1LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAyLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiA1LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF0pO1xuICAgIGluaXRCb2FyZChqY2hlc3MpO1xufSkiLCJcbi8qXG4gKiAgICAgakNoZXNzIH4gamJvYXJkLmpzXG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpCb2FyZCB7XG5cbiAgICAvKlxuICAgICAqICAgQ09OU1RBTlRTXG4gICAgICovXG5cbiAgICBzdGF0aWMgSU5JVElBTF9QT1NJVElPTiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF07XG4gICAgc3RhdGljIE1PVkVTID0ge1xuICAgICAgICByb29rOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAga25pZ2h0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogLTJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogLTJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTIsXG4gICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTIsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGJpc2hvcDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgcXVlZW46IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGtpbmc6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgQ09OU1RSVUNUT1JcbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMuYm9hcmQgPSBbXTtcblxuICAgICAgICB0aGlzLl9pbml0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5fcGFpbnRCb2FyZCgpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0RmlsZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0UmFuayA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5lblBhc3NhbnQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY2FzdGxpbmcgPSB7XG4gICAgICAgICAgICB3aGl0ZTogMyxcbiAgICAgICAgICAgIGJsYWNrOiAzXG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgSU5JVElBTElaQVRJT05cbiAgICAgKi9cblxuICAgIF9pbml0Qm9hcmQoKSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtYXJrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9wYWludEJvYXJkKCkge1xuXG4gICAgICAgIGxldCBjb3VudFNxdWFyZSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudFNxdWFyZSsrXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0uY29sb3IgPSAoY291bnRTcXVhcmUrKyAlIDIpID8gJ2JsYWNrJyA6ICd3aGl0ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVRVUFxuICAgICAqL1xuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLnNldFVwUG9zaXRpb24oSkJvYXJkLklOSVRJQUxfUE9TSVRJT04pO1xuICAgIH1cblxuICAgIHNldFVwUG9zaXRpb24ocGllY2VTZXQpIHtcblxuICAgICAgICB0aGlzLnJlc2V0UG9zaXRpb24oKTtcbiAgICAgICAgcGllY2VTZXQuZm9yRWFjaChcbiAgICAgICAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0VXBQaWVjZShpdGVtLmZpbGUsIGl0ZW0ucmFuaywgaXRlbS5waWVjZS50eXBlLCBpdGVtLnBpZWNlLmNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuXG4gICAgfVxuXG4gICAgcmVzZXRQb3NpdGlvbigpIHtcblxuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoaXRlbSwgZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSwgcmFuaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0VXBQaWVjZShmaWxlLCByYW5rLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuXG4gICAgfVxuXG4gICAgX3NldFVwUGllY2UoZmlsZSwgcmFuaywgdHlwZSwgY29sb3IpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBjb2xvcjogY29sb3JcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTUVVBUkUgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdO1xuICAgIH1cblxuICAgIGdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS50eXBlO1xuICAgIH1cblxuICAgIGdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykucGllY2UuY29sb3I7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNRVUFSRSBTRVRURVJTXG4gICAgICovXG5cbiAgICBzZXRQaWVjZVR5cGUoZmlsZSwgcmFuaywgdHlwZSkge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLnR5cGUgPSB0eXBlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIHNldFBpZWNlQ29sb3IoZmlsZSwgcmFuaywgY29sb3IpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBFTiBQQVNTQU5UXG4gICAgICovXG5cbiAgICBfY2hlY2tFblBhc3NhbnQoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBwaWVjZSA9IHRoaXMuZ2V0UGllY2VUeXBlKHRoaXMuc2VsZWN0RmlsZSwgdGhpcy5zZWxlY3RSYW5rKTtcblxuICAgICAgICBpZiAocGllY2UgPT0gJ3Bhd24nKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2lzRW5QYXNzYW50KGZpbGUsIHJhbmspICYmIHRoaXMuX3JlbW92ZVBpZWNlKGZpbGUsIHRoaXMuc2VsZWN0UmFuayk7XG4gICAgICAgICAgICB0aGlzLl9zZXRFblBhc3NhbnQobnVsbCk7XG5cbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcih0aGlzLnNlbGVjdEZpbGUsIHRoaXMuc2VsZWN0UmFuayk7XG5cbiAgICAgICAgICAgIGlmIChjb2xvciA9PT0gJ3doaXRlJykge1xuXG4gICAgICAgICAgICAgICAgcmFuayA9PSAzICYmIHRoaXMuX3NldEVuUGFzc2FudChmaWxlLCAyKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJhbmsgPT0gNCAmJiB0aGlzLl9zZXRFblBhc3NhbnQoZmlsZSwgNSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldEVuUGFzc2FudChudWxsKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgX2dldEVuUGFzc2FudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5QYXNzYW50O1xuICAgIH1cblxuICAgIF9zZXRFblBhc3NhbnQoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykgfHwgKHJhbmsgIT0gMiAmJiByYW5rICE9IDUpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW5QYXNzYW50ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lblBhc3NhbnQgPSB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgX2lzRW5QYXNzYW50KGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgcGFzcyA9IHRoaXMuX2dldEVuUGFzc2FudCgpO1xuICAgICAgICBpZiAoIXBhc3MpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBhc3MuZmlsZSA9PSBmaWxlICYmIHBhc3MucmFuayA9PSByYW5rO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFBJQ0tcbiAgICAgKi9cblxuICAgIHBpY2tTcXVhcmUoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICAgICAgaWYgKCFzcXVhcmUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2RvTW92ZSh0aGlzLnNlbGVjdEZpbGUsIHRoaXMuc2VsZWN0UmFuaywgZmlsZSwgcmFuayk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RmlsZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFJhbmsgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRTZWxlY3QoKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLl9yZXNldFNlbGVjdCgpXG4gICAgICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RGaWxlID0gZmlsZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UmFuayA9IHJhbms7XG4gICAgICAgICAgICB0aGlzLl9tYXJrTW92ZXMoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRUxFQ1RcbiAgICAgKi9cblxuICAgIF9yZXNldFNlbGVjdCgpIHtcblxuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoZmlsZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbiAgICB9XG5cbiAgICBpc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5zZWxlY3RlZDtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBNQVJLIE1PVkVTXG4gICAgICovXG5cbiAgICBfcmVzZXRNYXJrcygpIHtcblxuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoZmlsZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUubWFya2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuXG4gICAgfVxuXG4gICAgaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICAgICAgaWYgKCFzcXVhcmUpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gc3F1YXJlLm1hcmtlZDtcblxuICAgIH1cblxuICAgIF9tYXJrTW92ZXMoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLl9yZXNldE1hcmtzKCk7XG5cbiAgICAgICAgaWYgKCEhdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5fZ2V0TW92ZXMoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBpZiAoIW1vdmVzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIG1vdmVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpdGVtLmZpbGVdW2l0ZW0ucmFua10ubWFya2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBNT1ZFU1xuICAgICAqL1xuXG4gICAgX2dldE1vdmVzKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgY2FzZSAncGF3bic6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdrbmlnaHQnOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2dldE1vdmVzS25pZ2h0KGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdraW5nJzpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9nZXRNb3Zlc0tpbmcoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Jvb2snOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2dldE1vdmVzUm9vayhmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnYmlzaG9wJzpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9nZXRNb3Zlc0Jpc2hvcChmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAncXVlZW4nOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2dldE1vdmVzUXVlZW4oZmlsZSwgcmFuayk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzdWx0KSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gcmVzdWx0LmZpbHRlcihcbiAgICAgICAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrTW92ZShmaWxlLCByYW5rLCBpdGVtLmZpbGUsIGl0ZW0ucmFuayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBETyBNT1ZFXG4gICAgICovXG5cbiAgICBfZG9Nb3ZlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspIHtcblxuICAgICAgICB0aGlzLl9jaGVja0VuUGFzc2FudChzdG9wRmlsZSwgc3RvcFJhbmspO1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoc3RhcnRGaWxlLCBzdGFydFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShzdG9wRmlsZSwgc3RvcFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZShzdGFydEZpbGUsIHN0YXJ0UmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAodGhpcy5nZXRQaWVjZUNvbG9yKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSA9PT0gdGhpcy5nZXRQaWVjZUNvbG9yKHN0b3BGaWxlLCBzdG9wUmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5nZXRQaWVjZVR5cGUoc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuXG4gICAgICAgIHRoaXMuc2V0UGllY2VUeXBlKHN0b3BGaWxlLCBzdG9wUmFuaywgdHlwZSk7XG4gICAgICAgIHRoaXMuc2V0UGllY2VDb2xvcihzdG9wRmlsZSwgc3RvcFJhbmssIGNvbG9yKTtcbiAgICAgICAgdGhpcy5fcmVtb3ZlUGllY2Uoc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIENIRUNLIE1PVkVcbiAgICAgKi9cblxuICAgIF9jaGVja01vdmUoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuaykge1xuXG4gICAgICAgIGxldCBjaGVja0JvYXJkID0gdGhpcy5fY2xvbmVCb2FyZCh0aGlzKTtcblxuICAgICAgICBpZiAoY2hlY2tCb2FyZC5fZG9Nb3ZlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAhY2hlY2tCb2FyZC5faXNDaGVjayh0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIFBBV04gTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc1Bhd24oZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHBhd25Db2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKTtcbiAgICAgICAgbGV0IG1vdmVEaXJlY3Rpb24gPSAocGF3bkNvbG9yID09ICd3aGl0ZScpID8gMSA6IC0xXG5cbiAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBmaWxlO1xuICAgICAgICBsZXQgdGFyZ2V0UmFuayA9IHJhbmsgKyBtb3ZlRGlyZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZVNxdWFyZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcblxuICAgICAgICAgICAgICAgIGlmICgocGF3bkNvbG9yID09ICd3aGl0ZScgJiYgcmFuayA9PSAxKSB8fCAocGF3bkNvbG9yID09ICdibGFjaycgJiYgcmFuayA9PSA2KSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFJhbmsgPSByYW5rICsgMiAqIG1vdmVEaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8IHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcblxuICAgICAgICB0YXJnZXRGaWxlID0gZmlsZSAtIDE7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZvZShwYXduQ29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8ICh0aGlzLl9pc0VuUGFzc2FudCh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRGaWxlID0gZmlsZSArIDE7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZvZShwYXduQ29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8ICh0aGlzLl9pc0VuUGFzc2FudCh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIEtOSUdIVCBNT1ZFU1xuICAgICAqL1xuXG4gICAgX2dldE1vdmVzS25pZ2h0KGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBLSU5HIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNLaW5nKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBST09LIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNSb29rKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBCSVNIT1AgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc0Jpc2hvcChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgUVVFRU4gTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc1F1ZWVuKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBQSUVDRSBNT1ZFU1xuICAgICAqL1xuXG4gICAgX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBwaWVjZSA9IHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspO1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEF0dGFja2VkU3F1YXJlcyhwaWVjZSwgY29sb3IsIGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIF9nZXRBdHRhY2tlZFNxdWFyZXMocGllY2UsIGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IG1vdmVzID0gSkJvYXJkLk1PVkVTW3BpZWNlXTtcbiAgICAgICAgbGV0IGNvdW50ID0gKHBpZWNlID09ICdraW5nJyB8fCBwaWVjZSA9PSAna25pZ2h0JykgPyAxIDogNztcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIG1vdmVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgY291bnQpIHtcblxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RmlsZSA9IGZpbGUgKyBpICogaXRlbS5maWxlO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRSYW5rID0gcmFuayArIGkgKiBpdGVtLnJhbms7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVTcXVhcmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNGcmllbmQoY29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaylcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZvZShjb2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFZBTElEQVRPUlNcbiAgICAgKi9cblxuICAgIF92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiAoZmlsZSAhPT0gbnVsbCAmJiByYW5rICE9PSBudWxsKSAmJiAoZmlsZSA+PSAwICYmIGZpbGUgPD0gNyAmJiByYW5rID49IDAgJiYgcmFuayA8PSA3KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VSVklDRVNcbiAgICAgKi9cblxuICAgICBfcHVzaE1vdmUocmVzdWx0LCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IG1vdmUgPSB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICB9O1xuICAgICAgICByZXN1bHQucHVzaChtb3ZlKTtcblxuICAgIH1cblxuICAgICBfaXNGcmllbmQoY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICByZXR1cm4gKGNvbG9yID09PSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykpO1xuXG4gICAgfVxuXG4gICAgIF9pc0ZvZShjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgIHJldHVybiAoY29sb3IgIT0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspKTtcblxuICAgIH1cblxuICAgIF9pc1NxdWFyZUF0dGFja2VkKGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1NxdWFyZUF0dGFja2VkQnlQYXduKGNvbG9yLCBmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGxldCBwaWVjZXMgPSBbJ3Jvb2snLCAna25pZ2h0JywgJ2Jpc2hvcCcsICdxdWVlbicsICdraW5nJ107XG5cbiAgICAgICAgICAgIHBpZWNlcy5mb3JFYWNoKCh0eXBlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3F1YXJlcyA9IHRoaXMuX2dldEF0dGFja2VkU3F1YXJlcyh0eXBlLCBjb2xvciwgZmlsZSwgcmFuayk7XG5cbiAgICAgICAgICAgICAgICBzcXVhcmVzICYmIHNxdWFyZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VUeXBlKGl0ZW0uZmlsZSwgaXRlbS5yYW5rKSA9PSB0eXBlKSByZXN1bHQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBfaXNTcXVhcmVBdHRhY2tlZEJ5UGF3bihjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCB0YXJnZXRSYW5rID0gKGNvbG9yID09ICd3aGl0ZScpID8gcmFuayArIDEgOiByYW5rIC0gMTtcbiAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBbZmlsZSAtIDEsIGZpbGUgKyAxXTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gdGFyZ2V0RmlsZS5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbSkgPT4gdGhpcy5nZXRQaWVjZVR5cGUoaXRlbSwgdGFyZ2V0UmFuaykgPT0gJ3Bhd24nICYmIHRoaXMuX2lzRm9lKGNvbG9yLCBpdGVtLCB0YXJnZXRSYW5rKVxuXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDA7XG5cbiAgICB9XG5cbiAgICBfaXNDaGVjayhjb2xvcikge1xuXG4gICAgICAgIGxldCBraW5nID0gdGhpcy5fZ2V0S2luZyhjb2xvcik7XG5cbiAgICAgICAgaWYgKGtpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1NxdWFyZUF0dGFja2VkKGNvbG9yLCBraW5nLmZpbGUsIGtpbmcucmFuaylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIF9nZXRLaW5nKGNvbG9yKSB7XG5cbiAgICAgICAgaWYgKGNvbG9yICE9ICd3aGl0ZScgJiYgY29sb3IgIT0gJ2JsYWNrJykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09ICdraW5nJyAmJiB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykgPT0gY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rOiByYW5rXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9yZW1vdmVQaWVjZShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgdGhpcy5zZXRQaWVjZVR5cGUoZmlsZSwgcmFuaywgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGllY2VDb2xvcihmaWxlLCByYW5rLCBudWxsKTtcblxuICAgIH1cblxuICAgIF9jbG9uZUJvYXJkKHNyYykge1xuXG4gICAgICAgIGxldCBuZXdCb2FyZCA9IG5ldyBKQm9hcmQ7XG5cbiAgICAgICAgaWYgKHNyYy5lblBhc3NhbnQpIHtcblxuICAgICAgICAgICAgbmV3Qm9hcmQuZW5QYXNzYW50LmZpbGUgPSBzcmMuZW5QYXNzYW50LmZpbGU7XG4gICAgICAgICAgICBuZXdCb2FyZC5lblBhc3NhbnQucmFuayA9IHNyYy5lblBhc3NhbnQucmFuaztcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBuZXdCb2FyZC5lblBhc3NhbnQgPSBudWxsO1xuXG4gICAgICAgIH1cblxuICAgICAgICBuZXdCb2FyZC5jYXN0bGluZyA9IHtcbiAgICAgICAgICAgIHdoaXRlOiBzcmMuY2FzdGxpbmcud2hpdGUsXG4gICAgICAgICAgICBibGFjazogc3JjLmNhc3RsaW5nLmJsYWNrXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgcmFuayA9IDA7IHJhbmsgPCA4OyByYW5rKyspIHtcblxuICAgICAgICAgICAgICAgIG5ld0JvYXJkLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLnR5cGUgPSBzcmMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZTtcbiAgICAgICAgICAgICAgICBuZXdCb2FyZC5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IHNyYy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvcjtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkO1xuXG4gICAgfVxuXG59IiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpjaGVzcy5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5pbXBvcnQgSkJvYXJkIGZyb20gJy4vamJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkNoZXNzIHtcblxuICAgIC8qXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkID0gbmV3IEpCb2FyZDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVVBcbiAgICAgKi9cblxuICAgIHNldFVwSW5pdGlhbCgpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQuc2V0VXBJbml0aWFsKCk7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5zZXRVcFBvc2l0aW9uKHBpZWNlU2V0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBnZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmNvbG9yO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBQSUNLXG4gICAgICovXG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQucGlja1NxdWFyZShmaWxlLCByYW5rKVxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRUxFQ1RcbiAgICAgKi9cblxuICAgIGlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgTUFSS1xuICAgICAqL1xuXG4gICAgaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuayk7XG4gICAgfVxufSJdfQ==
