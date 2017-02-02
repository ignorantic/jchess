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
            square.addEventListener('click', handlerClick);
            board.appendChild(square);
        }
    }

    wrap.appendChild(board);
    return true;

    function handlerClick(e) {
        jchess.pickSquare(+e.target.dataset.file, +e.target.dataset.rank);
        drawBoard(jchess);
    }
}

function drawBoard(jchess) {

    'use strict';

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

    'use strict';

    var square = document.createElement('div');
    square.dataset.file = file;
    square.dataset.rank = rank;
    drawSquare(square, jchess, file, rank);
    return square;
}

function drawSquare(square, jchess, file, rank) {

    'use strict';

    square.dataset.selected = +jchess.isSquareSelected(file, rank);
    square.dataset.marked = +jchess.isSquareMarked(file, rank);
    square.dataset.piece = +!!jchess.getPieceType(file, rank);
    setClasses(square, jchess, file, rank);
    return true;
}

function setClasses(square, jchess, file, rank) {

    'use strict';

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

    'use strict';

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

        this.turn = 'white';

        this.selectFile = null;
        this.selectRank = null;

        this.enPassant = null;

        this.castling = {
            white: 3,
            black: 3
        };

        this.INITIAL_POSITION = [{
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
        this.MOVES = {
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
            this.setUpPosition(this.INITIAL_POSITION);
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
    }, {
        key: 'setPiece',
        value: function setPiece(file, rank, type, color) {

            if (!this._validateSquare(file, rank)) return null;
            this.board[file][rank].piece.color = color;
            this.board[file][rank].piece.type = type;
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
    }, {
        key: '_passTurn',
        value: function _passTurn() {

            if (this.turn === 'white') {
                this.turn = 'black';
            } else {
                this.turn = 'white';
            }
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

            if (this.getPieceColor(file, rank) !== this.turn) return null;

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

                case 'king':
                    return this._getMovesKing(file, rank);

                default:
                    return this._getMovesPiece(file, rank);

            }
        }

        /*
         *   DO MOVE
         */

    }, {
        key: '_doMove',
        value: function _doMove(startFile, startRank, stopFile, stopRank) {

            this._checkEnPassant(stopFile, stopRank);

            var type = this.getPieceType(startFile, startRank);
            var color = this.getPieceColor(startFile, startRank);

            if (!this._validateSquare(startFile, startRank)) return null;
            if (!this._validateSquare(stopFile, stopRank)) return null;
            if (!this.getPieceType(startFile, startRank)) return null;
            if (this._isFriend(color, stopFile, stopRank)) return null;

            if (type == 'king' && Math.abs(startFile - stopFile) === 2) {

                this._doCastling(color, stopFile);
            } else {

                this.setPiece(stopFile, stopRank, type, color);
                this._removePiece(startFile, startRank);
            }

            if (type == 'king' || type == 'rook') {
                this._checkCastling(color, type, startFile);
            }

            this._passTurn();

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

            var moves = [];
            var pawnColor = this.getPieceColor(file, rank);
            var moveDirection = pawnColor == 'white' ? 1 : -1;

            var targetFile = file;
            var targetRank = rank + moveDirection;

            if (this._validateSquare(targetFile, targetRank)) {

                if (!this.getPieceType(targetFile, targetRank)) {
                    this._pushMove(moves, targetFile, targetRank);

                    if (pawnColor == 'white' && rank == 1 || pawnColor == 'black' && rank == 6) {
                        targetRank = rank + 2 * moveDirection;
                        this.getPieceType(targetFile, targetRank) || this._pushMove(moves, targetFile, targetRank);
                    }
                }
            }

            targetRank = rank + moveDirection;

            targetFile = file - 1;
            if (this._isFoe(pawnColor, targetFile, targetRank) || this._isEnPassant(targetFile, targetRank)) {
                this._pushMove(moves, targetFile, targetRank);
            }

            targetFile = file + 1;
            if (this._isFoe(pawnColor, targetFile, targetRank) || this._isEnPassant(targetFile, targetRank)) {
                this._pushMove(moves, targetFile, targetRank);
            }

            return this._filterMoves(moves, file, rank);
        }

        /*
         *   GET KING MOVES
         */

    }, {
        key: '_getMovesKing',
        value: function _getMovesKing(file, rank) {

            var moves = this._getMovesPiece(file, rank);
            var castling = this._getCastlingMove(file, rank);

            castling && castling.forEach(function (item) {
                return moves.push(item);
            });

            return this._filterMoves(moves, file, rank);
        }
    }, {
        key: '_getCastlingMove',
        value: function _getCastlingMove(file, rank) {

            if (!(file === 4 && (rank === 0 || rank === 7))) return null;
            var color = rank === 0 ? 'white' : 'black';
            if (this.castling[color] === 0) return null;
            if (this._isCheck(color)) return null;
            var result = [];

            if (this.castling[color] > 1 && !this._isSquareAttacked(color, file - 1, rank) && this._isEmpty(file - 1, rank) && this._isEmpty(file - 2, rank) && this._isEmpty(file - 3, rank)) {
                this._pushMove(result, 2, rank);
            }

            if (this.castling[color] % 2 === 1 && !this._isSquareAttacked(color, file + 1, rank) && this._isEmpty(file + 1, rank) && this._isEmpty(file + 2, rank)) {
                this._pushMove(result, 6, rank);
            }

            return result;
        }
    }, {
        key: '_checkCastling',
        value: function _checkCastling(color, type, file) {

            if (this.castling[color] > 0) {
                if (type == 'king') this.castling[color] = 0;
                if (type == 'rook') {
                    if (file === 0 && this.castling[color] > 1) this.castling[color] -= 2;
                    if (file === 7 && this.castling[color] % 2 == 1) this.castling[color] -= 1;
                }
            }
        }
    }, {
        key: '_doCastling',
        value: function _doCastling(color, file) {

            if (color === 'white') {

                this.setPiece(file, 0, 'king', 'white');
                this._removePiece(4, 0);

                if (file === 2) {
                    this.setPiece(3, 0, 'rook', 'white');
                    this._removePiece(0, 0);
                } else {
                    this.setPiece(5, 0, 'rook', 'white');
                    this._removePiece(7, 0);
                }
            } else {

                this.setPiece(file, 7, 'king', 'black');
                this._removePiece(4, 7);

                if (file === 2) {
                    this.setPiece(3, 7, 'rook', 'black');
                    this._removePiece(0, 7);
                } else {
                    this.setPiece(5, 7, 'rook', 'black');
                    this._removePiece(7, 7);
                }
            }
        }

        /*
         *   GET PIECE MOVES
         */

    }, {
        key: '_getMovesPiece',
        value: function _getMovesPiece(file, rank) {

            var piece = this.getPieceType(file, rank);
            var color = this.getPieceColor(file, rank);

            var moves = this._getAttackedSquares(piece, color, file, rank);

            return this._filterMoves(moves, file, rank);
        }
    }, {
        key: '_filterMoves',
        value: function _filterMoves(moves, file, rank) {
            var _this4 = this;

            if (!moves) return null;

            return moves.filter(function (item) {
                return _this4._checkMove(file, rank, item.file, item.rank);
            });
        }
    }, {
        key: '_getAttackedSquares',
        value: function _getAttackedSquares(piece, color, file, rank) {
            var _this5 = this;

            var moves = this.MOVES[piece];
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
            return color !== this.getPieceColor(file, rank);
        }
    }, {
        key: '_isEmpty',
        value: function _isEmpty(file, rank) {

            if (!this._validateSquare(file, rank)) return null;
            return this.getPieceType(file, rank) === null;
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

            if (src.enPassant !== null) {

                newBoard.enPassant = {
                    file: src.enPassant.file,
                    rank: src.enPassant.rank
                };
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

        /*
         *   FEN
         */

    }, {
        key: '_getFEN',
        value: function _getFEN() {

            return this._getFENBoard() + ' ' + this._getFENTurn() + ' ' + this._getFENCastling() + ' ';
        }
    }, {
        key: '_getFENPiece',
        value: function _getFENPiece(file, rank) {

            if (!this._validateSquare(file, rank)) return null;
            var piece = this.getPieceType(file, rank);
            if (!piece) return null;
            var FEN = void 0;
            switch (piece) {

                case 'pawn':
                    FEN = 'p';
                    break;

                case 'rook':
                    FEN = 'r';
                    break;

                case 'knight':
                    FEN = 'n';
                    break;

                case 'bishop':
                    FEN = 'b';
                    break;

                case 'queen':
                    FEN = 'q';
                    break;

                case 'king':
                    FEN = 'k';
                    break;

            }

            if (this.getPieceColor(file, rank) === 'white') return FEN.toUpperCase();
            return FEN;
        }
    }, {
        key: '_getFENBoard',
        value: function _getFENBoard() {

            var result = '';

            for (var rank = 7; rank >= 0; rank--) {
                var vacancy = 0;
                for (var file = 0; file < 8; file++) {
                    if (this._getFENPiece(file, rank) !== null) {
                        if (vacancy !== 0) {
                            result += vacancy;
                            vacancy = 0;
                        }
                        result += this._getFENPiece(file, rank);
                    } else {
                        vacancy++;
                    }
                }
                if (vacancy !== 0) result += vacancy;
                if (rank > 0) result += '/';
            }

            return result;
        }
    }, {
        key: '_getFENTurn',
        value: function _getFENTurn() {

            if (this.turn === 'white') {
                return 'w';
            } else {
                return 'b';
            }
        }
    }, {
        key: '_getFENCastling',
        value: function _getFENCastling() {

            var result = '';

            if (this.castling.white % 2 == 1) result += 'K';
            if (this.castling.white > 1) result += 'Q';
            if (this.castling.black % 2 == 1) result += 'k';
            if (this.castling.black > 1) result += 'q';

            if (result) return result;
            return '-';
        }
    }, {
        key: '_getFENEnPassant',
        value: function _getFENEnPassant() {

            var enPassant = this.enPassant;
            if (!this.enPassant) return '-';
            return String.fromCharCode(enPassant.file + 97) + (enPassant.rank + 1);
        }
    }]);

    return JBoard;
}();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pib2FyZC5qcyIsImRldi9saWIvamNoZXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDT3dCLFM7O0FBTnhCOzs7Ozs7QUFNZSxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7O0FBRXRDOztBQUVBLFFBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBWDtBQUFBLFFBQ0ksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FEWjs7QUFHQSxVQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsT0FBcEI7QUFDQSxTQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLGFBQUssSUFBSSxPQUFPLENBQWhCLEVBQW1CLE9BQU8sQ0FBMUIsRUFBNkIsTUFBN0IsRUFBcUM7QUFDakMsZ0JBQUksU0FBUyxVQUFVLE1BQVYsRUFBa0IsSUFBbEIsRUFBd0IsSUFBeEIsQ0FBYjtBQUNBLG1CQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQWpDO0FBQ0Esa0JBQU0sV0FBTixDQUFrQixNQUFsQjtBQUNIO0FBQ0o7O0FBRUQsU0FBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0EsV0FBTyxJQUFQOztBQUVBLGFBQVMsWUFBVCxDQUFzQixDQUF0QixFQUF5QjtBQUNyQixlQUFPLFVBQVAsQ0FBa0IsQ0FBQyxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLElBQXBDLEVBQTBDLENBQUMsRUFBRSxNQUFGLENBQVMsT0FBVCxDQUFpQixJQUE1RDtBQUNBLGtCQUFVLE1BQVY7QUFDSDtBQUNKOztBQUVELFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQjs7QUFFdkI7O0FBRUEsUUFBSSxVQUFVLFNBQVMs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QStCLElBQS9CLEVBQXFDLEtBQXJDLENBQTJDLElBQTFGO0FBQ0g7OztzQ0FFYSxJLEVBQU0sSSxFQUFNO0FBQ3RCLG1CQUFPLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsS0FBd0MsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQyxLQUFyQyxDQUEyQyxLQUExRjtBQUNIOztBQUVEOzs7Ozs7bUNBSVcsSSxFQUFNLEksRUFBTTtBQUNuQixpQkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixJQUExQixFQUFnQyxJQUFoQztBQUNIOztBQUVEOzs7Ozs7eUNBSWlCLEksRUFBTSxJLEVBQU07QUFDekIsbUJBQU8sS0FBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7dUNBSWUsSSxFQUFNLEksRUFBTTtBQUN2QixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxjQUFmLENBQThCLElBQTlCLEVBQW9DLElBQXBDLENBQVA7QUFDSDs7Ozs7O2tCQWhFZ0IsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8qXG4gKiAgICAgYm9hcmQuanMgZm9yIGpDaGVzcyBwcm9qZWN0XG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pjaGVzcy5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0Qm9hcmQoamNoZXNzKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC13cmFwJyksXG4gICAgICAgIGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuXG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmQnKTtcbiAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICBmb3IgKGxldCByYW5rID0gMDsgcmFuayA8IDg7IHJhbmsrKykge1xuICAgICAgICAgICAgbGV0IHNxdWFyZSA9IG5ld1NxdWFyZShqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlckNsaWNrKTtcbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cmFwLmFwcGVuZENoaWxkKGJvYXJkKTtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZXJDbGljayhlKSB7XG4gICAgICAgIGpjaGVzcy5waWNrU3F1YXJlKCtlLnRhcmdldC5kYXRhc2V0LmZpbGUsICtlLnRhcmdldC5kYXRhc2V0LnJhbmspO1xuICAgICAgICBkcmF3Qm9hcmQoamNoZXNzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdCb2FyZChqY2hlc3MpIHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmRfX3NxdWFyZScpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgbGV0IGZpbGUgPSBzcXVhcmVzW2ldLmRhdGFzZXQuZmlsZSxcbiAgICAgICAgICAgIHJhbmsgPSBzcXVhcmVzW2ldLmRhdGFzZXQucmFuaztcblxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0LnNlbGVjdGVkICE9IGpjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0Lm1hcmtlZCAhPSBqY2hlc3MuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQucGllY2UgIT0gamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxufVxuXG5mdW5jdGlvbiBuZXdTcXVhcmUoamNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3F1YXJlLmRhdGFzZXQuZmlsZSA9IGZpbGU7XG4gICAgc3F1YXJlLmRhdGFzZXQucmFuayA9IHJhbms7XG4gICAgZHJhd1NxdWFyZShzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgcmV0dXJuIHNxdWFyZTtcblxufVxuXG5mdW5jdGlvbiBkcmF3U3F1YXJlKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBzcXVhcmUuZGF0YXNldC5zZWxlY3RlZCA9ICtqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICBzcXVhcmUuZGF0YXNldC5tYXJrZWQgPSAramNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspO1xuICAgIHNxdWFyZS5kYXRhc2V0LnBpZWNlID0gKyEhamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKTtcbiAgICBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICByZXR1cm4gdHJ1ZTtcblxufVxuXG5mdW5jdGlvbiBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBzcXVhcmUucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlJyk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGpjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG5cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIGlmIChzcXVhcmUuZGF0YXNldC5tYXJrZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9tYXJrZWRfJyArIGpjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuXG4gICAgaWYgKHNxdWFyZS5kYXRhc2V0LnBpZWNlID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykgKyAnXydcbiAgICAgICAgICAgICsgamNoZXNzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufSIsImltcG9ydCBKQ2hlc3MgZnJvbSAnLi4vbGliL2pjaGVzcyc7XG5pbXBvcnQgaW5pdEJvYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvYm9hcmQvYm9hcmQnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgbGV0IGpjaGVzcyA9IG5ldyBKQ2hlc3M7XG4gICAgamNoZXNzLnNldFVwUG9zaXRpb24oW1xuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVlbicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgIHJhbms6IDIsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogMixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDUsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiAzLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDQsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiAzLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDIsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgIHJhbms6IDUsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICByYW5rOiAzLFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXSk7XG4gICAgaW5pdEJvYXJkKGpjaGVzcyk7XG59KTsiLCJcbi8qXG4gKiAgICAgakNoZXNzIH4gamJvYXJkLmpzXG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpCb2FyZCB7XG5cbiAgICAvKlxuICAgICAqICAgQ09OU1RSVUNUT1JcbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMuYm9hcmQgPSBbXTtcblxuICAgICAgICB0aGlzLl9pbml0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5fcGFpbnRCb2FyZCgpO1xuXG4gICAgICAgIHRoaXMudHVybiA9ICd3aGl0ZSc7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RGaWxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWxlY3RSYW5rID0gbnVsbDtcblxuICAgICAgICB0aGlzLmVuUGFzc2FudCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jYXN0bGluZyA9IHtcbiAgICAgICAgICAgIHdoaXRlOiAzLFxuICAgICAgICAgICAgYmxhY2s6IDNcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLklOSVRJQUxfUE9TSVRJT04gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVlbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuTU9WRVMgPSB7XG4gICAgICAgICAgICByb29rOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAga25pZ2h0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0yLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMixcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBiaXNob3A6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHF1ZWVuOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAga2luZzogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIElOSVRJQUxJWkFUSU9OXG4gICAgICovXG5cbiAgICBfaW5pdEJvYXJkKCkge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW2ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWFya2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX3BhaW50Qm9hcmQoKSB7XG5cbiAgICAgICAgbGV0IGNvdW50U3F1YXJlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50U3F1YXJlKys7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0uY29sb3IgPSAoY291bnRTcXVhcmUrKyAlIDIpID8gJ2JsYWNrJyA6ICd3aGl0ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVRVUFxuICAgICAqL1xuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLnNldFVwUG9zaXRpb24odGhpcy5JTklUSUFMX1BPU0lUSU9OKTtcbiAgICB9XG5cbiAgICBzZXRVcFBvc2l0aW9uKHBpZWNlU2V0KSB7XG5cbiAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG4gICAgICAgIHBpZWNlU2V0LmZvckVhY2goXG4gICAgICAgICAgICAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFVwUGllY2UoaXRlbS5maWxlLCBpdGVtLnJhbmssIGl0ZW0ucGllY2UudHlwZSwgaXRlbS5waWVjZS5jb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZXNldFBvc2l0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChpdGVtLCBmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlLCByYW5rKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRVcFBpZWNlKGZpbGUsIHJhbmssIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIF9zZXRVcFBpZWNlKGZpbGUsIHJhbmssIHR5cGUsIGNvbG9yKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNRVUFSRSBHRVRURVJTXG4gICAgICovXG5cbiAgICBnZXRTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmRbZmlsZV1bcmFua107XG4gICAgfVxuXG4gICAgZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS5jb2xvcjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU1FVQVJFIFNFVFRFUlNcbiAgICAgKi9cblxuICAgIHNldFBpZWNlVHlwZShmaWxlLCByYW5rLCB0eXBlKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZSA9IHR5cGU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgc2V0UGllY2VDb2xvcihmaWxlLCByYW5rLCBjb2xvcikge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgc2V0UGllY2UoZmlsZSwgcmFuaywgdHlwZSwgY29sb3IpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLnR5cGUgPSB0eXBlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBFTiBQQVNTQU5UXG4gICAgICovXG5cbiAgICBfY2hlY2tFblBhc3NhbnQoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBwaWVjZSA9IHRoaXMuZ2V0UGllY2VUeXBlKHRoaXMuc2VsZWN0RmlsZSwgdGhpcy5zZWxlY3RSYW5rKTtcblxuICAgICAgICBpZiAocGllY2UgPT0gJ3Bhd24nKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2lzRW5QYXNzYW50KGZpbGUsIHJhbmspICYmIHRoaXMuX3JlbW92ZVBpZWNlKGZpbGUsIHRoaXMuc2VsZWN0UmFuayk7XG4gICAgICAgICAgICB0aGlzLl9zZXRFblBhc3NhbnQobnVsbCk7XG5cbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcih0aGlzLnNlbGVjdEZpbGUsIHRoaXMuc2VsZWN0UmFuayk7XG5cbiAgICAgICAgICAgIGlmIChjb2xvciA9PT0gJ3doaXRlJykge1xuXG4gICAgICAgICAgICAgICAgcmFuayA9PSAzICYmIHRoaXMuX3NldEVuUGFzc2FudChmaWxlLCAyKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJhbmsgPT0gNCAmJiB0aGlzLl9zZXRFblBhc3NhbnQoZmlsZSwgNSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldEVuUGFzc2FudChudWxsKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgX2dldEVuUGFzc2FudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5QYXNzYW50O1xuICAgIH1cblxuICAgIF9zZXRFblBhc3NhbnQoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykgfHwgKHJhbmsgIT0gMiAmJiByYW5rICE9IDUpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW5QYXNzYW50ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lblBhc3NhbnQgPSB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9pc0VuUGFzc2FudChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHBhc3MgPSB0aGlzLl9nZXRFblBhc3NhbnQoKTtcbiAgICAgICAgaWYgKCFwYXNzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBwYXNzLmZpbGUgPT0gZmlsZSAmJiBwYXNzLnJhbmsgPT0gcmFuaztcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBQSUNLXG4gICAgICovXG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICB0aGlzLl9kb01vdmUodGhpcy5zZWxlY3RGaWxlLCB0aGlzLnNlbGVjdFJhbmssIGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZpbGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RSYW5rID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0TWFya3MoKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5fcmVzZXRTZWxlY3QoKTtcbiAgICAgICAgICAgIHNxdWFyZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZpbGUgPSBmaWxlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RSYW5rID0gcmFuaztcbiAgICAgICAgICAgIHRoaXMuX21hcmtNb3ZlcyhmaWxlLCByYW5rKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgX3Bhc3NUdXJuKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT09ICd3aGl0ZScpIHtcbiAgICAgICAgICAgIHRoaXMudHVybiA9ICdibGFjayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnR1cm4gPSAnd2hpdGUnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VMRUNUXG4gICAgICovXG5cbiAgICBfcmVzZXRTZWxlY3QoKSB7XG5cbiAgICAgICAgdGhpcy5ib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGZpbGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGZpbGUuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBpc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5zZWxlY3RlZDtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBNQVJLIE1PVkVTXG4gICAgICovXG5cbiAgICBfcmVzZXRNYXJrcygpIHtcblxuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoZmlsZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUubWFya2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBpc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBzcXVhcmUubWFya2VkO1xuXG4gICAgfVxuXG4gICAgX21hcmtNb3ZlcyhmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuX3Jlc2V0TWFya3MoKTtcblxuICAgICAgICBpZiAodGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspICE9PSB0aGlzLnR1cm4pIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICghIXRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgIGxldCBtb3ZlcyA9IHRoaXMuX2dldE1vdmVzKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgaWYgKCFtb3ZlcykgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBtb3Zlcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaXRlbS5maWxlXVtpdGVtLnJhbmtdLm1hcmtlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXMoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgY2FzZSAncGF3bic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGF3bihmaWxlLCByYW5rKTtcblxuICAgICAgICAgICAgY2FzZSAna2luZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzS2luZyhmaWxlLCByYW5rKTtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgRE8gTU9WRVxuICAgICAqL1xuXG4gICAgX2RvTW92ZShzdGFydEZpbGUsIHN0YXJ0UmFuaywgc3RvcEZpbGUsIHN0b3BSYW5rKSB7XG5cbiAgICAgICAgdGhpcy5fY2hlY2tFblBhc3NhbnQoc3RvcEZpbGUsIHN0b3BSYW5rKTtcblxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuZ2V0UGllY2VUeXBlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoc3RvcEZpbGUsIHN0b3BSYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoc3RhcnRGaWxlLCBzdGFydFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzRnJpZW5kKGNvbG9yLCBzdG9wRmlsZSwgc3RvcFJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodHlwZSA9PSAna2luZycgJiYgTWF0aC5hYnMoc3RhcnRGaWxlIC0gc3RvcEZpbGUpID09PSAyKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2RvQ2FzdGxpbmcoY29sb3IsIHN0b3BGaWxlKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLnNldFBpZWNlKHN0b3BGaWxlLCBzdG9wUmFuaywgdHlwZSwgY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGllY2Uoc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PSAna2luZycgfHwgdHlwZSA9PSAncm9vaycpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrQ2FzdGxpbmcoY29sb3IsIHR5cGUsIHN0YXJ0RmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wYXNzVHVybigpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIENIRUNLIE1PVkVcbiAgICAgKi9cblxuICAgIF9jaGVja01vdmUoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuaykge1xuXG4gICAgICAgIGxldCBjaGVja0JvYXJkID0gdGhpcy5fY2xvbmVCb2FyZCh0aGlzKTtcblxuICAgICAgICBpZiAoY2hlY2tCb2FyZC5fZG9Nb3ZlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspKSB7XG4gICAgICAgICAgICByZXR1cm4gIWNoZWNrQm9hcmQuX2lzQ2hlY2sodGhpcy5nZXRQaWVjZUNvbG9yKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBQQVdOIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZXMgPSBbXTtcbiAgICAgICAgbGV0IHBhd25Db2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKTtcbiAgICAgICAgbGV0IG1vdmVEaXJlY3Rpb24gPSAocGF3bkNvbG9yID09ICd3aGl0ZScpID8gMSA6IC0xO1xuXG4gICAgICAgIGxldCB0YXJnZXRGaWxlID0gZmlsZTtcbiAgICAgICAgbGV0IHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVTcXVhcmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcblxuICAgICAgICAgICAgICAgIGlmICgocGF3bkNvbG9yID09ICd3aGl0ZScgJiYgcmFuayA9PSAxKSB8fCAocGF3bkNvbG9yID09ICdibGFjaycgJiYgcmFuayA9PSA2KSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIDIgKiBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSB8fCB0aGlzLl9wdXNoTW92ZShtb3ZlcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIG1vdmVEaXJlY3Rpb247XG5cbiAgICAgICAgdGFyZ2V0RmlsZSA9IGZpbGUgLSAxO1xuICAgICAgICBpZiAodGhpcy5faXNGb2UocGF3bkNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSB8fCAodGhpcy5faXNFblBhc3NhbnQodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShtb3ZlcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRGaWxlID0gZmlsZSArIDE7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZvZShwYXduQ29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8ICh0aGlzLl9pc0VuUGFzc2FudCh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJNb3Zlcyhtb3ZlcywgZmlsZSwgcmFuayk7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIEtJTkcgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc0tpbmcoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBtb3ZlcyA9ICB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspO1xuICAgICAgICBsZXQgY2FzdGxpbmcgPSB0aGlzLl9nZXRDYXN0bGluZ01vdmUoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgY2FzdGxpbmcgJiYgY2FzdGxpbmcuZm9yRWFjaCgoaXRlbSkgPT4gbW92ZXMucHVzaChpdGVtKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck1vdmVzKG1vdmVzLCBmaWxlLCByYW5rKTtcblxuICAgIH1cblxuICAgIF9nZXRDYXN0bGluZ01vdmUoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICggIShmaWxlID09PSA0ICYmIChyYW5rID09PSAwIHx8IHJhbmsgPT09IDcpKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBjb2xvciA9IChyYW5rID09PSAwKSA/ICd3aGl0ZScgOiAnYmxhY2snO1xuICAgICAgICBpZiAodGhpcy5jYXN0bGluZ1tjb2xvcl0gPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBpZiAodGhpcy5faXNDaGVjayhjb2xvcikpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuY2FzdGxpbmdbY29sb3JdID4gMSAmJiAhdGhpcy5faXNTcXVhcmVBdHRhY2tlZChjb2xvciwgZmlsZSAtIDEsIHJhbmspICYmXG4gICAgICAgICAgICAodGhpcy5faXNFbXB0eShmaWxlIC0gMSwgcmFuaykpICYmICh0aGlzLl9pc0VtcHR5KGZpbGUgLSAyLCByYW5rKSkgJiYgKHRoaXMuX2lzRW1wdHkoZmlsZSAtIDMsIHJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCAyLCByYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhc3RsaW5nW2NvbG9yXSAlIDIgPT09IDEgJiYgIXRoaXMuX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGZpbGUgKyAxLCByYW5rKSAmJlxuICAgICAgICAgICAgKHRoaXMuX2lzRW1wdHkoZmlsZSArIDEsIHJhbmspKSAmJiAodGhpcy5faXNFbXB0eShmaWxlICsgMiwgcmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIDYsIHJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIF9jaGVja0Nhc3RsaW5nKGNvbG9yLCB0eXBlLCBmaWxlKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FzdGxpbmdbY29sb3JdID4gMCkge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ2tpbmcnKSB0aGlzLmNhc3RsaW5nW2NvbG9yXSA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZSA9PSAncm9vaycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSA9PT0gMCAmJiB0aGlzLmNhc3RsaW5nW2NvbG9yXSA+IDEpIHRoaXMuY2FzdGxpbmdbY29sb3JdIC09IDI7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUgPT09IDcgJiYgdGhpcy5jYXN0bGluZ1tjb2xvcl0gJSAyID09IDEpIHRoaXMuY2FzdGxpbmdbY29sb3JdIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9kb0Nhc3RsaW5nKGNvbG9yLCBmaWxlKSB7XG5cbiAgICAgICAgaWYgKGNvbG9yID09PSAnd2hpdGUnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoZmlsZSwgMCwgJ2tpbmcnLCAnd2hpdGUnKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDQsIDApO1xuXG4gICAgICAgICAgICBpZiAoZmlsZSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoMywgMCwgJ3Jvb2snLCAnd2hpdGUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSgwLCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQaWVjZSg1LCAwLCAncm9vaycsICd3aGl0ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoZmlsZSwgNywgJ2tpbmcnLCAnYmxhY2snKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDQsIDcpO1xuXG4gICAgICAgICAgICBpZiAoZmlsZSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoMywgNywgJ3Jvb2snLCAnYmxhY2snKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSgwLCA3KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQaWVjZSg1LCA3LCAncm9vaycsICdibGFjaycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDcsIDcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgUElFQ0UgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgcGllY2UgPSB0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKTtcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIGxldCBtb3ZlcyA9IHRoaXMuX2dldEF0dGFja2VkU3F1YXJlcyhwaWVjZSwgY29sb3IsIGZpbGUsIHJhbmspO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJNb3Zlcyhtb3ZlcywgZmlsZSwgcmFuayk7XG5cbiAgICB9XG5cbiAgICBfZmlsdGVyTW92ZXMobW92ZXMsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIW1vdmVzKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gbW92ZXMuZmlsdGVyKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tNb3ZlKGZpbGUsIHJhbmssIGl0ZW0uZmlsZSwgaXRlbS5yYW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIF9nZXRBdHRhY2tlZFNxdWFyZXMocGllY2UsIGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5NT1ZFU1twaWVjZV07XG4gICAgICAgIGxldCBjb3VudCA9IChwaWVjZSA9PSAna2luZycgfHwgcGllY2UgPT0gJ2tuaWdodCcpID8gMSA6IDc7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcblxuICAgICAgICBtb3Zlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IGNvdW50KSB7XG5cbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBmaWxlICsgaSAqIGl0ZW0uZmlsZTtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0UmFuayA9IHJhbmsgKyBpICogaXRlbS5yYW5rO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbGlkYXRlU3F1YXJlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRnJpZW5kKGNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNGb2UoY29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgVkFMSURBVE9SU1xuICAgICAqL1xuXG4gICAgX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIChmaWxlICE9PSBudWxsICYmIHJhbmsgIT09IG51bGwpICYmIChmaWxlID49IDAgJiYgZmlsZSA8PSA3ICYmIHJhbmsgPj0gMCAmJiByYW5rIDw9IDcpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVJWSUNFU1xuICAgICAqL1xuXG4gICAgIF9wdXNoTW92ZShyZXN1bHQsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZSA9IHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICByYW5rOiByYW5rXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdC5wdXNoKG1vdmUpO1xuXG4gICAgfVxuXG4gICAgIF9pc0ZyaWVuZChjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgIHJldHVybiAoY29sb3IgPT09IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG5cbiAgICB9XG5cbiAgICAgX2lzRm9lKGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgcmV0dXJuIChjb2xvciAhPT0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspKTtcblxuICAgIH1cblxuICAgICBfaXNFbXB0eShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSBudWxsO1xuXG4gICAgfVxuXG4gICAgX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzU3F1YXJlQXR0YWNrZWRCeVBhd24oY29sb3IsIGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHBpZWNlcyA9IFsncm9vaycsICdrbmlnaHQnLCAnYmlzaG9wJywgJ3F1ZWVuJywgJ2tpbmcnXTtcblxuICAgICAgICAgICAgcGllY2VzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKHR5cGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZXMgPSB0aGlzLl9nZXRBdHRhY2tlZFNxdWFyZXModHlwZSwgY29sb3IsIGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZXMgJiYgc3F1YXJlcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFBpZWNlVHlwZShpdGVtLmZpbGUsIGl0ZW0ucmFuaykgPT0gdHlwZSkgcmVzdWx0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBfaXNTcXVhcmVBdHRhY2tlZEJ5UGF3bihjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCB0YXJnZXRSYW5rID0gKGNvbG9yID09ICd3aGl0ZScpID8gcmFuayArIDEgOiByYW5rIC0gMTtcbiAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBbZmlsZSAtIDEsIGZpbGUgKyAxXTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gdGFyZ2V0RmlsZS5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbSkgPT4gdGhpcy5nZXRQaWVjZVR5cGUoaXRlbSwgdGFyZ2V0UmFuaykgPT0gJ3Bhd24nICYmIHRoaXMuX2lzRm9lKGNvbG9yLCBpdGVtLCB0YXJnZXRSYW5rKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcblxuICAgIH1cblxuICAgIF9pc0NoZWNrKGNvbG9yKSB7XG5cbiAgICAgICAgbGV0IGtpbmcgPSB0aGlzLl9nZXRLaW5nKGNvbG9yKTtcblxuICAgICAgICBpZiAoa2luZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGtpbmcuZmlsZSwga2luZy5yYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIF9nZXRLaW5nKGNvbG9yKSB7XG5cbiAgICAgICAgaWYgKGNvbG9yICE9ICd3aGl0ZScgJiYgY29sb3IgIT0gJ2JsYWNrJykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09ICdraW5nJyAmJiB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykgPT0gY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rOiByYW5rXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBfcmVtb3ZlUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIHRoaXMuc2V0UGllY2VUeXBlKGZpbGUsIHJhbmssIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBpZWNlQ29sb3IoZmlsZSwgcmFuaywgbnVsbCk7XG5cbiAgICB9XG5cbiAgICBfY2xvbmVCb2FyZChzcmMpIHtcblxuICAgICAgICBsZXQgbmV3Qm9hcmQgPSBuZXcgSkJvYXJkO1xuXG4gICAgICAgIGlmIChzcmMuZW5QYXNzYW50ICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIG5ld0JvYXJkLmVuUGFzc2FudCA9IHtcbiAgICAgICAgICAgICAgICBmaWxlOiBzcmMuZW5QYXNzYW50LmZpbGUsXG4gICAgICAgICAgICAgICAgcmFuazogc3JjLmVuUGFzc2FudC5yYW5rXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIG5ld0JvYXJkLmVuUGFzc2FudCA9IG51bGw7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG5ld0JvYXJkLmNhc3RsaW5nID0ge1xuICAgICAgICAgICAgd2hpdGU6IHNyYy5jYXN0bGluZy53aGl0ZSxcbiAgICAgICAgICAgIGJsYWNrOiBzcmMuY2FzdGxpbmcuYmxhY2tcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgcmFuayA9IDA7IHJhbmsgPCA4OyByYW5rKyspIHtcblxuICAgICAgICAgICAgICAgIG5ld0JvYXJkLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLnR5cGUgPSBzcmMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZTtcbiAgICAgICAgICAgICAgICBuZXdCb2FyZC5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IHNyYy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvcjtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEZFTlxuICAgICAqL1xuXG4gICAgX2dldEZFTigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RkVOQm9hcmQoKSArICcgJyArXG4gICAgICAgIHRoaXMuX2dldEZFTlR1cm4oKSArICcgJyArXG4gICAgICAgIHRoaXMuX2dldEZFTkNhc3RsaW5nKCkgKyAnICc7XG5cbiAgICB9XG5cbiAgICBfZ2V0RkVOUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgcGllY2UgPSB0aGlzLmdldFBpZWNlVHlwZShmaWxlLCAgcmFuayk7XG4gICAgICAgIGlmICghcGllY2UpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgRkVOO1xuICAgICAgICBzd2l0Y2ggKHBpZWNlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Bhd24nOlxuICAgICAgICAgICAgICAgIEZFTiA9ICdwJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAncm9vayc6XG4gICAgICAgICAgICAgICAgRkVOID0gJ3InO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdrbmlnaHQnOlxuICAgICAgICAgICAgICAgIEZFTiA9ICduJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnYmlzaG9wJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAnYic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3F1ZWVuJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAncSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2tpbmcnOlxuICAgICAgICAgICAgICAgIEZFTiA9ICdrJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAodGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspID09PSAnd2hpdGUnKSByZXR1cm4gRkVOLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICByZXR1cm4gRkVOO1xuXG4gICAgfVxuXG4gICAgX2dldEZFTkJvYXJkKCkge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcblxuICAgICAgICBmb3IgKGxldCByYW5rID0gNzsgcmFuayA+PSAwOyByYW5rLS0pIHtcbiAgICAgICAgICAgIGxldCB2YWNhbmN5ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dldEZFTlBpZWNlKGZpbGUsIHJhbmspICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWNhbmN5ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFjYW5jeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhY2FuY3kgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0aGlzLl9nZXRGRU5QaWVjZShmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWNhbmN5Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhY2FuY3kgIT09IDApIHJlc3VsdCArPSB2YWNhbmN5O1xuICAgICAgICAgICAgaWYgKHJhbmsgPiAwKSByZXN1bHQgKz0gJy8nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIF9nZXRGRU5UdXJuKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT09ICd3aGl0ZScpIHtcbiAgICAgICAgICAgIHJldHVybiAndyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2InO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBfZ2V0RkVOQ2FzdGxpbmcoKSB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gICAgICAgIGlmICh0aGlzLmNhc3RsaW5nLndoaXRlICUgMiA9PSAxKSByZXN1bHQgKz0gJ0snO1xuICAgICAgICBpZiAodGhpcy5jYXN0bGluZy53aGl0ZSA+IDEpIHJlc3VsdCArPSAnUSc7XG4gICAgICAgIGlmICh0aGlzLmNhc3RsaW5nLmJsYWNrICUgMiA9PSAxKSByZXN1bHQgKz0gJ2snO1xuICAgICAgICBpZiAodGhpcy5jYXN0bGluZy5ibGFjayA+IDEpIHJlc3VsdCArPSAncSc7XG5cbiAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuICctJztcblxuICAgIH1cblxuICAgIF9nZXRGRU5FblBhc3NhbnQoKSB7XG5cbiAgICAgICAgbGV0IGVuUGFzc2FudCA9IHRoaXMuZW5QYXNzYW50O1xuICAgICAgICBpZiAoIXRoaXMuZW5QYXNzYW50KSByZXR1cm4gJy0nO1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlblBhc3NhbnQuZmlsZSArIDk3KSArIChlblBhc3NhbnQucmFuayArIDEpO1xuXG4gICAgfVxuXG59IiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpjaGVzcy5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5pbXBvcnQgSkJvYXJkIGZyb20gJy4vamJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkNoZXNzIHtcblxuICAgIC8qXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkID0gbmV3IEpCb2FyZDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVVBcbiAgICAgKi9cblxuICAgIHNldFVwSW5pdGlhbCgpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQuc2V0VXBJbml0aWFsKCk7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5zZXRVcFBvc2l0aW9uKHBpZWNlU2V0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBnZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmNvbG9yO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBQSUNLXG4gICAgICovXG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQucGlja1NxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VMRUNUXG4gICAgICovXG5cbiAgICBpc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIE1BUktcbiAgICAgKi9cblxuICAgIGlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspO1xuICAgIH1cbn0iXX0=
