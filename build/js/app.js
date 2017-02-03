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
    board.id = 'board';

    board.addEventListener('change', function () {
        drawBoard(jchess);
    });

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
        var FEN = document.querySelector('.fen__input');
        var event = new Event('change');
        FEN.dispatchEvent(event);
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

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initFEN;
/*
 *     fen.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

function initFEN(jchess) {

    'use strict';

    var FEN = document.querySelector('.fen__input');

    FEN.addEventListener('change', function () {
        FEN.value = jchess.getFEN();
    });
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initSidebar;
/*
 *     sidebar.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

function initSidebar(jchess) {

    'use strict';

    var reset = document.querySelector('#btn_sreset');

    reset.addEventListener('click', function () {
        jchess.setUpInitial();
        var board = document.querySelector('#board');
        var event = new Event('change');
        board.dispatchEvent(event);
    });
}

},{}],4:[function(require,module,exports){
'use strict';

var _jchess = require('../lib/jchess');

var _jchess2 = _interopRequireDefault(_jchess);

var _board = require('../components/board/board');

var _board2 = _interopRequireDefault(_board);

var _sidebar = require('../components/sidebar/sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _fen = require('../components/fen/fen');

var _fen2 = _interopRequireDefault(_fen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    var jchess = new _jchess2.default();
    jchess.setUpInitial();
    (0, _board2.default)(jchess);
    (0, _sidebar2.default)(jchess);
    (0, _fen2.default)(jchess);
});

},{"../components/board/board":1,"../components/fen/fen":2,"../components/sidebar/sidebar":3,"../lib/jchess":6}],5:[function(require,module,exports){
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
        this.count = 1;
        this.countFiftyMove = 0;

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
        value: function _checkEnPassant(startFile, startRank, stopFile, stopRank) {

            var piece = this.getPieceType(startFile, startRank);

            if (piece == 'pawn') {

                this._isEnPassant(stopFile, stopRank) && this._removePiece(stopFile, startRank);
                this._setEnPassant(null);

                var color = this.getPieceColor(startFile, startRank);

                if (color === 'white') {

                    stopRank == 3 && this._setEnPassant(stopFile, 2);
                } else {

                    stopRank == 4 && this._setEnPassant(stopFile, 5);
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

            this._checkEnPassant(startFile, startRank, stopFile, stopRank);

            var type = this.getPieceType(startFile, startRank);
            var color = this.getPieceColor(startFile, startRank);
            var capture = false;

            if (!this._validateSquare(startFile, startRank)) return null;
            if (!this._validateSquare(stopFile, stopRank)) return null;
            if (this._isEmpty(startFile, startRank)) return null;
            if (this._isFriend(color, stopFile, stopRank)) return null;

            if (type == 'king' && Math.abs(startFile - stopFile) === 2) {
                this._doCastling(color, stopFile);
            } else {
                capture = this._isFoe(color, stopFile, stopRank);
                this.setPiece(stopFile, stopRank, type, color);
                this._removePiece(startFile, startRank);
            }

            if (type == 'king' || type == 'rook') {
                this._checkCastling(color, type, startFile);
            }

            if (color == 'black') {
                this.count++;
                this.countFiftyMove++;
            }

            if (capture) {
                this.countFiftyMove = 0;
            } else {
                this.countFiftyMove++;
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
        key: 'getFEN',
        value: function getFEN() {
            return this._getFENBoard() + ' ' + this._getFENTurn() + ' ' + this._getFENCastling() + ' ' + this._getFENEnPassant() + ' ' + this._getFENCounts();
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
            return this._getAlgebraicByDigits(enPassant.file, enPassant.rank);
        }
    }, {
        key: '_getFENCounts',
        value: function _getFENCounts() {

            return this.countFiftyMove + ' ' + this.count;
        }
    }, {
        key: '_getAlgebraicByDigits',
        value: function _getAlgebraicByDigits(file, rank) {
            var shiftFile = 97;
            var shiftRank = 1;
            return String.fromCharCode(file + shiftFile) + (rank + shiftRank);
        }
    }]);

    return JBoard;
}();

exports.default = JBoard;

},{}],6:[function(require,module,exports){
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

        /*
         *   FEN
         */

    }, {
        key: 'getFEN',
        value: function getFEN() {
            return this.mainBoard.getFEN();
        }
    }]);

    return JChess;
}();

