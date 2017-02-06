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
        var FEN = document.querySelector('#fen');
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

    var FEN = document.querySelector('#fen');

    FEN.value = jchess.getFEN();

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
        var event = new Event('change');
        var board = document.querySelector('#board');
        var FEN = document.querySelector('#fen');
        board.dispatchEvent(event);
        FEN.dispatchEvent(event);
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

            this.turn = 'white';

            this.count = 1;
            this.countFiftyMove = 0;

            this.enPassant = null;

            this.castling = {
                white: 3,
                black: 3
            };

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

                if (Math.abs(startRank - stopRank) == 2) {

                    var color = this.getPieceColor(startFile, startRank);

                    if (this._isFoesPawn(color, stopFile - 1, stopRank) || this._isFoesPawn(color, stopFile + 1, stopRank)) {

                        if (color === 'white') {
                            stopRank == 3 && this._setEnPassant(stopFile, 2);
                        } else {
                            stopRank == 4 && this._setEnPassant(stopFile, 5);
                        }
                    }
                }

                return true;
            }

            this._setEnPassant(null);
            return true;
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
            }

            if (capture || type == 'pawn') {
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
        key: '_isFoesPawn',
        value: function _isFoesPawn(color, file, rank) {
            return this.getPieceType(file, rank) == 'pawn' && this._isFoe(color, file, rank);
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

            newBoard.turn = this.turn;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImRldi9jb21wb25lbnRzL2Zlbi9mZW4uanMiLCJkZXYvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanMiLCJkZXYvaW5kZXgvYXBwLmpzIiwiZGV2L2xpYi9qYm9hcmQuanMiLCJkZXYvbGliL2pjaGVzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ093QixTOztBQU54Qjs7Ozs7O0FBTWUsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCOztBQUV0Qzs7QUFFQSxRQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQVg7QUFBQSxRQUNJLFFBQVEsU0FBUyxhQUFULENBQXVCLFNBQXZCLENBRFo7O0FBR0EsVUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLE9BQXBCO0FBQ0EsVUFBTSxFQUFOLEdBQVcsT0FBWDs7QUFFQSxVQUFNLGdCQUFOLENBQXVCLFFBQXZCLEVBQWlDLFlBQU07QUFDbkMsa0JBQVUsTUFBVjtBQUNILEtBRkQ7O0FBSUEsU0FBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxhQUFLLElBQUksT0FBTyxDQUFoQixFQUFtQixPQUFPLENBQTFCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ2pDLGdCQUFJLFNBQVMsVUFBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCLElBQXhCLENBQWI7QUFDQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFqQztBQUNBLGtCQUFNLFdBQU4sQ0FBa0IsTUFBbEI7QUFDSDtBQUNKOztBQUVELFNBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNBLFdBQU8sSUFBUDs7QUFFQSxhQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUI7QUFDckIsZUFBTyxVQUFQLENBQWtCLENBQUMsRUFBRSxN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L0IsRUFBcUMsS0FBcEY7QUFDSDs7O3FDQUVZLEksRUFBTSxJLEVBQU07QUFDckIsbUJBQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixLQUF3QyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLEtBQXJDLENBQTJDLElBQTFGO0FBQ0g7OztzQ0FFYSxJLEVBQU0sSSxFQUFNO0FBQ3RCLG1CQUFPLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsSUFBL0IsS0FBd0MsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQyxLQUFyQyxDQUEyQyxLQUExRjtBQUNIOztBQUVEOzs7Ozs7bUNBSVcsSSxFQUFNLEksRUFBTTtBQUNuQixpQkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixJQUExQixFQUFnQyxJQUFoQztBQUNIOztBQUVEOzs7Ozs7eUNBSWlCLEksRUFBTSxJLEVBQU07QUFDekIsbUJBQU8sS0FBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7dUNBSWUsSSxFQUFNLEksRUFBTTtBQUN2QixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxjQUFmLENBQThCLElBQTlCLEVBQW9DLElBQXBDLENBQVA7QUFDSDs7QUFFRDs7Ozs7O2lDQUlTO0FBQ0wsbUJBQU8sS0FBSyxTQUFMLENBQWUsTUFBZixFQUFQO0FBQ0g7Ozs7OztrQkF4RWdCLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKlxuICogICAgIGJvYXJkLmpzIGZvciBqQ2hlc3MgcHJvamVjdFxuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qY2hlc3MuZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdEJvYXJkKGpjaGVzcykge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtd3JhcCcpLFxuICAgICAgICBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcblxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG4gICAgYm9hcmQuaWQgPSAnYm9hcmQnO1xuXG4gICAgYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBkcmF3Qm9hcmQoamNoZXNzKTtcbiAgICB9KTtcblxuICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICBsZXQgc3F1YXJlID0gbmV3U3F1YXJlKGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyQ2xpY2spO1xuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoYm9hcmQpO1xuICAgIHJldHVybiB0cnVlO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlckNsaWNrKGUpIHtcbiAgICAgICAgamNoZXNzLnBpY2tTcXVhcmUoK2UudGFyZ2V0LmRhdGFzZXQuZmlsZSwgK2UudGFyZ2V0LmRhdGFzZXQucmFuayk7XG4gICAgICAgIGRyYXdCb2FyZChqY2hlc3MpO1xuICAgICAgICBsZXQgRkVOID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZlbicpO1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgRXZlbnQoJ2NoYW5nZScpO1xuICAgICAgICBGRU4uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmF3Qm9hcmQoamNoZXNzKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBsZXQgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkX19zcXVhcmUnKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3F1YXJlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGxldCBmaWxlID0gc3F1YXJlc1tpXS5kYXRhc2V0LmZpbGUsXG4gICAgICAgICAgICByYW5rID0gc3F1YXJlc1tpXS5kYXRhc2V0LnJhbms7XG5cbiAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5zZWxlY3RlZCAhPSBqY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5tYXJrZWQgIT0gamNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICBkcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3F1YXJlc1tpXS5kYXRhc2V0LnBpZWNlICE9IGpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgIGRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgamNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG5cbn1cblxuZnVuY3Rpb24gbmV3U3F1YXJlKGpjaGVzcywgZmlsZSwgcmFuaykge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNxdWFyZS5kYXRhc2V0LmZpbGUgPSBmaWxlO1xuICAgIHNxdWFyZS5kYXRhc2V0LnJhbmsgPSByYW5rO1xuICAgIGRyYXdTcXVhcmUoc3F1YXJlLCBqY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgIHJldHVybiBzcXVhcmU7XG5cbn1cblxuZnVuY3Rpb24gZHJhd1NxdWFyZShzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuaykge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPSAramNoZXNzLmlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuayk7XG4gICAgc3F1YXJlLmRhdGFzZXQubWFya2VkID0gK2pjaGVzcy5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKTtcbiAgICBzcXVhcmUuZGF0YXNldC5waWVjZSA9ICshIWpjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuayk7XG4gICAgc2V0Q2xhc3NlcyhzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgcmV0dXJuIHRydWU7XG5cbn1cblxuZnVuY3Rpb24gc2V0Q2xhc3NlcyhzcXVhcmUsIGpjaGVzcywgZmlsZSwgcmFuaykge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgc3F1YXJlLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRfX3NxdWFyZScpO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlXycgKyBqY2hlc3MuZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykpO1xuXG4gICAgaWYgKHNxdWFyZS5kYXRhc2V0LnNlbGVjdGVkID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoc3F1YXJlLmRhdGFzZXQubWFya2VkID09IDEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfbWFya2VkXycgKyBqY2hlc3MuZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykpO1xuICAgIH1cblxuICAgIGlmIChzcXVhcmUuZGF0YXNldC5waWVjZSA9PSAxKSB7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib2FyZF9fc3F1YXJlXycgKyBqY2hlc3MuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspICsgJ18nXG4gICAgICAgICAgICArIGpjaGVzcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn0iLCIvKlxuICogICAgIGZlbi5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRGRU4oamNoZXNzKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBsZXQgRkVOID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZlbicpO1xuXG4gICAgRkVOLnZhbHVlID0gamNoZXNzLmdldEZFTigpO1xuXG4gICAgRkVOLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgRkVOLnZhbHVlID0gamNoZXNzLmdldEZFTigpO1xuICAgIH0pO1xufSIsIi8qXG4gKiAgICAgc2lkZWJhci5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRTaWRlYmFyKGpjaGVzcykge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgbGV0IHJlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bl9zcmVzZXQnKTtcblxuICAgIHJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBqY2hlc3Muc2V0VXBJbml0aWFsKCk7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBFdmVudCgnY2hhbmdlJyk7XG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNib2FyZCcpO1xuICAgICAgICBsZXQgRkVOID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZlbicpO1xuICAgICAgICBib2FyZC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgRkVOLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pO1xuXG59IiwiaW1wb3J0IEpDaGVzcyBmcm9tICcuLi9saWIvamNoZXNzJztcbmltcG9ydCBpbml0Qm9hcmQgZnJvbSAnLi4vY29tcG9uZW50cy9ib2FyZC9ib2FyZCc7XG5pbXBvcnQgaW5pdFNpZGViYXIgZnJvbSAnLi4vY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXInO1xuaW1wb3J0IGluaXRGRU4gZnJvbSAnLi4vY29tcG9uZW50cy9mZW4vZmVuJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGxldCBqY2hlc3MgPSBuZXcgSkNoZXNzO1xuICAgIGpjaGVzcy5zZXRVcEluaXRpYWwoKTtcbiAgICBpbml0Qm9hcmQoamNoZXNzKTtcbiAgICBpbml0U2lkZWJhcihqY2hlc3MpO1xuICAgIGluaXRGRU4oamNoZXNzKTtcblxufSk7IiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpib2FyZC5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQm9hcmQge1xuXG4gICAgLypcbiAgICAgKiAgIENPTlNUUlVDVE9SXG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLmJvYXJkID0gW107XG5cbiAgICAgICAgdGhpcy5faW5pdEJvYXJkKCk7XG4gICAgICAgIHRoaXMuX3BhaW50Qm9hcmQoKTtcblxuICAgICAgICB0aGlzLnR1cm4gPSAnd2hpdGUnO1xuICAgICAgICB0aGlzLmNvdW50ID0gMTtcbiAgICAgICAgdGhpcy5jb3VudEZpZnR5TW92ZSA9IDA7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RGaWxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWxlY3RSYW5rID0gbnVsbDtcblxuICAgICAgICB0aGlzLmVuUGFzc2FudCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jYXN0bGluZyA9IHtcbiAgICAgICAgICAgIHdoaXRlOiAzLFxuICAgICAgICAgICAgYmxhY2s6IDNcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLklOSVRJQUxfUE9TSVRJT04gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVlbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuTU9WRVMgPSB7XG4gICAgICAgICAgICByb29rOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAga25pZ2h0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0yLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMixcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBiaXNob3A6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHF1ZWVuOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAga2luZzogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIElOSVRJQUxJWkFUSU9OXG4gICAgICovXG5cbiAgICBfaW5pdEJvYXJkKCkge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW2ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWFya2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX3BhaW50Qm9hcmQoKSB7XG5cbiAgICAgICAgbGV0IGNvdW50U3F1YXJlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50U3F1YXJlKys7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0uY29sb3IgPSAoY291bnRTcXVhcmUrKyAlIDIpID8gJ2JsYWNrJyA6ICd3aGl0ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVRVUFxuICAgICAqL1xuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLnNldFVwUG9zaXRpb24odGhpcy5JTklUSUFMX1BPU0lUSU9OKTtcbiAgICB9XG5cbiAgICBzZXRVcFBvc2l0aW9uKHBpZWNlU2V0KSB7XG5cbiAgICAgICAgdGhpcy50dXJuID0gJ3doaXRlJztcblxuICAgICAgICB0aGlzLmNvdW50ID0gMTtcbiAgICAgICAgdGhpcy5jb3VudEZpZnR5TW92ZSA9IDA7XG5cbiAgICAgICAgdGhpcy5lblBhc3NhbnQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY2FzdGxpbmcgPSB7XG4gICAgICAgICAgICB3aGl0ZTogMyxcbiAgICAgICAgICAgIGJsYWNrOiAzXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG4gICAgICAgIHBpZWNlU2V0LmZvckVhY2goXG4gICAgICAgICAgICAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFVwUGllY2UoaXRlbS5maWxlLCBpdGVtLnJhbmssIGl0ZW0ucGllY2UudHlwZSwgaXRlbS5waWVjZS5jb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZXNldFBvc2l0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChpdGVtLCBmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlLCByYW5rKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRVcFBpZWNlKGZpbGUsIHJhbmssIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIF9zZXRVcFBpZWNlKGZpbGUsIHJhbmssIHR5cGUsIGNvbG9yKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNRVUFSRSBHRVRURVJTXG4gICAgICovXG5cbiAgICBnZXRTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmRbZmlsZV1bcmFua107XG4gICAgfVxuXG4gICAgZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykuY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS5jb2xvcjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU1FVQVJFIFNFVFRFUlNcbiAgICAgKi9cblxuICAgIHNldFBpZWNlVHlwZShmaWxlLCByYW5rLCB0eXBlKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZSA9IHR5cGU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgc2V0UGllY2VDb2xvcihmaWxlLCByYW5rLCBjb2xvcikge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgc2V0UGllY2UoZmlsZSwgcmFuaywgdHlwZSwgY29sb3IpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLnR5cGUgPSB0eXBlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBFTiBQQVNTQU5UXG4gICAgICovXG5cbiAgICBfY2hlY2tFblBhc3NhbnQoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuaykge1xuXG4gICAgICAgIGxldCBwaWVjZSA9IHRoaXMuZ2V0UGllY2VUeXBlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcblxuICAgICAgICBpZiAocGllY2UgPT0gJ3Bhd24nKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2lzRW5QYXNzYW50KHN0b3BGaWxlLCBzdG9wUmFuaykgJiYgdGhpcy5fcmVtb3ZlUGllY2Uoc3RvcEZpbGUsIHN0YXJ0UmFuayk7XG4gICAgICAgICAgICB0aGlzLl9zZXRFblBhc3NhbnQobnVsbCk7XG5cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhzdGFydFJhbmsgLSBzdG9wUmFuaykgPT0gMikge1xuXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZvZXNQYXduKGNvbG9yLCBzdG9wRmlsZSAtIDEsIHN0b3BSYW5rKSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0ZvZXNQYXduKGNvbG9yLCBzdG9wRmlsZSArIDEsIHN0b3BSYW5rKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvciA9PT0gJ3doaXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFJhbmsgPT0gMyAmJiB0aGlzLl9zZXRFblBhc3NhbnQoc3RvcEZpbGUsIDIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFJhbmsgPT0gNCAmJiB0aGlzLl9zZXRFblBhc3NhbnQoc3RvcEZpbGUsIDUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0RW5QYXNzYW50KG51bGwpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIF9nZXRFblBhc3NhbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuUGFzc2FudDtcbiAgICB9XG5cbiAgICBfc2V0RW5QYXNzYW50KGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHx8IChyYW5rICE9IDIgJiYgcmFuayAhPSA1KSkge1xuXG4gICAgICAgICAgICB0aGlzLmVuUGFzc2FudCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5QYXNzYW50ID0ge1xuICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgIHJhbms6IHJhbmtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBfaXNFblBhc3NhbnQoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBwYXNzID0gdGhpcy5fZ2V0RW5QYXNzYW50KCk7XG4gICAgICAgIGlmICghcGFzcykgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gcGFzcy5maWxlID09IGZpbGUgJiYgcGFzcy5yYW5rID09IHJhbms7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgUElDS1xuICAgICAqL1xuXG4gICAgcGlja1NxdWFyZShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgdGhpcy5fZG9Nb3ZlKHRoaXMuc2VsZWN0RmlsZSwgdGhpcy5zZWxlY3RSYW5rLCBmaWxlLCByYW5rKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RGaWxlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UmFuayA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZXNldE1hcmtzKCk7XG4gICAgICAgICAgICB0aGlzLl9yZXNldFNlbGVjdCgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KCk7XG4gICAgICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RGaWxlID0gZmlsZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UmFuayA9IHJhbms7XG4gICAgICAgICAgICB0aGlzLl9tYXJrTW92ZXMoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9wYXNzVHVybigpIHtcblxuICAgICAgICBpZiAodGhpcy50dXJuID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgICB0aGlzLnR1cm4gPSAnYmxhY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50dXJuID0gJ3doaXRlJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNFTEVDVFxuICAgICAqL1xuXG4gICAgX3Jlc2V0U2VsZWN0KCkge1xuXG4gICAgICAgIHRoaXMuYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBmaWxlLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBzcXVhcmUuc2VsZWN0ZWQ7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgTUFSSyBNT1ZFU1xuICAgICAqL1xuXG4gICAgX3Jlc2V0TWFya3MoKSB7XG5cbiAgICAgICAgdGhpcy5ib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGZpbGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGZpbGUuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLm1hcmtlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICAgICAgaWYgKCFzcXVhcmUpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gc3F1YXJlLm1hcmtlZDtcblxuICAgIH1cblxuICAgIF9tYXJrTW92ZXMoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLl9yZXNldE1hcmtzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSAhPT0gdGhpcy50dXJuKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAoISF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICBsZXQgbW92ZXMgPSB0aGlzLl9nZXRNb3ZlcyhmaWxlLCByYW5rKTtcbiAgICAgICAgICAgIGlmICghbW92ZXMpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbW92ZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2l0ZW0uZmlsZV1baXRlbS5yYW5rXS5tYXJrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBNT1ZFU1xuICAgICAqL1xuXG4gICAgX2dldE1vdmVzKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Bhd24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1Bhd24oZmlsZSwgcmFuayk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2tpbmcnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc0tpbmcoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIERPIE1PVkVcbiAgICAgKi9cblxuICAgIF9kb01vdmUoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuaykge1xuXG4gICAgICAgIHRoaXMuX2NoZWNrRW5QYXNzYW50KHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspO1xuXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5nZXRQaWVjZVR5cGUoc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuICAgICAgICBsZXQgY2FwdHVyZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoc3RhcnRGaWxlLCBzdGFydFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShzdG9wRmlsZSwgc3RvcFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzRW1wdHkoc3RhcnRGaWxlLCBzdGFydFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzRnJpZW5kKGNvbG9yLCBzdG9wRmlsZSwgc3RvcFJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodHlwZSA9PSAna2luZycgJiYgTWF0aC5hYnMoc3RhcnRGaWxlIC0gc3RvcEZpbGUpID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLl9kb0Nhc3RsaW5nKGNvbG9yLCBzdG9wRmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYXB0dXJlID0gdGhpcy5faXNGb2UoY29sb3IsIHN0b3BGaWxlLCBzdG9wUmFuayk7XG4gICAgICAgICAgICB0aGlzLnNldFBpZWNlKHN0b3BGaWxlLCBzdG9wUmFuaywgdHlwZSwgY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGllY2Uoc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT0gJ2tpbmcnIHx8IHR5cGUgPT0gJ3Jvb2snKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0Nhc3RsaW5nKGNvbG9yLCB0eXBlLCBzdGFydEZpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbG9yID09ICdibGFjaycpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYXB0dXJlIHx8IHR5cGUgPT0gJ3Bhd24nKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50RmlmdHlNb3ZlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRGaWZ0eU1vdmUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Bhc3NUdXJuKCk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgQ0hFQ0sgTU9WRVxuICAgICAqL1xuXG4gICAgX2NoZWNrTW92ZShzdGFydEZpbGUsIHN0YXJ0UmFuaywgc3RvcEZpbGUsIHN0b3BSYW5rKSB7XG5cbiAgICAgICAgbGV0IGNoZWNrQm9hcmQgPSB0aGlzLl9jbG9uZUJvYXJkKHRoaXMpO1xuXG4gICAgICAgIGlmIChjaGVja0JvYXJkLl9kb01vdmUoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuaykpIHtcbiAgICAgICAgICAgIHJldHVybiAhY2hlY2tCb2FyZC5faXNDaGVjayh0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUIFBBV04gTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc1Bhd24oZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBtb3ZlcyA9IFtdO1xuICAgICAgICBsZXQgcGF3bkNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspO1xuICAgICAgICBsZXQgbW92ZURpcmVjdGlvbiA9IChwYXduQ29sb3IgPT0gJ3doaXRlJykgPyAxIDogLTE7XG5cbiAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBmaWxlO1xuICAgICAgICBsZXQgdGFyZ2V0UmFuayA9IHJhbmsgKyBtb3ZlRGlyZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZVNxdWFyZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUobW92ZXMsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuXG4gICAgICAgICAgICAgICAgaWYgKChwYXduQ29sb3IgPT0gJ3doaXRlJyAmJiByYW5rID09IDEpIHx8IChwYXduQ29sb3IgPT0gJ2JsYWNrJyAmJiByYW5rID09IDYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFJhbmsgPSByYW5rICsgMiAqIG1vdmVEaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8IHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcblxuICAgICAgICB0YXJnZXRGaWxlID0gZmlsZSAtIDE7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZvZShwYXduQ29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8ICh0aGlzLl9pc0VuUGFzc2FudCh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldEZpbGUgPSBmaWxlICsgMTtcbiAgICAgICAgaWYgKHRoaXMuX2lzRm9lKHBhd25Db2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykgfHwgKHRoaXMuX2lzRW5QYXNzYW50KHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUobW92ZXMsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck1vdmVzKG1vdmVzLCBmaWxlLCByYW5rKTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBHRVQgS0lORyBNT1ZFU1xuICAgICAqL1xuXG4gICAgX2dldE1vdmVzS2luZyhmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IG1vdmVzID0gIHRoaXMuX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuayk7XG4gICAgICAgIGxldCBjYXN0bGluZyA9IHRoaXMuX2dldENhc3RsaW5nTW92ZShmaWxlLCByYW5rKTtcblxuICAgICAgICBjYXN0bGluZyAmJiBjYXN0bGluZy5mb3JFYWNoKChpdGVtKSA9PiBtb3Zlcy5wdXNoKGl0ZW0pKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyTW92ZXMobW92ZXMsIGZpbGUsIHJhbmspO1xuXG4gICAgfVxuXG4gICAgX2dldENhc3RsaW5nTW92ZShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCAhKGZpbGUgPT09IDQgJiYgKHJhbmsgPT09IDAgfHwgcmFuayA9PT0gNykpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IGNvbG9yID0gKHJhbmsgPT09IDApID8gJ3doaXRlJyA6ICdibGFjayc7XG4gICAgICAgIGlmICh0aGlzLmNhc3RsaW5nW2NvbG9yXSA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9pc0NoZWNrKGNvbG9yKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5jYXN0bGluZ1tjb2xvcl0gPiAxICYmICF0aGlzLl9pc1NxdWFyZUF0dGFja2VkKGNvbG9yLCBmaWxlIC0gMSwgcmFuaykgJiZcbiAgICAgICAgICAgICh0aGlzLl9pc0VtcHR5KGZpbGUgLSAxLCByYW5rKSkgJiYgKHRoaXMuX2lzRW1wdHkoZmlsZSAtIDIsIHJhbmspKSAmJiAodGhpcy5faXNFbXB0eShmaWxlIC0gMywgcmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIDIsIHJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FzdGxpbmdbY29sb3JdICUgMiA9PT0gMSAmJiAhdGhpcy5faXNTcXVhcmVBdHRhY2tlZChjb2xvciwgZmlsZSArIDEsIHJhbmspICYmXG4gICAgICAgICAgICAodGhpcy5faXNFbXB0eShmaWxlICsgMSwgcmFuaykpICYmICh0aGlzLl9pc0VtcHR5KGZpbGUgKyAyLCByYW5rKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgNiwgcmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfVxuXG4gICAgX2NoZWNrQ2FzdGxpbmcoY29sb3IsIHR5cGUsIGZpbGUpIHtcblxuICAgICAgICBpZiAodGhpcy5jYXN0bGluZ1tjb2xvcl0gPiAwKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PSAna2luZycpIHRoaXMuY2FzdGxpbmdbY29sb3JdID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlID09ICdyb29rJykge1xuICAgICAgICAgICAgICAgIGlmIChmaWxlID09PSAwICYmIHRoaXMuY2FzdGxpbmdbY29sb3JdID4gMSkgdGhpcy5jYXN0bGluZ1tjb2xvcl0gLT0gMjtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSA9PT0gNyAmJiB0aGlzLmNhc3RsaW5nW2NvbG9yXSAlIDIgPT0gMSkgdGhpcy5jYXN0bGluZ1tjb2xvcl0gLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX2RvQ2FzdGxpbmcoY29sb3IsIGZpbGUpIHtcblxuICAgICAgICBpZiAoY29sb3IgPT09ICd3aGl0ZScpIHtcblxuICAgICAgICAgICAgdGhpcy5zZXRQaWVjZShmaWxlLCAwLCAna2luZycsICd3aGl0ZScpO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGllY2UoNCwgMCk7XG5cbiAgICAgICAgICAgIGlmIChmaWxlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQaWVjZSgzLCAwLCAncm9vaycsICd3aGl0ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDAsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBpZWNlKDUsIDAsICdyb29rJywgJ3doaXRlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGllY2UoNywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5zZXRQaWVjZShmaWxlLCA3LCAna2luZycsICdibGFjaycpO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGllY2UoNCwgNyk7XG5cbiAgICAgICAgICAgIGlmIChmaWxlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQaWVjZSgzLCA3LCAncm9vaycsICdibGFjaycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDAsIDcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBpZWNlKDUsIDcsICdyb29rJywgJ2JsYWNrJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGllY2UoNywgNyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVCBQSUVDRSBNT1ZFU1xuICAgICAqL1xuXG4gICAgX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBwaWVjZSA9IHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspO1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5fZ2V0QXR0YWNrZWRTcXVhcmVzKHBpZWNlLCBjb2xvciwgZmlsZSwgcmFuayk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck1vdmVzKG1vdmVzLCBmaWxlLCByYW5rKTtcblxuICAgIH1cblxuICAgIF9maWx0ZXJNb3Zlcyhtb3ZlcywgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghbW92ZXMpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiBtb3Zlcy5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGVja01vdmUoZmlsZSwgcmFuaywgaXRlbS5maWxlLCBpdGVtLnJhbmspO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgX2dldEF0dGFja2VkU3F1YXJlcyhwaWVjZSwgY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZXMgPSB0aGlzLk1PVkVTW3BpZWNlXTtcbiAgICAgICAgbGV0IGNvdW50ID0gKHBpZWNlID09ICdraW5nJyB8fCBwaWVjZSA9PSAna25pZ2h0JykgPyAxIDogNztcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIG1vdmVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgY291bnQpIHtcblxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RmlsZSA9IGZpbGUgKyBpICogaXRlbS5maWxlO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRSYW5rID0gcmFuayArIGkgKiBpdGVtLnJhbms7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVTcXVhcmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNGcmllbmQoY29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZvZShjb2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHJldHVybiByZXN1bHQ7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBWQUxJREFUT1JTXG4gICAgICovXG5cbiAgICBfdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gKGZpbGUgIT09IG51bGwgJiYgcmFuayAhPT0gbnVsbCkgJiYgKGZpbGUgPj0gMCAmJiBmaWxlIDw9IDcgJiYgcmFuayA+PSAwICYmIHJhbmsgPD0gNyk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNFUlZJQ0VTXG4gICAgICovXG5cbiAgICAgX3B1c2hNb3ZlKHJlc3VsdCwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBtb3ZlID0ge1xuICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgIHJhbms6IHJhbmtcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0LnB1c2gobW92ZSk7XG5cbiAgICB9XG5cbiAgICAgX2lzRnJpZW5kKGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgcmV0dXJuIChjb2xvciA9PT0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspKTtcblxuICAgIH1cblxuICAgICBfaXNGb2UoY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICByZXR1cm4gKGNvbG9yICE9PSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykpO1xuXG4gICAgfVxuXG4gICAgX2lzRm9lc1Bhd24oY29sb3IsIGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09ICdwYXduJyAmJiB0aGlzLl9pc0ZvZShjb2xvciwgZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgIF9pc0VtcHR5KGZpbGUsIHJhbmspIHtcblxuICAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgICByZXR1cm4gdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykgPT09IG51bGw7XG5cbiAgICB9XG5cbiAgICBfaXNTcXVhcmVBdHRhY2tlZChjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5faXNTcXVhcmVBdHRhY2tlZEJ5UGF3bihjb2xvciwgZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBsZXQgcGllY2VzID0gWydyb29rJywgJ2tuaWdodCcsICdiaXNob3AnLCAncXVlZW4nLCAna2luZyddO1xuXG4gICAgICAgICAgICBwaWVjZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAodHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlcyA9IHRoaXMuX2dldEF0dGFja2VkU3F1YXJlcyh0eXBlLCBjb2xvciwgZmlsZSwgcmFuayk7XG5cbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlcyAmJiBzcXVhcmVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgICAgICAoaXRlbSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VUeXBlKGl0ZW0uZmlsZSwgaXRlbS5yYW5rKSA9PSB0eXBlKSByZXN1bHQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIF9pc1NxdWFyZUF0dGFja2VkQnlQYXduKGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IHRhcmdldFJhbmsgPSAoY29sb3IgPT0gJ3doaXRlJykgPyByYW5rICsgMSA6IHJhbmsgLSAxO1xuICAgICAgICBsZXQgdGFyZ2V0RmlsZSA9IFtmaWxlIC0gMSwgZmlsZSArIDFdO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSB0YXJnZXRGaWxlLmZpbHRlcihcbiAgICAgICAgICAgIChpdGVtKSA9PiB0aGlzLmdldFBpZWNlVHlwZShpdGVtLCB0YXJnZXRSYW5rKSA9PSAncGF3bicgJiYgdGhpcy5faXNGb2UoY29sb3IsIGl0ZW0sIHRhcmdldFJhbmspXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwO1xuXG4gICAgfVxuXG4gICAgX2lzQ2hlY2soY29sb3IpIHtcblxuICAgICAgICBsZXQga2luZyA9IHRoaXMuX2dldEtpbmcoY29sb3IpO1xuXG4gICAgICAgIGlmIChraW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNTcXVhcmVBdHRhY2tlZChjb2xvciwga2luZy5maWxlLCBraW5nLnJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgX2dldEtpbmcoY29sb3IpIHtcblxuICAgICAgICBpZiAoY29sb3IgIT0gJ3doaXRlJyAmJiBjb2xvciAhPSAnYmxhY2snKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgcmFuayA9IDA7IHJhbmsgPCA4OyByYW5rKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykgPT0gJ2tpbmcnICYmIHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSA9PSBjb2xvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6IHJhbmtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9yZW1vdmVQaWVjZShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgdGhpcy5zZXRQaWVjZVR5cGUoZmlsZSwgcmFuaywgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGllY2VDb2xvcihmaWxlLCByYW5rLCBudWxsKTtcblxuICAgIH1cblxuICAgIF9jbG9uZUJvYXJkKHNyYykge1xuXG4gICAgICAgIGxldCBuZXdCb2FyZCA9IG5ldyBKQm9hcmQ7XG5cbiAgICAgICAgaWYgKHNyYy5lblBhc3NhbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld0JvYXJkLmVuUGFzc2FudCA9IHtcbiAgICAgICAgICAgICAgICBmaWxlOiBzcmMuZW5QYXNzYW50LmZpbGUsXG4gICAgICAgICAgICAgICAgcmFuazogc3JjLmVuUGFzc2FudC5yYW5rXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3Qm9hcmQuZW5QYXNzYW50ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ld0JvYXJkLnR1cm4gPSB0aGlzLnR1cm47XG5cbiAgICAgICAgbmV3Qm9hcmQuY2FzdGxpbmcgPSB7XG4gICAgICAgICAgICB3aGl0ZTogc3JjLmNhc3RsaW5nLndoaXRlLFxuICAgICAgICAgICAgYmxhY2s6IHNyYy5jYXN0bGluZy5ibGFja1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByYW5rID0gMDsgcmFuayA8IDg7IHJhbmsrKykge1xuICAgICAgICAgICAgICAgIG5ld0JvYXJkLmJvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLnR5cGUgPSBzcmMuYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZTtcbiAgICAgICAgICAgICAgICBuZXdCb2FyZC5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IHNyYy5ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXdCb2FyZDtcblxuICAgIH1cblxuICAgIC8qXG4gICAgICogICBGRU5cbiAgICAgKi9cblxuICAgIGdldEZFTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEZFTkJvYXJkKCkgKyAnICcgK1xuICAgICAgICAgICAgICAgdGhpcy5fZ2V0RkVOVHVybigpICsgJyAnICtcbiAgICAgICAgICAgICAgIHRoaXMuX2dldEZFTkNhc3RsaW5nKCkgKyAnICcgK1xuICAgICAgICAgICAgICAgdGhpcy5fZ2V0RkVORW5QYXNzYW50KCkgKyAnICcgK1xuICAgICAgICAgICAgICAgdGhpcy5fZ2V0RkVOQ291bnRzKCk7XG4gICAgfVxuXG4gICAgX2dldEZFTlBpZWNlKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IHBpZWNlID0gdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgIHJhbmspO1xuICAgICAgICBpZiAoIXBpZWNlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IEZFTjtcbiAgICAgICAgc3dpdGNoIChwaWVjZSkge1xuXG4gICAgICAgICAgICBjYXNlICdwYXduJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAncCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Jvb2snOlxuICAgICAgICAgICAgICAgIEZFTiA9ICdyJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAna25pZ2h0JzpcbiAgICAgICAgICAgICAgICBGRU4gPSAnbic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2Jpc2hvcCc6XG4gICAgICAgICAgICAgICAgRkVOID0gJ2InO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdxdWVlbic6XG4gICAgICAgICAgICAgICAgRkVOID0gJ3EnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdraW5nJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAnayc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgIH1cblxuICAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSA9PT0gJ3doaXRlJykgcmV0dXJuIEZFTi50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgcmV0dXJuIEZFTjtcblxuICAgIH1cblxuICAgIF9nZXRGRU5Cb2FyZCgpIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgICAgICAgZm9yIChsZXQgcmFuayA9IDc7IHJhbmsgPj0gMDsgcmFuay0tKSB7XG4gICAgICAgICAgICBsZXQgdmFjYW5jeSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9nZXRGRU5QaWVjZShmaWxlLCByYW5rKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFjYW5jeSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHZhY2FuY3k7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWNhbmN5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5fZ2V0RkVOUGllY2UoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFjYW5jeSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWNhbmN5ICE9PSAwKSByZXN1bHQgKz0gdmFjYW5jeTtcbiAgICAgICAgICAgIGlmIChyYW5rID4gMCkgcmVzdWx0ICs9ICcvJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBfZ2V0RkVOVHVybigpIHtcblxuICAgICAgICBpZiAodGhpcy50dXJuID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3cnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdiJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX2dldEZFTkNhc3RsaW5nKCkge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcblxuICAgICAgICBpZiAodGhpcy5jYXN0bGluZy53aGl0ZSAlIDIgPT0gMSkgcmVzdWx0ICs9ICdLJztcbiAgICAgICAgaWYgKHRoaXMuY2FzdGxpbmcud2hpdGUgPiAxKSByZXN1bHQgKz0gJ1EnO1xuICAgICAgICBpZiAodGhpcy5jYXN0bGluZy5ibGFjayAlIDIgPT0gMSkgcmVzdWx0ICs9ICdrJztcbiAgICAgICAgaWYgKHRoaXMuY2FzdGxpbmcuYmxhY2sgPiAxKSByZXN1bHQgKz0gJ3EnO1xuXG4gICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgIHJldHVybiAnLSc7XG5cbiAgICB9XG5cbiAgICBfZ2V0RkVORW5QYXNzYW50KCkge1xuXG4gICAgICAgIGxldCBlblBhc3NhbnQgPSB0aGlzLmVuUGFzc2FudDtcbiAgICAgICAgaWYgKCF0aGlzLmVuUGFzc2FudCkgcmV0dXJuICctJztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFsZ2VicmFpY0J5RGlnaXRzKGVuUGFzc2FudC5maWxlLCBlblBhc3NhbnQucmFuayk7XG5cbiAgICB9XG5cbiAgICBfZ2V0RkVOQ291bnRzKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50RmlmdHlNb3ZlICsgJyAnICsgdGhpcy5jb3VudDtcblxuICAgIH1cblxuICAgIF9nZXRBbGdlYnJhaWNCeURpZ2l0cyhmaWxlLCByYW5rKSB7XG4gICAgICAgIGxldCBzaGlmdEZpbGUgPSA5NztcbiAgICAgICAgbGV0IHNoaWZ0UmFuayA9IDE7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGZpbGUgKyBzaGlmdEZpbGUpICsgKHJhbmsgKyBzaGlmdFJhbmspO1xuICAgIH1cblxufSIsIlxuLypcbiAqICAgICBqQ2hlc3MgfiBqY2hlc3MuanNcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKi9cblxuaW1wb3J0IEpCb2FyZCBmcm9tICcuL2pib2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpDaGVzcyB7XG5cbiAgICAvKlxuICAgICAqICAgSU5JVElBTElaQVRJT05cbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZCA9IG5ldyBKQm9hcmQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNFVFVQXG4gICAgICovXG5cbiAgICBzZXRVcEluaXRpYWwoKSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkLnNldFVwSW5pdGlhbCgpO1xuICAgIH1cblxuICAgIHNldFVwUG9zaXRpb24ocGllY2VTZXQpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQuc2V0VXBQb3NpdGlvbihwaWVjZVNldCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIEdFVFRFUlNcbiAgICAgKi9cblxuICAgIGdldFNxdWFyZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgZ2V0U3F1YXJlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKS5jb2xvcjtcbiAgICB9XG5cbiAgICBnZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS50eXBlO1xuICAgIH1cblxuICAgIGdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKS5waWVjZS5jb2xvcjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgUElDS1xuICAgICAqL1xuXG4gICAgcGlja1NxdWFyZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkLnBpY2tTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFNFTEVDVFxuICAgICAqL1xuXG4gICAgaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBNQVJLXG4gICAgICovXG5cbiAgICBpc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5pc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgRkVOXG4gICAgICovXG5cbiAgICBnZXRGRU4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRGRU4oKTtcbiAgICB9XG5cbn0iXX0=
