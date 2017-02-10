(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/**
 *     dispatcher.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

var _jchess = require('../../lib/jchess');

var _jchess2 = _interopRequireDefault(_jchess);

var _dom_board = require('../dom_board/dom_board');

var _dom_board2 = _interopRequireDefault(_dom_board);

var _dom_sidebar = require('../dom_sidebar/dom_sidebar');

var _dom_sidebar2 = _interopRequireDefault(_dom_sidebar);

var _dom_fen = require('../dom_fen/dom_fen');

var _dom_fen2 = _interopRequireDefault(_dom_fen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = function () {

    /**
     *   CONSTRUCTOR
     */

    function Dispatcher() {
        _classCallCheck(this, Dispatcher);

        this.chess = new _jchess2.default();
        this.chess.setUpInitial();

        this.DOMBoard = new _dom_board2.default(this);
        this.DOMSidebar = new _dom_sidebar2.default(this);
        this.DOMFEN = new _dom_fen2.default(this);
    }

    _createClass(Dispatcher, [{
        key: 'boardClick',
        value: function boardClick() {

            var self = this;

            return function (e) {
                self.chess.pickSquare(+e.target.dataset.file, +e.target.dataset.rank);
                self.DOMBoard.drawBoard(self.chess);
                self.DOMFEN.update(self.chess);
            };
        }
    }, {
        key: 'resetClick',
        value: function resetClick() {

            var self = this;

            return function () {
                self.chess.setUpInitial();
                self.DOMBoard.drawBoard(self.chess);
                self.DOMFEN.update(self.chess);
            };
        }
    }, {
        key: 'boardChange',
        value: function boardChange() {

            var self = this;

            return function () {
                self.DOMBoard.drawBoard(self.chess);
            };
        }
    }, {
        key: 'FENChange',
        value: function FENChange() {

            // let self = this;
            //
            // return () => {
            //
            // };

        }
    }]);

    return Dispatcher;
}();

