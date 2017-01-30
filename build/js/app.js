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
            return this.getSquare(file, rank) && this.getSquare(file, rank).piece.enPassant;
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
            this.board[file][rank].piece.enPassant = value;
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
                    square.piece.enPassant == true && delete square.piece.enPassant;
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

            return this._getMovesPiece(file, rank, JBoard.MOVES.knight, 1);
        }

        /*
         *   GET KING MOVES
         */

    }, {
        key: '_getMovesKing',
        value: function _getMovesKing(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'king')) return null;

            return this._getMovesPiece(file, rank, JBoard.MOVES.king, 1);
        }

        /*
         *   GET ROOK MOVES
         */

    }, {
        key: '_getMovesRook',
        value: function _getMovesRook(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'rook')) return null;

            return this._getMovesPiece(file, rank, JBoard.MOVES.rook, 7);
        }

        /*
         *   GET BISHOP MOVES
         */

    }, {
        key: '_getMovesBishop',
        value: function _getMovesBishop(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'bishop')) return null;

            return this._getMovesPiece(file, rank, JBoard.MOVES.bishop, 7);
        }

        /*
         *   GET QUEEN MOVES
         */

    }, {
        key: '_getMovesQueen',
        value: function _getMovesQueen(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            if (!(this.getPieceType(file, rank) === 'queen')) return null;

            return this._getMovesPiece(file, rank, JBoard.MOVES.king, 7);
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
JBoard.MOVES = {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pib2FyZC5qcyIsImRldi9saWIvamNoZXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDT3dCLFM7O0FBTnhCOzs7Ozs7QUFNZSxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDdEM7O0FBRUEsUUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFYO0FBQUEsUUFDSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQURaO0FBRUEsVUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLE9BQXBCO0FBQ0EsU0FBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxhQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLGdCQUFJLFNBQVMsVUFBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCLElBQXhCLENBQWI7QUFDQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUNJLFVBQUMsQ0FBRCxFQUFPO0FBQ0gsdUJBQU8sVUFBUCxDQUFrQixDQUFDLEVBQUUsTUFBRixDQUFTLE9BQVQsQ0FBaUIsSUFBcEMsRUFBMEMsQ0FBQyxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLElBQTVEO0FBQ0EsMEJBQVUsTUFBVjtBQUNILGFBSkw7QUFNQSxrQkFBTSxXQUFOLENBQWtCLE1BQWxCO0FBQ0g7QUFDSjtBQUNELFNBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUVELFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQjtBQUN2QixRQUFJLFVBQVUsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxDQUFkO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFFBQVEsTUFBNUIsRUFBb0MsR0FBcEMsRUFBeUM7QUFDckMsWUFBSSxPQUFPLFFBQVEsQ0FBUixFQUFXLE9BQVgsQ0FBbUIsSUFBOUI7QUFBQSxZQUNJLE9BQU8sUUFBUSxDQUFSLEVBQVcsT0FBWCxDQUFtQixJQUQ5QjtBQUVBLFlBQUksUUFBUSxDQUFSLEVBQVcsT0FBWCxDQUFtQixRQUFuQixJQUErQixPQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBQThCLElBQTlCLENBQW5DLEVBQXdFO0FBQ3BFLHVCQUFXLFFBQVEsQ0FBUixDQUFYLEVBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDO0FBQ0g7QUFDRCxZQUFJLFFBQVEsQ0FBUixFQUFXLE9BQVgsQ0FBbUIsTUFBbkIsSUFBNkIsT0FBTyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLElBQTVCLENBQWpDLEVBQW9FO0FBQ2hFLHVCQUFXLFFBQVEsQ0FBUixDQUFYLEVBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDO0FBQ0g7QUFDRCxZQUFJLFFBQVEsQ0FBUixFQUFXLE9BQVgsQ0FBbUIsS0FBbkIsSUFBNEIsT0FBTyxZQUFQLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBQWhDLEVBQWlFO0FBQzdELHVCQUFXLFFBQVEsQ0FBUixDQUFYLEVBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDO0FBQ0g7QUFDSjtBQUNELFdBQU8sSUFBUDtBQUNIOztBQUVELFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixJQUEzQixFQUFpQyxJQUFqQyxFQUF1QztBQUNuQyxRQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQSxXQUFPLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLElBQXRCO0FBQ0EsV0FBTyxPQUFQLENBQWUsSUFBZixHQUFzQixJQUF0QjtBQUNBLGVBQVcsTUFBWCxFQUFtQixNQUFuQixFQUEyQixJQUEzQixFQUFpQyxJQUFqQztBQUNBLFdBQU8sTUFBUDtBQUNIOztBQUVELFNBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QixNQUE1QixFQUFvQyxJQUFwQyxFQUEwQyxJQUExQyxFQUFnRDtBQUM1QyxXQUFPLE9BQVAsQ0FBZSxRQUFmLEdBQTBCLENBQUMsT0FBTyxnQkFBUCxDQUF3QixJQUF4QixFQUE4QixJQUE5QixDQUEzQjtBQUNBLFdBQU8sT0FBUCxDQUFlLE1BQWYsR0FBd0IsQ0FBQyxPQUFPLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBekI7QUFDQSxXQUFPLE9BQVAsQ0FBZSxLQUFmLEdBQXVCLENBQUMsQ0FBQyxDQUFDLE9BQU8sWUFBUCxDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUExQjtBQUNBLGVBQVcsTUFBWCxFQUFtQixNQUFuQixFQUEyQixJQUEzQixFQUFpQyxJQUFqQztBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUVELFNBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QixNQUE1QixFQUFvQyxJQUFwQyxFQUEwQyxJQUExQyxFQUFnRDtBQUM1QyxXQUFPLGVBQVAsQ0FBdUIsT0FBdkI7QUFDQSxXQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsZUFBckI7QUFDQSxXQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsbUJBQW1CLE9BQU8sY0FBUCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUF4QztBQUNBLFFBQUksT0FBTyxPQUFQLENBQWUsUUFBZixJQUEyQixDQUEvQixFQUFrQztBQUM5QixlQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsd0JBQXJCO0FBQ0g7QUFDRCxRQUFJLE9BQU8sT0FBUCxDQUFlLE1BQWYsSUFBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsZUFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLDBCQUEwQixPQUFPLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBL0M7QUFDSDtBQUNELFFBQUksT0FBTyxPQUFQLENBQWUsS0FBZixJQUF3QixDQUE1QixFQUErQjtBQUMzQixlQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsbUJBQW1CLE9BQU8sWUFBUCxDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUFuQixHQUFxRCxHQUFyRCxHQUNmLE9BQU8sYUFBUCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUROO0FBRUg7QUFDRCxXQUFPLElBQVA7QUFDSDs7Ozs7QUM5RUQ7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNoRCxRQUFJLFNBQVMsc0JBQWI7QUFDQSxXQUFPLGFBQVAsQ0FBcUIsQ0FDakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sTUFESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQURpQixFQVNqQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxRQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBVGlCLEVBaUJqQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxRQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBakJpQixFQXlCakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sT0FESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQXpCaUIsRUFpQ2pCO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUZWO0FBR0ksZUFBTztBQUNILGtCQUFNLE1BREg7QUFFSCxtQkFBTztBQUZKO0FBSFgsS0FqQ2lCLEVBeUNqQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxRQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBekNpQixFQWlEakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sUUFESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQWpEaUIsRUF5RGpCO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUZWO0FBR0ksZUFBTztBQUNILGtCQUFNLE1BREg7QUFFSCxtQkFBTztBQUZKO0FBSFgsS0F6RGlCLEVBaUVqQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxNQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBakVpQixFQXlFakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sUUFESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQXpFaUIsRUFpRmpCO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUZWO0FBR0ksZUFBTztBQUNILGtCQUFNLFFBREg7QUFFSCxtQkFBTztBQUZKO0FBSFgsS0FqRmlCLEVBeUZqQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxPQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBekZpQixFQWlHakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sTUFESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQWpHaUIsRUF5R2pCO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUZWO0FBR0ksZUFBTztBQUNILGtCQUFNLFFBREg7QUFFSCxtQkFBTztBQUZKO0FBSFgsS0F6R2lCLEVBaUhqQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxRQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBakhpQixFQXlIakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sTUFESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQXpIaUIsRUFpSWpCO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUZWO0FBR0ksZUFBTztBQUNILGtCQUFNLE1BREg7QUFFSCxtQkFBTztBQUZKO0FBSFgsS0FqSWlCLEVBeUlqQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxNQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBeklpQixFQWlKakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sTUFESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQWpKaUIsRUF5SmpCO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUZWO0FBR0ksZUFBTztBQUNILGtCQUFNLE1BREg7QUFFSCxtQkFBTztBQUZKO0FBSFgsS0F6SmlCLEVBaUtqQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxNQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBaktpQixFQXlLakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sTUFESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQXpLaUIsRUFpTGpCO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUZWO0FBR0ksZUFBTztBQUNILGtCQUFNLE1BREg7QUFFSCxtQkFBTztBQUZKO0FBSFgsS0FqTGlCLEVBeUxqQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxNQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBekxpQixFQWlNakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sTUFESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQWpNaUIsRUF5TWpCO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUZWO0FBR0ksZUFBTztBQUNILGtCQUFNLE1BREg7QUFFSCxtQkFBTztBQUZKO0FBSFgsS0F6TWlCLEVBaU5qQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxNQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBak5pQixFQXlOakI7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBRlY7QUFHSSxlQUFPO0FBQ0gsa0JBQU0sTUFESDtBQUVILG1CQUFPO0FBRko7QUFIWCxLQXpOaUIsRUFpT2pCO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUZWO0FBR0ksZUFBTztBQUNILGtCQUFNLE1BREg7QUFFSCxtQkFBTztBQUZKO0FBSFgsS0FqT2lCLEVBeU9qQjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FGVjtBQUdJLGVBQU87QUFDSCxrQkFBTSxNQURIO0FBRUgsbUJBQU87QUFGSjtBQUhYLEtBek9pQixDQUFyQjtBQWtQQSx5QkFBVSxNQUFWO0FBQ0gsQ0FyUEQ7Ozs7Ozs7Ozs7Ozs7QUNGQTs7Ozs7SUFLcUIsTTs7QUFvWGpCOzs7O0FBbFhBOzs7O0FBc1hBLHNCQUFjO0FBQUE7O0FBQ1YsYUFBSyxLQUFMLEdBQWEsRUFBYjtBQUNBLGFBQUssVUFBTDtBQUNBLGFBQUssV0FBTDtBQUNBLGFBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNIOztBQUVEOzs7Ozs7cUNBSWE7QUFDVCxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLENBQXBCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQ3hCLHFCQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLEVBQWhCO0FBQ0EscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixHQUF2QixFQUE0QjtBQUN4Qix5QkFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQsSUFBbUI7QUFDZixrQ0FBVSxLQURLO0FBRWYsZ0NBQVEsS0FGTztBQUdmLCtCQUFPO0FBQ0gsa0NBQU0sSUFESDtBQUVILG1DQUFPO0FBRko7QUFIUSxxQkFBbkI7QUFRSDtBQUNKO0FBQ0o7OztzQ0FFYTtBQUNWLGdCQUFJLGNBQWMsQ0FBbEI7QUFDQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLENBQXBCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQ3hCO0FBQ0EscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixHQUF2QixFQUE0QjtBQUN4Qix5QkFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsS0FBakIsR0FBMEIsZ0JBQWdCLENBQWpCLEdBQXNCLE9BQXRCLEdBQWdDLE9BQXpEO0FBQ0g7QUFDSjtBQUNKOztBQUVEOzs7Ozs7dUNBSWU7QUFDWCxpQkFBSyxhQUFMLENBQW1CLE9BQU8sZ0JBQTFCO0FBQ0g7OztzQ0FFYSxRLEVBQVU7QUFBQTs7QUFDcEIsaUJBQUssYUFBTDtBQUNBLHFCQUFTLE9BQVQsQ0FDSSxVQUFDLElBQUQsRUFBVTtBQUNOLHNCQUFLLFdBQUwsQ0FBaUIsS0FBSyxJQUF0QixFQUE0QixLQUFLLElBQWpDLEVBQXVDLEtBQUssS0FBTCxDQUFXLElBQWxELEVBQXdELEtBQUssS0FBTCxDQUFXLEtBQW5FO0FBQ0gsYUFITDtBQUtIOzs7d0NBRWU7QUFBQTs7QUFDWixpQkFBSyxLQUFMLENBQVcsT0FBWCxDQUNJLFVBQUMsSUFBRCxFQUFPLElBQVAsRUFBZ0I7QUFDWixxQkFBSyxPQUFMLENBQ0ksVUFBQyxNQUFELEVBQVMsSUFBVCxFQUFrQjtBQUNkLDJCQUFLLFdBQUwsQ0FBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsSUFBN0IsRUFBbUMsSUFBbkM7QUFDSCxpQkFITDtBQUtILGFBUEw7QUFTSDs7O29DQUVXLEksRUFBTSxJLEVBQU0sSSxFQUFNLEssRUFBTztBQUNqQyxnQkFBSSxDQUFDLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUFMLEVBQXVDLE9BQU8sSUFBUDtBQUN2QyxpQkFBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixJQUFqQixFQUF1QixLQUF2QixHQUErQjtBQUMzQixzQkFBTSxJQURxQjtBQUUzQix1QkFBTztBQUZvQixhQUEvQjtBQUlBLG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7O2tDQUlVLEksRUFBTSxJLEVBQU07QUFDbEIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsbUJBQU8sS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixJQUFqQixDQUFQO0FBQ0g7Ozt1Q0FFYyxJLEVBQU0sSSxFQUFNO0FBQ3ZCLG1CQUFPLEtBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckIsS0FBOEIsS0FBSyxTQUFMLENBQWUsSUFBZixFQUFxQixJQUFyQixFQUEyQixLQUFoRTtBQUNIOzs7cUNBRVksSSxFQUFNLEksRUFBTTtBQUNyQixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLEtBQThCLEtBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckIsRUFBMkIsS0FBM0IsQ0FBaUMsSUFBdEU7QUFDSDs7O3NDQUVhLEksRUFBTSxJLEVBQU07QUFDdEIsbUJBQU8sS0FBSyxTQUFMLENBQWUsSUFBZixFQUFxQixJQUFyQixLQUE4QixLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLEVBQTJCLEtBQTNCLENBQWlDLEtBQXRFO0FBQ0g7OztzQ0FFYSxJLEVBQU0sSSxFQUFNO0FBQ3RCLG1CQUFPLEtBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckIsS0FBOEIsS0FBSyxTQUFMLENBQWUsSUFBZixFQUFxQixJQUFyQixFQUEyQixLQUEzQixDQUFpQyxTQUF0RTtBQUNIOztBQUVEOzs7Ozs7cUNBSWEsSSxFQUFNLEksRUFBTSxJLEVBQU07QUFDM0IsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsaUJBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsSUFBakIsRUFBdUIsS0FBdkIsQ0FBNkIsSUFBN0IsR0FBb0MsSUFBcEM7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7OztzQ0FFYSxJLEVBQU0sSSxFQUFNLEssRUFBTztBQUM3QixnQkFBSSxDQUFDLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUFMLEVBQXVDLE9BQU8sSUFBUDtBQUN2QyxpQkFBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixJQUFqQixFQUF1QixLQUF2QixDQUE2QixLQUE3QixHQUFxQyxLQUFyQztBQUNBLG1CQUFPLElBQVA7QUFDSDs7O3NDQUVhLEksRUFBTSxJLEVBQU0sSyxFQUFPO0FBQzdCLGdCQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLElBQTNCLENBQUwsRUFBdUMsT0FBTyxJQUFQO0FBQ3ZDLGlCQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLElBQWpCLEVBQXVCLEtBQXZCLENBQTZCLFNBQTdCLEdBQXlDLEtBQXpDO0FBQ0EsbUJBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7bUNBSVcsSSxFQUFNLEksRUFBTTtBQUNuQixnQkFBSSxTQUFTLEtBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckIsQ0FBYjtBQUNBLGdCQUFJLENBQUMsTUFBTCxFQUFhLE9BQU8sSUFBUDs7QUFFYixnQkFBSSxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsRUFBMEIsSUFBMUIsQ0FBSixFQUFxQzs7QUFFakMsb0JBQUksS0FBSyxhQUFMLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQUosRUFBb0M7QUFDaEMseUJBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixLQUFLLFVBQTdCLEVBQXlDLElBQXpDO0FBQ0EseUJBQUssYUFBTCxDQUFtQixJQUFuQixFQUF5QixLQUFLLFVBQTlCLEVBQTBDLElBQTFDO0FBQ0g7O0FBRUQscUJBQUssZUFBTDs7QUFFQSxvQkFBSyxLQUFLLFlBQUwsQ0FBa0IsS0FBSyxVQUF2QixFQUFtQyxLQUFLLFVBQXhDLEtBQXVELE1BQXhELElBQ0MsS0FBSyxHQUFMLENBQVMsT0FBTyxLQUFLLFVBQXJCLEtBQW9DLENBRHpDLEVBQzZDO0FBQ3pDLHdCQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssVUFBYixJQUEyQixDQUExQztBQUNBLHlCQUFLLGFBQUwsQ0FBbUIsSUFBbkIsRUFBMEIsUUFBMUIsRUFBcUMsSUFBckM7QUFDSDs7QUFFRCxxQkFBSyxPQUFMLENBQWEsS0FBSyxVQUFsQixFQUE4QixLQUFLLFVBQW5DLEVBQStDLElBQS9DLEVBQXFELElBQXJEOztBQUVBLHFCQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxxQkFBSyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EscUJBQUssV0FBTDtBQUNBLHFCQUFLLFlBQUw7QUFFSCxhQXRCRCxNQXNCTzs7QUFFSCxxQkFBSyxZQUFMO0FBQ0EsdUJBQU8sUUFBUCxHQUFrQixJQUFsQjtBQUNBLHFCQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxxQkFBSyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EscUJBQUssVUFBTCxDQUFnQixJQUFoQixFQUFzQixJQUF0QjtBQUVIOztBQUVELG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7O3VDQUllO0FBQ1gsaUJBQUssS0FBTCxDQUFXLE9BQVgsQ0FDSSxVQUFDLElBQUQsRUFBVTtBQUNOLHFCQUFLLE9BQUwsQ0FDSSxVQUFDLE1BQUQsRUFBWTtBQUNSLDJCQUFPLFFBQVAsR0FBa0IsS0FBbEI7QUFDSCxpQkFITDtBQUtILGFBUEw7QUFTSDs7O3lDQUVnQixJLEVBQU0sSSxFQUFNO0FBQ3pCLGdCQUFJLFNBQVMsS0FBSyxTQUFMLENBQWUsSUFBZixFQUFxQixJQUFyQixDQUFiO0FBQ0EsZ0JBQUksQ0FBQyxNQUFMLEVBQWEsT0FBTyxJQUFQO0FBQ2IsbUJBQU8sT0FBTyxRQUFkO0FBQ0g7O0FBRUQ7Ozs7OztzQ0FJYztBQUNWLGlCQUFLLEtBQUwsQ0FBVyxPQUFYLENBQ0ksVUFBQyxJQUFELEVBQVU7QUFDTixxQkFBSyxPQUFMLENBQ0ksVUFBQyxNQUFELEVBQVk7QUFDUiwyQkFBTyxNQUFQLEdBQWdCLEtBQWhCO0FBQ0gsaUJBSEw7QUFLSCxhQVBMO0FBU0g7OzswQ0FFaUI7QUFDZCxpQkFBSyxLQUFMLENBQVcsT0FBWCxDQUNJLFVBQUMsSUFBRCxFQUFVO0FBQ04scUJBQUssT0FBTCxDQUNJLFVBQUMsTUFBRCxFQUFZO0FBQ1IsMkJBQU8sS0FBUCxDQUFhLFNBQWIsSUFBMEIsSUFBMUIsSUFBa0MsT0FBTyxPQUFPLEtBQVAsQ0FBYSxTQUF0RDtBQUNILGlCQUhMO0FBS0gsYUFQTDtBQVNIOzs7dUNBRWMsSSxFQUFNLEksRUFBTTtBQUN2QixnQkFBSSxTQUFTLEtBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckIsQ0FBYjtBQUNBLGdCQUFJLENBQUMsTUFBTCxFQUFhLE9BQU8sSUFBUDtBQUNiLG1CQUFPLE9BQU8sTUFBZDtBQUNIOztBQUVEOzs7Ozs7bUNBSVcsSSxFQUFNLEksRUFBTTtBQUFBOztBQUNuQixnQkFBSSxDQUFDLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUFMLEVBQXVDLE9BQU8sSUFBUDtBQUN2QyxpQkFBSyxXQUFMO0FBQ0EsZ0JBQUksQ0FBQyxDQUFDLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFOLEVBQXFDO0FBQ2pDLG9CQUFJLFFBQVEsS0FBSyxTQUFMLENBQWUsSUFBZixFQUFxQixJQUFyQixDQUFaO0FBQ0Esb0JBQUksQ0FBQyxLQUFMLEVBQVksT0FBTyxJQUFQO0FBQ1osc0JBQU0sT0FBTixDQUNJLFVBQUMsSUFBRCxFQUFVO0FBQ04sMkJBQUssS0FBTCxDQUFXLEtBQUssSUFBaEIsRUFBc0IsS0FBSyxJQUEzQixFQUFpQyxNQUFqQyxHQUEwQyxJQUExQztBQUNILGlCQUhMO0FBS0g7QUFDSjs7QUFFRDs7Ozs7O2tDQUlVLEksRUFBTSxJLEVBQU07QUFDbEIsb0JBQVEsS0FBSyxZQUFMLENBQWtCLElBQWxCLEVBQXdCLElBQXhCLENBQVI7QUFDSSxxQkFBSyxNQUFMO0FBQ0ksMkJBQU8sS0FBSyxhQUFMLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQVA7QUFDQTtBQUNKLHFCQUFLLFFBQUw7QUFDSSwyQkFBTyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBUDtBQUNBO0FBQ0oscUJBQUssTUFBTDtBQUNJLDJCQUFPLEtBQUssYUFBTCxDQUFtQixJQUFuQixFQUF5QixJQUF6QixDQUFQO0FBQ0E7QUFDSixxQkFBSyxNQUFMO0FBQ0ksMkJBQU8sS0FBSyxhQUFMLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQVA7QUFDQTtBQUNKLHFCQUFLLFFBQUw7QUFDSSwyQkFBTyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBUDtBQUNBO0FBQ0oscUJBQUssT0FBTDtBQUNJLDJCQUFPLEtBQUssY0FBTCxDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUFQO0FBQ0E7QUFDSjtBQUNJLDJCQUFPLElBQVA7QUFwQlI7QUFzQkg7O0FBRUQ7Ozs7OztnQ0FJUSxTLEVBQVcsUyxFQUFXLFEsRUFBVSxRLEVBQVU7QUFDOUMsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsU0FBckIsRUFBZ0MsU0FBaEMsQ0FBTCxFQUFpRCxPQUFPLElBQVA7QUFDakQsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsUUFBckIsRUFBK0IsUUFBL0IsQ0FBTCxFQUErQyxPQUFPLElBQVA7QUFDL0MsZ0JBQUksQ0FBQyxLQUFLLFlBQUwsQ0FBa0IsU0FBbEIsRUFBNkIsU0FBN0IsQ0FBTCxFQUE4QyxPQUFPLElBQVA7QUFDOUMsZ0JBQUksS0FBSyxhQUFMLENBQW1CLFNBQW5CLEVBQThCLFNBQTlCLE1BQTZDLEtBQUssYUFBTCxDQUFtQixRQUFuQixFQUE2QixRQUE3QixDQUFqRCxFQUF5RixPQUFPLElBQVA7O0FBRXpGLGdCQUFJLE9BQU8sS0FBSyxZQUFMLENBQWtCLFNBQWxCLEVBQTZCLFNBQTdCLENBQVg7QUFDQSxnQkFBSSxRQUFRLEtBQUssYUFBTCxDQUFtQixTQUFuQixFQUE4QixTQUE5QixDQUFaOztBQUVBLGlCQUFLLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEIsUUFBNUIsRUFBc0MsSUFBdEM7QUFDQSxpQkFBSyxhQUFMLENBQW1CLFFBQW5CLEVBQTZCLFFBQTdCLEVBQXVDLEtBQXZDO0FBQ0EsaUJBQUssWUFBTCxDQUFrQixTQUFsQixFQUE2QixTQUE3QixFQUF3QyxJQUF4QztBQUNBLGlCQUFLLGFBQUwsQ0FBbUIsU0FBbkIsRUFBOEIsU0FBOUIsRUFBeUMsSUFBekM7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7c0NBSWMsSSxFQUFNLEksRUFBTTtBQUN0QixnQkFBSSxDQUFDLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUFMLEVBQXVDLE9BQU8sSUFBUDtBQUN2QyxnQkFBSSxFQUFFLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixNQUFrQyxNQUFwQyxDQUFKLEVBQWlELE9BQU8sSUFBUDs7QUFFakQsZ0JBQUksU0FBUyxFQUFiO0FBQ0EsZ0JBQUksWUFBWSxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBaEI7QUFDQSxnQkFBSSxnQkFBaUIsYUFBYSxPQUFkLEdBQXlCLENBQXpCLEdBQTZCLENBQUMsQ0FBbEQ7O0FBRUEsZ0JBQUksYUFBYSxJQUFqQjtBQUNBLGdCQUFJLGFBQWEsT0FBTyxhQUF4Qjs7QUFFQSxnQkFBSSxLQUFLLGVBQUwsQ0FBcUIsVUFBckIsRUFBaUMsVUFBakMsQ0FBSixFQUFrRDs7QUFFOUMsb0JBQUksQ0FBQyxLQUFLLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUIsQ0FBTCxFQUFnRDtBQUM1Qyx5QkFBSyxTQUFMLENBQWUsTUFBZixFQUF1QixVQUF2QixFQUFtQyxVQUFuQzs7QUFFQSx3QkFBSyxhQUFhLE9BQWIsSUFBd0IsUUFBUSxDQUFqQyxJQUF3QyxhQUFhLE9BQWIsSUFBd0IsUUFBUSxDQUE1RSxFQUFnRjs7QUFFNUUscUNBQWEsT0FBTyxJQUFJLGFBQXhCO0FBQ0EsNEJBQUksQ0FBQyxLQUFLLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUIsQ0FBTCxFQUFnRDtBQUM1QyxpQ0FBSyxTQUFMLENBQWUsTUFBZixFQUF1QixVQUF2QixFQUFtQyxVQUFuQztBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVELHlCQUFhLE9BQU8sYUFBcEI7O0FBRUEseUJBQWEsT0FBTyxDQUFwQjtBQUNBLGdCQUFJLEtBQUssTUFBTCxDQUFZLFNBQVosRUFBdUIsVUFBdkIsRUFBbUMsVUFBbkMsS0FBbUQsS0FBSyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLFVBQTlCLENBQXZELEVBQW1HO0FBQy9GLHFCQUFLLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLFVBQXZCLEVBQW1DLFVBQW5DO0FBQ0g7O0FBRUQseUJBQWEsT0FBTyxDQUFwQjtBQUNBLGdCQUFJLEtBQUssTUFBTCxDQUFZLFNBQVosRUFBdUIsVUFBdkIsRUFBbUMsVUFBbkMsS0FBbUQsS0FBSyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLFVBQTlCLENBQXZELEVBQW1HO0FBQy9GLHFCQUFLLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLFVBQXZCLEVBQW1DLFVBQW5DO0FBQ0g7O0FBRUQsZ0JBQUksT0FBTyxNQUFYLEVBQW1CLE9BQU8sTUFBUDtBQUNuQixtQkFBTyxJQUFQO0FBRUg7O0FBRUQ7Ozs7Ozt3Q0FJZ0IsSSxFQUFNLEksRUFBTTtBQUN4QixnQkFBSSxDQUFDLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUFMLEVBQXVDLE9BQU8sSUFBUDtBQUN2QyxnQkFBSSxFQUFFLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixNQUFrQyxRQUFwQyxDQUFKLEVBQW1ELE9BQU8sSUFBUDs7QUFFbkQsbUJBQU8sS0FBSyxjQUFMLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLEVBQWdDLE9BQU8sS0FBUCxDQUFhLE1BQTdDLEVBQXFELENBQXJELENBQVA7QUFDSDs7QUFFRDs7Ozs7O3NDQUljLEksRUFBTSxJLEVBQU07QUFDdEIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsZ0JBQUksRUFBRSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsTUFBa0MsTUFBcEMsQ0FBSixFQUFpRCxPQUFPLElBQVA7O0FBRWpELG1CQUFPLEtBQUssY0FBTCxDQUFvQixJQUFwQixFQUEwQixJQUExQixFQUFnQyxPQUFPLEtBQVAsQ0FBYSxJQUE3QyxFQUFtRCxDQUFuRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7OztzQ0FJYyxJLEVBQU0sSSxFQUFNO0FBQ3RCLGdCQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLElBQTNCLENBQUwsRUFBdUMsT0FBTyxJQUFQO0FBQ3ZDLGdCQUFJLEVBQUUsS0FBSyxZQUFMLENBQWtCLElBQWxCLEVBQXdCLElBQXhCLE1BQWtDLE1BQXBDLENBQUosRUFBaUQsT0FBTyxJQUFQOztBQUVqRCxtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsRUFBMEIsSUFBMUIsRUFBZ0MsT0FBTyxLQUFQLENBQWEsSUFBN0MsRUFBbUQsQ0FBbkQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7d0NBSWdCLEksRUFBTSxJLEVBQU07QUFDeEIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsZ0JBQUksRUFBRSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsTUFBa0MsUUFBcEMsQ0FBSixFQUFtRCxPQUFPLElBQVA7O0FBRW5ELG1CQUFPLEtBQUssY0FBTCxDQUFvQixJQUFwQixFQUEwQixJQUExQixFQUFnQyxPQUFPLEtBQVAsQ0FBYSxNQUE3QyxFQUFxRCxDQUFyRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozt1Q0FJZSxJLEVBQU0sSSxFQUFNO0FBQ3ZCLGdCQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLElBQTNCLENBQUwsRUFBdUMsT0FBTyxJQUFQO0FBQ3ZDLGdCQUFJLEVBQUUsS0FBSyxZQUFMLENBQWtCLElBQWxCLEVBQXdCLElBQXhCLE1BQWtDLE9BQXBDLENBQUosRUFBa0QsT0FBTyxJQUFQOztBQUVsRCxtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsRUFBMEIsSUFBMUIsRUFBZ0MsT0FBTyxLQUFQLENBQWEsSUFBN0MsRUFBbUQsQ0FBbkQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7dUNBSWUsSSxFQUFNLEksRUFBTSxPLEVBQVMsSyxFQUFPO0FBQUE7O0FBQ3ZDLGdCQUFJLFNBQVMsRUFBYjtBQUNBLGdCQUFJLGFBQWEsS0FBSyxhQUFMLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQWpCOztBQUVBLG9CQUFRLE9BQVIsQ0FBZ0IsVUFBQyxJQUFELEVBQVU7QUFDdEIsb0JBQUksSUFBSSxDQUFSO0FBQ0EsdUJBQU8sSUFBSSxLQUFYLEVBQWtCO0FBQ2Q7QUFDQSx3QkFBSSxhQUFhLE9BQU8sSUFBSSxLQUFLLElBQWpDO0FBQ0Esd0JBQUksYUFBYSxPQUFPLElBQUksS0FBSyxJQUFqQztBQUNBLHdCQUFJLE9BQUssZUFBTCxDQUFxQixVQUFyQixFQUFpQyxVQUFqQyxDQUFKLEVBQWtEO0FBQzlDLDRCQUFJLENBQUMsT0FBSyxTQUFMLENBQWUsVUFBZixFQUEyQixVQUEzQixFQUF1QyxVQUF2QyxDQUFMLEVBQXlEO0FBQ3JELG1DQUFLLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLFVBQXZCLEVBQW1DLFVBQW5DO0FBQ0gseUJBRkQsTUFFTztBQUNIO0FBQ0g7QUFDSixxQkFORCxNQU1PO0FBQ0g7QUFDSDtBQUNELHdCQUFJLE9BQUssTUFBTCxDQUFZLFVBQVosRUFBd0IsVUFBeEIsRUFBb0MsVUFBcEMsQ0FBSixFQUFxRDtBQUN4RDtBQUNKLGFBakJEOztBQW1CQSxnQkFBSSxPQUFPLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUIsT0FBTyxNQUFQO0FBQ3ZCLG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7O3dDQUlnQixJLEVBQU0sSSxFQUFNO0FBQ3hCLG1CQUFRLFFBQVEsQ0FBUixJQUFhLFFBQVEsQ0FBckIsSUFBMEIsUUFBUSxDQUFsQyxJQUF1QyxRQUFRLENBQXZEO0FBQ0g7O0FBRUQ7Ozs7OztrQ0FJVyxNLEVBQVEsSSxFQUFNLEksRUFBTTtBQUMzQixnQkFBSSxPQUFPO0FBQ1Asc0JBQU0sSUFEQztBQUVQLHNCQUFNO0FBRkMsYUFBWDtBQUlBLG1CQUFPLElBQVAsQ0FBWSxJQUFaO0FBQ0g7OztrQ0FFVSxLLEVBQU8sSSxFQUFNLEksRUFBTTtBQUN6QixnQkFBSSxDQUFDLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUFMLEVBQXVDLE9BQU8sSUFBUDtBQUN2QyxnQkFBSSxDQUFDLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFMLEVBQW9DLE9BQU8sS0FBUDtBQUNwQyxtQkFBUSxVQUFVLEtBQUssYUFBTCxDQUFtQixJQUFuQixFQUF5QixJQUF6QixDQUFsQjtBQUNKOzs7K0JBRU8sSyxFQUFPLEksRUFBTSxJLEVBQU07QUFDdEIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsZ0JBQUksQ0FBQyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsQ0FBTCxFQUFvQyxPQUFPLEtBQVA7QUFDcEMsbUJBQVEsU0FBUyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBakI7QUFDSjs7O3FDQUVhLEksRUFBTSxJLEVBQU07QUFDckIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsbUJBQVEsS0FBSyxhQUFMLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQVI7QUFDSjs7Ozs7O0FBbDBCZ0IsTSxDQU1WLGdCLEdBQW1CLENBQ3RCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBRHNCLEVBU3RCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sUUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBVHNCLEVBaUJ0QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLFFBREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQWpCc0IsRUF5QnRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sT0FESDtBQUVILGVBQU87QUFGSjtBQUhYLENBekJzQixFQWlDdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0FqQ3NCLEVBeUN0QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLFFBREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQXpDc0IsRUFpRHRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sUUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBakRzQixFQXlEdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0F6RHNCLEVBaUV0QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQWpFc0IsRUF5RXRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sUUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBekVzQixFQWlGdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxRQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0FqRnNCLEVBeUZ0QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE9BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQXpGc0IsRUFpR3RCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBakdzQixFQXlHdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxRQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0F6R3NCLEVBaUh0QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLFFBREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQWpIc0IsRUF5SHRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBekhzQixFQWtJdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0FsSXNCLEVBMEl0QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQTFJc0IsRUFrSnRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBbEpzQixFQTBKdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0ExSnNCLEVBa0t0QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQWxLc0IsRUEwS3RCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBMUtzQixFQWtMdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0FsTHNCLEVBMEx0QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQTFMc0IsRUFrTXRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBbE1zQixFQTBNdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0ExTXNCLEVBa050QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQWxOc0IsRUEwTnRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBMU5zQixFQWtPdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0FsT3NCLEVBME90QjtBQUNJLFVBQU0sQ0FEVjtBQUVJLFVBQU0sQ0FGVjtBQUdJLFdBQU87QUFDSCxjQUFNLE1BREg7QUFFSCxlQUFPO0FBRko7QUFIWCxDQTFPc0IsRUFrUHRCO0FBQ0ksVUFBTSxDQURWO0FBRUksVUFBTSxDQUZWO0FBR0ksV0FBTztBQUNILGNBQU0sTUFESDtBQUVILGVBQU87QUFGSjtBQUhYLENBbFBzQixFQTBQdEI7QUFDSSxVQUFNLENBRFY7QUFFSSxVQUFNLENBRlY7QUFHSSxXQUFPO0FBQ0gsY0FBTSxNQURIO0FBRUgsZUFBTztBQUZKO0FBSFgsQ0ExUHNCLEM7QUFOVCxNLENBeVFWLEssR0FBUTtBQUNYLFlBQVEsQ0FDSjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU07QUFGVixLQURJLEVBS0o7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNO0FBRlYsS0FMSSxFQVNKO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUFDO0FBRlgsS0FUSSxFQWFKO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUFDO0FBRlgsS0FiSSxFQWlCSjtBQUNJLGNBQU0sQ0FBQyxDQURYO0FBRUksY0FBTSxDQUFDO0FBRlgsS0FqQkksRUFxQko7QUFDSSxjQUFNLENBQUMsQ0FEWDtBQUVJLGNBQU0sQ0FBQztBQUZYLEtBckJJLEVBeUJKO0FBQ0ksY0FBTSxDQUFDLENBRFg7QUFFSSxjQUFNO0FBRlYsS0F6QkksRUE2Qko7QUFDSSxjQUFNLENBQUMsQ0FEWDtBQUVJLGNBQU07QUFGVixLQTdCSSxDQURHO0FBbUNYLFVBQU0sQ0FDRjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU07QUFGVixLQURFLEVBS0Y7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNO0FBRlYsS0FMRSxFQVNGO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUFDO0FBRlgsS0FURSxFQWFGO0FBQ0ksY0FBTSxDQUFDLENBRFg7QUFFSSxjQUFNO0FBRlYsS0FiRSxDQW5DSztBQXFEWCxZQUFRLENBQ0o7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNO0FBRlYsS0FESSxFQUtKO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTSxDQUFDO0FBRlgsS0FMSSxFQVNKO0FBQ0ksY0FBTSxDQUFDLENBRFg7QUFFSSxjQUFNLENBQUM7QUFGWCxLQVRJLEVBYUo7QUFDSSxjQUFNLENBQUMsQ0FEWDtBQUVJLGNBQU07QUFGVixLQWJJLENBckRHO0FBdUVYLFVBQU0sQ0FDRjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU07QUFGVixLQURFLEVBS0Y7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNO0FBRlYsS0FMRSxFQVNGO0FBQ0ksY0FBTSxDQURWO0FBRUksY0FBTTtBQUZWLEtBVEUsRUFhRjtBQUNJLGNBQU0sQ0FEVjtBQUVJLGNBQU0sQ0FBQztBQUZYLEtBYkUsRUFpQkY7QUFDSSxjQUFNLENBRFY7QUFFSSxjQUFNLENBQUM7QUFGWCxLQWpCRSxFQXFCRjtBQUNJLGNBQU0sQ0FBQyxDQURYO0FBRUksY0FBTSxDQUFDO0FBRlgsS0FyQkUsRUF5QkY7QUFDSSxjQUFNLENBQUMsQ0FEWDtBQUVJLGNBQU07QUFGVixLQXpCRSxFQTZCRjtBQUNJLGNBQU0sQ0FBQyxDQURYO0FBRUksY0FBTTtBQUZWLEtBN0JFO0FBdkVLLEM7a0JBelFFLE07Ozs7Ozs7Ozs7QUNMckI7Ozs7O0FBS0E7Ozs7Ozs7O0lBRXFCLE07O0FBRWpCOzs7O0FBSUEsc0JBQWM7QUFBQTs7QUFDVixhQUFLLFNBQUwsR0FBaUIsc0JBQWpCO0FBQ0g7O0FBRUQ7Ozs7Ozt1Q0FJZTtBQUNYLGlCQUFLLFNBQUwsQ0FBZSxZQUFmO0FBQ0g7OztzQ0FFYSxRLEVBQVU7QUFDcEIsaUJBQUssU0FBTCxDQUFlLGFBQWYsQ0FBNkIsUUFBN0I7QUFDSDs7QUFFRDs7Ozs7O2tDQUlVLEksRUFBTSxJLEVBQU07QUFDbEIsbUJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixDQUFQO0FBQ0g7Ozt1Q0FFYyxJLEVBQU0sSSxFQUFNO0FBQ3ZCLG1CQUFPLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsS0FBd0MsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQyxLQUFwRjtBQUNIOzs7cUNBRVksSSxFQUFNLEksRUFBTTtBQUNyQixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEtBQXdDLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBcUMsS0FBckMsQ0FBMkMsSUFBMUY7QUFDSDs7O3NDQUVhLEksRUFBTSxJLEVBQU07QUFDdEIsbUJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixLQUF3QyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLEtBQXJDLENBQTJDLEtBQTFGO0FBQ0g7O0FBRUQ7Ozs7OzttQ0FJVyxJLEVBQU0sSSxFQUFNO0FBQ25CLGlCQUFLLFNBQUwsQ0FBZSxVQUFmLENBQTBCLElBQTFCLEVBQWdDLElBQWhDO0FBQ0g7O0FBRUQ7Ozs7Ozt5Q0FJaUIsSSxFQUFNLEksRUFBTTtBQUN6QixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxnQkFBZixDQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozt1Q0FJZSxJLEVBQU0sSSxFQUFNO0FBQ3ZCLG1CQUFPLEtBQUssU0FBTCxDQUFlLGNBQWYsQ0FBOEIsSUFBOUIsRUFBb0MsSUFBcEMsQ0FBUDtBQUNIOzs7Ozs7a0JBaEVnQixNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLypcbiAqICAgICBib2FyZC5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRCb2FyZChqY2hlc3MpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC13cmFwJyksXG4gICAgICAgIGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG4gICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgZm9yIChsZXQgcmFuayA9IDA7IHJhbmsgPCA4OyByYW5rKyspIHtcbiAgICAgICAgICAgIGxldCBzcXVhcmUgPSBuZXdTcXVhcmUoamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgamNoZXNzLnBpY2tTcXVhcmUoK2UudGFyZ2V0LmRhdGFzZXQuZmlsZSwgK2UudGFyZ2V0LmRhdGFzZXQucmFuayk7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdCb2FyZChqY2hlc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoYm9hcmQpO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBkcmF3Qm9hcmQoamNoZXNzKSB7XG4gICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdib2FyZF9fc3F1YXJlJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBmaWxlID0gc3F1YXJlc1tpXS5kYXRhc2V0LmZpbGUsXG4gICAgICAgICAgICByYW5rID0gc3F1YXJlc1tpXS5kYXRhc2V0LnJhbms7XG4gICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQuc2VsZWN0ZWQgIT0gamNoZXNzLmlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgamNoZXNzLCBmaWxlLCByYW5rKVxuICAgICAgICB9XG4gICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQubWFya2VkICE9IGpjaGVzcy5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBqY2hlc3MsIGZpbGUsIHJhbmspXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5waWVjZSAhPSBqY2hlc3MuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuaylcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gbmV3U3F1YXJlKGpjaGVzcywgZmlsZSwgcmFuaykge1xuICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcXVhcmUuZGF0YXNldC5maWxlID0gZmlsZTtcbiAgICBzcXVhcmUuZGF0YXNldC5yYW5rID0gcmFuaztcbiAgICBkcmF3U3F1YXJlKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICByZXR1cm4gc3F1YXJlO1xufVxuXG5mdW5jdGlvbiBkcmF3U3F1YXJlKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKSB7XG4gICAgc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPSAramNoZXNzLmlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuayk7XG4gICAgc3F1YXJlLmRhdGFzZXQubWFya2VkID0gK2pjaGVzcy5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKTtcbiAgICBzcXVhcmUuZGF0YXNldC5waWVjZSA9ICshIWpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuayk7XG4gICAgc2V0Q2xhc3NlcyhzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNldENsYXNzZXMoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspIHtcbiAgICBzcXVhcmUucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlJyk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGpjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgaWYgKHNxdWFyZS5kYXRhc2V0LnNlbGVjdGVkID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgaWYgKHNxdWFyZS5kYXRhc2V0Lm1hcmtlZCA9PSAxKSB7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlX21hcmtlZF8nICsgamNoZXNzLmdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspKTtcbiAgICB9XG4gICAgaWYgKHNxdWFyZS5kYXRhc2V0LnBpZWNlID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykgKyAnXydcbiAgICAgICAgICAgICsgamNoZXNzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn0iLCJpbXBvcnQgSkNoZXNzIGZyb20gJy4uL2xpYi9qY2hlc3MnO1xuaW1wb3J0IGluaXRCb2FyZCBmcm9tICcuLi9jb21wb25lbnRzL2JvYXJkL2JvYXJkJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBsZXQgamNoZXNzID0gbmV3IEpDaGVzcztcbiAgICBqY2hlc3Muc2V0VXBQb3NpdGlvbihbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogMixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiAyLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDMsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVlbicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDMsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogMixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogNSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDMsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdKTtcbiAgICBpbml0Qm9hcmQoamNoZXNzKTtcbn0pIiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpib2FyZC5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQm9hcmQge1xuXG4gICAgLypcbiAgICAgKiAgIENPTlNUQU5UU1xuICAgICAqL1xuXG4gICAgc3RhdGljIElOSVRJQUxfUE9TSVRJT04gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVlbicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdO1xuICAgIHN0YXRpYyBNT1ZFUyA9IHtcbiAgICAgICAga25pZ2h0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogLTJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogLTJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTIsXG4gICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTIsXG4gICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHJvb2s6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBiaXNob3A6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGtpbmc6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgQ09OU1RSVUNUT1JcbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIHRoaXMuX2luaXRCb2FyZCgpO1xuICAgICAgICB0aGlzLl9wYWludEJvYXJkKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0RmlsZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0UmFuayA9IG51bGw7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIElOSVRJQUxJWkFUSU9OXG4gICAgICovXG5cbiAgICBfaW5pdEJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0ge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcGFpbnRCb2FyZCgpIHtcbiAgICAgICAgbGV0IGNvdW50U3F1YXJlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50U3F1YXJlKytcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXS5jb2xvciA9IChjb3VudFNxdWFyZSsrICUgMikgPyAnYmxhY2snIDogJ3doaXRlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVRVUFxuICAgICAqL1xuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLnNldFVwUG9zaXRpb24oSkJvYXJkLklOSVRJQUxfUE9TSVRJT04pO1xuICAgIH1cblxuICAgIHNldFVwUG9zaXRpb24ocGllY2VTZXQpIHtcbiAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG4gICAgICAgIHBpZWNlU2V0LmZvckVhY2goXG4gICAgICAgICAgICAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFVwUGllY2UoaXRlbS5maWxlLCBpdGVtLnJhbmssIGl0ZW0ucGllY2UudHlwZSwgaXRlbS5waWVjZS5jb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZXNldFBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoaXRlbSwgZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSwgcmFuaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0VXBQaWVjZShmaWxlLCByYW5rLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9zZXRVcFBpZWNlKGZpbGUsIHJhbmssIHR5cGUsIGNvbG9yKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvclxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVRURVJTXG4gICAgICovXG5cbiAgICBnZXRTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmRbZmlsZV1bcmFua107XG4gICAgfVxuXG4gICAgZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS5jb2xvcjtcbiAgICB9XG5cbiAgICBfZ2V0RW5QYXNzYW50KGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmVuUGFzc2FudDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVEVSU1xuICAgICAqL1xuXG4gICAgc2V0UGllY2VUeXBlKGZpbGUsIHJhbmssIHR5cGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZSA9IHR5cGU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHNldFBpZWNlQ29sb3IoZmlsZSwgcmFuaywgY29sb3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgX3NldEVuUGFzc2FudChmaWxlLCByYW5rLCB2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5lblBhc3NhbnQgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFBJQ0tcbiAgICAgKi9cblxuICAgIHBpY2tTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fZ2V0RW5QYXNzYW50KGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQaWVjZVR5cGUoZmlsZSwgdGhpcy5zZWxlY3RSYW5rLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBpZWNlQ29sb3IoZmlsZSwgdGhpcy5zZWxlY3RSYW5rLCBudWxsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fcmVzZXRFblBhc3NhbnQoKTtcblxuICAgICAgICAgICAgaWYgKCh0aGlzLmdldFBpZWNlVHlwZSh0aGlzLnNlbGVjdEZpbGUsIHRoaXMuc2VsZWN0UmFuaykgPT0gJ3Bhd24nKSAmJlxuICAgICAgICAgICAgICAgIChNYXRoLmFicyhyYW5rIC0gdGhpcy5zZWxlY3RSYW5rKSA9PSAyKSkge1xuICAgICAgICAgICAgICAgIGxldCBwYXNzUmFuayA9IChyYW5rICsgdGhpcy5zZWxlY3RSYW5rKSAvIDI7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RW5QYXNzYW50KGZpbGUsICBwYXNzUmFuaywgIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9kb01vdmUodGhpcy5zZWxlY3RGaWxlLCB0aGlzLnNlbGVjdFJhbmssIGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZpbGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RSYW5rID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0TWFya3MoKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5fcmVzZXRTZWxlY3QoKVxuICAgICAgICAgICAgc3F1YXJlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RmlsZSA9IGZpbGU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFJhbmsgPSByYW5rO1xuICAgICAgICAgICAgdGhpcy5fbWFya01vdmVzKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VMRUNUXG4gICAgICovXG5cbiAgICBfcmVzZXRTZWxlY3QoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuaykge1xuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgTUFSS1xuICAgICAqL1xuXG4gICAgX3Jlc2V0TWFya3MoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUubWFya2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVzZXRFblBhc3NhbnQoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUucGllY2UuZW5QYXNzYW50ID09IHRydWUgJiYgZGVsZXRlKHNxdWFyZS5waWVjZS5lblBhc3NhbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuXG4gICAgaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykge1xuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5tYXJrZWQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIE1BUksgTU9WRVNcbiAgICAgKi9cblxuICAgIF9tYXJrTW92ZXMoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpO1xuICAgICAgICBpZiAoISF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5fZ2V0TW92ZXMoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBpZiAoIW1vdmVzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIG1vdmVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpdGVtLmZpbGVdW2l0ZW0ucmFua10ubWFya2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXMoZmlsZSwgcmFuaykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBjYXNlICdwYXduJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAna25pZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNLbmlnaHQoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdraW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNLaW5nKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncm9vayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUm9vayhmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Jpc2hvcCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzQmlzaG9wKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncXVlZW4nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1F1ZWVuKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBETyBNT1ZFXG4gICAgICovXG5cbiAgICBfZG9Nb3ZlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShzdGFydEZpbGUsIHN0YXJ0UmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKHN0b3BGaWxlLCBzdG9wUmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICh0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspID09PSB0aGlzLmdldFBpZWNlQ29sb3Ioc3RvcEZpbGUsIHN0b3BSYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLmdldFBpZWNlVHlwZShzdGFydEZpbGUsIHN0YXJ0UmFuayk7XG4gICAgICAgIGxldCBjb2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcihzdGFydEZpbGUsIHN0YXJ0UmFuayk7XG5cbiAgICAgICAgdGhpcy5zZXRQaWVjZVR5cGUoc3RvcEZpbGUsIHN0b3BSYW5rLCB0eXBlKTtcbiAgICAgICAgdGhpcy5zZXRQaWVjZUNvbG9yKHN0b3BGaWxlLCBzdG9wUmFuaywgY29sb3IpO1xuICAgICAgICB0aGlzLnNldFBpZWNlVHlwZShzdGFydEZpbGUsIHN0YXJ0UmFuaywgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGllY2VDb2xvcihzdGFydEZpbGUsIHN0YXJ0UmFuaywgbnVsbCk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBQQVdOIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSAncGF3bicpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBwYXduQ29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuayk7XG4gICAgICAgIGxldCBtb3ZlRGlyZWN0aW9uID0gKHBhd25Db2xvciA9PSAnd2hpdGUnKSA/IDEgOiAtMVxuXG4gICAgICAgIGxldCB0YXJnZXRGaWxlID0gZmlsZTtcbiAgICAgICAgbGV0IHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVTcXVhcmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKHBhd25Db2xvciA9PSAnd2hpdGUnICYmIHJhbmsgPT0gMSkgfHwgKHBhd25Db2xvciA9PSAnYmxhY2snICYmIHJhbmsgPT0gNikpIHtcblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIDIgKiBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0UmFuayA9IHJhbmsgKyBtb3ZlRGlyZWN0aW9uO1xuXG4gICAgICAgIHRhcmdldEZpbGUgPSBmaWxlIC0gMTtcbiAgICAgICAgaWYgKHRoaXMuX2lzRm9lKHBhd25Db2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykgfHwgKHRoaXMuX2lzRW5QYXNzYW50KHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldEZpbGUgPSBmaWxlICsgMTtcbiAgICAgICAgaWYgKHRoaXMuX2lzRm9lKHBhd25Db2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykgfHwgKHRoaXMuX2lzRW5QYXNzYW50KHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgS05JR0hUIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNLbmlnaHQoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCEodGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykgPT09ICdrbmlnaHQnKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuaywgSkJvYXJkLk1PVkVTLmtuaWdodCwgMSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBLSU5HIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNLaW5nKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSAna2luZycpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rLCBKQm9hcmQuTU9WRVMua2luZywgMSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBST09LIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNSb29rKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSAncm9vaycpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rLCBKQm9hcmQuTU9WRVMucm9vaywgNyk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBCSVNIT1AgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc0Jpc2hvcChmaWxlLCByYW5rKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoISh0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSA9PT0gJ2Jpc2hvcCcpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rLCBKQm9hcmQuTU9WRVMuYmlzaG9wLCA3KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIFFVRUVOIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNRdWVlbihmaWxlLCByYW5rKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoISh0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSA9PT0gJ3F1ZWVuJykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmssIEpCb2FyZC5NT1ZFUy5raW5nLCA3KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIFBJRUNFIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rLCBwYXR0ZXJuLCBjb3VudCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBwaWVjZUNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIHBhdHRlcm4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCBjb3VudCkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RmlsZSA9IGZpbGUgKyBpICogaXRlbS5maWxlO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRSYW5rID0gcmFuayArIGkgKiBpdGVtLnJhbms7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbGlkYXRlU3F1YXJlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNGcmllbmQocGllY2VDb2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaylcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZvZShwaWVjZUNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgVkFMSURBVE9SU1xuICAgICAqL1xuXG4gICAgX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIChmaWxlID49IDAgJiYgZmlsZSA8PSA3ICYmIHJhbmsgPj0gMCAmJiByYW5rIDw9IDcpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVJWSUNFU1xuICAgICAqL1xuXG4gICAgIF9wdXNoTW92ZShyZXN1bHQsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IG1vdmUgPSB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICB9O1xuICAgICAgICByZXN1bHQucHVzaChtb3ZlKTtcbiAgICB9XG5cbiAgICAgX2lzRnJpZW5kKGNvbG9yLCBmaWxlLCByYW5rKSB7XG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgIHJldHVybiAoY29sb3IgPT09IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuXG4gICAgIF9pc0ZvZShjb2xvciwgZmlsZSwgcmFuaykge1xuICAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICByZXR1cm4gKGNvbG9yICE9IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuXG4gICAgIF9pc0VuUGFzc2FudChmaWxlLCByYW5rKSB7XG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIHJldHVybiAodGhpcy5fZ2V0RW5QYXNzYW50KGZpbGUsIHJhbmspKTtcbiAgICB9XG59IiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpjaGVzcy5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5pbXBvcnQgSkJvYXJkIGZyb20gJy4vamJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkNoZXNzIHtcblxuICAgIC8qXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkID0gbmV3IEpCb2FyZDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVVBcbiAgICAgKi9cblxuICAgIHNldFVwSW5pdGlhbCgpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQuc2V0VXBJbml0aWFsKCk7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5zZXRVcFBvc2l0aW9uKHBpZWNlU2V0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBnZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmNvbG9yO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBQSUNLXG4gICAgICovXG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQucGlja1NxdWFyZShmaWxlLCByYW5rKVxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRUxFQ1RcbiAgICAgKi9cblxuICAgIGlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgTUFSS1xuICAgICAqL1xuXG4gICAgaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuayk7XG4gICAgfVxufSJdfQ==