exports.default = JChess;

},{"./jboard":5}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9jb21wb25lbnRzL2Zlbi9mZW4uanMiLCJkZXYvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanMiLCJkZXYvaW5kZXgvYXBwLmpzIiwiZGV2L2xpYi9qYm9hcmQuanMiLCJkZXYvbGliL2pjaGVzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ093QixTOztBQU54Qjs7Ozs7O0FBTWUsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCOztBQUV0Qzs7QUFFQSxRQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQVg7QUFBQSxRQUNJLFFBQVEsU0FBUyxhQUFULENBQXVCLFNBQXZCLENBRFo7O0FBR0EsVUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLE9BQXBCO0FBQ0EsVUFBTSxFQUFOLEdBQVcsT0FBWDs7QUFFQSxVQUFNLGdCQUFOLENBQXVCLFFBQXZCLEVBQWlDLFlBQU07QUFDbkMsa0JBQVUsTUFBVjtBQUNILEtBRkQ7O0FBSUEsU0FBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxhQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLGdCQUFJLFNBQVMsVUFBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCLElBQXhCLENBQWI7QUFDQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFqQztBQUNBLGtCQUFNLFdBQU4sQ0FBa0IsTUFBbEI7QUFDSDtBQUNKOztBQUVELFNBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNBLFdBQU8sSUFBUDs7QUFFQSxhQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUI7QUFDckIsZUFBTyxVQUFQLENBQWtCLENBQUMsRUFBRSxNQUFGLENBQVMsT0FBVCxDQUFpQixJQUFwQyxFQUEwQyxDQUFDLEVBQUUsTUFBRixDQUFTLE9BQVQsQ0FBaUIsSUFBNUQ7QUFDQSxrQkFBVSxNQUFWO0FBQ0EsWUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFWO0FBQ0EsWUFBSSxRQUFRLElBQUksS0FBSixDQUFVLFFBQVYsQ0FBWjtBQUNBLFlBQUksYUFBSixDQUFrQixLQUFsQjtBQUNIO0FBQ0o7O0FBRUQsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCOztBQUV2Qjs7QUFFQSxRQUFJLFVBQVUsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxDQUFkOztBQUVBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLE1BQTVCLEVBQW9DLEdBQXBDLEVBQXlDOztBQUVyQyxZQUFJLE9BQU8sUUFBUSxDQUFSLEVBQVcsT0FBWCxDQUFtQixJQUE5QjtBQUFBLFlBQ0ksT0FBTyxRQUFRLENBQVIsRUFBVyxPQUFYLENBQW1CLElBRDlCOztBQUdBLFlBQUksUUFBUSxDQUFSLEVBQVcsT0FBWCxDQUFtQixRQUFuQixJQUErQixPQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBQThCLElBQTlCLENBQW5DLEVBQXdFO0FBQ3BFLHVCQUFXLFFBQVEsQ0FBUixDQUFYLEVBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDO0FBQ0g7O0FBRUQsWUFBSSxRQUFRLENBQVIsRUFBVyxPQUFYLENBQW1CLE1BQW5CLElBQTZCLE9BQU8sY0FBUCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUFqQyxFQUFvRTtBQUNoRSx1QkFBVyxRQUFRLENBQVIsQ0FBWCxFQUF1QixNQUF2QixFQUErQixJQUEvQixFQUFxQyxJQUFyQztBQUNIOztBQUVELFlBQUksUUFBUSxDQUFSLEVBQVcsT0FBWCxDQUFtQixLQUFuQixJQUE0QixPQUFPLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEIsSUFBMUIsQ0FBaEMsRUFBaUU7QUFDN0QsdUJBQVcsUUFBUSxDQUFSLENBQVgsRUFBdUIsTUFBdkIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckM7QUFDSDtBQUVKOztBQUVELFdBQU8sSUFBUDtBQUVIOztBQUVELFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixJQUEzQixFQUFpQyxJQUFqQyxFQUF1Qzs7QUFFbkM7O0FBRUEsUUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0EsV0FBTyxPQUFQLENBQWUsSUFBZixHQUFzQixJQUF0QjtBQUNBLFdBQU8sT0FBUCxDQUFlLElBQWYsR0FBc0IsSUFBdEI7QUFDQSxlQUFXLE1BQVgsRUFBbUIsTUFBbkIsRUFBMkIsSUFBM0IsRUFBaUMsSUFBakM7QUFDQSxXQUFPLE1BQVA7QUFFSDs7QUFFRCxTQUFTLFVBQVQsQ0FBb0IsTUFBcEIsRUFBNEIsTUFBNUIsRUFBb0MsSUFBcEMsRUFBMEMsSUFBMUMsRUFBZ0Q7O0FBRTVDOztBQUVBLFdBQU8sT0FBUCxDQUFlLFFBQWYsR0FBMEIsQ0FBQyxPQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBQThCLElBQTlCLENBQTNCO0FBQ0EsV0FBTyxPQUFQLENBQWUsTUFBZixHQUF3QixDQUFDLE9BQU8sY0FBUCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUF6QjtBQUNBLFdBQU8sT0FBUCxDQUFlLEtBQWYsR0FBdUIsQ0FBQyxDQUFDLENBQUMsT0FBTyxZQUFQLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBQTFCO0FBQ0EsZUFBVyxNQUFYLEVBQW1CLE1BQW5CLEVBQTJCLElBQTNCLEVBQWlDLElBQWpDO0FBQ0EsV0FBTyxJQUFQO0FBRUg7O0FBRUQsU0FBUyxVQUFULENBQW9CLE1BQXBCLEVBQTRCLE1BQTVCLEVBQW9DLElBQXBDLEVBQTBDLElBQTFDLEVBQWdEOztBQUU1Qzs7QUFFQSxXQUFPLGVBQVAsQ0FBdUIsT0FBdkI7QUFDQSxXQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsZUFBckI7QUFDQSxXQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsbUJBQW1CLE9BQU8sY0FBUCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUF4Qzs7QUFFQSxRQUFJLE9BQU8sT0FBUCxDQUFlLFFBQWYsSUFBMkIsQ0FBL0IsRUFBa0M7QUFDOUIsZUFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLHdCQUFyQjtBQUNIOztBQUVELFFBQUksT0FBTyxPQUFQLENBQWUsTUFBZixJQUF5QixDQUE3QixFQUFnQztBQUM1QixlQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsMEJBQTBCLE9BQU8sY0FBUCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUEvQztBQUNIOztBQUVELFFBQUksT0FBTyxPQUFQLENBQWUsS0FBZixJQUF3QixDQUE1QixFQUErQjtBQUMzQixlQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsbUJBQW1CLE9BQU8sWUFBUCxDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUFuQixHQUFxRCxHQUFyRCxHQUNmLE9BQU8sYUFBUCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUROO0FBRUg7O0FBRUQsV0FBTyxJQUFQO0FBQ0g7Ozs7Ozs7O2tCQzlHdUIsTztBQU54Qjs7Ozs7O0FBTWUsU0FBUyxPQUFULENBQWlCLE1BQWpCLEVBQXlCOztBQUVwQzs7QUFFQSxRQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQVY7O0FBRUEsUUFBSSxnQkFBSixDQUFxQixRQUFyQixFQUErQixZQUFNO0FBQ2pDLFlBQUksS0FBSixHQUFZLE9BQU8sTUFBUCxFQUFaO0FBQ0gsS0FGRDtBQUdIOzs7Ozs7OztrQkNUdUIsVztBQU54Qjs7Ozs7O0FBTWUsU0FBUyxXQUFULENBQXFCLE1BQXJCLEVBQTZCOztBQUV4Qzs7QUFFQSxRQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQVo7O0FBRUEsVUFBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxZQUFNO0FBQ2xDLGVBQU8sWUFBUDtBQUNBLFlBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBWjtBQUNBLFlBQUksUUFBUSxJQUFJLEtBQUosQ0FBVSxRQUFWLENBQVo7QUFDQSxjQUFNLGFBQU4sQ0FBb0IsS0FBcEI7QUFDSCxLQUxEO0FBT0g7Ozs7O0FDbkJEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNOztBQUVoRDs7QUFFQSxRQUFJLFNBQVMsc0JBQWI7QUFDQSxXQUFPLFlBQVA7QUFDQSx5QkFBVSxNQUFWO0FBQ0EsMkJBQVksTUFBWjtBQUNBLHVCQUFRLE1BQVI7QUFFSCxDQVZEOzs7Ozs7Ozs7Ozs7O0FDSkE7Ozs7O0lBS3FCLE07O0FBRWpCOzs7O0FBSUEsc0JBQWM7QUFBQTs7QUFFVixhQUFLLEtBQUwsR0FBYSxFQUFiOztBQUVBLGFBQUssVUFBTDtBQUNBLGFBQUssV0FBTDs7QUFFQSxhQUFLLElBQUwsR0FBWSxPQUFaO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLGFBQUssY0FBTCxHQUFzQixDQUF0Qjs7QUFFQSxhQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsSUFBbEI7O0FBRUEsYUFBSyxTQUFMLEdBQWlCLElBQWpCOztBQUVBLGFBQUssUUFBTCxHQUFnQjtBQUNaLG1CQUFPLENBREs7QUFFWixtQkFBTztBQUZLLFNBQWhCOztBQUtBLGFBQUssZ0JBQUwsR0FBd0IsQ0FDcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sTUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQURvQixFQVNwQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxRQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBVG9CLEVBaUJwQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxRQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBakJvQixFQXlCcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sT0FESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQXpCb0IsRUFpQ3BCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLE1BREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0FqQ29CLEVBeUNwQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxRQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBekNvQixFQWlEcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sUUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQWpEb0IsRUF5RHBCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLE1BREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0F6RG9CLEVBaUVwQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxNQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBakVvQixFQXlFcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sUUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQXpFb0IsRUFpRnBCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLFFBREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0FqRm9CLEVBeUZwQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxPQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBekZvQixFQWlHcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sTUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQWpHb0IsRUF5R3BCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLFFBREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0F6R29CLEVBaUhwQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxRQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBakhvQixFQXlIcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sTUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQXpIb0IsRUFrSXBCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLE1BREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0FsSW9CLEVBMElwQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxNQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBMUlvQixFQWtKcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sTUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQWxKb0IsRUEwSnBCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLE1BREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0ExSm9CLEVBa0twQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxNQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBbEtvQixFQTBLcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sTUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQTFLb0IsRUFrTHBCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLE1BREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0FsTG9CLEVBMExwQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxNQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBMUxvQixFQWtNcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sTUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQWxNb0IsRUEwTXBCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLE1BREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0ExTW9CLEVBa05wQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxNQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBbE5vQixFQTBOcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sTUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQTFOb0IsRUFrT3BCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLE1BREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0FsT29CLEVBME9wQjtBQUNJLGtCQUFNLENBRFY7QUFFSSxrQkFBTSxDQUZWO0FBR0ksbUJBQU87QUFDSCxzQkFBTSxNQURIO0FBRUgsdUJBQU87QUFGSjtBQUhYLFNBMU9vQixFQWtQcEI7QUFDSSxrQkFBTSxDQURWO0FBRUksa0JBQU0sQ0FGVjtBQUdJLG1CQUFPO0FBQ0gsc0JBQU0sTUFESDtBQUVILHVCQUFPO0FBRko7QUFIWCxTQWxQb0IsRUEwUHBCO0FBQ0ksa0JBQU0sQ0FEVjtBQUVJLGtCQUFNLENBRlY7QUFHSSxtQkFBTztBQUNILHNCQUFNLE1BREg7QUFFSCx1QkFBTztBQUZKO0FBSFgsU0ExUG9CLENBQXhCO0FBbVFBLGFBQUssS0FBTCxHQUFhO0FBQ1Qsa0JBQU0sQ0FDRjtBQUNJLHNCQUFNLENBRFY7QUFFSSxzQkFBTTtBQUZWLGFBREUsRUFLRjtBQUNJLHNCQUFNLENBRFY7QUFFSSxzQkFBTTtBQUZWLGFBTEUsRUFTRjtBQUNJLHNCQUFNLENBRFY7QUFFSSxzQkFBTSxDQUFDO0FBRlgsYUFURSxFQWFGO0FBQ0ksc0JBQU0sQ0FBQyxDQURYO0FBRUksc0JBQU07QUFGVixhQWJFLENBREc7QUFtQlQsb0JBQVEsQ0FDSjtBQUNJLHNCQUFNLENBRFY7QUFFSSxzQkFBTTtBQUZWLGFBREksRUFLSjtBQUNJLHNCQUFNLENBRFY7QUFFSSxzQkFBTTtBQUZWLGFBTEksRUFTSjtBQUNJLHNCQUFNLENBRFY7QUFFSSxzQkFBTSxDQUFDO0FBRlgsYUFUSSxFQWFKO0FBQ0ksc0JBQU0sQ0FEVjtBQUVJLHNCQUFNLENBQUM7QUFGWCxhQWJJLEVBaUJKO0FBQ0ksc0JBQU0sQ0FBQyxDQURYO0FBRUksc0JBQU0sQ0FBQztBQUZYLGFBakJJLEVBcUJKO0FBQ0ksc0JBQU0sQ0FBQyxDQURYO0FBRUksc0JBQU0sQ0FBQztBQUZYLGFBckJJLEVBeUJKO0FBQ0ksc0JBQU0sQ0FBQyxDQURYO0FBRUksc0JBQU07QUFGVixhQXpCSSxFQTZCSjtBQUNJLHNCQUFNLENBQUMsQ0FEWDtBQUVJLHNCQUFNO0FBRlYsYUE3QkksQ0FuQkM7QUFxRFQsb0JBQVEsQ0FDSjtBQUNJLHNCQUFNLENBRFY7QUFFSSxzQkFBTTtBQUZWLGFBREksRUFLSjtBQUNJLHNCQUFNLENBRFY7QUFFSSxzQkFBTSxDQUFDO0FBRlgsYUFMSSxFQVNKO0FBQ0ksc0JBQU0sQ0FBQyxDQURYO0FBRUksc0JBQU0sQ0FBQztBQUZYLGFBVEksRUFhSjtBQUNJLHNCQUFNLENBQUMsQ0FEWDtBQUVJLHNCQUFNO0FBRlYsYUFiSSxDQXJEQztBQXVFVCxtQkFBTyxDQUNIO0FBQ0ksc0JBQU0sQ0FEVjtBQUVJLHNCQUFNO0FBRlYsYUFERyxFQUtIO0FBQ0ksc0JBQU0sQ0FEVjtBQUVJLHNCQUFNO0FBRlYsYUFMRyxFQVNIO0FBQ0ksc0JBQU0sQ0FEVjtBQUVJLHNCQUFNO0FBRlYsYUFURyxFQWFIO0FBQ0ksc0JBQU0sQ0FEVjtBQUVJLHNCQUFNLENBQUM7QUFGWCxhQWJHLEVBaUJIO0FBQ0ksc0JBQU0sQ0FEVjtBQUVJLHNCQUFNLENBQUM7QUFGWCxhQWpCRyxFQXFCSDtBQUNJLHNCQUFNLENBQUMsQ0FEWDtBQUVJLHNCQUFNLENBQUM7QUFGWCxhQXJCRyxFQXlCSDtBQUNJLHNCQUFNLENBQUMsQ0FEWDtBQUVJLHNCQUFNO0FBRlYsYUF6QkcsRUE2Qkg7QUFDSSxzQkFBTSxDQUFDLENBRFg7QUFFSSxzQkFBTTtBQUZWLGFBN0JHLENBdkVFO0FBeUdULGtCQUFNLENBQ0Y7QUFDSSxzQkFBTSxDQURWO0FBRUksc0JBQU07QUFGVixhQURFLEVBS0Y7QUFDSSxzQkFBTSxDQURWO0FBRUksc0JBQU07QUFGVixhQUxFLEVBU0Y7QUFDSSxzQkFBTSxDQURWO0FBRUksc0JBQU07QUFGVixhQVRFLEVBYUY7QUFDSSxzQkFBTSxDQURWO0FBRUksc0JBQU0sQ0FBQztBQUZYLGFBYkUsRUFpQkY7QUFDSSxzQkFBTSxDQURWO0FBRUksc0JBQU0sQ0FBQztBQUZYLGFBakJFLEVBcUJGO0FBQ0ksc0JBQU0sQ0FBQyxDQURYO0FBRUksc0JBQU0sQ0FBQztBQUZYLGFBckJFLEVBeUJGO0FBQ0ksc0JBQU0sQ0FBQyxDQURYO0FBRUksc0JBQU07QUFGVixhQXpCRSxFQTZCRjtBQUNJLHNCQUFNLENBQUMsQ0FEWDtBQUVJLHNCQUFNO0FBRlYsYUE3QkU7QUF6R0csU0FBYjtBQTZJSDs7QUFFRDs7Ozs7O3FDQUlhOztBQUVULGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsR0FBdkIsRUFBNEI7QUFDeEIscUJBQUssS0FBTCxDQUFXLENBQVgsSUFBZ0IsRUFBaEI7QUFDQSxxQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLENBQXBCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQ3hCLHlCQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxJQUFtQjtBQUNmLGtDQUFVLEtBREs7QUFFZixnQ0FBUSxLQUZPO0FBR2YsK0JBQU87QUFDSCxrQ0FBTSxJQURIO0FBRUgsbUNBQU87QUFGSjtBQUhRLHFCQUFuQjtBQVFIO0FBQ0o7QUFFSjs7O3NDQUVhOztBQUVWLGdCQUFJLGNBQWMsQ0FBbEI7QUFDQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLENBQXBCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQ3hCO0FBQ0EscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixHQUF2QixFQUE0QjtBQUN4Qix5QkFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsS0FBakIsR0FBMEIsZ0JBQWdCLENBQWpCLEdBQXNCLE9BQXRCLEdBQWdDLE9BQXpEO0FBQ0g7QUFDSjtBQUVKOztBQUVEOzs7Ozs7dUNBSWU7QUFDWCxpQkFBSyxhQUFMLENBQW1CLEtBQUssZ0JBQXhCO0FBQ0g7OztzQ0FFYSxRLEVBQVU7QUFBQTs7QUFFcEIsaUJBQUssYUFBTDtBQUNBLHFCQUFTLE9BQVQsQ0FDSSxVQUFDLElBQUQsRUFBVTtBQUNOLHNCQUFLLFdBQUwsQ0FBaUIsS0FBSyxJQUF0QixFQUE0QixLQUFLLElBQWpDLEVBQXVDLEtBQUssS0FBTCxDQUFXLElBQWxELEVBQXdELEtBQUssS0FBTCxDQUFXLEtBQW5FO0FBQ0gsYUFITDtBQU1IOzs7d0NBRWU7QUFBQTs7QUFFWixpQkFBSyxLQUFMLENBQVcsT0FBWCxDQUNJLFVBQUMsSUFBRCxFQUFPLElBQVAsRUFBZ0I7QUFDWixxQkFBSyxPQUFMLENBQ0ksVUFBQyxNQUFELEVBQVMsSUFBVCxFQUFrQjtBQUNkLDJCQUFLLFdBQUwsQ0FBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsSUFBN0IsRUFBbUMsSUFBbkM7QUFDSCxpQkFITDtBQUtILGFBUEw7QUFVSDs7O29DQUVXLEksRUFBTSxJLEVBQU0sSSxFQUFNLEssRUFBTzs7QUFFakMsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsaUJBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsSUFBakIsRUFBdUIsS0FBdkIsR0FBK0I7QUFDM0Isc0JBQU0sSUFEcUI7QUFFM0IsdUJBQU87QUFGb0IsYUFBL0I7QUFJQSxtQkFBTyxJQUFQO0FBRUg7O0FBRUQ7Ozs7OztrQ0FJVSxJLEVBQU0sSSxFQUFNO0FBQ2xCLGdCQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLElBQTNCLENBQUwsRUFBdUMsT0FBTyxJQUFQO0FBQ3ZDLG1CQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsSUFBakIsQ0FBUDtBQUNIOzs7dUNBRWMsSSxFQUFNLEksRUFBTTtBQUN2QixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLEtBQThCLEtBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckIsRUFBMkIsS0FBaEU7QUFDSDs7O3FDQUVZLEksRUFBTSxJLEVBQU07QUFDckIsbUJBQU8sS0FBSyxTQUFMLENBQWUsSUFBZixFQUFxQixJQUFyQixLQUE4QixLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLEVBQTJCLEtBQTNCLENBQWlDLElBQXRFO0FBQ0g7OztzQ0FFYSxJLEVBQU0sSSxFQUFNO0FBQ3RCLG1CQUFPLEtBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckIsS0FBOEIsS0FBSyxTQUFMLENBQWUsSUFBZixFQUFxQixJQUFyQixFQUEyQixLQUEzQixDQUFpQyxLQUF0RTtBQUNIOztBQUVEOzs7Ozs7cUNBSWEsSSxFQUFNLEksRUFBTSxJLEVBQU07O0FBRTNCLGdCQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLElBQTNCLENBQUwsRUFBdUMsT0FBTyxJQUFQO0FBQ3ZDLGlCQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLElBQWpCLEVBQXVCLEtBQXZCLENBQTZCLElBQTdCLEdBQW9DLElBQXBDO0FBQ0EsbUJBQU8sSUFBUDtBQUVIOzs7c0NBRWEsSSxFQUFNLEksRUFBTSxLLEVBQU87O0FBRTdCLGdCQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLElBQTNCLENBQUwsRUFBdUMsT0FBTyxJQUFQO0FBQ3ZDLGlCQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLElBQWpCLEVBQXVCLEtBQXZCLENBQTZCLEtBQTdCLEdBQXFDLEtBQXJDO0FBQ0EsbUJBQU8sSUFBUDtBQUVIOzs7aUNBRVEsSSxFQUFNLEksRUFBTSxJLEVBQU0sSyxFQUFPOztBQUU5QixnQkFBSSxDQUFDLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUFMLEVBQXVDLE9BQU8sSUFBUDtBQUN2QyxpQkFBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixJQUFqQixFQUF1QixLQUF2QixDQUE2QixLQUE3QixHQUFxQyxLQUFyQztBQUNBLGlCQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLElBQWpCLEVBQXVCLEtBQXZCLENBQTZCLElBQTdCLEdBQW9DLElBQXBDO0FBQ0EsbUJBQU8sSUFBUDtBQUVIOztBQUVEOzs7Ozs7d0NBSWdCLFMsRUFBVyxTLEVBQVcsUSxFQUFVLFEsRUFBVTs7QUFFdEQsZ0JBQUksUUFBUSxLQUFLLFlBQUwsQ0FBa0IsU0FBbEIsRUFBNkIsU0FBN0IsQ0FBWjs7QUFFQSxnQkFBSSxTQUFTLE1BQWIsRUFBcUI7O0FBRWpCLHFCQUFLLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEIsUUFBNUIsS0FBeUMsS0FBSyxZQUFMLENBQWtCLFFBQWxCLEVBQTRCLFNBQTVCLENBQXpDO0FBQ0EscUJBQUssYUFBTCxDQUFtQixJQUFuQjs7QUFFQSxvQkFBSSxRQUFRLEtBQUssYUFBTCxDQUFtQixTQUFuQixFQUE4QixTQUE5QixDQUFaOztBQUVBLG9CQUFJLFVBQVUsT0FBZCxFQUF1Qjs7QUFFbkIsZ0NBQVksQ0FBWixJQUFpQixLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsRUFBNkIsQ0FBN0IsQ0FBakI7QUFFSCxpQkFKRCxNQUlPOztBQUVILGdDQUFZLENBQVosSUFBaUIsS0FBSyxhQUFMLENBQW1CLFFBQW5CLEVBQTZCLENBQTdCLENBQWpCO0FBRUg7O0FBRUQsdUJBQU8sSUFBUDtBQUVIOztBQUVELGlCQUFLLGFBQUwsQ0FBbUIsSUFBbkI7QUFDQSxtQkFBTyxLQUFQO0FBRUg7Ozt3Q0FFZTtBQUNaLG1CQUFPLEtBQUssU0FBWjtBQUNIOzs7c0NBRWEsSSxFQUFNLEksRUFBTTs7QUFFdEIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBRCxJQUFzQyxRQUFRLENBQVIsSUFBYSxRQUFRLENBQS9ELEVBQW1FOztBQUUvRCxxQkFBSyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsdUJBQU8sS0FBUDtBQUVIOztBQUVELGlCQUFLLFNBQUwsR0FBaUI7QUFDYixzQkFBTSxJQURPO0FBRWIsc0JBQU07QUFGTyxhQUFqQjs7QUFLQSxtQkFBTyxJQUFQO0FBQ0g7OztxQ0FFWSxJLEVBQU0sSSxFQUFNOztBQUVyQixnQkFBSSxPQUFPLEtBQUssYUFBTCxFQUFYO0FBQ0EsZ0JBQUksQ0FBQyxJQUFMLEVBQVcsT0FBTyxLQUFQO0FBQ1gsbUJBQU8sS0FBSyxJQUFMLElBQWEsSUFBYixJQUFxQixLQUFLLElBQUwsSUFBYSxJQUF6QztBQUVIOztBQUVEOzs7Ozs7bUNBSVcsSSxFQUFNLEksRUFBTTs7QUFFbkIsZ0JBQUksU0FBUyxLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLENBQWI7QUFDQSxnQkFBSSxDQUFDLE1BQUwsRUFBYSxPQUFPLElBQVA7O0FBRWIsZ0JBQUksS0FBSyxjQUFMLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBQUosRUFBcUM7O0FBRWpDLHFCQUFLLE9BQUwsQ0FBYSxLQUFLLFVBQWxCLEVBQThCLEtBQUssVUFBbkMsRUFBK0MsSUFBL0MsRUFBcUQsSUFBckQ7O0FBRUEscUJBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLHFCQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxxQkFBSyxXQUFMO0FBQ0EscUJBQUssWUFBTDtBQUVILGFBVEQsTUFTTzs7QUFFSCxxQkFBSyxZQUFMO0FBQ0EsdUJBQU8sUUFBUCxHQUFrQixJQUFsQjtBQUNBLHFCQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxxQkFBSyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EscUJBQUssVUFBTCxDQUFnQixJQUFoQixFQUFzQixJQUF0QjtBQUVIOztBQUVELG1CQUFPLElBQVA7QUFDSDs7O29DQUVXOztBQUVSLGdCQUFJLEtBQUssSUFBTCxLQUFjLE9BQWxCLEVBQTJCO0FBQ3ZCLHFCQUFLLElBQUwsR0FBWSxPQUFaO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUssSUFBTCxHQUFZLE9BQVo7QUFDSDtBQUVKOztBQUVEOzs7Ozs7dUNBSWU7O0FBRVgsaUJBQUssS0FBTCxDQUFXLE9BQVgsQ0FDSSxVQUFDLElBQUQsRUFBVTs7QUFFTixxQkFBSyxPQUFMLENBQ0ksVUFBQyxNQUFELEVBQVk7QUFDUiwyQkFBTyxRQUFQLEdBQWtCLEtBQWxCO0FBQ0gsaUJBSEw7QUFNSCxhQVRMO0FBWUg7Ozt5Q0FFZ0IsSSxFQUFNLEksRUFBTTs7QUFFekIsZ0JBQUksU0FBUyxLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLENBQWI7QUFDQSxnQkFBSSxDQUFDLE1BQUwsRUFBYSxPQUFPLElBQVA7QUFDYixtQkFBTyxPQUFPLFFBQWQ7QUFFSDs7QUFFRDs7Ozs7O3NDQUljOztBQUVWLGlCQUFLLEtBQUwsQ0FBVyxPQUFYLENBQ0ksVUFBQyxJQUFELEVBQVU7O0FBRU4scUJBQUssT0FBTCxDQUNJLFVBQUMsTUFBRCxFQUFZO0FBQ1IsMkJBQU8sTUFBUCxHQUFnQixLQUFoQjtBQUNILGlCQUhMO0FBTUgsYUFUTDtBQVlIOzs7dUNBRWMsSSxFQUFNLEksRUFBTTs7QUFFdkIsZ0JBQUksU0FBUyxLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLENBQWI7QUFDQSxnQkFBSSxDQUFDLE1BQUwsRUFBYSxPQUFPLElBQVA7QUFDYixtQkFBTyxPQUFPLE1BQWQ7QUFFSDs7O21DQUVVLEksRUFBTSxJLEVBQU07QUFBQTs7QUFFbkIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsaUJBQUssV0FBTDs7QUFFQSxnQkFBSSxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsTUFBbUMsS0FBSyxJQUE1QyxFQUFrRCxPQUFPLElBQVA7O0FBRWxELGdCQUFJLENBQUMsQ0FBQyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsQ0FBTixFQUFxQzs7QUFFakMsb0JBQUksUUFBUSxLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLENBQVo7QUFDQSxvQkFBSSxDQUFDLEtBQUwsRUFBWSxPQUFPLElBQVA7QUFDWixzQkFBTSxPQUFOLENBQ0ksVUFBQyxJQUFELEVBQVU7QUFDTiwyQkFBSyxLQUFMLENBQVcsS0FBSyxJQUFoQixFQUFzQixLQUFLLElBQTNCLEVBQWlDLE1BQWpDLEdBQTBDLElBQTFDO0FBQ0gsaUJBSEw7QUFNSDtBQUVKOztBQUVEOzs7Ozs7a0NBSVUsSSxFQUFNLEksRUFBTTs7QUFFbEIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7O0FBRXZDLG9CQUFRLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFSOztBQUVJLHFCQUFLLE1BQUw7QUFDSSwyQkFBTyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBUDs7QUFFSixxQkFBSyxNQUFMO0FBQ0ksMkJBQU8sS0FBSyxhQUFMLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQVA7O0FBRUo7QUFDSSwyQkFBTyxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsRUFBMEIsSUFBMUIsQ0FBUDs7QUFUUjtBQWFIOztBQUVEOzs7Ozs7Z0NBSVEsUyxFQUFXLFMsRUFBVyxRLEVBQVUsUSxFQUFVOztBQUU5QyxpQkFBSyxlQUFMLENBQXFCLFNBQXJCLEVBQWdDLFNBQWhDLEVBQTJDLFFBQTNDLEVBQXFELFFBQXJEOztBQUVBLGdCQUFJLE9BQU8sS0FBSyxZQUFMLENBQWtCLFNBQWxCLEVBQTZCLFNBQTdCLENBQVg7QUFDQSxnQkFBSSxRQUFRLEtBQUssYUFBTCxDQUFtQixTQUFuQixFQUE4QixTQUE5QixDQUFaO0FBQ0EsZ0JBQUksVUFBVSxLQUFkOztBQUVBLGdCQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLFNBQXJCLEVBQWdDLFNBQWhDLENBQUwsRUFBaUQsT0FBTyxJQUFQO0FBQ2pELGdCQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLFFBQXJCLEVBQStCLFFBQS9CLENBQUwsRUFBK0MsT0FBTyxJQUFQO0FBQy9DLGdCQUFJLEtBQUssUUFBTCxDQUFjLFNBQWQsRUFBeUIsU0FBekIsQ0FBSixFQUF5QyxPQUFPLElBQVA7QUFDekMsZ0JBQUksS0FBSyxTQUFMLENBQWUsS0FBZixFQUFzQixRQUF0QixFQUFnQyxRQUFoQyxDQUFKLEVBQStDLE9BQU8sSUFBUDs7QUFFL0MsZ0JBQUksUUFBUSxNQUFSLElBQWtCLEtBQUssR0FBTCxDQUFTLFlBQVksUUFBckIsTUFBbUMsQ0FBekQsRUFBNEQ7QUFDeEQscUJBQUssV0FBTCxDQUFpQixLQUFqQixFQUF3QixRQUF4QjtBQUNILGFBRkQsTUFFTztBQUNILDBCQUFVLEtBQUssTUFBTCxDQUFZLEtBQVosRUFBbUIsUUFBbkIsRUFBNkIsUUFBN0IsQ0FBVjtBQUNBLHFCQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQXdCLFFBQXhCLEVBQWtDLElBQWxDLEVBQXdDLEtBQXhDO0FBQ0EscUJBQUssWUFBTCxDQUFrQixTQUFsQixFQUE2QixTQUE3QjtBQUNIOztBQUVELGdCQUFJLFFBQVEsTUFBUixJQUFrQixRQUFRLE1BQTlCLEVBQXNDO0FBQ2xDLHFCQUFLLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkIsSUFBM0IsRUFBaUMsU0FBakM7QUFDSDs7QUFFRCxnQkFBSSxTQUFTLE9BQWIsRUFBc0I7QUFDbEIscUJBQUssS0FBTDtBQUNBLHFCQUFLLGNBQUw7QUFDSDs7QUFFRCxnQkFBSSxPQUFKLEVBQWE7QUFDVCxxQkFBSyxjQUFMLEdBQXNCLENBQXRCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUssY0FBTDtBQUNIOztBQUVELGlCQUFLLFNBQUw7O0FBRUEsbUJBQU8sSUFBUDtBQUVIOztBQUVEOzs7Ozs7bUNBSVcsUyxFQUFXLFMsRUFBVyxRLEVBQVUsUSxFQUFVOztBQUVqRCxnQkFBSSxhQUFhLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFqQjs7QUFFQSxnQkFBSSxXQUFXLE9BQVgsQ0FBbUIsU0FBbkIsRUFBOEIsU0FBOUIsRUFBeUMsUUFBekMsRUFBbUQsUUFBbkQsQ0FBSixFQUFrRTtBQUM5RCx1QkFBTyxDQUFDLFdBQVcsUUFBWCxDQUFvQixLQUFLLGFBQUwsQ0FBbUIsU0FBbkIsRUFBOEIsU0FBOUIsQ0FBcEIsQ0FBUjtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLElBQVA7QUFDSDtBQUVKOztBQUVEOzs7Ozs7c0NBSWMsSSxFQUFNLEksRUFBTTs7QUFFdEIsZ0JBQUksUUFBUSxFQUFaO0FBQ0EsZ0JBQUksWUFBWSxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBaEI7QUFDQSxnQkFBSSxnQkFBaUIsYUFBYSxPQUFkLEdBQXlCLENBQXpCLEdBQTZCLENBQUMsQ0FBbEQ7O0FBRUEsZ0JBQUksYUFBYSxJQUFqQjtBQUNBLGdCQUFJLGFBQWEsT0FBTyxhQUF4Qjs7QUFFQSxnQkFBSSxLQUFLLGVBQUwsQ0FBcUIsVUFBckIsRUFBaUMsVUFBakMsQ0FBSixFQUFrRDs7QUFFOUMsb0JBQUksQ0FBQyxLQUFLLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUIsQ0FBTCxFQUFnRDtBQUM1Qyx5QkFBSyxTQUFMLENBQWUsS0FBZixFQUFzQixVQUF0QixFQUFrQyxVQUFsQzs7QUFFQSx3QkFBSyxhQUFhLE9BQWIsSUFBd0IsUUFBUSxDQUFqQyxJQUF3QyxhQUFhLE9BQWIsSUFBd0IsUUFBUSxDQUE1RSxFQUFnRjtBQUM1RSxxQ0FBYSxPQUFPLElBQUksYUFBeEI7QUFDQSw2QkFBSyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLFVBQTlCLEtBQTZDLEtBQUssU0FBTCxDQUFlLEtBQWYsRUFBc0IsVUFBdEIsRUFBa0MsVUFBbEMsQ0FBN0M7QUFDSDtBQUNKO0FBRUo7O0FBRUQseUJBQWEsT0FBTyxhQUFwQjs7QUFFQSx5QkFBYSxPQUFPLENBQXBCO0FBQ0EsZ0JBQUksS0FBSyxNQUFMLENBQVksU0FBWixFQUF1QixVQUF2QixFQUFtQyxVQUFuQyxLQUFtRCxLQUFLLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUIsQ0FBdkQsRUFBbUc7QUFDL0YscUJBQUssU0FBTCxDQUFlLEtBQWYsRUFBc0IsVUFBdEIsRUFBa0MsVUFBbEM7QUFDSDs7QUFFRCx5QkFBYSxPQUFPLENBQXBCO0FBQ0EsZ0JBQUksS0FBSyxNQUFMLENBQVksU0FBWixFQUF1QixVQUF2QixFQUFtQyxVQUFuQyxLQUFtRCxLQUFLLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUIsQ0FBdkQsRUFBbUc7QUFDL0YscUJBQUssU0FBTCxDQUFlLEtBQWYsRUFBc0IsVUFBdEIsRUFBa0MsVUFBbEM7QUFDSDs7QUFFRCxtQkFBTyxLQUFLLFlBQUwsQ0FBa0IsS0FBbEIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsQ0FBUDtBQUVIOztBQUVEOzs7Ozs7c0NBSWMsSSxFQUFNLEksRUFBTTs7QUFFdEIsZ0JBQUksUUFBUyxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsRUFBMEIsSUFBMUIsQ0FBYjtBQUNBLGdCQUFJLFdBQVcsS0FBSyxnQkFBTCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUFmOztBQUVBLHdCQUFZLFNBQVMsT0FBVCxDQUFpQixVQUFDLElBQUQ7QUFBQSx1QkFBVSxNQUFNLElBQU4sQ0FBVyxJQUFYLENBQVY7QUFBQSxhQUFqQixDQUFaOztBQUVBLG1CQUFPLEtBQUssWUFBTCxDQUFrQixLQUFsQixFQUF5QixJQUF6QixFQUErQixJQUEvQixDQUFQO0FBRUg7Ozt5Q0FFZ0IsSSxFQUFNLEksRUFBTTs7QUFFekIsZ0JBQUssRUFBRSxTQUFTLENBQVQsS0FBZSxTQUFTLENBQVQsSUFBYyxTQUFTLENBQXRDLENBQUYsQ0FBTCxFQUFrRCxPQUFPLElBQVA7QUFDbEQsZ0JBQUksUUFBUyxTQUFTLENBQVYsR0FBZSxPQUFmLEdBQXlCLE9BQXJDO0FBQ0EsZ0JBQUksS0FBSyxRQUFMLENBQWMsS0FBZCxNQUF5QixDQUE3QixFQUFnQyxPQUFPLElBQVA7QUFDaEMsZ0JBQUksS0FBSyxRQUFMLENBQWMsS0FBZCxDQUFKLEVBQTBCLE9BQU8sSUFBUDtBQUMxQixnQkFBSSxTQUFTLEVBQWI7O0FBRUEsZ0JBQUksS0FBSyxRQUFMLENBQWMsS0FBZCxJQUF1QixDQUF2QixJQUE0QixDQUFDLEtBQUssaUJBQUwsQ0FBdUIsS0FBdkIsRUFBOEIsT0FBTyxDQUFyQyxFQUF3QyxJQUF4QyxDQUE3QixJQUNDLEtBQUssUUFBTCxDQUFjLE9BQU8sQ0FBckIsRUFBd0IsSUFBeEIsQ0FERCxJQUNvQyxLQUFLLFFBQUwsQ0FBYyxPQUFPLENBQXJCLEVBQXdCLElBQXhCLENBRHBDLElBQ3VFLEtBQUssUUFBTCxDQUFjLE9BQU8sQ0FBckIsRUFBd0IsSUFBeEIsQ0FEM0UsRUFDMkc7QUFDdkcscUJBQUssU0FBTCxDQUFlLE1BQWYsRUFBdUIsQ0FBdkIsRUFBMEIsSUFBMUI7QUFDSDs7QUFFRCxnQkFBSSxLQUFLLFFBQUwsQ0FBYyxLQUFkLElBQXVCLENBQXZCLEtBQTZCLENBQTdCLElBQWtDLENBQUMsS0FBSyxpQkFBTCxDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQXJDLEVBQXdDLElBQXhDLENBQW5DLElBQ0MsS0FBSyxRQUFMLENBQWMsT0FBTyxDQUFyQixFQUF3QixJQUF4QixDQURELElBQ29DLEtBQUssUUFBTCxDQUFjLE9BQU8sQ0FBckIsRUFBd0IsSUFBeEIsQ0FEeEMsRUFDd0U7QUFDcEUscUJBQUssU0FBTCxDQUFlLE1BQWYsRUFBdUIsQ0FBdkIsRUFBMEIsSUFBMUI7QUFDSDs7QUFFRCxtQkFBTyxNQUFQO0FBRUg7Ozt1Q0FFYyxLLEVBQU8sSSxFQUFNLEksRUFBTTs7QUFFOUIsZ0JBQUksS0FBSyxRQUFMLENBQWMsS0FBZCxJQUF1QixDQUEzQixFQUE4QjtBQUMxQixvQkFBSSxRQUFRLE1BQVosRUFBb0IsS0FBSyxRQUFMLENBQWMsS0FBZCxJQUF1QixDQUF2QjtBQUNwQixvQkFBSSxRQUFRLE1BQVosRUFBb0I7QUFDaEIsd0JBQUksU0FBUyxDQUFULElBQWMsS0FBSyxRQUFMLENBQWMsS0FBZCxJQUF1QixDQUF6QyxFQUE0QyxLQUFLLFFBQUwsQ0FBYyxLQUFkLEtBQXdCLENBQXhCO0FBQzVDLHdCQUFJLFNBQVMsQ0FBVCxJQUFjLEtBQUssUUFBTCxDQUFjLEtBQWQsSUFBdUIsQ0FBdkIsSUFBNEIsQ0FBOUMsRUFBaUQsS0FBSyxRQUFMLENBQWMsS0FBZCxLQUF3QixDQUF4QjtBQUNwRDtBQUNKO0FBRUo7OztvQ0FFVyxLLEVBQU8sSSxFQUFNOztBQUVyQixnQkFBSSxVQUFVLE9BQWQsRUFBdUI7O0FBRW5CLHFCQUFLLFFBQUwsQ0FBYyxJQUFkLEVBQW9CLENBQXBCLEVBQXVCLE1BQXZCLEVBQStCLE9BQS9CO0FBQ0EscUJBQUssWUFBTCxDQUFrQixDQUFsQixFQUFxQixDQUFyQjs7QUFFQSxvQkFBSSxTQUFTLENBQWIsRUFBZ0I7QUFDWix5QkFBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixNQUFwQixFQUE0QixPQUE1QjtBQUNBLHlCQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckI7QUFDSCxpQkFIRCxNQUdPO0FBQ0gseUJBQUssUUFBTCxDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsTUFBcEIsRUFBNEIsT0FBNUI7QUFDQSx5QkFBSyxZQUFMLENBQWtCLENBQWxCLEVBQXFCLENBQXJCO0FBQ0g7QUFFSixhQWJELE1BYU87O0FBRUgscUJBQUssUUFBTCxDQUFjLElBQWQsRUFBb0IsQ0FBcEIsRUFBdUIsTUFBdkIsRUFBK0IsT0FBL0I7QUFDQSxxQkFBSyxZQUFMLENBQWtCLENBQWxCLEVBQXFCLENBQXJCOztBQUVBLG9CQUFJLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHlCQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLE1BQXBCLEVBQTRCLE9BQTVCO0FBQ0EseUJBQUssWUFBTCxDQUFrQixDQUFsQixFQUFxQixDQUFyQjtBQUNILGlCQUhELE1BR087QUFDSCx5QkFBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixNQUFwQixFQUE0QixPQUE1QjtBQUNBLHlCQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckI7QUFDSDtBQUVKO0FBRUo7O0FBRUQ7Ozs7Ozt1Q0FJZSxJLEVBQU0sSSxFQUFNOztBQUV2QixnQkFBSSxRQUFRLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFaO0FBQ0EsZ0JBQUksUUFBUSxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBWjs7QUFFQSxnQkFBSSxRQUFRLEtBQUssbUJBQUwsQ0FBeUIsS0FBekIsRUFBZ0MsS0FBaEMsRUFBdUMsSUFBdkMsRUFBNkMsSUFBN0MsQ0FBWjs7QUFFQSxtQkFBTyxLQUFLLFlBQUwsQ0FBa0IsS0FBbEIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsQ0FBUDtBQUVIOzs7cUNBRVksSyxFQUFPLEksRUFBTSxJLEVBQU07QUFBQTs7QUFFNUIsZ0JBQUksQ0FBQyxLQUFMLEVBQVksT0FBTyxJQUFQOztBQUVaLG1CQUFPLE1BQU0sTUFBTixDQUNILFVBQUMsSUFBRCxFQUFVO0FBQ04sdUJBQU8sT0FBSyxVQUFMLENBQWdCLElBQWhCLEVBQXNCLElBQXRCLEVBQTRCLEtBQUssSUFBakMsRUFBdUMsS0FBSyxJQUE1QyxDQUFQO0FBQ0gsYUFIRSxDQUFQO0FBTUg7Ozs0Q0FFbUIsSyxFQUFPLEssRUFBTyxJLEVBQU0sSSxFQUFNO0FBQUE7O0FBRTFDLGdCQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFaO0FBQ0EsZ0JBQUksUUFBUyxTQUFTLE1BQVQsSUFBbUIsU0FBUyxRQUE3QixHQUF5QyxDQUF6QyxHQUE2QyxDQUF6RDtBQUNBLGdCQUFJLFNBQVMsRUFBYjs7QUFFQSxrQkFBTSxPQUFOLENBQWMsVUFBQyxJQUFELEVBQVU7QUFDcEIsb0JBQUksSUFBSSxDQUFSO0FBQ0EsdUJBQU8sSUFBSSxLQUFYLEVBQWtCOztBQUVkO0FBQ0Esd0JBQUksYUFBYSxPQUFPLElBQUksS0FBSyxJQUFqQztBQUNBLHdCQUFJLGFBQWEsT0FBTyxJQUFJLEtBQUssSUFBakM7O0FBRUEsd0JBQUksT0FBSyxlQUFMLENBQXFCLFVBQXJCLEVBQWlDLFVBQWpDLENBQUosRUFBa0Q7O0FBRTlDLDRCQUFJLE9BQUssU0FBTCxDQUFlLEtBQWYsRUFBc0IsVUFBdEIsRUFBa0MsVUFBbEMsQ0FBSixFQUFtRDtBQUMvQztBQUNILHlCQUZELE1BRU87QUFDSCxtQ0FBSyxTQUFMLENBQWUsTUFBZixFQUF1QixVQUF2QixFQUFtQyxVQUFuQztBQUNIO0FBRUoscUJBUkQsTUFRTztBQUNIO0FBQ0g7O0FBRUQsd0JBQUksT0FBSyxNQUFMLENBQVksS0FBWixFQUFtQixVQUFuQixFQUErQixVQUEvQixDQUFKLEVBQWdEO0FBQ25EO0FBQ0osYUF0QkQ7O0FBd0JBLGdCQUFJLE9BQU8sTUFBUCxHQUFnQixDQUFwQixFQUF1QixPQUFPLE1BQVA7QUFDdkIsbUJBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7d0NBSWdCLEksRUFBTSxJLEVBQU07QUFDeEIsbUJBQVEsU0FBUyxJQUFULElBQWlCLFNBQVMsSUFBM0IsSUFBcUMsUUFBUSxDQUFSLElBQWEsUUFBUSxDQUFyQixJQUEwQixRQUFRLENBQWxDLElBQXVDLFFBQVEsQ0FBM0Y7QUFDSDs7QUFFRDs7Ozs7O2tDQUlXLE0sRUFBUSxJLEVBQU0sSSxFQUFNOztBQUUzQixnQkFBSSxPQUFPO0FBQ1Asc0JBQU0sSUFEQztBQUVQLHNCQUFNO0FBRkMsYUFBWDtBQUlBLG1CQUFPLElBQVAsQ0FBWSxJQUFaO0FBRUg7OztrQ0FFVSxLLEVBQU8sSSxFQUFNLEksRUFBTTs7QUFFekIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsZ0JBQUksQ0FBQyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsQ0FBTCxFQUFvQyxPQUFPLEtBQVA7QUFDcEMsbUJBQVEsVUFBVSxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBbEI7QUFFSjs7OytCQUVPLEssRUFBTyxJLEVBQU0sSSxFQUFNOztBQUV0QixnQkFBSSxDQUFDLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUFMLEVBQXVDLE9BQU8sSUFBUDtBQUN2QyxnQkFBSSxDQUFDLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFMLEVBQW9DLE9BQU8sS0FBUDtBQUNwQyxtQkFBUSxVQUFVLEtBQUssYUFBTCxDQUFtQixJQUFuQixFQUF5QixJQUF6QixDQUFsQjtBQUVKOzs7aUNBRVMsSSxFQUFNLEksRUFBTTs7QUFFakIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsbUJBQU8sS0FBSyxZQUFMLENBQWtCLElBQWxCLEVBQXdCLElBQXhCLE1BQWtDLElBQXpDO0FBRUo7OzswQ0FFaUIsSyxFQUFPLEksRUFBTSxJLEVBQU07QUFBQTs7QUFFakMsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7O0FBRXZDLGdCQUFJLFNBQVMsS0FBYjs7QUFFQSxnQkFBSSxLQUFLLHVCQUFMLENBQTZCLEtBQTdCLEVBQW9DLElBQXBDLEVBQTBDLElBQTFDLENBQUosRUFBcUQ7O0FBRWpELHlCQUFTLElBQVQ7QUFFSCxhQUpELE1BSU87O0FBRUgsb0JBQUksU0FBUyxDQUFDLE1BQUQsRUFBUyxRQUFULEVBQW1CLFFBQW5CLEVBQTZCLE9BQTdCLEVBQXNDLE1BQXRDLENBQWI7O0FBRUEsdUJBQU8sT0FBUCxDQUNJLFVBQUMsSUFBRCxFQUFVO0FBQ04sd0JBQUksVUFBVSxPQUFLLG1CQUFMLENBQXlCLElBQXpCLEVBQStCLEtBQS9CLEVBQXNDLElBQXRDLEVBQTRDLElBQTVDLENBQWQ7O0FBRUEsK0JBQVcsUUFBUSxPQUFSLENBQ1AsVUFBQyxJQUFELEVBQVU7O0FBRU4sNEJBQUksT0FBSyxZQUFMLENBQWtCLEtBQUssSUFBdkIsRUFBNkIsS0FBSyxJQUFsQyxLQUEyQyxJQUEvQyxFQUFxRCxTQUFTLElBQVQ7QUFFeEQscUJBTE0sQ0FBWDtBQU9ILGlCQVhMO0FBY0g7O0FBRUQsbUJBQU8sTUFBUDtBQUVIOzs7Z0RBRXVCLEssRUFBTyxJLEVBQU0sSSxFQUFNO0FBQUE7O0FBRXZDLGdCQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLElBQTNCLENBQUwsRUFBdUMsT0FBTyxJQUFQOztBQUV2QyxnQkFBSSxhQUFjLFNBQVMsT0FBVixHQUFxQixPQUFPLENBQTVCLEdBQWdDLE9BQU8sQ0FBeEQ7QUFDQSxnQkFBSSxhQUFhLENBQUMsT0FBTyxDQUFSLEVBQVcsT0FBTyxDQUFsQixDQUFqQjs7QUFFQSxnQkFBSSxTQUFTLFdBQVcsTUFBWCxDQUNULFVBQUMsSUFBRDtBQUFBLHVCQUFVLE9BQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixVQUF4QixLQUF1QyxNQUF2QyxJQUFpRCxPQUFLLE1BQUwsQ0FBWSxLQUFaLEVBQW1CLElBQW5CLEVBQXlCLFVBQXpCLENBQTNEO0FBQUEsYUFEUyxDQUFiOztBQUlBLG1CQUFPLE9BQU8sTUFBUCxHQUFnQixDQUF2QjtBQUVIOzs7aUNBRVEsSyxFQUFPOztBQUVaLGdCQUFJLE9BQU8sS0FBSyxRQUFMLENBQWMsS0FBZCxDQUFYOztBQUVBLGdCQUFJLElBQUosRUFBVTtBQUNOLHVCQUFPLEtBQUssaUJBQUwsQ0FBdUIsS0FBdkIsRUFBOEIsS0FBSyxJQUFuQyxFQUF5QyxLQUFLLElBQTlDLENBQVA7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7OztpQ0FFUSxLLEVBQU87O0FBRVosZ0JBQUksU0FBUyxPQUFULElBQW9CLFNBQVMsT0FBakMsRUFBMEMsT0FBTyxJQUFQOztBQUUxQyxpQkFBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxxQkFBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyx3QkFBSSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsS0FBaUMsTUFBakMsSUFBMkMsS0FBSyxhQUFMLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEtBQWtDLEtBQWpGLEVBQXdGO0FBQ3BGLCtCQUFPO0FBQ0gsa0NBQU0sSUFESDtBQUVILGtDQUFNO0FBRkgseUJBQVA7QUFJSDtBQUNKO0FBQ0o7QUFFSjs7O3FDQUVZLEksRUFBTSxJLEVBQU07O0FBRXJCLGlCQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsRUFBOEIsSUFBOUI7QUFDQSxpQkFBSyxhQUFMLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CO0FBRUg7OztvQ0FFVyxHLEVBQUs7O0FBRWIsZ0JBQUksV0FBVyxJQUFJLE1BQUosRUFBZjs7QUFFQSxnQkFBSSxJQUFJLFNBQUosS0FBa0IsSUFBdEIsRUFBNEI7QUFDeEIseUJBQVMsU0FBVCxHQUFxQjtBQUNqQiwwQkFBTSxJQUFJLFNBQUosQ0FBYyxJQURIO0FBRWpCLDBCQUFNLElBQUksU0FBSixDQUFjO0FBRkgsaUJBQXJCO0FBSUgsYUFMRCxNQUtPO0FBQ0gseUJBQVMsU0FBVCxHQUFxQixJQUFyQjtBQUNIOztBQUVELHFCQUFTLFFBQVQsR0FBb0I7QUFDaEIsdUJBQU8sSUFBSSxRQUFKLENBQWEsS0FESjtBQUVoQix1QkFBTyxJQUFJLFFBQUosQ0FBYTtBQUZKLGFBQXBCOztBQUtBLGlCQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLHFCQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLDZCQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLEVBQTJCLEtBQTNCLENBQWlDLElBQWpDLEdBQXdDLElBQUksS0FBSixDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsS0FBdEIsQ0FBNEIsSUFBcEU7QUFDQSw2QkFBUyxLQUFULENBQWUsSUFBZixFQUFxQixJQUFyQixFQUEyQixLQUEzQixDQUFpQyxLQUFqQyxHQUF5QyxJQUFJLEtBQUosQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLEtBQXRCLENBQTRCLEtBQXJFO0FBQ0g7QUFDSjs7QUFFRCxtQkFBTyxRQUFQO0FBRUg7O0FBRUQ7Ozs7OztpQ0FJUztBQUNMLG1CQUFPLEtBQUssWUFBTCxLQUFzQixHQUF0QixHQUNBLEtBQUssV0FBTCxFQURBLEdBQ3FCLEdBRHJCLEdBRUEsS0FBSyxlQUFMLEVBRkEsR0FFeUIsR0FGekIsR0FHQSxLQUFLLGdCQUFMLEVBSEEsR0FHMEIsR0FIMUIsR0FJQSxLQUFLLGFBQUwsRUFKUDtBQUtIOzs7cUNBRVksSSxFQUFNLEksRUFBTTs7QUFFckIsZ0JBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBTCxFQUF1QyxPQUFPLElBQVA7QUFDdkMsZ0JBQUksUUFBUSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBeUIsSUFBekIsQ0FBWjtBQUNBLGdCQUFJLENBQUMsS0FBTCxFQUFZLE9BQU8sSUFBUDtBQUNaLGdCQUFJLFlBQUo7QUFDQSxvQkFBUSxLQUFSOztBQUVJLHFCQUFLLE1BQUw7QUFDSSwwQkFBTSxHQUFOO0FBQ0E7O0FBRUoscUJBQUssTUFBTDtBQUNJLDBCQUFNLEdBQU47QUFDQTs7QUFFSixxQkFBSyxRQUFMO0FBQ0ksMEJBQU0sR0FBTjtBQUNBOztBQUVKLHFCQUFLLFFBQUw7QUFDSSwwQkFBTSxHQUFOO0FBQ0E7O0FBRUoscUJBQUssT0FBTDtBQUNJLDBCQUFNLEdBQU47QUFDQTs7QUFFSixxQkFBSyxNQUFMO0FBQ0ksMEJBQU0sR0FBTjtBQUNBOztBQXhCUjs7QUE0QkMsZ0JBQUksS0FBSyxhQUFMLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLE1BQW1DLE9BQXZDLEVBQWdELE9BQU8sSUFBSSxXQUFKLEVBQVA7QUFDaEQsbUJBQU8sR0FBUDtBQUVKOzs7dUNBRWM7O0FBRVgsZ0JBQUksU0FBUyxFQUFiOztBQUVBLGlCQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixRQUFRLENBQTNCLEVBQThCLE1BQTlCLEVBQXNDO0FBQ2xDLG9CQUFJLFVBQVUsQ0FBZDtBQUNBLHFCQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLHdCQUFJLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixNQUFrQyxJQUF0QyxFQUE0QztBQUN4Qyw0QkFBSSxZQUFZLENBQWhCLEVBQW1CO0FBQ2Ysc0NBQVUsT0FBVjtBQUNBLHNDQUFVLENBQVY7QUFDSDtBQUNELGtDQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFWO0FBQ0gscUJBTkQsTUFNTztBQUNIO0FBQ0g7QUFDSjtBQUNELG9CQUFJLFlBQVksQ0FBaEIsRUFBbUIsVUFBVSxPQUFWO0FBQ25CLG9CQUFJLE9BQU8sQ0FBWCxFQUFjLFVBQVUsR0FBVjtBQUNqQjs7QUFFRCxtQkFBTyxNQUFQO0FBRUg7OztzQ0FFYTs7QUFFVixnQkFBSSxLQUFLLElBQUwsS0FBYyxPQUFsQixFQUEyQjtBQUN2Qix1QkFBTyxHQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sR0FBUDtBQUNIO0FBRUo7OzswQ0FFaUI7O0FBRWQsZ0JBQUksU0FBUyxFQUFiOztBQUVBLGdCQUFJLEtBQUssUUFBTCxDQUFjLEtBQWQsR0FBc0IsQ0FBdEIsSUFBMkIsQ0FBL0IsRUFBa0MsVUFBVSxHQUFWO0FBQ2xDLGdCQUFJLEtBQUssUUFBTCxDQUFjLEtBQWQsR0FBc0IsQ0FBMUIsRUFBNkIsVUFBVSxHQUFWO0FBQzdCLGdCQUFJLEtBQUssUUFBTCxDQUFjLEtBQWQsR0FBc0IsQ0FBdEIsSUFBMkIsQ0FBL0IsRUFBa0MsVUFBVSxHQUFWO0FBQ2xDLGdCQUFJLEtBQUssUUFBTCxDQUFjLEtBQWQsR0FBc0IsQ0FBMUIsRUFBNkIsVUFBVSxHQUFWOztBQUU3QixnQkFBSSxNQUFKLEVBQVksT0FBTyxNQUFQO0FBQ1osbUJBQU8sR0FBUDtBQUVIOzs7MkNBRWtCOztBQUVmLGdCQUFJLFlBQVksS0FBSyxTQUFyQjtBQUNBLGdCQUFJLENBQUMsS0FBSyxTQUFWLEVBQXFCLE9BQU8sR0FBUDtBQUNyQixtQkFBTyxLQUFLLHFCQUFMLENBQTJCLFVBQVUsSUFBckMsRUFBMkMsVUFBVSxJQUFyRCxDQUFQO0FBRUg7Ozt3Q0FFZTs7QUFFWixtQkFBTyxLQUFLLGNBQUwsR0FBc0IsR0FBdEIsR0FBNEIsS0FBSyxLQUF4QztBQUVIOzs7OENBRXFCLEksRUFBTSxJLEVBQU07QUFDOUIsZ0JBQUksWUFBWSxFQUFoQjtBQUNBLGdCQUFJLFlBQVksQ0FBaEI7QUFDQSxtQkFBTyxPQUFPLFlBQVAsQ0FBb0IsT0FBTyxTQUEzQixLQUF5QyxPQUFPLFNBQWhELENBQVA7QUFDSDs7Ozs7O2tCQW53Q2dCLE07Ozs7Ozs7Ozs7QUNMckI7Ozs7O0FBS0E7Ozs7Ozs7O0lBRXFCLE07O0FBRWpCOzs7O0FBSUEsc0JBQWM7QUFBQTs7QUFDVixhQUFLLFNBQUwsR0FBaUIsc0JBQWpCO0FBQ0g7O0FBRUQ7Ozs7Ozt1Q0FJZTtBQUNYLGlCQUFLLFNBQUwsQ0FBZSxZQUFmO0FBQ0g7OztzQ0FFYSxRLEVBQVU7QUFDcEIsaUJBQUssU0FBTCxDQUFlLGFBQWYsQ0FBNkIsUUFBN0I7QUFDSDs7QUFFRDs7Ozs7O2tDQUlVLEksRUFBTSxJLEVBQU07QUFDbEIsbUJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixDQUFQO0FBQ0g7Ozt1Q0FFYyxJLEVBQU0sSSxFQUFNO0FBQ3ZCLG1CQUFPLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsS0FBd0MsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQyxLQUFwRjtBQUNIOzs7cUNBRVksSSxFQUFNLEksRUFBTTtBQUNyQixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEtBQXdDLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBcUMsS0FBckMsQ0FBMkMsSUFBMUY7QUFDSDs7O3NDQUVhLEksRUFBTSxJLEVBQU07QUFDdEIsbUJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixLQUF3QyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLEtBQXJDLENBQTJDLEtBQTFGO0FBQ0g7O0FBRUQ7Ozs7OzttQ0FJVyxJLEVBQU0sSSxFQUFNO0FBQ25CLGlCQUFLLFNBQUwsQ0FBZSxVQUFmLENBQTBCLElBQTFCLEVBQWdDLElBQWhDO0FBQ0g7O0FBRUQ7Ozs7Ozt5Q0FJaUIsSSxFQUFNLEksRUFBTTtBQUN6QixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxnQkFBZixDQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozt1Q0FJZSxJLEVBQU0sSSxFQUFNO0FBQ3ZCLG1CQUFPLEtBQUssU0FBTCxDQUFlLGNBQWYsQ0FBOEIsSUFBOUIsRUFBb0MsSUFBcEMsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7aUNBSVM7QUFDTCxtQkFBTyxLQUFLLFNBQUwsQ0FBZSxNQUFmLEVBQVA7QUFDSDs7Ozs7O2tCQXhFZ0IsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8qXG4gKiAgICAgYm9hcmQuanMgZm9yIGpDaGVzcyBwcm9qZWN0XG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pjaGVzcy5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0Qm9hcmQoamNoZXNzKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC13cmFwJyksXG4gICAgICAgIGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuXG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmQnKTtcbiAgICBib2FyZC5pZCA9ICdib2FyZCc7XG5cbiAgICBib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGRyYXdCb2FyZChqY2hlc3MpO1xuICAgIH0pXG5cbiAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICBmb3IgKGxldCByYW5rID0gMDsgcmFuayA8IDg7IHJhbmsrKykge1xuICAgICAgICAgICAgbGV0IHNxdWFyZSA9IG5ld1NxdWFyZShqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlckNsaWNrKTtcbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cmFwLmFwcGVuZENoaWxkKGJvYXJkKTtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZXJDbGljayhlKSB7XG4gICAgICAgIGpjaGVzcy5waWNrU3F1YXJlKCtlLnRhcmdldC5kYXRhc2V0LmZpbGUsICtlLnRhcmdldC5kYXRhc2V0LnJhbmspO1xuICAgICAgICBkcmF3Qm9hcmQoamNoZXNzKTtcbiAgICAgICAgbGV0IEZFTiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZW5fX2lucHV0Jyk7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBFdmVudCgnY2hhbmdlJyk7XG4gICAgICAgIEZFTi5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdCb2FyZChqY2hlc3MpIHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmRfX3NxdWFyZScpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgbGV0IGZpbGUgPSBzcXVhcmVzW2ldLmRhdGFzZXQuZmlsZSxcbiAgICAgICAgICAgIHJhbmsgPSBzcXVhcmVzW2ldLmRhdGFzZXQucmFuaztcblxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0LnNlbGVjdGVkICE9IGpjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0Lm1hcmtlZCAhPSBqY2hlc3MuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQucGllY2UgIT0gamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxufVxuXG5mdW5jdGlvbiBuZXdTcXVhcmUoamNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3F1YXJlLmRhdGFzZXQuZmlsZSA9IGZpbGU7XG4gICAgc3F1YXJlLmRhdGFzZXQucmFuayA9IHJhbms7XG4gICAgZHJhd1NxdWFyZShzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgcmV0dXJuIHNxdWFyZTtcblxufVxuXG5mdW5jdGlvbiBkcmF3U3F1YXJlKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBzcXVhcmUuZGF0YXNldC5zZWxlY3RlZCA9ICtqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICBzcXVhcmUuZGF0YXNldC5tYXJrZWQgPSAramNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspO1xuICAgIHNxdWFyZS5kYXRhc2V0LnBpZWNlID0gKyEhamNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKTtcbiAgICBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICByZXR1cm4gdHJ1ZTtcblxufVxuXG5mdW5jdGlvbiBzZXRDbGFzc2VzKHNxdWFyZSwgamNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBzcXVhcmUucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlJyk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGpjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG5cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIGlmIChzcXVhcmUuZGF0YXNldC5tYXJrZWQgPT0gMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZV9tYXJrZWRfJyArIGpjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgfVxuXG4gICAgaWYgKHNxdWFyZS5kYXRhc2V0LnBpZWNlID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykgKyAnXydcbiAgICAgICAgICAgICsgamNoZXNzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufSIsIi8qXG4gKiAgICAgZmVuLmpzIGZvciBqQ2hlc3MgcHJvamVjdFxuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qY2hlc3MuZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdEZFTihqY2hlc3MpIHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGxldCBGRU4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVuX19pbnB1dCcpO1xuXG4gICAgRkVOLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgRkVOLnZhbHVlID0gamNoZXNzLmdldEZFTigpO1xuICAgIH0pO1xufSIsIi8qXG4gKiAgICAgc2lkZWJhci5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRTaWRlYmFyKGpjaGVzcykge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgbGV0IHJlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bl9zcmVzZXQnKTtcblxuICAgIHJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBqY2hlc3Muc2V0VXBJbml0aWFsKCk7XG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNib2FyZCcpO1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgRXZlbnQoJ2NoYW5nZScpO1xuICAgICAgICBib2FyZC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9KTtcblxufSIsImltcG9ydCBKQ2hlc3MgZnJvbSAnLi4vbGliL2pjaGVzcyc7XG5pbXBvcnQgaW5pdEJvYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvYm9hcmQvYm9hcmQnO1xuaW1wb3J0IGluaXRTaWRlYmFyIGZyb20gJy4uL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyJztcbmltcG9ydCBpbml0RkVOIGZyb20gJy4uL2NvbXBvbmVudHMvZmVuL2Zlbic7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBsZXQgamNoZXNzID0gbmV3IEpDaGVzcztcbiAgICBqY2hlc3Muc2V0VXBJbml0aWFsKCk7XG4gICAgaW5pdEJvYXJkKGpjaGVzcyk7XG4gICAgaW5pdFNpZGViYXIoamNoZXNzKTtcbiAgICBpbml0RkVOKGpjaGVzcyk7XG5cbn0pOyIsIlxuLypcbiAqICAgICBqQ2hlc3MgfiBqYm9hcmQuanNcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkJvYXJkIHtcblxuICAgIC8qXG4gICAgICogICBDT05TVFJVQ1RPUlxuICAgICAqL1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuXG4gICAgICAgIHRoaXMuX2luaXRCb2FyZCgpO1xuICAgICAgICB0aGlzLl9wYWludEJvYXJkKCk7XG5cbiAgICAgICAgdGhpcy50dXJuID0gJ3doaXRlJztcbiAgICAgICAgdGhpcy5jb3VudCA9IDE7XG4gICAgICAgIHRoaXMuY291bnRGaWZ0eU1vdmUgPSAwO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0RmlsZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0UmFuayA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5lblBhc3NhbnQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY2FzdGxpbmcgPSB7XG4gICAgICAgICAgICB3aGl0ZTogMyxcbiAgICAgICAgICAgIGJsYWNrOiAzXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5JTklUSUFMX1BPU0lUSU9OID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3F1ZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna2luZycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Jpc2hvcCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2tuaWdodCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgICAgIHJhbms6IDAsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogNyxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA3LFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLk1PVkVTID0ge1xuICAgICAgICAgICAgcm9vazogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGtuaWdodDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMixcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTIsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYmlzaG9wOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBxdWVlbjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGtpbmc6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgX2luaXRCb2FyZCgpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0ge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9wYWludEJvYXJkKCkge1xuXG4gICAgICAgIGxldCBjb3VudFNxdWFyZSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudFNxdWFyZSsrO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdLmNvbG9yID0gKGNvdW50U3F1YXJlKysgJSAyKSA/ICdibGFjaycgOiAnd2hpdGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVVBcbiAgICAgKi9cblxuICAgIHNldFVwSW5pdGlhbCgpIHtcbiAgICAgICAgdGhpcy5zZXRVcFBvc2l0aW9uKHRoaXMuSU5JVElBTF9QT1NJVElPTik7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuXG4gICAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgICAgICBwaWVjZVNldC5mb3JFYWNoKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRVcFBpZWNlKGl0ZW0uZmlsZSwgaXRlbS5yYW5rLCBpdGVtLnBpZWNlLnR5cGUsIGl0ZW0ucGllY2UuY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgcmVzZXRQb3NpdGlvbigpIHtcblxuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoaXRlbSwgZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSwgcmFuaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0VXBQaWVjZShmaWxlLCByYW5rLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBfc2V0VXBQaWVjZShmaWxlLCByYW5rLCB0eXBlLCBjb2xvcikge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvclxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTUVVBUkUgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdO1xuICAgIH1cblxuICAgIGdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS50eXBlO1xuICAgIH1cblxuICAgIGdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykucGllY2UuY29sb3I7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNRVUFSRSBTRVRURVJTXG4gICAgICovXG5cbiAgICBzZXRQaWVjZVR5cGUoZmlsZSwgcmFuaywgdHlwZSkge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLnR5cGUgPSB0eXBlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIHNldFBpZWNlQ29sb3IoZmlsZSwgcmFuaywgY29sb3IpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIHNldFBpZWNlKGZpbGUsIHJhbmssIHR5cGUsIGNvbG9yKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS50eXBlID0gdHlwZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgRU4gUEFTU0FOVFxuICAgICAqL1xuXG4gICAgX2NoZWNrRW5QYXNzYW50KHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspIHtcblxuICAgICAgICBsZXQgcGllY2UgPSB0aGlzLmdldFBpZWNlVHlwZShzdGFydEZpbGUsIHN0YXJ0UmFuayk7XG5cbiAgICAgICAgaWYgKHBpZWNlID09ICdwYXduJykge1xuXG4gICAgICAgICAgICB0aGlzLl9pc0VuUGFzc2FudChzdG9wRmlsZSwgc3RvcFJhbmspICYmIHRoaXMuX3JlbW92ZVBpZWNlKHN0b3BGaWxlLCBzdGFydFJhbmspO1xuICAgICAgICAgICAgdGhpcy5fc2V0RW5QYXNzYW50KG51bGwpO1xuXG4gICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuXG4gICAgICAgICAgICBpZiAoY29sb3IgPT09ICd3aGl0ZScpIHtcblxuICAgICAgICAgICAgICAgIHN0b3BSYW5rID09IDMgJiYgdGhpcy5fc2V0RW5QYXNzYW50KHN0b3BGaWxlLCAyKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHN0b3BSYW5rID09IDQgJiYgdGhpcy5fc2V0RW5QYXNzYW50KHN0b3BGaWxlLCA1KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0RW5QYXNzYW50KG51bGwpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBfZ2V0RW5QYXNzYW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lblBhc3NhbnQ7XG4gICAgfVxuXG4gICAgX3NldEVuUGFzc2FudChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSB8fCAocmFuayAhPSAyICYmIHJhbmsgIT0gNSkpIHtcblxuICAgICAgICAgICAgdGhpcy5lblBhc3NhbnQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuUGFzc2FudCA9IHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICByYW5rOiByYW5rXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgX2lzRW5QYXNzYW50KGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgcGFzcyA9IHRoaXMuX2dldEVuUGFzc2FudCgpO1xuICAgICAgICBpZiAoIXBhc3MpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBhc3MuZmlsZSA9PSBmaWxlICYmIHBhc3MucmFuayA9PSByYW5rO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFBJQ0tcbiAgICAgKi9cblxuICAgIHBpY2tTcXVhcmUoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICAgICAgaWYgKCFzcXVhcmUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2RvTW92ZSh0aGlzLnNlbGVjdEZpbGUsIHRoaXMuc2VsZWN0UmFuaywgZmlsZSwgcmFuayk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RmlsZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFJhbmsgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRTZWxlY3QoKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLl9yZXNldFNlbGVjdCgpO1xuICAgICAgICAgICAgc3F1YXJlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RmlsZSA9IGZpbGU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFJhbmsgPSByYW5rO1xuICAgICAgICAgICAgdGhpcy5fbWFya01vdmVzKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBfcGFzc1R1cm4oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudHVybiA9PT0gJ3doaXRlJykge1xuICAgICAgICAgICAgdGhpcy50dXJuID0gJ2JsYWNrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHVybiA9ICd3aGl0ZSc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRUxFQ1RcbiAgICAgKi9cblxuICAgIF9yZXNldFNlbGVjdCgpIHtcblxuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoZmlsZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICAgICAgaWYgKCFzcXVhcmUpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gc3F1YXJlLnNlbGVjdGVkO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIE1BUksgTU9WRVNcbiAgICAgKi9cblxuICAgIF9yZXNldE1hcmtzKCkge1xuXG4gICAgICAgIHRoaXMuYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBmaWxlLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5tYXJrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5tYXJrZWQ7XG5cbiAgICB9XG5cbiAgICBfbWFya01vdmVzKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykgIT09IHRoaXMudHVybikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKCEhdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5fZ2V0TW92ZXMoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBpZiAoIW1vdmVzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIG1vdmVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpdGVtLmZpbGVdW2l0ZW0ucmFua10ubWFya2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3ZlcyhmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICBjYXNlICdwYXduJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICBjYXNlICdraW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNLaW5nKGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBETyBNT1ZFXG4gICAgICovXG5cbiAgICBfZG9Nb3ZlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspIHtcblxuICAgICAgICB0aGlzLl9jaGVja0VuUGFzc2FudChzdGFydEZpbGUsIHN0YXJ0UmFuaywgc3RvcEZpbGUsIHN0b3BSYW5rKTtcblxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuZ2V0UGllY2VUeXBlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcbiAgICAgICAgbGV0IGNhcHR1cmUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoc3RvcEZpbGUsIHN0b3BSYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9pc0VtcHR5KHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZyaWVuZChjb2xvciwgc3RvcEZpbGUsIHN0b3BSYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHR5cGUgPT0gJ2tpbmcnICYmIE1hdGguYWJzKHN0YXJ0RmlsZSAtIHN0b3BGaWxlKSA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy5fZG9DYXN0bGluZyhjb2xvciwgc3RvcEZpbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FwdHVyZSA9IHRoaXMuX2lzRm9lKGNvbG9yLCBzdG9wRmlsZSwgc3RvcFJhbmspO1xuICAgICAgICAgICAgdGhpcy5zZXRQaWVjZShzdG9wRmlsZSwgc3RvcFJhbmssIHR5cGUsIGNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09ICdraW5nJyB8fCB0eXBlID09ICdyb29rJykge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tDYXN0bGluZyhjb2xvciwgdHlwZSwgc3RhcnRGaWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2xvciA9PSAnYmxhY2snKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLmNvdW50RmlmdHlNb3ZlKys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FwdHVyZSkge1xuICAgICAgICAgICAgdGhpcy5jb3VudEZpZnR5TW92ZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50RmlmdHlNb3ZlKys7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wYXNzVHVybigpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIENIRUNLIE1PVkVcbiAgICAgKi9cblxuICAgIF9jaGVja01vdmUoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuaykge1xuXG4gICAgICAgIGxldCBjaGVja0JvYXJkID0gdGhpcy5fY2xvbmVCb2FyZCh0aGlzKTtcblxuICAgICAgICBpZiAoY2hlY2tCb2FyZC5fZG9Nb3ZlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspKSB7XG4gICAgICAgICAgICByZXR1cm4gIWNoZWNrQm9hcmQuX2lzQ2hlY2sodGhpcy5nZXRQaWVjZUNvbG9yKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBQQVdOIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZXMgPSBbXTtcbiAgICAgICAgbGV0IHBhd25Db2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKTtcbiAgICAgICAgbGV0IG1vdmVEaXJlY3Rpb24gPSAocGF3bkNvbG9yID09ICd3aGl0ZScpID8gMSA6IC0xO1xuXG4gICAgICAgIGxldCB0YXJnZXRGaWxlID0gZmlsZTtcbiAgICAgICAgbGV0IHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVTcXVhcmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcblxuICAgICAgICAgICAgICAgIGlmICgocGF3bkNvbG9yID09ICd3aGl0ZScgJiYgcmFuayA9PSAxKSB8fCAocGF3bkNvbG9yID09ICdibGFjaycgJiYgcmFuayA9PSA2KSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIDIgKiBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSB8fCB0aGlzLl9wdXNoTW92ZShtb3ZlcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIG1vdmVEaXJlY3Rpb247XG5cbiAgICAgICAgdGFyZ2V0RmlsZSA9IGZpbGUgLSAxO1xuICAgICAgICBpZiAodGhpcy5faXNGb2UocGF3bkNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSB8fCAodGhpcy5faXNFblBhc3NhbnQodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShtb3ZlcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRGaWxlID0gZmlsZSArIDE7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZvZShwYXduQ29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8ICh0aGlzLl9pc0VuUGFzc2FudCh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJNb3Zlcyhtb3ZlcywgZmlsZSwgcmFuayk7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIEtJTkcgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc0tpbmcoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBtb3ZlcyA9ICB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspO1xuICAgICAgICBsZXQgY2FzdGxpbmcgPSB0aGlzLl9nZXRDYXN0bGluZ01vdmUoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgY2FzdGxpbmcgJiYgY2FzdGxpbmcuZm9yRWFjaCgoaXRlbSkgPT4gbW92ZXMucHVzaChpdGVtKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck1vdmVzKG1vdmVzLCBmaWxlLCByYW5rKTtcblxuICAgIH1cblxuICAgIF9nZXRDYXN0bGluZ01vdmUoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICggIShmaWxlID09PSA0ICYmIChyYW5rID09PSAwIHx8IHJhbmsgPT09IDcpKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBjb2xvciA9IChyYW5rID09PSAwKSA/ICd3aGl0ZScgOiAnYmxhY2snO1xuICAgICAgICBpZiAodGhpcy5jYXN0bGluZ1tjb2xvcl0gPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBpZiAodGhpcy5faXNDaGVjayhjb2xvcikpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuY2FzdGxpbmdbY29sb3JdID4gMSAmJiAhdGhpcy5faXNTcXVhcmVBdHRhY2tlZChjb2xvciwgZmlsZSAtIDEsIHJhbmspICYmXG4gICAgICAgICAgICAodGhpcy5faXNFbXB0eShmaWxlIC0gMSwgcmFuaykpICYmICh0aGlzLl9pc0VtcHR5KGZpbGUgLSAyLCByYW5rKSkgJiYgKHRoaXMuX2lzRW1wdHkoZmlsZSAtIDMsIHJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCAyLCByYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhc3RsaW5nW2NvbG9yXSAlIDIgPT09IDEgJiYgIXRoaXMuX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGZpbGUgKyAxLCByYW5rKSAmJlxuICAgICAgICAgICAgKHRoaXMuX2lzRW1wdHkoZmlsZSArIDEsIHJhbmspKSAmJiAodGhpcy5faXNFbXB0eShmaWxlICsgMiwgcmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIDYsIHJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIF9jaGVja0Nhc3RsaW5nKGNvbG9yLCB0eXBlLCBmaWxlKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FzdGxpbmdbY29sb3JdID4gMCkge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ2tpbmcnKSB0aGlzLmNhc3RsaW5nW2NvbG9yXSA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZSA9PSAncm9vaycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSA9PT0gMCAmJiB0aGlzLmNhc3RsaW5nW2NvbG9yXSA+IDEpIHRoaXMuY2FzdGxpbmdbY29sb3JdIC09IDI7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUgPT09IDcgJiYgdGhpcy5jYXN0bGluZ1tjb2xvcl0gJSAyID09IDEpIHRoaXMuY2FzdGxpbmdbY29sb3JdIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9kb0Nhc3RsaW5nKGNvbG9yLCBmaWxlKSB7XG5cbiAgICAgICAgaWYgKGNvbG9yID09PSAnd2hpdGUnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoZmlsZSwgMCwgJ2tpbmcnLCAnd2hpdGUnKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDQsIDApO1xuXG4gICAgICAgICAgICBpZiAoZmlsZSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoMywgMCwgJ3Jvb2snLCAnd2hpdGUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSgwLCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQaWVjZSg1LCAwLCAncm9vaycsICd3aGl0ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoZmlsZSwgNywgJ2tpbmcnLCAnYmxhY2snKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDQsIDcpO1xuXG4gICAgICAgICAgICBpZiAoZmlsZSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoMywgNywgJ3Jvb2snLCAnYmxhY2snKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSgwLCA3KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQaWVjZSg1LCA3LCAncm9vaycsICdibGFjaycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDcsIDcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgUElFQ0UgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgcGllY2UgPSB0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKTtcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIGxldCBtb3ZlcyA9IHRoaXMuX2dldEF0dGFja2VkU3F1YXJlcyhwaWVjZSwgY29sb3IsIGZpbGUsIHJhbmspO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJNb3Zlcyhtb3ZlcywgZmlsZSwgcmFuayk7XG5cbiAgICB9XG5cbiAgICBfZmlsdGVyTW92ZXMobW92ZXMsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIW1vdmVzKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gbW92ZXMuZmlsdGVyKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tNb3ZlKGZpbGUsIHJhbmssIGl0ZW0uZmlsZSwgaXRlbS5yYW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIF9nZXRBdHRhY2tlZFNxdWFyZXMocGllY2UsIGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5NT1ZFU1twaWVjZV07XG4gICAgICAgIGxldCBjb3VudCA9IChwaWVjZSA9PSAna2luZycgfHwgcGllY2UgPT0gJ2tuaWdodCcpID8gMSA6IDc7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcblxuICAgICAgICBtb3Zlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IGNvdW50KSB7XG5cbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBmaWxlICsgaSAqIGl0ZW0uZmlsZTtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0UmFuayA9IHJhbmsgKyBpICogaXRlbS5yYW5rO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbGlkYXRlU3F1YXJlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRnJpZW5kKGNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNGb2UoY29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgVkFMSURBVE9SU1xuICAgICAqL1xuXG4gICAgX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIChmaWxlICE9PSBudWxsICYmIHJhbmsgIT09IG51bGwpICYmIChmaWxlID49IDAgJiYgZmlsZSA8PSA3ICYmIHJhbmsgPj0gMCAmJiByYW5rIDw9IDcpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVJWSUNFU1xuICAgICAqL1xuXG4gICAgIF9wdXNoTW92ZShyZXN1bHQsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZSA9IHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICByYW5rOiByYW5rXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdC5wdXNoKG1vdmUpO1xuXG4gICAgfVxuXG4gICAgIF9pc0ZyaWVuZChjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgIHJldHVybiAoY29sb3IgPT09IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG5cbiAgICB9XG5cbiAgICAgX2lzRm9lKGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgcmV0dXJuIChjb2xvciAhPT0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspKTtcblxuICAgIH1cblxuICAgICBfaXNFbXB0eShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSBudWxsO1xuXG4gICAgfVxuXG4gICAgX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzU3F1YXJlQXR0YWNrZWRCeVBhd24oY29sb3IsIGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHBpZWNlcyA9IFsncm9vaycsICdrbmlnaHQnLCAnYmlzaG9wJywgJ3F1ZWVuJywgJ2tpbmcnXTtcblxuICAgICAgICAgICAgcGllY2VzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKHR5cGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZXMgPSB0aGlzLl9nZXRBdHRhY2tlZFNxdWFyZXModHlwZSwgY29sb3IsIGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZXMgJiYgc3F1YXJlcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFBpZWNlVHlwZShpdGVtLmZpbGUsIGl0ZW0ucmFuaykgPT0gdHlwZSkgcmVzdWx0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBfaXNTcXVhcmVBdHRhY2tlZEJ5UGF3bihjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCB0YXJnZXRSYW5rID0gKGNvbG9yID09ICd3aGl0ZScpID8gcmFuayArIDEgOiByYW5rIC0gMTtcbiAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBbZmlsZSAtIDEsIGZpbGUgKyAxXTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gdGFyZ2V0RmlsZS5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbSkgPT4gdGhpcy5nZXRQaWVjZVR5cGUoaXRlbSwgdGFyZ2V0UmFuaykgPT0gJ3Bhd24nICYmIHRoaXMuX2lzRm9lKGNvbG9yLCBpdGVtLCB0YXJnZXRSYW5rKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcblxuICAgIH1cblxuICAgIF9pc0NoZWNrKGNvbG9yKSB7XG5cbiAgICAgICAgbGV0IGtpbmcgPSB0aGlzLl9nZXRLaW5nKGNvbG9yKTtcblxuICAgICAgICBpZiAoa2luZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGtpbmcuZmlsZSwga2luZy5yYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIF9nZXRLaW5nKGNvbG9yKSB7XG5cbiAgICAgICAgaWYgKGNvbG9yICE9ICd3aGl0ZScgJiYgY29sb3IgIT0gJ2JsYWNrJykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09ICdraW5nJyAmJiB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykgPT0gY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rOiByYW5rXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBfcmVtb3ZlUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIHRoaXMuc2V0UGllY2VUeXBlKGZpbGUsIHJhbmssIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBpZWNlQ29sb3IoZmlsZSwgcmFuaywgbnVsbCk7XG5cbiAgICB9XG5cbiAgICBfY2xvbmVCb2FyZChzcmMpIHtcblxuICAgICAgICBsZXQgbmV3Qm9hcmQgPSBuZXcgSkJvYXJkO1xuXG4gICAgICAgIGlmIChzcmMuZW5QYXNzYW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdCb2FyZC5lblBhc3NhbnQgPSB7XG4gICAgICAgICAgICAgICAgZmlsZTogc3JjLmVuUGFzc2FudC5maWxlLFxuICAgICAgICAgICAgICAgIHJhbms6IHNyYy5lblBhc3NhbnQucmFua1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0JvYXJkLmVuUGFzc2FudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBuZXdCb2FyZC5jYXN0bGluZyA9IHtcbiAgICAgICAgICAgIHdoaXRlOiBzcmMuY2FzdGxpbmcud2hpdGUsXG4gICAgICAgICAgICBibGFjazogc3JjLmNhc3RsaW5nLmJsYWNrXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICAgICAgbmV3Qm9hcmQuYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZSA9IHNyYy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS50eXBlO1xuICAgICAgICAgICAgICAgIG5ld0JvYXJkLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLmNvbG9yID0gc3JjLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLmNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEZFTlxuICAgICAqL1xuXG4gICAgZ2V0RkVOKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RkVOQm9hcmQoKSArICcgJyArXG4gICAgICAgICAgICAgICB0aGlzLl9nZXRGRU5UdXJuKCkgKyAnICcgK1xuICAgICAgICAgICAgICAgdGhpcy5fZ2V0RkVOQ2FzdGxpbmcoKSArICcgJyArXG4gICAgICAgICAgICAgICB0aGlzLl9nZXRGRU5FblBhc3NhbnQoKSArICcgJyArXG4gICAgICAgICAgICAgICB0aGlzLl9nZXRGRU5Db3VudHMoKTtcbiAgICB9XG5cbiAgICBfZ2V0RkVOUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgcGllY2UgPSB0aGlzLmdldFBpZWNlVHlwZShmaWxlLCAgcmFuayk7XG4gICAgICAgIGlmICghcGllY2UpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgRkVOO1xuICAgICAgICBzd2l0Y2ggKHBpZWNlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Bhd24nOlxuICAgICAgICAgICAgICAgIEZFTiA9ICdwJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAncm9vayc6XG4gICAgICAgICAgICAgICAgRkVOID0gJ3InO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdrbmlnaHQnOlxuICAgICAgICAgICAgICAgIEZFTiA9ICduJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnYmlzaG9wJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAnYic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3F1ZWVuJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAncSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2tpbmcnOlxuICAgICAgICAgICAgICAgIEZFTiA9ICdrJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAodGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspID09PSAnd2hpdGUnKSByZXR1cm4gRkVOLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICByZXR1cm4gRkVOO1xuXG4gICAgfVxuXG4gICAgX2dldEZFTkJvYXJkKCkge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcblxuICAgICAgICBmb3IgKGxldCByYW5rID0gNzsgcmFuayA+PSAwOyByYW5rLS0pIHtcbiAgICAgICAgICAgIGxldCB2YWNhbmN5ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dldEZFTlBpZWNlKGZpbGUsIHJhbmspICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWNhbmN5ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFjYW5jeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhY2FuY3kgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0aGlzLl9nZXRGRU5QaWVjZShmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWNhbmN5Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhY2FuY3kgIT09IDApIHJlc3VsdCArPSB2YWNhbmN5O1xuICAgICAgICAgICAgaWYgKHJhbmsgPiAwKSByZXN1bHQgKz0gJy8nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIF9nZXRGRU5UdXJuKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT09ICd3aGl0ZScpIHtcbiAgICAgICAgICAgIHJldHVybiAndyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2InO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBfZ2V0RkVOQ2FzdGxpbmcoKSB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gICAgICAgIGlmICh0aGlzLmNhc3RsaW5nLndoaXRlICUgMiA9PSAxKSByZXN1bHQgKz0gJ0snO1xuICAgICAgICBpZiAodGhpcy5jYXN0bGluZy53aGl0ZSA+IDEpIHJlc3VsdCArPSAnUSc7XG4gICAgICAgIGlmICh0aGlzLmNhc3RsaW5nLmJsYWNrICUgMiA9PSAxKSByZXN1bHQgKz0gJ2snO1xuICAgICAgICBpZiAodGhpcy5jYXN0bGluZy5ibGFjayA+IDEpIHJlc3VsdCArPSAncSc7XG5cbiAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuICctJztcblxuICAgIH1cblxuICAgIF9nZXRGRU5FblBhc3NhbnQoKSB7XG5cbiAgICAgICAgbGV0IGVuUGFzc2FudCA9IHRoaXMuZW5QYXNzYW50O1xuICAgICAgICBpZiAoIXRoaXMuZW5QYXNzYW50KSByZXR1cm4gJy0nO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QWxnZWJyYWljQnlEaWdpdHMoZW5QYXNzYW50LmZpbGUsIGVuUGFzc2FudC5yYW5rKTtcblxuICAgIH1cblxuICAgIF9nZXRGRU5Db3VudHMoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnRGaWZ0eU1vdmUgKyAnICcgKyB0aGlzLmNvdW50O1xuXG4gICAgfVxuXG4gICAgX2dldEFsZ2VicmFpY0J5RGlnaXRzKGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNoaWZ0RmlsZSA9IDk3O1xuICAgICAgICBsZXQgc2hpZnRSYW5rID0gMTtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZmlsZSArIHNoaWZ0RmlsZSkgKyAocmFuayArIHNoaWZ0UmFuayk7XG4gICAgfVxuXG59IiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpjaGVzcy5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5pbXBvcnQgSkJvYXJkIGZyb20gJy4vamJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkNoZXNzIHtcblxuICAgIC8qXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkID0gbmV3IEpCb2FyZDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVVBcbiAgICAgKi9cblxuICAgIHNldFVwSW5pdGlhbCgpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQuc2V0VXBJbml0aWFsKCk7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5zZXRVcFBvc2l0aW9uKHBpZWNlU2V0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBnZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmNvbG9yO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBQSUNLXG4gICAgICovXG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQucGlja1NxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VMRUNUXG4gICAgICovXG5cbiAgICBpc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIE1BUktcbiAgICAgKi9cblxuICAgIGlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBGRU5cbiAgICAgKi9cblxuICAgIGdldEZFTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldEZFTigpO1xuICAgIH1cblxufSJdfQ==