exports.default = Dispatcher;

},{"../../lib/jchess":7,"../dom_board/dom_board":2,"../dom_fen/dom_fen":3,"../dom_sidebar/dom_sidebar":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     dom_board.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

var DOMBoard = function () {

    /**
     *   CONSTRUCTOR
     */

    function DOMBoard(dispatcher) {
        _classCallCheck(this, DOMBoard);

        this.init(dispatcher);
    }

    _createClass(DOMBoard, [{
        key: 'init',
        value: function init(dispatcher) {

            var board = document.querySelector('section.board'),
                fragment = document.createDocumentFragment();

            fragment.addEventListener('change', dispatcher.boardChange());

            for (var file = 0; file < 8; file++) {
                for (var rank = 0; rank < 8; rank++) {
                    var square = this.newSquare(dispatcher.chess, file, rank);
                    square.addEventListener('click', dispatcher.boardClick());
                    fragment.appendChild(square);
                }
            }

            board.appendChild(fragment);
        }
    }, {
        key: 'drawBoard',
        value: function drawBoard(chess) {

            var squares = document.querySelectorAll('div.board__square');
            var length = squares.length;

            for (var i = 0; i < length; i++) {

                var file = squares[i].dataset.file,
                    rank = squares[i].dataset.rank;

                if (squares[i].dataset.selected != chess.isSquareSelected(file, rank)) {
                    this.drawSquare(squares[i], chess, file, rank);
                }

                if (squares[i].dataset.marked != chess.isSquareMarked(file, rank)) {
                    this.drawSquare(squares[i], chess, file, rank);
                }

                if (squares[i].dataset.piece != chess.getPieceType(file, rank)) {
                    this.drawSquare(squares[i], chess, file, rank);
                }
            }

            return true;
        }
    }, {
        key: 'newSquare',
        value: function newSquare(chess, file, rank) {

            var square = document.createElement('div');
            square.dataset.file = file;
            square.dataset.rank = rank;
            this.drawSquare(square, chess, file, rank);
            return square;
        }
    }, {
        key: 'drawSquare',
        value: function drawSquare(square, chess, file, rank) {

            square.dataset.selected = +chess.isSquareSelected(file, rank);
            square.dataset.marked = +chess.isSquareMarked(file, rank);
            square.dataset.piece = +!!chess.getPieceType(file, rank);
            this.setClasses(square, chess, file, rank);
            return true;
        }
    }, {
        key: 'setClasses',
        value: function setClasses(square, chess, file, rank) {

            square.removeAttribute('class');
            square.classList.add('board__square');
            square.classList.add('board__square_' + chess.getSquareColor(file, rank));

            if (square.dataset.selected == 1) {
                square.classList.add('board__square_selected');
            }

            if (square.dataset.marked == 1) {
                square.classList.add('board__square_marked_' + chess.getSquareColor(file, rank));
            }

            if (square.dataset.piece == 1) {
                square.classList.add('board__square_' + chess.getPieceType(file, rank) + '_' + chess.getPieceColor(file, rank));
            }

            return true;
        }
    }]);

    return DOMBoard;
}();

exports.default = DOMBoard;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     dom_fen.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

var DOMFEN = function () {

    /**
     *   CONSTRUCTOR
     */

    function DOMFEN(dispatcher) {
        _classCallCheck(this, DOMFEN);

        this.update(dispatcher.chess);
        var FEN = document.querySelector('#fen');
        FEN.addEventListener('change', dispatcher.FENChange());
    }

    _createClass(DOMFEN, [{
        key: 'update',
        value: function update(chess) {
            var FEN = document.querySelector('#fen');
            FEN.value = chess.getFEN();
        }
    }]);

    return DOMFEN;
}();

exports.default = DOMFEN;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     dom_sidebar.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

var DOMSidebar =

/**
 *   CONSTRUCTOR
 */

function DOMSidebar(dispatcher) {
  _classCallCheck(this, DOMSidebar);

  var reset = document.querySelector('#btn_reset');
  reset.addEventListener('click', dispatcher.resetClick());
};

exports.default = DOMSidebar;

},{}],5:[function(require,module,exports){
'use strict';

var _dispatcher = require('../components/dispatcher/dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {

  'use strict';

  new _dispatcher2.default();
});
/**
 *     app.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

},{"../components/dispatcher/dispatcher":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     jChess ~ jboard.js
 *     2017 by Andrii Sorokin
 */

var JBoard = function () {

    /**
     *   CONSTRUCTOR
     */

    function JBoard() {
        _classCallCheck(this, JBoard);

        this._board = [];

        this._initBoard();
        this._paintBoard();

        this._turn = 'white';
        this._count = 1;
        this._countFiftyMove = 0;

        this._selectFile = null;
        this._selectRank = null;

        this._enPassant = null;

        this._castling = {
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

    /**
     *   INITIALIZATION
     */

    _createClass(JBoard, [{
        key: '_initBoard',
        value: function _initBoard() {

            for (var i = 0; i < 8; i++) {
                this._board[i] = [];
                for (var j = 0; j < 8; j++) {
                    this._board[i][j] = {
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
                    this._board[i][j].color = countSquare++ % 2 ? 'black' : 'white';
                }
            }
        }

        /**
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

            this._turn = 'white';

            this._count = 1;
            this._countFiftyMove = 0;

            this._enPassant = null;

            this._castling = {
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

            this._resetSelect();
            this._resetMarks();
            this._board.forEach(function (item, file) {
                item.forEach(function (square, rank) {
                    _this2._setUpPiece(file, rank, null, null);
                });
            });
        }
    }, {
        key: '_setUpPiece',
        value: function _setUpPiece(file, rank, type, color) {

            if (!this._validateSquare(file, rank)) return null;
            this._board[file][rank].piece = {
                type: type,
                color: color
            };
            return true;
        }

        /**
         *   SQUARE GETTERS
         */

    }, {
        key: 'getSquare',
        value: function getSquare(file, rank) {
            if (!this._validateSquare(file, rank)) return null;
            return this._board[file][rank];
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

        /**
         *   SQUARE SETTERS
         */

    }, {
        key: 'setPieceType',
        value: function setPieceType(file, rank, type) {

            if (!this._validateSquare(file, rank)) return null;
            this._board[file][rank].piece.type = type;
            return true;
        }
    }, {
        key: 'setPieceColor',
        value: function setPieceColor(file, rank, color) {

            if (!this._validateSquare(file, rank)) return null;
            this._board[file][rank].piece.color = color;
            return true;
        }
    }, {
        key: 'setPiece',
        value: function setPiece(file, rank, type, color) {

            if (!this._validateSquare(file, rank)) return null;
            this._board[file][rank].piece.color = color;
            this._board[file][rank].piece.type = type;
            return true;
        }

        /**
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
            return this._enPassant;
        }
    }, {
        key: '_setEnPassant',
        value: function _setEnPassant(file, rank) {

            if (!this._validateSquare(file, rank) || rank != 2 && rank != 5) {

                this._enPassant = null;
                return false;
            }

            this._enPassant = {
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

        /**
         *   PICK
         */

    }, {
        key: 'pickSquare',
        value: function pickSquare(file, rank) {

            var square = this.getSquare(file, rank);
            if (!square) return null;

            if (this.isSquareMarked(file, rank)) {

                this._doMove(this._selectFile, this._selectRank, file, rank);

                this._selectFile = null;
                this._selectRank = null;
                this._resetMarks();
                this._resetSelect();
            } else {

                this._resetSelect();
                square.selected = true;
                this._selectFile = file;
                this._selectRank = rank;
                this._markMoves(file, rank);
            }

            return true;
        }
    }, {
        key: '_passTurn',
        value: function _passTurn() {

            if (this._turn === 'white') {
                this._turn = 'black';
            } else {
                this._turn = 'white';
            }
        }

        /**
         *   SELECT
         */

    }, {
        key: '_resetSelect',
        value: function _resetSelect() {

            this._board.forEach(function (file) {

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

        /**
         *   MARK MOVES
         */

    }, {
        key: '_resetMarks',
        value: function _resetMarks() {

            this._board.forEach(function (file) {

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

            if (this.getPieceColor(file, rank) !== this._turn) return null;

            if (!!this.getPieceType(file, rank)) {

                var moves = this._getMoves(file, rank);
                if (!moves) return null;
                moves.forEach(function (item) {
                    _this3._board[item.file][item.rank].marked = true;
                });
            }
        }

        /**
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

        /**
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
                this._count++;
            }

            if (capture || type == 'pawn') {
                this._countFiftyMove = 0;
            } else {
                this._countFiftyMove++;
            }

            this._passTurn();

            return true;
        }

        /**
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

        /**
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

        /**
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
            if (this._castling[color] === 0) return null;
            if (this._isCheck(color)) return null;
            var result = [];

            if (this._castling[color] > 1 && !this._isSquareAttacked(color, file - 1, rank) && this._isEmpty(file - 1, rank) && this._isEmpty(file - 2, rank) && this._isEmpty(file - 3, rank)) {
                this._pushMove(result, 2, rank);
            }

            if (this._castling[color] % 2 === 1 && !this._isSquareAttacked(color, file + 1, rank) && this._isEmpty(file + 1, rank) && this._isEmpty(file + 2, rank)) {
                this._pushMove(result, 6, rank);
            }

            return result;
        }
    }, {
        key: '_checkCastling',
        value: function _checkCastling(color, type, file) {

            if (this._castling[color] > 0) {
                if (type == 'king') this._castling[color] = 0;
                if (type == 'rook') {
                    if (file === 0 && this._castling[color] > 1) this._castling[color] -= 2;
                    if (file === 7 && this._castling[color] % 2 == 1) this._castling[color] -= 1;
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

        /**
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

        /**
         *   VALIDATORS
         */

    }, {
        key: '_validateSquare',
        value: function _validateSquare(file, rank) {
            return file !== null && rank !== null && file >= 0 && file <= 7 && rank >= 0 && rank <= 7;
        }

        /**
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

            if (src._enPassant !== null) {
                newBoard._enPassant = {
                    file: src._enPassant.file,
                    rank: src._enPassant.rank
                };
            } else {
                newBoard._enPassant = null;
            }

            newBoard._turn = this._turn;

            newBoard._castling = {
                white: src._castling.white,
                black: src._castling.black
            };

            for (var file = 0; file < 8; file++) {
                for (var rank = 0; rank < 8; rank++) {
                    newBoard._board[file][rank].piece.type = src._board[file][rank].piece.type;
                    newBoard._board[file][rank].piece.color = src._board[file][rank].piece.color;
                }
            }

            return newBoard;
        }

        /**
         *   DOMFEN
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

            if (this._turn === 'white') {
                return 'w';
            } else {
                return 'b';
            }
        }
    }, {
        key: '_getFENCastling',
        value: function _getFENCastling() {

            var result = '';

            if (this._castling.white % 2 == 1) result += 'K';
            if (this._castling.white > 1) result += 'Q';
            if (this._castling.black % 2 == 1) result += 'k';
            if (this._castling.black > 1) result += 'q';

            if (result) return result;
            return '-';
        }
    }, {
        key: '_getFENEnPassant',
        value: function _getFENEnPassant() {

            var enPassant = this._enPassant;
            if (!this._enPassant) return '-';
            return this._getAlgebraicByDigits(enPassant.file, enPassant.rank);
        }
    }, {
        key: '_getFENCounts',
        value: function _getFENCounts() {

            return this._countFiftyMove + ' ' + this._count;
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

},{}],7:[function(require,module,exports){
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
         *   DOMFEN
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

},{"./jboard":6}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9kaXNwYXRjaGVyL2Rpc3BhdGNoZXIuanMiLCJkZXYvY29tcG9uZW50cy9kb21fYm9hcmQvZG9tX2JvYXJkLmpzIiwiZGV2L2NvbXBvbmVudHMvZG9tX2Zlbi9kb21fZmVuLmpzIiwiZGV2L2NvbXBvbmVudHMvZG9tX3NpZGViYXIvZG9tX3NpZGViYXIuanMiLCJkZXYvaW5kZXgvYXBwLmpzIiwiZGV2L2xpYi9qYm9hcmQuanMiLCJkZXYvbGliL2pjaGVzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNDQTs7Ozs7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBR3FCLFU7O0FBRWpCOzs7O0FBSUEsMEJBQWM7QUFBQTs7QUFFVixhQUFLLEtBQUwsR0FBYSxzQkFBYjtBQUNBLGFBQUssS0FBTCxDQUFXLFlBQVg7O0FBRUEsYUFBSyxRQUFMLEdBQWdCLHdCQUFhLElBQWIsQ0FBaEI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsMEJBQWUsSUFBZixDQUFsQjtBQUNBLGFBQUssTUFBTCxHQUFjLHNCQUFXLElBQVgsQ0FBZDtBQUVIOzs7O3FDQUVZOztBQUVULGdCQUFJLE9BQU8sSUFBWDs7QUFFQSxtQkFBTyxVQUFDLENBQUQsRUFBTztBQUNWLHFCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLENBQUMsRUFBRSxNQUFGLENBQVMsT0FBVCxDQUFpQixJQUF4QyxFQUE4QyxDQUFDLEVBQUUsTUFBRixDQUFTLE9BQVQsQ0FBaUIsSUFBaEU7QUFDQSxxQkFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixLQUFLLEtBQTdCO0FBQ0EscUJBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsS0FBSyxLQUF4QjtBQUNILGFBSkQ7QUFNSDs7O3FDQUVZOztBQUVULGdCQUFJLE9BQU8sSUFBWDs7QUFFQSxtQkFBTyxZQUFNO0FBQ1QscUJBQUss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RUFBTSxJLEVBQU07QUFDekIsbUJBQU8sS0FBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7dUNBSWUsSSxFQUFNLEksRUFBTTtBQUN2QixtQkFBTyxLQUFLLFNBQUwsQ0FBZSxjQUFmLENBQThCLElBQTlCLEVBQW9DLElBQXBDLENBQVA7QUFDSDs7QUFFRDs7Ozs7O2lDQUlTO0FBQ0wsbUJBQU8sS0FBSyxTQUFMLENBQWUsTUFBZixFQUFQO0FBQ0g7Ozs7OztrQkF4RWdCLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKipcbiAqICAgICBkaXNwYXRjaGVyLmpzIGZvciBqQ2hlc3MgcHJvamVjdFxuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qY2hlc3MuZ2l0XG4gKi9cblxuaW1wb3J0IEpDaGVzcyBmcm9tICcuLi8uLi9saWIvamNoZXNzJztcbmltcG9ydCBET01Cb2FyZCBmcm9tICcuLi9kb21fYm9hcmQvZG9tX2JvYXJkJztcbmltcG9ydCBET01TaWRlYmFyIGZyb20gJy4uL2RvbV9zaWRlYmFyL2RvbV9zaWRlYmFyJztcbmltcG9ydCBET01GRU4gZnJvbSAnLi4vZG9tX2Zlbi9kb21fZmVuJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwYXRjaGVyIHtcblxuICAgIC8qKlxuICAgICAqICAgQ09OU1RSVUNUT1JcbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMuY2hlc3MgPSBuZXcgSkNoZXNzO1xuICAgICAgICB0aGlzLmNoZXNzLnNldFVwSW5pdGlhbCgpO1xuXG4gICAgICAgIHRoaXMuRE9NQm9hcmQgPSBuZXcgRE9NQm9hcmQodGhpcyk7XG4gICAgICAgIHRoaXMuRE9NU2lkZWJhciA9IG5ldyBET01TaWRlYmFyKHRoaXMpO1xuICAgICAgICB0aGlzLkRPTUZFTiA9IG5ldyBET01GRU4odGhpcyk7XG5cbiAgICB9XG5cbiAgICBib2FyZENsaWNrKCkge1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKGUpID0+IHtcbiAgICAgICAgICAgIHNlbGYuY2hlc3MucGlja1NxdWFyZSgrZS50YXJnZXQuZGF0YXNldC5maWxlLCArZS50YXJnZXQuZGF0YXNldC5yYW5rKTtcbiAgICAgICAgICAgIHNlbGYuRE9NQm9hcmQuZHJhd0JvYXJkKHNlbGYuY2hlc3MpO1xuICAgICAgICAgICAgc2VsZi5ET01GRU4udXBkYXRlKHNlbGYuY2hlc3MpO1xuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgcmVzZXRDbGljaygpIHtcblxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuY2hlc3Muc2V0VXBJbml0aWFsKCk7XG4gICAgICAgICAgICBzZWxmLkRPTUJvYXJkLmRyYXdCb2FyZChzZWxmLmNoZXNzKTtcbiAgICAgICAgICAgIHNlbGYuRE9NRkVOLnVwZGF0ZShzZWxmLmNoZXNzKTtcbiAgICAgICAgfTtcblxuICAgIH1cblxuICAgIGJvYXJkQ2hhbmdlKCkge1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5ET01Cb2FyZC5kcmF3Qm9hcmQoc2VsZi5jaGVzcyk7XG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICBGRU5DaGFuZ2UoKSB7XG5cbiAgICAgICAgLy8gbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAvL1xuICAgICAgICAvLyByZXR1cm4gKCkgPT4ge1xuICAgICAgICAvL1xuICAgICAgICAvLyB9O1xuXG4gICAgfVxuXG59IiwiXG4vKipcbiAqICAgICBkb21fYm9hcmQuanMgZm9yIGpDaGVzcyBwcm9qZWN0XG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pjaGVzcy5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBET01Cb2FyZCB7XG5cbiAgICAvKipcbiAgICAgKiAgIENPTlNUUlVDVE9SXG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcihkaXNwYXRjaGVyKSB7XG4gICAgICAgIHRoaXMuaW5pdChkaXNwYXRjaGVyKTtcbiAgICB9XG5cbiAgICBpbml0KGRpc3BhdGNoZXIpIHtcblxuICAgICAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLmJvYXJkJyksXG4gICAgICAgICAgICBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICBmcmFnbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBkaXNwYXRjaGVyLmJvYXJkQ2hhbmdlKCkpO1xuXG4gICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByYW5rID0gMDsgcmFuayA8IDg7IHJhbmsrKykge1xuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLm5ld1NxdWFyZShkaXNwYXRjaGVyLmNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXNwYXRjaGVyLmJvYXJkQ2xpY2soKSk7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcblxuICAgIH1cblxuICAgIGRyYXdCb2FyZChjaGVzcykge1xuXG4gICAgICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2LmJvYXJkX19zcXVhcmUnKTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHNxdWFyZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgbGV0IGZpbGUgPSBzcXVhcmVzW2ldLmRhdGFzZXQuZmlsZSxcbiAgICAgICAgICAgICAgICByYW5rID0gc3F1YXJlc1tpXS5kYXRhc2V0LnJhbms7XG5cbiAgICAgICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQuc2VsZWN0ZWQgIT0gY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQubWFya2VkICE9IGNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5waWVjZSAhPSBjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIG5ld1NxdWFyZShjaGVzcywgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3F1YXJlLmRhdGFzZXQuZmlsZSA9IGZpbGU7XG4gICAgICAgIHNxdWFyZS5kYXRhc2V0LnJhbmsgPSByYW5rO1xuICAgICAgICB0aGlzLmRyYXdTcXVhcmUoc3F1YXJlLCBjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgIHJldHVybiBzcXVhcmU7XG5cbiAgICB9XG5cbiAgICBkcmF3U3F1YXJlKHNxdWFyZSwgY2hlc3MsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBzcXVhcmUuZGF0YXNldC5zZWxlY3RlZCA9ICtjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspO1xuICAgICAgICBzcXVhcmUuZGF0YXNldC5tYXJrZWQgPSArY2hlc3MuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuayk7XG4gICAgICAgIHNxdWFyZS5kYXRhc2V0LnBpZWNlID0gKyEhY2hlc3MuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspO1xuICAgICAgICB0aGlzLnNldENsYXNzZXMoc3F1YXJlLCBjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgc2V0Q2xhc3NlcyhzcXVhcmUsIGNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgc3F1YXJlLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmUnKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGNoZXNzLmdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspKTtcblxuICAgICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcXVhcmUuZGF0YXNldC5tYXJrZWQgPT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfbWFya2VkXycgKyBjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3F1YXJlLmRhdGFzZXQucGllY2UgPT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSArICdfJ1xuICAgICAgICAgICAgICAgICsgY2hlc3MuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiAgICAgZG9tX2Zlbi5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERPTUZFTiB7XG5cbiAgICAvKipcbiAgICAgKiAgIENPTlNUUlVDVE9SXG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcihkaXNwYXRjaGVyKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKGRpc3BhdGNoZXIuY2hlc3MpO1xuICAgICAgICBsZXQgRkVOID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZlbicpO1xuICAgICAgICBGRU4uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZGlzcGF0Y2hlci5GRU5DaGFuZ2UoKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGNoZXNzKSB7XG4gICAgICAgIGxldCBGRU4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVuJyk7XG4gICAgICAgIEZFTi52YWx1ZSA9IGNoZXNzLmdldEZFTigpO1xuICAgIH1cblxufSIsIlxuLyoqXG4gKiAgICAgZG9tX3NpZGViYXIuanMgZm9yIGpDaGVzcyBwcm9qZWN0XG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pjaGVzcy5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBET01TaWRlYmFyIHtcblxuICAgIC8qKlxuICAgICAqICAgQ09OU1RSVUNUT1JcbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yKGRpc3BhdGNoZXIpIHtcbiAgICAgICAgbGV0IHJlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bl9yZXNldCcpO1xuICAgICAgICByZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BhdGNoZXIucmVzZXRDbGljaygpKTtcbiAgICB9XG5cbn0iLCJcbi8qKlxuICogICAgIGFwcC5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZGlzcGF0Y2hlci9kaXNwYXRjaGVyJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIG5ldyBEaXNwYXRjaGVyO1xuXG59KTsiLCJcbi8qKlxuICogICAgIGpDaGVzcyB+IGpib2FyZC5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQm9hcmQge1xuXG4gICAgLyoqXG4gICAgICogICBDT05TVFJVQ1RPUlxuICAgICAqL1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5fYm9hcmQgPSBbXTtcblxuICAgICAgICB0aGlzLl9pbml0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5fcGFpbnRCb2FyZCgpO1xuXG4gICAgICAgIHRoaXMuX3R1cm4gPSAnd2hpdGUnO1xuICAgICAgICB0aGlzLl9jb3VudCA9IDE7XG4gICAgICAgIHRoaXMuX2NvdW50RmlmdHlNb3ZlID0gMDtcblxuICAgICAgICB0aGlzLl9zZWxlY3RGaWxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2VsZWN0UmFuayA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fZW5QYXNzYW50ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9jYXN0bGluZyA9IHtcbiAgICAgICAgICAgIHdoaXRlOiAzLFxuICAgICAgICAgICAgYmxhY2s6IDNcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLklOSVRJQUxfUE9TSVRJT04gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVlbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuTU9WRVMgPSB7XG4gICAgICAgICAgICByb29rOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAga25pZ2h0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0yLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMixcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBiaXNob3A6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHF1ZWVuOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAga2luZzogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgX2luaXRCb2FyZCgpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fYm9hcmRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYm9hcmRbaV1bal0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWFya2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX3BhaW50Qm9hcmQoKSB7XG5cbiAgICAgICAgbGV0IGNvdW50U3F1YXJlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50U3F1YXJlKys7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2JvYXJkW2ldW2pdLmNvbG9yID0gKGNvdW50U3F1YXJlKysgJSAyKSA/ICdibGFjaycgOiAnd2hpdGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIFNFVFVQXG4gICAgICovXG5cbiAgICBzZXRVcEluaXRpYWwoKSB7XG4gICAgICAgIHRoaXMuc2V0VXBQb3NpdGlvbih0aGlzLklOSVRJQUxfUE9TSVRJT04pO1xuICAgIH1cblxuICAgIHNldFVwUG9zaXRpb24ocGllY2VTZXQpIHtcblxuICAgICAgICB0aGlzLl90dXJuID0gJ3doaXRlJztcblxuICAgICAgICB0aGlzLl9jb3VudCA9IDE7XG4gICAgICAgIHRoaXMuX2NvdW50RmlmdHlNb3ZlID0gMDtcblxuICAgICAgICB0aGlzLl9lblBhc3NhbnQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2Nhc3RsaW5nID0ge1xuICAgICAgICAgICAgd2hpdGU6IDMsXG4gICAgICAgICAgICBibGFjazogM1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgICAgICBwaWVjZVNldC5mb3JFYWNoKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRVcFBpZWNlKGl0ZW0uZmlsZSwgaXRlbS5yYW5rLCBpdGVtLnBpZWNlLnR5cGUsIGl0ZW0ucGllY2UuY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgcmVzZXRQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5fcmVzZXRTZWxlY3QoKTtcbiAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpO1xuICAgICAgICB0aGlzLl9ib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGl0ZW0sIGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUsIHJhbmspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFVwUGllY2UoZmlsZSwgcmFuaywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgX3NldFVwUGllY2UoZmlsZSwgcmFuaywgdHlwZSwgY29sb3IpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5fYm9hcmRbZmlsZV1bcmFua10ucGllY2UgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBTUVVBUkUgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2FyZFtmaWxlXVtyYW5rXTtcbiAgICB9XG5cbiAgICBnZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5jb2xvcjtcbiAgICB9XG5cbiAgICBnZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykucGllY2UudHlwZTtcbiAgICB9XG5cbiAgICBnZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmNvbG9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgU1FVQVJFIFNFVFRFUlNcbiAgICAgKi9cblxuICAgIHNldFBpZWNlVHlwZShmaWxlLCByYW5rLCB0eXBlKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuX2JvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLnR5cGUgPSB0eXBlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIHNldFBpZWNlQ29sb3IoZmlsZSwgcmFuaywgY29sb3IpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5fYm9hcmRbZmlsZV1bcmFua10ucGllY2UuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICBzZXRQaWVjZShmaWxlLCByYW5rLCB0eXBlLCBjb2xvcikge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLl9ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLl9ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS50eXBlID0gdHlwZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIEVOIFBBU1NBTlRcbiAgICAgKi9cblxuICAgIF9jaGVja0VuUGFzc2FudChzdGFydEZpbGUsIHN0YXJ0UmFuaywgc3RvcEZpbGUsIHN0b3BSYW5rKSB7XG5cbiAgICAgICAgbGV0IHBpZWNlID0gdGhpcy5nZXRQaWVjZVR5cGUoc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuXG4gICAgICAgIGlmIChwaWVjZSA9PSAncGF3bicpIHtcblxuICAgICAgICAgICAgdGhpcy5faXNFblBhc3NhbnQoc3RvcEZpbGUsIHN0b3BSYW5rKSAmJiB0aGlzLl9yZW1vdmVQaWVjZShzdG9wRmlsZSwgc3RhcnRSYW5rKTtcbiAgICAgICAgICAgIHRoaXMuX3NldEVuUGFzc2FudChudWxsKTtcblxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHN0YXJ0UmFuayAtIHN0b3BSYW5rKSA9PSAyKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRm9lc1Bhd24oY29sb3IsIHN0b3BGaWxlIC0gMSwgc3RvcFJhbmspIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRm9lc1Bhd24oY29sb3IsIHN0b3BGaWxlICsgMSwgc3RvcFJhbmspKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wUmFuayA9PSAzICYmIHRoaXMuX3NldEVuUGFzc2FudChzdG9wRmlsZSwgMik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wUmFuayA9PSA0ICYmIHRoaXMuX3NldEVuUGFzc2FudChzdG9wRmlsZSwgNSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXRFblBhc3NhbnQobnVsbCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgX2dldEVuUGFzc2FudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuUGFzc2FudDtcbiAgICB9XG5cbiAgICBfc2V0RW5QYXNzYW50KGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHx8IChyYW5rICE9IDIgJiYgcmFuayAhPSA1KSkge1xuXG4gICAgICAgICAgICB0aGlzLl9lblBhc3NhbnQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lblBhc3NhbnQgPSB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9pc0VuUGFzc2FudChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHBhc3MgPSB0aGlzLl9nZXRFblBhc3NhbnQoKTtcbiAgICAgICAgaWYgKCFwYXNzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBwYXNzLmZpbGUgPT0gZmlsZSAmJiBwYXNzLnJhbmsgPT0gcmFuaztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgUElDS1xuICAgICAqL1xuXG4gICAgcGlja1NxdWFyZShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgdGhpcy5fZG9Nb3ZlKHRoaXMuX3NlbGVjdEZpbGUsIHRoaXMuX3NlbGVjdFJhbmssIGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RGaWxlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdFJhbmsgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRTZWxlY3QoKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLl9yZXNldFNlbGVjdCgpO1xuICAgICAgICAgICAgc3F1YXJlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdEZpbGUgPSBmaWxlO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0UmFuayA9IHJhbms7XG4gICAgICAgICAgICB0aGlzLl9tYXJrTW92ZXMoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9wYXNzVHVybigpIHtcblxuICAgICAgICBpZiAodGhpcy5fdHVybiA9PT0gJ3doaXRlJykge1xuICAgICAgICAgICAgdGhpcy5fdHVybiA9ICdibGFjayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90dXJuID0gJ3doaXRlJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBTRUxFQ1RcbiAgICAgKi9cblxuICAgIF9yZXNldFNlbGVjdCgpIHtcblxuICAgICAgICB0aGlzLl9ib2FyZC5mb3JFYWNoKFxuICAgICAgICAgICAgKGZpbGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGZpbGUuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBpc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5zZWxlY3RlZDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgTUFSSyBNT1ZFU1xuICAgICAqL1xuXG4gICAgX3Jlc2V0TWFya3MoKSB7XG5cbiAgICAgICAgdGhpcy5fYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBmaWxlLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5tYXJrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuayk7XG4gICAgICAgIGlmICghc3F1YXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNxdWFyZS5tYXJrZWQ7XG5cbiAgICB9XG5cbiAgICBfbWFya01vdmVzKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykgIT09IHRoaXMuX3R1cm4pIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICghIXRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgIGxldCBtb3ZlcyA9IHRoaXMuX2dldE1vdmVzKGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgaWYgKCFtb3ZlcykgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBtb3Zlcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JvYXJkW2l0ZW0uZmlsZV1baXRlbS5yYW5rXS5tYXJrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBHRVQgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3ZlcyhmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICBjYXNlICdwYXduJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICBjYXNlICdraW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNLaW5nKGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgRE8gTU9WRVxuICAgICAqL1xuXG4gICAgX2RvTW92ZShzdGFydEZpbGUsIHN0YXJ0UmFuaywgc3RvcEZpbGUsIHN0b3BSYW5rKSB7XG5cbiAgICAgICAgdGhpcy5fY2hlY2tFblBhc3NhbnQoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuayk7XG5cbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLmdldFBpZWNlVHlwZShzdGFydEZpbGUsIHN0YXJ0UmFuayk7XG4gICAgICAgIGxldCBjb2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcihzdGFydEZpbGUsIHN0YXJ0UmFuayk7XG4gICAgICAgIGxldCBjYXB0dXJlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShzdGFydEZpbGUsIHN0YXJ0UmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKHN0b3BGaWxlLCBzdG9wUmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAodGhpcy5faXNFbXB0eShzdGFydEZpbGUsIHN0YXJ0UmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAodGhpcy5faXNGcmllbmQoY29sb3IsIHN0b3BGaWxlLCBzdG9wUmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0eXBlID09ICdraW5nJyAmJiBNYXRoLmFicyhzdGFydEZpbGUgLSBzdG9wRmlsZSkgPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuX2RvQ2FzdGxpbmcoY29sb3IsIHN0b3BGaWxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhcHR1cmUgPSB0aGlzLl9pc0ZvZShjb2xvciwgc3RvcEZpbGUsIHN0b3BSYW5rKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGllY2Uoc3RvcEZpbGUsIHN0b3BSYW5rLCB0eXBlLCBjb2xvcik7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZShzdGFydEZpbGUsIHN0YXJ0UmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PSAna2luZycgfHwgdHlwZSA9PSAncm9vaycpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrQ2FzdGxpbmcoY29sb3IsIHR5cGUsIHN0YXJ0RmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29sb3IgPT0gJ2JsYWNrJykge1xuICAgICAgICAgICAgdGhpcy5fY291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYXB0dXJlIHx8IHR5cGUgPT0gJ3Bhd24nKSB7XG4gICAgICAgICAgICB0aGlzLl9jb3VudEZpZnR5TW92ZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb3VudEZpZnR5TW92ZSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcGFzc1R1cm4oKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgQ0hFQ0sgTU9WRVxuICAgICAqL1xuXG4gICAgX2NoZWNrTW92ZShzdGFydEZpbGUsIHN0YXJ0UmFuaywgc3RvcEZpbGUsIHN0b3BSYW5rKSB7XG5cbiAgICAgICAgbGV0IGNoZWNrQm9hcmQgPSB0aGlzLl9jbG9uZUJvYXJkKHRoaXMpO1xuXG4gICAgICAgIGlmIChjaGVja0JvYXJkLl9kb01vdmUoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuaykpIHtcbiAgICAgICAgICAgIHJldHVybiAhY2hlY2tCb2FyZC5faXNDaGVjayh0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIEdFVCBQQVdOIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNQYXduKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZXMgPSBbXTtcbiAgICAgICAgbGV0IHBhd25Db2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKTtcbiAgICAgICAgbGV0IG1vdmVEaXJlY3Rpb24gPSAocGF3bkNvbG9yID09ICd3aGl0ZScpID8gMSA6IC0xO1xuXG4gICAgICAgIGxldCB0YXJnZXRGaWxlID0gZmlsZTtcbiAgICAgICAgbGV0IHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVTcXVhcmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcblxuICAgICAgICAgICAgICAgIGlmICgocGF3bkNvbG9yID09ICd3aGl0ZScgJiYgcmFuayA9PSAxKSB8fCAocGF3bkNvbG9yID09ICdibGFjaycgJiYgcmFuayA9PSA2KSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIDIgKiBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBpZWNlVHlwZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSB8fCB0aGlzLl9wdXNoTW92ZShtb3ZlcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRSYW5rID0gcmFuayArIG1vdmVEaXJlY3Rpb247XG5cbiAgICAgICAgdGFyZ2V0RmlsZSA9IGZpbGUgLSAxO1xuICAgICAgICBpZiAodGhpcy5faXNGb2UocGF3bkNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSB8fCAodGhpcy5faXNFblBhc3NhbnQodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShtb3ZlcywgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRGaWxlID0gZmlsZSArIDE7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZvZShwYXduQ29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8ICh0aGlzLl9pc0VuUGFzc2FudCh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJNb3Zlcyhtb3ZlcywgZmlsZSwgcmFuayk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIEdFVCBLSU5HIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNLaW5nKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZXMgPSAgdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rKTtcbiAgICAgICAgbGV0IGNhc3RsaW5nID0gdGhpcy5fZ2V0Q2FzdGxpbmdNb3ZlKGZpbGUsIHJhbmspO1xuXG4gICAgICAgIGNhc3RsaW5nICYmIGNhc3RsaW5nLmZvckVhY2goKGl0ZW0pID0+IG1vdmVzLnB1c2goaXRlbSkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJNb3Zlcyhtb3ZlcywgZmlsZSwgcmFuayk7XG5cbiAgICB9XG5cbiAgICBfZ2V0Q2FzdGxpbmdNb3ZlKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoICEoZmlsZSA9PT0gNCAmJiAocmFuayA9PT0gMCB8fCByYW5rID09PSA3KSkpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgY29sb3IgPSAocmFuayA9PT0gMCkgPyAnd2hpdGUnIDogJ2JsYWNrJztcbiAgICAgICAgaWYgKHRoaXMuX2Nhc3RsaW5nW2NvbG9yXSA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9pc0NoZWNrKGNvbG9yKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5fY2FzdGxpbmdbY29sb3JdID4gMSAmJiAhdGhpcy5faXNTcXVhcmVBdHRhY2tlZChjb2xvciwgZmlsZSAtIDEsIHJhbmspICYmXG4gICAgICAgICAgICAodGhpcy5faXNFbXB0eShmaWxlIC0gMSwgcmFuaykpICYmICh0aGlzLl9pc0VtcHR5KGZpbGUgLSAyLCByYW5rKSkgJiYgKHRoaXMuX2lzRW1wdHkoZmlsZSAtIDMsIHJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCAyLCByYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jYXN0bGluZ1tjb2xvcl0gJSAyID09PSAxICYmICF0aGlzLl9pc1NxdWFyZUF0dGFja2VkKGNvbG9yLCBmaWxlICsgMSwgcmFuaykgJiZcbiAgICAgICAgICAgICh0aGlzLl9pc0VtcHR5KGZpbGUgKyAxLCByYW5rKSkgJiYgKHRoaXMuX2lzRW1wdHkoZmlsZSArIDIsIHJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCA2LCByYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBfY2hlY2tDYXN0bGluZyhjb2xvciwgdHlwZSwgZmlsZSkge1xuXG4gICAgICAgIGlmICh0aGlzLl9jYXN0bGluZ1tjb2xvcl0gPiAwKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PSAna2luZycpIHRoaXMuX2Nhc3RsaW5nW2NvbG9yXSA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZSA9PSAncm9vaycpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSA9PT0gMCAmJiB0aGlzLl9jYXN0bGluZ1tjb2xvcl0gPiAxKSB0aGlzLl9jYXN0bGluZ1tjb2xvcl0gLT0gMjtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSA9PT0gNyAmJiB0aGlzLl9jYXN0bGluZ1tjb2xvcl0gJSAyID09IDEpIHRoaXMuX2Nhc3RsaW5nW2NvbG9yXSAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBfZG9DYXN0bGluZyhjb2xvciwgZmlsZSkge1xuXG4gICAgICAgIGlmIChjb2xvciA9PT0gJ3doaXRlJykge1xuXG4gICAgICAgICAgICB0aGlzLnNldFBpZWNlKGZpbGUsIDAsICdraW5nJywgJ3doaXRlJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSg0LCAwKTtcblxuICAgICAgICAgICAgaWYgKGZpbGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBpZWNlKDMsIDAsICdyb29rJywgJ3doaXRlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGllY2UoMCwgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoNSwgMCwgJ3Jvb2snLCAnd2hpdGUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSg3LCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLnNldFBpZWNlKGZpbGUsIDcsICdraW5nJywgJ2JsYWNrJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSg0LCA3KTtcblxuICAgICAgICAgICAgaWYgKGZpbGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBpZWNlKDMsIDcsICdyb29rJywgJ2JsYWNrJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGllY2UoMCwgNyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGllY2UoNSwgNywgJ3Jvb2snLCAnYmxhY2snKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSg3LCA3KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIEdFVCBQSUVDRSBNT1ZFU1xuICAgICAqL1xuXG4gICAgX2dldE1vdmVzUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBwaWVjZSA9IHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspO1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5fZ2V0QXR0YWNrZWRTcXVhcmVzKHBpZWNlLCBjb2xvciwgZmlsZSwgcmFuayk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck1vdmVzKG1vdmVzLCBmaWxlLCByYW5rKTtcblxuICAgIH1cblxuICAgIF9maWx0ZXJNb3Zlcyhtb3ZlcywgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghbW92ZXMpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiBtb3Zlcy5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGVja01vdmUoZmlsZSwgcmFuaywgaXRlbS5maWxlLCBpdGVtLnJhbmspO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgX2dldEF0dGFja2VkU3F1YXJlcyhwaWVjZSwgY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZXMgPSB0aGlzLk1PVkVTW3BpZWNlXTtcbiAgICAgICAgbGV0IGNvdW50ID0gKHBpZWNlID09ICdraW5nJyB8fCBwaWVjZSA9PSAna25pZ2h0JykgPyAxIDogNztcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIG1vdmVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgY291bnQpIHtcblxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RmlsZSA9IGZpbGUgKyBpICogaXRlbS5maWxlO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRSYW5rID0gcmFuayArIGkgKiBpdGVtLnJhbms7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVTcXVhcmUodGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNGcmllbmQoY29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKHJlc3VsdCwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuayk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZvZShjb2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHJldHVybiByZXN1bHQ7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgVkFMSURBVE9SU1xuICAgICAqL1xuXG4gICAgX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIChmaWxlICE9PSBudWxsICYmIHJhbmsgIT09IG51bGwpICYmIChmaWxlID49IDAgJiYgZmlsZSA8PSA3ICYmIHJhbmsgPj0gMCAmJiByYW5rIDw9IDcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgU0VSVklDRVNcbiAgICAgKi9cblxuICAgICBfcHVzaE1vdmUocmVzdWx0LCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IG1vdmUgPSB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICB9O1xuICAgICAgICByZXN1bHQucHVzaChtb3ZlKTtcblxuICAgIH1cblxuICAgICBfaXNGcmllbmQoY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICByZXR1cm4gKGNvbG9yID09PSB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykpO1xuXG4gICAgfVxuXG4gICAgIF9pc0ZvZShjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgIHJldHVybiAoY29sb3IgIT09IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG5cbiAgICB9XG5cbiAgICBfaXNGb2VzUGF3bihjb2xvciwgZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykgPT0gJ3Bhd24nICYmIHRoaXMuX2lzRm9lKGNvbG9yLCBmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAgX2lzRW1wdHkoZmlsZSwgcmFuaykge1xuXG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIHJldHVybiB0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSA9PT0gbnVsbDtcblxuICAgIH1cblxuICAgIF9pc1NxdWFyZUF0dGFja2VkKGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1NxdWFyZUF0dGFja2VkQnlQYXduKGNvbG9yLCBmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGxldCBwaWVjZXMgPSBbJ3Jvb2snLCAna25pZ2h0JywgJ2Jpc2hvcCcsICdxdWVlbicsICdraW5nJ107XG5cbiAgICAgICAgICAgIHBpZWNlcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICh0eXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzcXVhcmVzID0gdGhpcy5fZ2V0QXR0YWNrZWRTcXVhcmVzKHR5cGUsIGNvbG9yLCBmaWxlLCByYW5rKTtcblxuICAgICAgICAgICAgICAgICAgICBzcXVhcmVzICYmIHNxdWFyZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgICAgIChpdGVtKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRQaWVjZVR5cGUoaXRlbS5maWxlLCBpdGVtLnJhbmspID09IHR5cGUpIHJlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfVxuXG4gICAgX2lzU3F1YXJlQXR0YWNrZWRCeVBhd24oY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgdGFyZ2V0UmFuayA9IChjb2xvciA9PSAnd2hpdGUnKSA/IHJhbmsgKyAxIDogcmFuayAtIDE7XG4gICAgICAgIGxldCB0YXJnZXRGaWxlID0gW2ZpbGUgLSAxLCBmaWxlICsgMV07XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHRhcmdldEZpbGUuZmlsdGVyKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHRoaXMuZ2V0UGllY2VUeXBlKGl0ZW0sIHRhcmdldFJhbmspID09ICdwYXduJyAmJiB0aGlzLl9pc0ZvZShjb2xvciwgaXRlbSwgdGFyZ2V0UmFuaylcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDA7XG5cbiAgICB9XG5cbiAgICBfaXNDaGVjayhjb2xvcikge1xuXG4gICAgICAgIGxldCBraW5nID0gdGhpcy5fZ2V0S2luZyhjb2xvcik7XG5cbiAgICAgICAgaWYgKGtpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1NxdWFyZUF0dGFja2VkKGNvbG9yLCBraW5nLmZpbGUsIGtpbmcucmFuayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBfZ2V0S2luZyhjb2xvcikge1xuXG4gICAgICAgIGlmIChjb2xvciAhPSAnd2hpdGUnICYmIGNvbG9yICE9ICdibGFjaycpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByYW5rID0gMDsgcmFuayA8IDg7IHJhbmsrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSA9PSAna2luZycgJiYgdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspID09IGNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX3JlbW92ZVBpZWNlKGZpbGUsIHJhbmspIHtcblxuICAgICAgICB0aGlzLnNldFBpZWNlVHlwZShmaWxlLCByYW5rLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmssIG51bGwpO1xuXG4gICAgfVxuXG4gICAgX2Nsb25lQm9hcmQoc3JjKSB7XG5cbiAgICAgICAgbGV0IG5ld0JvYXJkID0gbmV3IEpCb2FyZDtcblxuICAgICAgICBpZiAoc3JjLl9lblBhc3NhbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld0JvYXJkLl9lblBhc3NhbnQgPSB7XG4gICAgICAgICAgICAgICAgZmlsZTogc3JjLl9lblBhc3NhbnQuZmlsZSxcbiAgICAgICAgICAgICAgICByYW5rOiBzcmMuX2VuUGFzc2FudC5yYW5rXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3Qm9hcmQuX2VuUGFzc2FudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBuZXdCb2FyZC5fdHVybiA9IHRoaXMuX3R1cm47XG5cbiAgICAgICAgbmV3Qm9hcmQuX2Nhc3RsaW5nID0ge1xuICAgICAgICAgICAgd2hpdGU6IHNyYy5fY2FzdGxpbmcud2hpdGUsXG4gICAgICAgICAgICBibGFjazogc3JjLl9jYXN0bGluZy5ibGFja1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByYW5rID0gMDsgcmFuayA8IDg7IHJhbmsrKykge1xuICAgICAgICAgICAgICAgIG5ld0JvYXJkLl9ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS50eXBlID0gc3JjLl9ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS50eXBlO1xuICAgICAgICAgICAgICAgIG5ld0JvYXJkLl9ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IHNyYy5fYm9hcmRbZmlsZV1bcmFua10ucGllY2UuY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3Qm9hcmQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIERPTUZFTlxuICAgICAqL1xuXG4gICAgZ2V0RkVOKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RkVOQm9hcmQoKSArICcgJyArXG4gICAgICAgICAgICAgICB0aGlzLl9nZXRGRU5UdXJuKCkgKyAnICcgK1xuICAgICAgICAgICAgICAgdGhpcy5fZ2V0RkVOQ2FzdGxpbmcoKSArICcgJyArXG4gICAgICAgICAgICAgICB0aGlzLl9nZXRGRU5FblBhc3NhbnQoKSArICcgJyArXG4gICAgICAgICAgICAgICB0aGlzLl9nZXRGRU5Db3VudHMoKTtcbiAgICB9XG5cbiAgICBfZ2V0RkVOUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgcGllY2UgPSB0aGlzLmdldFBpZWNlVHlwZShmaWxlLCAgcmFuayk7XG4gICAgICAgIGlmICghcGllY2UpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgRkVOO1xuICAgICAgICBzd2l0Y2ggKHBpZWNlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Bhd24nOlxuICAgICAgICAgICAgICAgIEZFTiA9ICdwJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAncm9vayc6XG4gICAgICAgICAgICAgICAgRkVOID0gJ3InO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdrbmlnaHQnOlxuICAgICAgICAgICAgICAgIEZFTiA9ICduJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnYmlzaG9wJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAnYic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3F1ZWVuJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAncSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2tpbmcnOlxuICAgICAgICAgICAgICAgIEZFTiA9ICdrJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAodGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspID09PSAnd2hpdGUnKSByZXR1cm4gRkVOLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICByZXR1cm4gRkVOO1xuXG4gICAgfVxuXG4gICAgX2dldEZFTkJvYXJkKCkge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcblxuICAgICAgICBmb3IgKGxldCByYW5rID0gNzsgcmFuayA+PSAwOyByYW5rLS0pIHtcbiAgICAgICAgICAgIGxldCB2YWNhbmN5ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dldEZFTlBpZWNlKGZpbGUsIHJhbmspICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWNhbmN5ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFjYW5jeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhY2FuY3kgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0aGlzLl9nZXRGRU5QaWVjZShmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWNhbmN5Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhY2FuY3kgIT09IDApIHJlc3VsdCArPSB2YWNhbmN5O1xuICAgICAgICAgICAgaWYgKHJhbmsgPiAwKSByZXN1bHQgKz0gJy8nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIF9nZXRGRU5UdXJuKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl90dXJuID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3cnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdiJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX2dldEZFTkNhc3RsaW5nKCkge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcblxuICAgICAgICBpZiAodGhpcy5fY2FzdGxpbmcud2hpdGUgJSAyID09IDEpIHJlc3VsdCArPSAnSyc7XG4gICAgICAgIGlmICh0aGlzLl9jYXN0bGluZy53aGl0ZSA+IDEpIHJlc3VsdCArPSAnUSc7XG4gICAgICAgIGlmICh0aGlzLl9jYXN0bGluZy5ibGFjayAlIDIgPT0gMSkgcmVzdWx0ICs9ICdrJztcbiAgICAgICAgaWYgKHRoaXMuX2Nhc3RsaW5nLmJsYWNrID4gMSkgcmVzdWx0ICs9ICdxJztcblxuICAgICAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICByZXR1cm4gJy0nO1xuXG4gICAgfVxuXG4gICAgX2dldEZFTkVuUGFzc2FudCgpIHtcblxuICAgICAgICBsZXQgZW5QYXNzYW50ID0gdGhpcy5fZW5QYXNzYW50O1xuICAgICAgICBpZiAoIXRoaXMuX2VuUGFzc2FudCkgcmV0dXJuICctJztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFsZ2VicmFpY0J5RGlnaXRzKGVuUGFzc2FudC5maWxlLCBlblBhc3NhbnQucmFuayk7XG5cbiAgICB9XG5cbiAgICBfZ2V0RkVOQ291bnRzKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VudEZpZnR5TW92ZSArICcgJyArIHRoaXMuX2NvdW50O1xuXG4gICAgfVxuXG4gICAgX2dldEFsZ2VicmFpY0J5RGlnaXRzKGZpbGUsIHJhbmspIHtcbiAgICAgICAgbGV0IHNoaWZ0RmlsZSA9IDk3O1xuICAgICAgICBsZXQgc2hpZnRSYW5rID0gMTtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZmlsZSArIHNoaWZ0RmlsZSkgKyAocmFuayArIHNoaWZ0UmFuayk7XG4gICAgfVxuXG59IiwiXG4vKlxuICogICAgIGpDaGVzcyB+IGpjaGVzcy5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5pbXBvcnQgSkJvYXJkIGZyb20gJy4vamJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkNoZXNzIHtcblxuICAgIC8qXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkID0gbmV3IEpCb2FyZDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VUVVBcbiAgICAgKi9cblxuICAgIHNldFVwSW5pdGlhbCgpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQuc2V0VXBJbml0aWFsKCk7XG4gICAgfVxuXG4gICAgc2V0VXBQb3NpdGlvbihwaWVjZVNldCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5zZXRVcFBvc2l0aW9uKHBpZWNlU2V0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBnZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmNvbG9yO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBQSUNLXG4gICAgICovXG5cbiAgICBwaWNrU3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQucGlja1NxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgU0VMRUNUXG4gICAgICovXG5cbiAgICBpc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIE1BUktcbiAgICAgKi9cblxuICAgIGlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBET01GRU5cbiAgICAgKi9cblxuICAgIGdldEZFTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldEZFTigpO1xuICAgIH1cblxufSJdfQ==
