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

var _dom_turn_indicator = require('../dom_turn_indicator/dom_turn_indicator');

var _dom_turn_indicator2 = _interopRequireDefault(_dom_turn_indicator);

var _dom_sidebar = require('../dom_sidebar/dom_sidebar');

var _dom_sidebar2 = _interopRequireDefault(_dom_sidebar);

var _dom_fen = require('../dom_fen/dom_fen');

var _dom_fen2 = _interopRequireDefault(_dom_fen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = function () {
    function Dispatcher() {
        _classCallCheck(this, Dispatcher);

        this.chess = new _jchess2.default();
        this.chess.setUpInitial();

        this.DOMBoard = new _dom_board2.default(this);
        this.DOMSidebar = new _dom_sidebar2.default(this);
        this.DOMFEN = new _dom_fen2.default(this);
        this.DOMTurnIndicator = new _dom_turn_indicator2.default(this);
    }

    _createClass(Dispatcher, [{
        key: 'boardClick',
        value: function boardClick() {

            var self = this;

            return function (e) {
                self.chess.pickSquare(+e.target.dataset.file, +e.target.dataset.rank);
                self.DOMBoard.render(self.chess);
                self.DOMFEN.update(self.chess);
                self.DOMTurnIndicator.update(self.chess);
            };
        }
    }, {
        key: 'resetClick',
        value: function resetClick() {

            var self = this;

            return function () {
                self.chess.setUpInitial();
                self.DOMBoard.render(self.chess);
                self.DOMFEN.update(self.chess);
                self.DOMTurnIndicator.update(self.chess);
            };
        }
    }, {
        key: 'FENChange',
        value: function FENChange() {

            var self = this;

            return function () {
                self.chess.setPositionByFEN(self.DOMFEN.getFEN());
                self.DOMBoard.render(self.chess);
                self.DOMFEN.update(self.chess);
                self.DOMTurnIndicator.update(self.chess);
            };
        }
    }]);

    return Dispatcher;
}();

exports.default = Dispatcher;

},{"../../lib/jchess":8,"../dom_board/dom_board":2,"../dom_fen/dom_fen":3,"../dom_sidebar/dom_sidebar":4,"../dom_turn_indicator/dom_turn_indicator":5}],2:[function(require,module,exports){
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
        key: 'render',
        value: function render(chess) {

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
    function DOMFEN(dispatcher) {
        _classCallCheck(this, DOMFEN);

        this.update(dispatcher.chess);
        var elemFEN = document.querySelector('#fen');
        elemFEN.addEventListener('change', dispatcher.FENChange());
    }

    _createClass(DOMFEN, [{
        key: 'update',
        value: function update(chess) {
            var elemFEN = document.querySelector('#fen');
            var currentCaretPosition = this.getCaretPosition(elemFEN);
            elemFEN.value = chess.getFEN();
            this.setCaretPosition(elemFEN, currentCaretPosition);
        }
    }, {
        key: 'getFEN',
        value: function getFEN() {
            var elemFEN = document.querySelector('#fen');
            return elemFEN.value;
        }
    }, {
        key: 'setFEN',
        value: function setFEN(FEN) {
            var elemFEN = document.querySelector('#fen');
            elemFEN.value = FEN;
        }
    }, {
        key: 'getCaretPosition',
        value: function getCaretPosition(input) {
            if (input.createRange) {
                var range = document.selection.createRange.duplicate();
                range.moveStart('character', -input.value.length);
                return range.text.length;
            } else {
                return input.selectionStart;
            }
        }
    }, {
        key: 'setCaretPosition',
        value: function setCaretPosition(input, pos) {
            input.setSelectionRange(pos, pos);
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

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     dom_turn_indicator.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

var DOMTurnIndicator = function () {
    function DOMTurnIndicator(dispatcher) {
        _classCallCheck(this, DOMTurnIndicator);

        this.turn = dispatcher.chess.getTurn();
        this.update(dispatcher.chess);
    }

    _createClass(DOMTurnIndicator, [{
        key: 'update',
        value: function update(chess) {
            if (this.turn !== chess.getTurn()) {
                this.turn = chess.getTurn();
                var elemTurnIndicator = document.querySelector('#turn-indicator');
                if (this.turn === 'white') {
                    elemTurnIndicator.classList.remove('turn-indicator_black');
                    if (!elemTurnIndicator.classList.contains('turn-indicator_white')) {
                        elemTurnIndicator.classList.add('turn-indicator_white');
                    }
                } else {
                    elemTurnIndicator.classList.remove('turn-indicator_white');
                    if (!elemTurnIndicator.classList.contains('turn-indicator_black')) {
                        elemTurnIndicator.classList.add('turn-indicator_black');
                    }
                }
            }
        }
    }]);

    return DOMTurnIndicator;
}();

exports.default = DOMTurnIndicator;

},{}],6:[function(require,module,exports){
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

},{"../components/dispatcher/dispatcher":1}],7:[function(require,module,exports){
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
                _this._setPiece(item.file, item.rank, item.piece.type, item.piece.color);
            });
        }
    }, {
        key: 'resetPosition',
        value: function resetPosition() {
            var _this2 = this;

            this._resetSelect()._resetMarks()._board.forEach(function (item, file) {
                item.forEach(function (square, rank) {
                    _this2._setPiece(file, rank, null, null);
                });
            });
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
        key: '_setPieceType',
        value: function _setPieceType(file, rank, type) {

            if (!this._validateSquare(file, rank)) return null;
            this._board[file][rank].piece.type = type;
            return true;
        }
    }, {
        key: '_setPieceColor',
        value: function _setPieceColor(file, rank, color) {

            if (!this._validateSquare(file, rank)) return null;
            this._board[file][rank].piece.color = color;
            return true;
        }
    }, {
        key: '_setPiece',
        value: function _setPiece(file, rank, type, color) {

            if (!this._validateSquare(file, rank)) return null;
            this._board[file][rank].piece = {
                type: type,
                color: color
            };
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
                this._resetMarks()._resetSelect();
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
    }, {
        key: 'getTurn',
        value: function getTurn() {
            return this._turn;
        }
    }, {
        key: 'setTurn',
        value: function setTurn(color) {
            color === 'white' && (this._turn = 'white');
            color === 'black' && (this._turn = 'black');
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

            return this;
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

            return this;
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
                this._setPiece(stopFile, stopRank, type, color);
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

                this._setPiece(file, 0, 'king', 'white');
                this._removePiece(4, 0);

                if (file === 2) {
                    this._setPiece(3, 0, 'rook', 'white');
                    this._removePiece(0, 0);
                } else {
                    this._setPiece(5, 0, 'rook', 'white');
                    this._removePiece(7, 0);
                }
            } else {

                this._setPiece(file, 7, 'king', 'black');
                this._removePiece(4, 7);

                if (file === 2) {
                    this._setPiece(3, 7, 'rook', 'black');
                    this._removePiece(0, 7);
                } else {
                    this._setPiece(5, 7, 'rook', 'black');
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

            this._setPieceType(file, rank, null);
            this._setPieceColor(file, rank, null);
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
    }, {
        key: 'setPositionByFEN',
        value: function setPositionByFEN(FEN) {

            var pieceSet = void 0,
                hash = void 0,
                tail = void 0;

            hash = this._parseFEN(FEN);

            pieceSet = this._getPiecesByFEN(hash.ranks);
            tail = hash.tail;
            if (pieceSet === null) return null;
            this.setUpPosition(pieceSet);

            if (tail[0] === 'w') this.setTurn('white');
            if (tail[0] === 'b') this.setTurn('black');

            this._setFENCastling(tail[1]);
        }
    }, {
        key: '_setFENCastling',
        value: function _setFENCastling(FEN) {

            var i = void 0,
                n = FEN.length,
                result = {
                white: 0,
                black: 0
            };

            if (FEN !== '-') {

                for (i = 0; i < n; i++) {
                    switch (FEN[i]) {

                        case 'K':
                            result.white += 1;
                            break;

                        case 'Q':
                            result.white += 2;
                            break;

                        case 'k':
                            result.black += 1;
                            break;

                        case 'q':
                            result.black += 2;
                            break;

                    }
                }
            }

            this._castling = {
                white: result.white,
                black: result.black
            };
        }
    }, {
        key: '_parseFEN',
        value: function _parseFEN(FEN) {

            var tail = void 0,
                ranks = FEN.split('/');
            if (ranks.length != 8) return null;
            tail = ranks[7].split(' ');
            ranks[7] = tail[0];
            tail.shift();
            ranks.reverse();

            return {
                ranks: ranks,
                tail: tail
            };
        }
    }, {
        key: '_getPiecesByFEN',
        value: function _getPiecesByFEN(ranks) {

            var rank = void 0,
                file = void 0,
                rankSet = void 0,
                result = [];

            for (rank = 0; rank < 8; rank++) {
                rankSet = this._getRankByFEN(ranks[rank]);
                if (rankSet === null) return null;
                if (rankSet.length != 8) return null;
                for (file = 0; file < 8; file++) {
                    result.push({
                        file: file,
                        rank: rank,
                        piece: {
                            type: rankSet[file].type,
                            color: rankSet[file].color
                        }
                    });
                }
            }

            return result;
        }
    }, {
        key: '_getRankByFEN',
        value: function _getRankByFEN(FEN) {

            var i = void 0,
                j = void 0,
                n = void 0,
                length = FEN.length,
                count = 0,
                result = [];

            if (length > 8) return null;

            for (i = 0; i < length; i++) {

                if (+FEN[i] > 0 && +FEN[i] < 9) {

                    n = +FEN[i];

                    if (count + n < 9) {

                        for (j = 0; j < n; j++) {
                            result[count] = {
                                type: null,
                                color: null
                            };
                            count++;
                        }
                    } else {

                        return null;
                    }
                } else {

                    result[count] = {};
                    switch (FEN[i].toLowerCase()) {

                        case 'r':
                            result[count].type = 'rook';
                            break;

                        case 'n':
                            result[count].type = 'knight';
                            break;

                        case 'b':
                            result[count].type = 'bishop';
                            break;

                        case 'q':
                            result[count].type = 'queen';
                            break;

                        case 'k':
                            result[count].type = 'king';
                            break;

                        case 'p':
                            result[count].type = 'pawn';
                            break;

                        default:
                            return null;

                    }

                    if (FEN[i].toLowerCase() === FEN[i]) {
                        result[count].color = 'black';
                    } else {
                        result[count].color = 'white';
                    }

                    count++;
                }

                if (count > 8) return null;
            }

            if (count != 8) return null;

            return result;
        }
    }]);

    return JBoard;
}();

exports.default = JBoard;

},{}],8:[function(require,module,exports){
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
    }, {
        key: 'setPositionByFEN',
        value: function setPositionByFEN(FEN) {
            this.mainBoard.setPositionByFEN(FEN);
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
    }, {
        key: 'getTurn',
        value: function getTurn() {
            return this.mainBoard.getTurn();
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

},{"./jboard":7}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9kaXNwYXRjaGVyL2Rpc3BhdGNoZXIuanMiLCJkZXYvY29tcG9uZW50cy9kb21fYm9hcmQvZG9tX2JvYXJkLmpzIiwiZGV2L2NvbXBvbmVudHMvZG9tX2Zlbi9kb21fZmVuLmpzIiwiZGV2L2NvbXBvbmVudHMvZG9tX3NpZGViYXIvZG9tX3NpZGViYXIuanMiLCJkZXYvY29tcG9uZW50cy9kb21fdHVybl9pbmRpY2F0b3IvZG9tX3R1cm5faW5kaWNhdG9yLmpzIiwiZGV2L2luZGV4L2FwcC5qcyIsImRldi9saWIvamJvYXJkLmpzIiwiZGV2L2xpYi9qY2hlc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQ0E7Ozs7OztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBR3FCLFU7QUFFakIsMEJBQWM7QUFBQTs7QUFFVixhQUFLLEtBQUwsR0FBYSxzQkFBYjtBQUNBLGFBQUssS0FBTCxDQUFXLFlBQVg7O0FBRUEsYUFBSyxRQUFMLEdBQWdCLHdCQUFhLElBQWIsQ0FBaEI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsMEJBQWUsSUFBZixDQUFsQjtBQUNBLGFBQUssTUFBTCxHQUFjLHNCQUFXLElBQVgsQ0FBZDtBQUNBLGFBQUssZ0JBQUwsR0FBd0IsaUNBQXFCLElBQXJCLENBQXhCO0FBRUg7Ozs7cUNBRVk7O0FBRVQsZ0JBQUksT0FBTyxJQUFYOztBQUVBLG1CQUFPLFVBQUMsQ0FBRCxFQUFPO0FBQ1YscUJBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsQ0FBQyxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLElBQXhDLEVBQThDLENBQUMsRUFBRSxNQUFGLENBQVMsT0FBVCxDQUFpQixJQUFoRTtBQUNBLHFCQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEtBQUssS0FBMUI7QUFDQSxxQkFBSyxNQUFMLENB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SSxFQUFNO0FBQ3pCLG1CQUFPLEtBQUssU0FBTCxDQUFlLGdCQUFmLENBQWdDLElBQWhDLEVBQXNDLElBQXRDLENBQVA7QUFDSDs7QUFFRDs7Ozs7O3VDQUllLEksRUFBTSxJLEVBQU07QUFDdkIsbUJBQU8sS0FBSyxTQUFMLENBQWUsY0FBZixDQUE4QixJQUE5QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0g7O0FBRUQ7Ozs7OztpQ0FJUztBQUNMLG1CQUFPLEtBQUssU0FBTCxDQUFlLE1BQWYsRUFBUDtBQUNIOzs7Ozs7a0JBaEZnQixNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLyoqXG4gKiAgICAgZGlzcGF0Y2hlci5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmltcG9ydCBKQ2hlc3MgZnJvbSAnLi4vLi4vbGliL2pjaGVzcyc7XG5pbXBvcnQgRE9NQm9hcmQgZnJvbSAnLi4vZG9tX2JvYXJkL2RvbV9ib2FyZCc7XG5pbXBvcnQgRE9NVHVybkluZGljYXRvciBmcm9tICcuLi9kb21fdHVybl9pbmRpY2F0b3IvZG9tX3R1cm5faW5kaWNhdG9yJztcbmltcG9ydCBET01TaWRlYmFyIGZyb20gJy4uL2RvbV9zaWRlYmFyL2RvbV9zaWRlYmFyJztcbmltcG9ydCBET01GRU4gZnJvbSAnLi4vZG9tX2Zlbi9kb21fZmVuJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwYXRjaGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMuY2hlc3MgPSBuZXcgSkNoZXNzO1xuICAgICAgICB0aGlzLmNoZXNzLnNldFVwSW5pdGlhbCgpO1xuXG4gICAgICAgIHRoaXMuRE9NQm9hcmQgPSBuZXcgRE9NQm9hcmQodGhpcyk7XG4gICAgICAgIHRoaXMuRE9NU2lkZWJhciA9IG5ldyBET01TaWRlYmFyKHRoaXMpO1xuICAgICAgICB0aGlzLkRPTUZFTiA9IG5ldyBET01GRU4odGhpcyk7XG4gICAgICAgIHRoaXMuRE9NVHVybkluZGljYXRvciA9IG5ldyBET01UdXJuSW5kaWNhdG9yKHRoaXMpO1xuXG4gICAgfVxuXG4gICAgYm9hcmRDbGljaygpIHtcblxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmNoZXNzLnBpY2tTcXVhcmUoK2UudGFyZ2V0LmRhdGFzZXQuZmlsZSwgK2UudGFyZ2V0LmRhdGFzZXQucmFuayk7XG4gICAgICAgICAgICBzZWxmLkRPTUJvYXJkLnJlbmRlcihzZWxmLmNoZXNzKTtcbiAgICAgICAgICAgIHNlbGYuRE9NRkVOLnVwZGF0ZShzZWxmLmNoZXNzKTtcbiAgICAgICAgICAgIHNlbGYuRE9NVHVybkluZGljYXRvci51cGRhdGUoc2VsZi5jaGVzcyk7XG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICByZXNldENsaWNrKCkge1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5jaGVzcy5zZXRVcEluaXRpYWwoKTtcbiAgICAgICAgICAgIHNlbGYuRE9NQm9hcmQucmVuZGVyKHNlbGYuY2hlc3MpO1xuICAgICAgICAgICAgc2VsZi5ET01GRU4udXBkYXRlKHNlbGYuY2hlc3MpO1xuICAgICAgICAgICAgc2VsZi5ET01UdXJuSW5kaWNhdG9yLnVwZGF0ZShzZWxmLmNoZXNzKTtcbiAgICAgICAgfTtcblxuICAgIH1cblxuICAgIEZFTkNoYW5nZSgpIHtcblxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuY2hlc3Muc2V0UG9zaXRpb25CeUZFTihzZWxmLkRPTUZFTi5nZXRGRU4oKSk7XG4gICAgICAgICAgICBzZWxmLkRPTUJvYXJkLnJlbmRlcihzZWxmLmNoZXNzKTtcbiAgICAgICAgICAgIHNlbGYuRE9NRkVOLnVwZGF0ZShzZWxmLmNoZXNzKTtcbiAgICAgICAgICAgIHNlbGYuRE9NVHVybkluZGljYXRvci51cGRhdGUoc2VsZi5jaGVzcyk7XG4gICAgICAgIH07XG5cbiAgICB9XG5cbn0iLCJcbi8qKlxuICogICAgIGRvbV9ib2FyZC5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERPTUJvYXJkIHtcblxuICAgIC8qKlxuICAgICAqICAgQ09OU1RSVUNUT1JcbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yKGRpc3BhdGNoZXIpIHtcbiAgICAgICAgdGhpcy5pbml0KGRpc3BhdGNoZXIpO1xuICAgIH1cblxuICAgIGluaXQoZGlzcGF0Y2hlcikge1xuXG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24uYm9hcmQnKSxcbiAgICAgICAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByYW5rID0gMDsgcmFuayA8IDg7IHJhbmsrKykge1xuICAgICAgICAgICAgICAgIGxldCBzcXVhcmUgPSB0aGlzLm5ld1NxdWFyZShkaXNwYXRjaGVyLmNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXNwYXRjaGVyLmJvYXJkQ2xpY2soKSk7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcblxuICAgIH1cblxuICAgIHJlbmRlcihjaGVzcykge1xuXG4gICAgICAgIGxldCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2LmJvYXJkX19zcXVhcmUnKTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHNxdWFyZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgbGV0IGZpbGUgPSBzcXVhcmVzW2ldLmRhdGFzZXQuZmlsZSxcbiAgICAgICAgICAgICAgICByYW5rID0gc3F1YXJlc1tpXS5kYXRhc2V0LnJhbms7XG5cbiAgICAgICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQuc2VsZWN0ZWQgIT0gY2hlc3MuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NxdWFyZShzcXVhcmVzW2ldLCBjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzcXVhcmVzW2ldLmRhdGFzZXQubWFya2VkICE9IGNoZXNzLmlzU3F1YXJlTWFya2VkKGZpbGUsIHJhbmspKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U3F1YXJlKHNxdWFyZXNbaV0sIGNoZXNzLCBmaWxlLCByYW5rKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNxdWFyZXNbaV0uZGF0YXNldC5waWVjZSAhPSBjaGVzcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdTcXVhcmUoc3F1YXJlc1tpXSwgY2hlc3MsIGZpbGUsIHJhbmspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIG5ld1NxdWFyZShjaGVzcywgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3F1YXJlLmRhdGFzZXQuZmlsZSA9IGZpbGU7XG4gICAgICAgIHNxdWFyZS5kYXRhc2V0LnJhbmsgPSByYW5rO1xuICAgICAgICB0aGlzLmRyYXdTcXVhcmUoc3F1YXJlLCBjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgIHJldHVybiBzcXVhcmU7XG5cbiAgICB9XG5cbiAgICBkcmF3U3F1YXJlKHNxdWFyZSwgY2hlc3MsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBzcXVhcmUuZGF0YXNldC5zZWxlY3RlZCA9ICtjaGVzcy5pc1NxdWFyZVNlbGVjdGVkKGZpbGUsIHJhbmspO1xuICAgICAgICBzcXVhcmUuZGF0YXNldC5tYXJrZWQgPSArY2hlc3MuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuayk7XG4gICAgICAgIHNxdWFyZS5kYXRhc2V0LnBpZWNlID0gKyEhY2hlc3MuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspO1xuICAgICAgICB0aGlzLnNldENsYXNzZXMoc3F1YXJlLCBjaGVzcywgZmlsZSwgcmFuayk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgc2V0Q2xhc3NlcyhzcXVhcmUsIGNoZXNzLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgc3F1YXJlLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmUnKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGNoZXNzLmdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspKTtcblxuICAgICAgICBpZiAoc3F1YXJlLmRhdGFzZXQuc2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcXVhcmUuZGF0YXNldC5tYXJrZWQgPT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfbWFya2VkXycgKyBjaGVzcy5nZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3F1YXJlLmRhdGFzZXQucGllY2UgPT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19zcXVhcmVfJyArIGNoZXNzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSArICdfJ1xuICAgICAgICAgICAgICAgICsgY2hlc3MuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiAgICAgZG9tX2Zlbi5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERPTUZFTiB7XG5cbiAgICBjb25zdHJ1Y3RvcihkaXNwYXRjaGVyKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKGRpc3BhdGNoZXIuY2hlc3MpO1xuICAgICAgICBsZXQgZWxlbUZFTiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmZW4nKTtcbiAgICAgICAgZWxlbUZFTi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBkaXNwYXRjaGVyLkZFTkNoYW5nZSgpKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoY2hlc3MpIHtcbiAgICAgICAgbGV0IGVsZW1GRU4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVuJyk7XG4gICAgICAgIGxldCBjdXJyZW50Q2FyZXRQb3NpdGlvbiA9IHRoaXMuZ2V0Q2FyZXRQb3NpdGlvbihlbGVtRkVOKTtcbiAgICAgICAgZWxlbUZFTi52YWx1ZSA9IGNoZXNzLmdldEZFTigpO1xuICAgICAgICB0aGlzLnNldENhcmV0UG9zaXRpb24oZWxlbUZFTiwgY3VycmVudENhcmV0UG9zaXRpb24pO1xuICAgIH1cblxuICAgIGdldEZFTigpIHtcbiAgICAgICAgbGV0IGVsZW1GRU4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVuJyk7XG4gICAgICAgIHJldHVybiBlbGVtRkVOLnZhbHVlO1xuICAgIH1cblxuICAgIHNldEZFTihGRU4pIHtcbiAgICAgICAgbGV0IGVsZW1GRU4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVuJyk7XG4gICAgICAgIGVsZW1GRU4udmFsdWUgPSBGRU47XG4gICAgfVxuXG4gICAgZ2V0Q2FyZXRQb3NpdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LmNyZWF0ZVJhbmdlKSB7XG4gICAgICAgICAgICBsZXQgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UuZHVwbGljYXRlKCk7XG4gICAgICAgICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1pbnB1dC52YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlLnRleHQubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q2FyZXRQb3NpdGlvbihpbnB1dCwgcG9zKSB7XG4gICAgICAgIGlucHV0LnNldFNlbGVjdGlvblJhbmdlKHBvcywgcG9zKTtcbiAgICB9XG5cbn0iLCJcbi8qKlxuICogICAgIGRvbV9zaWRlYmFyLmpzIGZvciBqQ2hlc3MgcHJvamVjdFxuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qY2hlc3MuZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NU2lkZWJhciB7XG5cbiAgICAvKipcbiAgICAgKiAgIENPTlNUUlVDVE9SXG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcihkaXNwYXRjaGVyKSB7XG4gICAgICAgIGxldCByZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG5fcmVzZXQnKTtcbiAgICAgICAgcmVzZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXNwYXRjaGVyLnJlc2V0Q2xpY2soKSk7XG4gICAgfVxuXG59IiwiXG4vKipcbiAqICAgICBkb21fdHVybl9pbmRpY2F0b3IuanMgZm9yIGpDaGVzcyBwcm9qZWN0XG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pjaGVzcy5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBET01UdXJuSW5kaWNhdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGRpc3BhdGNoZXIpIHtcbiAgICAgICAgdGhpcy50dXJuID0gZGlzcGF0Y2hlci5jaGVzcy5nZXRUdXJuKCk7XG4gICAgICAgIHRoaXMudXBkYXRlKGRpc3BhdGNoZXIuY2hlc3MpO1xuICAgIH1cblxuICAgIHVwZGF0ZShjaGVzcykge1xuICAgICAgICBpZiAodGhpcy50dXJuICE9PSBjaGVzcy5nZXRUdXJuKCkpIHtcbiAgICAgICAgICAgIHRoaXMudHVybiA9IGNoZXNzLmdldFR1cm4oKTtcbiAgICAgICAgICAgIGxldCBlbGVtVHVybkluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0dXJuLWluZGljYXRvcicpO1xuICAgICAgICAgICAgaWYgKHRoaXMudHVybiA9PT0gJ3doaXRlJykge1xuICAgICAgICAgICAgICAgIGVsZW1UdXJuSW5kaWNhdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ3R1cm4taW5kaWNhdG9yX2JsYWNrJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtVHVybkluZGljYXRvci5jbGFzc0xpc3QuY29udGFpbnMoJ3R1cm4taW5kaWNhdG9yX3doaXRlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbVR1cm5JbmRpY2F0b3IuY2xhc3NMaXN0LmFkZCgndHVybi1pbmRpY2F0b3Jfd2hpdGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1UdXJuSW5kaWNhdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ3R1cm4taW5kaWNhdG9yX3doaXRlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtVHVybkluZGljYXRvci5jbGFzc0xpc3QuY29udGFpbnMoJ3R1cm4taW5kaWNhdG9yX2JsYWNrJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbVR1cm5JbmRpY2F0b3IuY2xhc3NMaXN0LmFkZCgndHVybi1pbmRpY2F0b3JfYmxhY2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJcbi8qKlxuICogICAgIGFwcC5qcyBmb3IgakNoZXNzIHByb2plY3RcbiAqICAgICAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamNoZXNzLmdpdFxuICovXG5cbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZGlzcGF0Y2hlci9kaXNwYXRjaGVyJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIG5ldyBEaXNwYXRjaGVyO1xuXG59KTsiLCJcbi8qKlxuICogICAgIGpDaGVzcyB+IGpib2FyZC5qc1xuICogICAgIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQm9hcmQge1xuXG4gICAgLyoqXG4gICAgICogICBDT05TVFJVQ1RPUlxuICAgICAqL1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5fYm9hcmQgPSBbXTtcblxuICAgICAgICB0aGlzLl9pbml0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5fcGFpbnRCb2FyZCgpO1xuXG4gICAgICAgIHRoaXMuX3R1cm4gPSAnd2hpdGUnO1xuICAgICAgICB0aGlzLl9jb3VudCA9IDE7XG4gICAgICAgIHRoaXMuX2NvdW50RmlmdHlNb3ZlID0gMDtcblxuICAgICAgICB0aGlzLl9zZWxlY3RGaWxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2VsZWN0UmFuayA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fZW5QYXNzYW50ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9jYXN0bGluZyA9IHtcbiAgICAgICAgICAgIHdoaXRlOiAzLFxuICAgICAgICAgICAgYmxhY2s6IDNcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLklOSVRJQUxfUE9TSVRJT04gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDMsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncXVlZW4nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdraW5nJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlzaG9wJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDYsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna25pZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncm9vaycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Jvb2snLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVlbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA0LFxuICAgICAgICAgICAgICAgIHJhbms6IDcsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2tpbmcnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNSxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiaXNob3AnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdrbmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgICAgICByYW5rOiA3LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyb29rJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAyLFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMyxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDQsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA1LFxuICAgICAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNixcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDcsXG4gICAgICAgICAgICAgICAgcmFuazogMSxcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiAzLFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNCxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGU6IDUsXG4gICAgICAgICAgICAgICAgcmFuazogNixcbiAgICAgICAgICAgICAgICBwaWVjZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF3bicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlOiA2LFxuICAgICAgICAgICAgICAgIHJhbms6IDYsXG4gICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bhd24nLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsZTogNyxcbiAgICAgICAgICAgICAgICByYW5rOiA2LFxuICAgICAgICAgICAgICAgIHBpZWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXduJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuTU9WRVMgPSB7XG4gICAgICAgICAgICByb29rOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAga25pZ2h0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDIsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMixcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0yLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMixcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBiaXNob3A6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHF1ZWVuOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAwLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAtMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAga2luZzogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogLTEsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IC0xLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBJTklUSUFMSVpBVElPTlxuICAgICAqL1xuXG4gICAgX2luaXRCb2FyZCgpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fYm9hcmRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYm9hcmRbaV1bal0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWFya2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX3BhaW50Qm9hcmQoKSB7XG5cbiAgICAgICAgbGV0IGNvdW50U3F1YXJlID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50U3F1YXJlKys7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2JvYXJkW2ldW2pdLmNvbG9yID0gKGNvdW50U3F1YXJlKysgJSAyKSA/ICdibGFjaycgOiAnd2hpdGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIFNFVFVQXG4gICAgICovXG5cbiAgICBzZXRVcEluaXRpYWwoKSB7XG4gICAgICAgIHRoaXMuc2V0VXBQb3NpdGlvbih0aGlzLklOSVRJQUxfUE9TSVRJT04pO1xuICAgIH1cblxuICAgIHNldFVwUG9zaXRpb24ocGllY2VTZXQpIHtcblxuICAgICAgICB0aGlzLl90dXJuID0gJ3doaXRlJztcblxuICAgICAgICB0aGlzLl9jb3VudCA9IDE7XG4gICAgICAgIHRoaXMuX2NvdW50RmlmdHlNb3ZlID0gMDtcblxuICAgICAgICB0aGlzLl9lblBhc3NhbnQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2Nhc3RsaW5nID0ge1xuICAgICAgICAgICAgd2hpdGU6IDMsXG4gICAgICAgICAgICBibGFjazogM1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgICAgICBwaWVjZVNldC5mb3JFYWNoKFxuICAgICAgICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRQaWVjZShpdGVtLmZpbGUsIGl0ZW0ucmFuaywgaXRlbS5waWVjZS50eXBlLCBpdGVtLnBpZWNlLmNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIHJlc2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KClcbiAgICAgICAgICAgIC5fcmVzZXRNYXJrcygpXG4gICAgICAgICAgICAuX2JvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoaXRlbSwgZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKHNxdWFyZSwgcmFuaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0UGllY2UoZmlsZSwgcmFuaywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBTUVVBUkUgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2FyZFtmaWxlXVtyYW5rXTtcbiAgICB9XG5cbiAgICBnZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKSAmJiB0aGlzLmdldFNxdWFyZShmaWxlLCByYW5rKS5jb2xvcjtcbiAgICB9XG5cbiAgICBnZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5nZXRTcXVhcmUoZmlsZSwgcmFuaykucGllY2UudHlwZTtcbiAgICB9XG5cbiAgICBnZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspICYmIHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmNvbG9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgU1FVQVJFIFNFVFRFUlNcbiAgICAgKi9cblxuICAgIF9zZXRQaWVjZVR5cGUoZmlsZSwgcmFuaywgdHlwZSkge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLl9ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS50eXBlID0gdHlwZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICBfc2V0UGllY2VDb2xvcihmaWxlLCByYW5rLCBjb2xvcikge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLl9ib2FyZFtmaWxlXVtyYW5rXS5waWVjZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIF9zZXRQaWVjZShmaWxlLCByYW5rLCB0eXBlLCBjb2xvcikge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLl9ib2FyZFtmaWxlXVtyYW5rXS5waWVjZSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBjb2xvcjogY29sb3JcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIEVOIFBBU1NBTlRcbiAgICAgKi9cblxuICAgIF9jaGVja0VuUGFzc2FudChzdGFydEZpbGUsIHN0YXJ0UmFuaywgc3RvcEZpbGUsIHN0b3BSYW5rKSB7XG5cbiAgICAgICAgbGV0IHBpZWNlID0gdGhpcy5nZXRQaWVjZVR5cGUoc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuXG4gICAgICAgIGlmIChwaWVjZSA9PSAncGF3bicpIHtcblxuICAgICAgICAgICAgdGhpcy5faXNFblBhc3NhbnQoc3RvcEZpbGUsIHN0b3BSYW5rKSAmJiB0aGlzLl9yZW1vdmVQaWVjZShzdG9wRmlsZSwgc3RhcnRSYW5rKTtcbiAgICAgICAgICAgIHRoaXMuX3NldEVuUGFzc2FudChudWxsKTtcblxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHN0YXJ0UmFuayAtIHN0b3BSYW5rKSA9PSAyKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRm9lc1Bhd24oY29sb3IsIHN0b3BGaWxlIC0gMSwgc3RvcFJhbmspIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRm9lc1Bhd24oY29sb3IsIHN0b3BGaWxlICsgMSwgc3RvcFJhbmspKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wUmFuayA9PSAzICYmIHRoaXMuX3NldEVuUGFzc2FudChzdG9wRmlsZSwgMik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wUmFuayA9PSA0ICYmIHRoaXMuX3NldEVuUGFzc2FudChzdG9wRmlsZSwgNSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXRFblBhc3NhbnQobnVsbCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgX2dldEVuUGFzc2FudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuUGFzc2FudDtcbiAgICB9XG5cbiAgICBfc2V0RW5QYXNzYW50KGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspIHx8IChyYW5rICE9IDIgJiYgcmFuayAhPSA1KSkge1xuXG4gICAgICAgICAgICB0aGlzLl9lblBhc3NhbnQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lblBhc3NhbnQgPSB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgcmFuazogcmFua1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9pc0VuUGFzc2FudChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHBhc3MgPSB0aGlzLl9nZXRFblBhc3NhbnQoKTtcbiAgICAgICAgaWYgKCFwYXNzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBwYXNzLmZpbGUgPT0gZmlsZSAmJiBwYXNzLnJhbmsgPT0gcmFuaztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgUElDS1xuICAgICAqL1xuXG4gICAgcGlja1NxdWFyZShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgdGhpcy5fZG9Nb3ZlKHRoaXMuX3NlbGVjdEZpbGUsIHRoaXMuX3NlbGVjdFJhbmssIGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RGaWxlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdFJhbmsgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRNYXJrcygpXG4gICAgICAgICAgICAgICAgLl9yZXNldFNlbGVjdCgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0U2VsZWN0KCk7XG4gICAgICAgICAgICBzcXVhcmUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0RmlsZSA9IGZpbGU7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RSYW5rID0gcmFuaztcbiAgICAgICAgICAgIHRoaXMuX21hcmtNb3ZlcyhmaWxlLCByYW5rKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgX3Bhc3NUdXJuKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl90dXJuID09PSAnd2hpdGUnKSB7XG4gICAgICAgICAgICB0aGlzLl90dXJuID0gJ2JsYWNrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3R1cm4gPSAnd2hpdGUnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRUdXJuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHVybjtcbiAgICB9XG5cbiAgICBzZXRUdXJuKGNvbG9yKSB7XG4gICAgICAgIChjb2xvciA9PT0gJ3doaXRlJykgJiYgKHRoaXMuX3R1cm4gPSAnd2hpdGUnKTtcbiAgICAgICAgKGNvbG9yID09PSAnYmxhY2snKSAmJiAodGhpcy5fdHVybiA9ICdibGFjaycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgU0VMRUNUXG4gICAgICovXG5cbiAgICBfcmVzZXRTZWxlY3QoKSB7XG5cbiAgICAgICAgdGhpcy5fYm9hcmQuZm9yRWFjaChcbiAgICAgICAgICAgIChmaWxlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBmaWxlLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBzcXVhcmUuc2VsZWN0ZWQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIE1BUksgTU9WRVNcbiAgICAgKi9cblxuICAgIF9yZXNldE1hcmtzKCkge1xuXG4gICAgICAgIHRoaXMuX2JvYXJkLmZvckVhY2goXG4gICAgICAgICAgICAoZmlsZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgZmlsZS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmUubWFya2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBpc1NxdWFyZU1hcmtlZChmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKGZpbGUsIHJhbmspO1xuICAgICAgICBpZiAoIXNxdWFyZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBzcXVhcmUubWFya2VkO1xuXG4gICAgfVxuXG4gICAgX21hcmtNb3ZlcyhmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShmaWxlLCByYW5rKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuX3Jlc2V0TWFya3MoKTtcblxuICAgICAgICBpZiAodGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspICE9PSB0aGlzLl90dXJuKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAoISF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkge1xuXG4gICAgICAgICAgICBsZXQgbW92ZXMgPSB0aGlzLl9nZXRNb3ZlcyhmaWxlLCByYW5rKTtcbiAgICAgICAgICAgIGlmICghbW92ZXMpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbW92ZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ib2FyZFtpdGVtLmZpbGVdW2l0ZW0ucmFua10ubWFya2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgR0VUIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXMoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHtcblxuICAgICAgICAgICAgY2FzZSAncGF3bic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzUGF3bihmaWxlLCByYW5rKTtcblxuICAgICAgICAgICAgY2FzZSAna2luZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1vdmVzS2luZyhmaWxlLCByYW5rKTtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgIERPIE1PVkVcbiAgICAgKi9cblxuICAgIF9kb01vdmUoc3RhcnRGaWxlLCBzdGFydFJhbmssIHN0b3BGaWxlLCBzdG9wUmFuaykge1xuXG4gICAgICAgIHRoaXMuX2NoZWNrRW5QYXNzYW50KHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspO1xuXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5nZXRQaWVjZVR5cGUoc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldFBpZWNlQ29sb3Ioc3RhcnRGaWxlLCBzdGFydFJhbmspO1xuICAgICAgICBsZXQgY2FwdHVyZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoc3RhcnRGaWxlLCBzdGFydFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZVNxdWFyZShzdG9wRmlsZSwgc3RvcFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzRW1wdHkoc3RhcnRGaWxlLCBzdGFydFJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzRnJpZW5kKGNvbG9yLCBzdG9wRmlsZSwgc3RvcFJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodHlwZSA9PSAna2luZycgJiYgTWF0aC5hYnMoc3RhcnRGaWxlIC0gc3RvcEZpbGUpID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLl9kb0Nhc3RsaW5nKGNvbG9yLCBzdG9wRmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYXB0dXJlID0gdGhpcy5faXNGb2UoY29sb3IsIHN0b3BGaWxlLCBzdG9wUmFuayk7XG4gICAgICAgICAgICB0aGlzLl9zZXRQaWVjZShzdG9wRmlsZSwgc3RvcFJhbmssIHR5cGUsIGNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09ICdraW5nJyB8fCB0eXBlID09ICdyb29rJykge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tDYXN0bGluZyhjb2xvciwgdHlwZSwgc3RhcnRGaWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2xvciA9PSAnYmxhY2snKSB7XG4gICAgICAgICAgICB0aGlzLl9jb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhcHR1cmUgfHwgdHlwZSA9PSAncGF3bicpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvdW50RmlmdHlNb3ZlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvdW50RmlmdHlNb3ZlKys7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wYXNzVHVybigpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBDSEVDSyBNT1ZFXG4gICAgICovXG5cbiAgICBfY2hlY2tNb3ZlKHN0YXJ0RmlsZSwgc3RhcnRSYW5rLCBzdG9wRmlsZSwgc3RvcFJhbmspIHtcblxuICAgICAgICBsZXQgY2hlY2tCb2FyZCA9IHRoaXMuX2Nsb25lQm9hcmQodGhpcyk7XG5cbiAgICAgICAgaWYgKGNoZWNrQm9hcmQuX2RvTW92ZShzdGFydEZpbGUsIHN0YXJ0UmFuaywgc3RvcEZpbGUsIHN0b3BSYW5rKSkge1xuICAgICAgICAgICAgcmV0dXJuICFjaGVja0JvYXJkLl9pc0NoZWNrKHRoaXMuZ2V0UGllY2VDb2xvcihzdGFydEZpbGUsIHN0YXJ0UmFuaykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgR0VUIFBBV04gTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc1Bhd24oZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBtb3ZlcyA9IFtdO1xuICAgICAgICBsZXQgcGF3bkNvbG9yID0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspO1xuICAgICAgICBsZXQgbW92ZURpcmVjdGlvbiA9IChwYXduQ29sb3IgPT0gJ3doaXRlJykgPyAxIDogLTE7XG5cbiAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBmaWxlO1xuICAgICAgICBsZXQgdGFyZ2V0UmFuayA9IHJhbmsgKyBtb3ZlRGlyZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZVNxdWFyZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUobW92ZXMsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuXG4gICAgICAgICAgICAgICAgaWYgKChwYXduQ29sb3IgPT0gJ3doaXRlJyAmJiByYW5rID09IDEpIHx8IChwYXduQ29sb3IgPT0gJ2JsYWNrJyAmJiByYW5rID09IDYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFJhbmsgPSByYW5rICsgMiAqIG1vdmVEaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGllY2VUeXBlKHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8IHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFJhbmsgPSByYW5rICsgbW92ZURpcmVjdGlvbjtcblxuICAgICAgICB0YXJnZXRGaWxlID0gZmlsZSAtIDE7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZvZShwYXduQ29sb3IsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspIHx8ICh0aGlzLl9pc0VuUGFzc2FudCh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hNb3ZlKG1vdmVzLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldEZpbGUgPSBmaWxlICsgMTtcbiAgICAgICAgaWYgKHRoaXMuX2lzRm9lKHBhd25Db2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykgfHwgKHRoaXMuX2lzRW5QYXNzYW50KHRhcmdldEZpbGUsIHRhcmdldFJhbmspKSkge1xuICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUobW92ZXMsIHRhcmdldEZpbGUsIHRhcmdldFJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck1vdmVzKG1vdmVzLCBmaWxlLCByYW5rKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgR0VUIEtJTkcgTU9WRVNcbiAgICAgKi9cblxuICAgIF9nZXRNb3Zlc0tpbmcoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBtb3ZlcyA9ICB0aGlzLl9nZXRNb3Zlc1BpZWNlKGZpbGUsIHJhbmspO1xuICAgICAgICBsZXQgY2FzdGxpbmcgPSB0aGlzLl9nZXRDYXN0bGluZ01vdmUoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgY2FzdGxpbmcgJiYgY2FzdGxpbmcuZm9yRWFjaCgoaXRlbSkgPT4gbW92ZXMucHVzaChpdGVtKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck1vdmVzKG1vdmVzLCBmaWxlLCByYW5rKTtcblxuICAgIH1cblxuICAgIF9nZXRDYXN0bGluZ01vdmUoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICggIShmaWxlID09PSA0ICYmIChyYW5rID09PSAwIHx8IHJhbmsgPT09IDcpKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBjb2xvciA9IChyYW5rID09PSAwKSA/ICd3aGl0ZScgOiAnYmxhY2snO1xuICAgICAgICBpZiAodGhpcy5fY2FzdGxpbmdbY29sb3JdID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzQ2hlY2soY29sb3IpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLl9jYXN0bGluZ1tjb2xvcl0gPiAxICYmICF0aGlzLl9pc1NxdWFyZUF0dGFja2VkKGNvbG9yLCBmaWxlIC0gMSwgcmFuaykgJiZcbiAgICAgICAgICAgICh0aGlzLl9pc0VtcHR5KGZpbGUgLSAxLCByYW5rKSkgJiYgKHRoaXMuX2lzRW1wdHkoZmlsZSAtIDIsIHJhbmspKSAmJiAodGhpcy5faXNFbXB0eShmaWxlIC0gMywgcmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIDIsIHJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nhc3RsaW5nW2NvbG9yXSAlIDIgPT09IDEgJiYgIXRoaXMuX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGZpbGUgKyAxLCByYW5rKSAmJlxuICAgICAgICAgICAgKHRoaXMuX2lzRW1wdHkoZmlsZSArIDEsIHJhbmspKSAmJiAodGhpcy5faXNFbXB0eShmaWxlICsgMiwgcmFuaykpKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoTW92ZShyZXN1bHQsIDYsIHJhbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIF9jaGVja0Nhc3RsaW5nKGNvbG9yLCB0eXBlLCBmaWxlKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nhc3RsaW5nW2NvbG9yXSA+IDApIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09ICdraW5nJykgdGhpcy5fY2FzdGxpbmdbY29sb3JdID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlID09ICdyb29rJykge1xuICAgICAgICAgICAgICAgIGlmIChmaWxlID09PSAwICYmIHRoaXMuX2Nhc3RsaW5nW2NvbG9yXSA+IDEpIHRoaXMuX2Nhc3RsaW5nW2NvbG9yXSAtPSAyO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlID09PSA3ICYmIHRoaXMuX2Nhc3RsaW5nW2NvbG9yXSAlIDIgPT0gMSkgdGhpcy5fY2FzdGxpbmdbY29sb3JdIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9kb0Nhc3RsaW5nKGNvbG9yLCBmaWxlKSB7XG5cbiAgICAgICAgaWYgKGNvbG9yID09PSAnd2hpdGUnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3NldFBpZWNlKGZpbGUsIDAsICdraW5nJywgJ3doaXRlJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSg0LCAwKTtcblxuICAgICAgICAgICAgaWYgKGZpbGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRQaWVjZSgzLCAwLCAncm9vaycsICd3aGl0ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDAsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRQaWVjZSg1LCAwLCAncm9vaycsICd3aGl0ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3NldFBpZWNlKGZpbGUsIDcsICdraW5nJywgJ2JsYWNrJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVQaWVjZSg0LCA3KTtcblxuICAgICAgICAgICAgaWYgKGZpbGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRQaWVjZSgzLCA3LCAncm9vaycsICdibGFjaycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDAsIDcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRQaWVjZSg1LCA3LCAncm9vaycsICdibGFjaycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBpZWNlKDcsIDcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICAgR0VUIFBJRUNFIE1PVkVTXG4gICAgICovXG5cbiAgICBfZ2V0TW92ZXNQaWVjZShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgbGV0IHBpZWNlID0gdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuayk7XG4gICAgICAgIGxldCBjb2xvciA9IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKTtcblxuICAgICAgICBsZXQgbW92ZXMgPSB0aGlzLl9nZXRBdHRhY2tlZFNxdWFyZXMocGllY2UsIGNvbG9yLCBmaWxlLCByYW5rKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyTW92ZXMobW92ZXMsIGZpbGUsIHJhbmspO1xuXG4gICAgfVxuXG4gICAgX2ZpbHRlck1vdmVzKG1vdmVzLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgaWYgKCFtb3ZlcykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIG1vdmVzLmZpbHRlcihcbiAgICAgICAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrTW92ZShmaWxlLCByYW5rLCBpdGVtLmZpbGUsIGl0ZW0ucmFuayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBfZ2V0QXR0YWNrZWRTcXVhcmVzKHBpZWNlLCBjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGxldCBtb3ZlcyA9IHRoaXMuTU9WRVNbcGllY2VdO1xuICAgICAgICBsZXQgY291bnQgPSAocGllY2UgPT0gJ2tpbmcnIHx8IHBpZWNlID09ICdrbmlnaHQnKSA/IDEgOiA3O1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG5cbiAgICAgICAgbW92ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCBjb3VudCkge1xuXG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRGaWxlID0gZmlsZSArIGkgKiBpdGVtLmZpbGU7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFJhbmsgPSByYW5rICsgaSAqIGl0ZW0ucmFuaztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92YWxpZGF0ZVNxdWFyZSh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZyaWVuZChjb2xvciwgdGFyZ2V0RmlsZSwgdGFyZ2V0UmFuaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHVzaE1vdmUocmVzdWx0LCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRm9lKGNvbG9yLCB0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKSkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBWQUxJREFUT1JTXG4gICAgICovXG5cbiAgICBfdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gKGZpbGUgIT09IG51bGwgJiYgcmFuayAhPT0gbnVsbCkgJiYgKGZpbGUgPj0gMCAmJiBmaWxlIDw9IDcgJiYgcmFuayA+PSAwICYmIHJhbmsgPD0gNyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBTRVJWSUNFU1xuICAgICAqL1xuXG4gICAgIF9wdXNoTW92ZShyZXN1bHQsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBsZXQgbW92ZSA9IHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICByYW5rOiByYW5rXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdC5wdXNoKG1vdmUpO1xuXG4gICAgfVxuXG4gICAgIF9pc0ZyaWVuZChjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgIGlmICghdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgcmFuaykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgIHJldHVybiAoY29sb3IgPT09IHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSk7XG5cbiAgICB9XG5cbiAgICAgX2lzRm9lKGNvbG9yLCBmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICAgaWYgKCF0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgcmV0dXJuIChjb2xvciAhPT0gdGhpcy5nZXRQaWVjZUNvbG9yKGZpbGUsIHJhbmspKTtcblxuICAgIH1cblxuICAgIF9pc0ZvZXNQYXduKGNvbG9yLCBmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBpZWNlVHlwZShmaWxlLCByYW5rKSA9PSAncGF3bicgJiYgdGhpcy5faXNGb2UoY29sb3IsIGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgICBfaXNFbXB0eShmaWxlLCByYW5rKSB7XG5cbiAgICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09PSBudWxsO1xuXG4gICAgfVxuXG4gICAgX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzU3F1YXJlQXR0YWNrZWRCeVBhd24oY29sb3IsIGZpbGUsIHJhbmspKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHBpZWNlcyA9IFsncm9vaycsICdrbmlnaHQnLCAnYmlzaG9wJywgJ3F1ZWVuJywgJ2tpbmcnXTtcblxuICAgICAgICAgICAgcGllY2VzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKHR5cGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZXMgPSB0aGlzLl9nZXRBdHRhY2tlZFNxdWFyZXModHlwZSwgY29sb3IsIGZpbGUsIHJhbmspO1xuXG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZXMgJiYgc3F1YXJlcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFBpZWNlVHlwZShpdGVtLmZpbGUsIGl0ZW0ucmFuaykgPT0gdHlwZSkgcmVzdWx0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBfaXNTcXVhcmVBdHRhY2tlZEJ5UGF3bihjb2xvciwgZmlsZSwgcmFuaykge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGVTcXVhcmUoZmlsZSwgcmFuaykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCB0YXJnZXRSYW5rID0gKGNvbG9yID09ICd3aGl0ZScpID8gcmFuayArIDEgOiByYW5rIC0gMTtcbiAgICAgICAgbGV0IHRhcmdldEZpbGUgPSBbZmlsZSAtIDEsIGZpbGUgKyAxXTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gdGFyZ2V0RmlsZS5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbSkgPT4gdGhpcy5nZXRQaWVjZVR5cGUoaXRlbSwgdGFyZ2V0UmFuaykgPT0gJ3Bhd24nICYmIHRoaXMuX2lzRm9lKGNvbG9yLCBpdGVtLCB0YXJnZXRSYW5rKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcblxuICAgIH1cblxuICAgIF9pc0NoZWNrKGNvbG9yKSB7XG5cbiAgICAgICAgbGV0IGtpbmcgPSB0aGlzLl9nZXRLaW5nKGNvbG9yKTtcblxuICAgICAgICBpZiAoa2luZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3F1YXJlQXR0YWNrZWQoY29sb3IsIGtpbmcuZmlsZSwga2luZy5yYW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIF9nZXRLaW5nKGNvbG9yKSB7XG5cbiAgICAgICAgaWYgKGNvbG9yICE9ICd3aGl0ZScgJiYgY29sb3IgIT0gJ2JsYWNrJykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgZm9yIChsZXQgZmlsZSA9IDA7IGZpbGUgPCA4OyBmaWxlKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VUeXBlKGZpbGUsIHJhbmspID09ICdraW5nJyAmJiB0aGlzLmdldFBpZWNlQ29sb3IoZmlsZSwgcmFuaykgPT0gY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rOiByYW5rXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBfcmVtb3ZlUGllY2UoZmlsZSwgcmFuaykge1xuXG4gICAgICAgIHRoaXMuX3NldFBpZWNlVHlwZShmaWxlLCByYW5rLCBudWxsKTtcbiAgICAgICAgdGhpcy5fc2V0UGllY2VDb2xvcihmaWxlLCByYW5rLCBudWxsKTtcblxuICAgIH1cblxuICAgIF9jbG9uZUJvYXJkKHNyYykge1xuXG4gICAgICAgIGxldCBuZXdCb2FyZCA9IG5ldyBKQm9hcmQ7XG5cbiAgICAgICAgaWYgKHNyYy5fZW5QYXNzYW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdCb2FyZC5fZW5QYXNzYW50ID0ge1xuICAgICAgICAgICAgICAgIGZpbGU6IHNyYy5fZW5QYXNzYW50LmZpbGUsXG4gICAgICAgICAgICAgICAgcmFuazogc3JjLl9lblBhc3NhbnQucmFua1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0JvYXJkLl9lblBhc3NhbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3Qm9hcmQuX3R1cm4gPSB0aGlzLl90dXJuO1xuXG4gICAgICAgIG5ld0JvYXJkLl9jYXN0bGluZyA9IHtcbiAgICAgICAgICAgIHdoaXRlOiBzcmMuX2Nhc3RsaW5nLndoaXRlLFxuICAgICAgICAgICAgYmxhY2s6IHNyYy5fY2FzdGxpbmcuYmxhY2tcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgcmFuayA9IDA7IHJhbmsgPCA4OyByYW5rKyspIHtcbiAgICAgICAgICAgICAgICBuZXdCb2FyZC5fYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZSA9IHNyYy5fYm9hcmRbZmlsZV1bcmFua10ucGllY2UudHlwZTtcbiAgICAgICAgICAgICAgICBuZXdCb2FyZC5fYm9hcmRbZmlsZV1bcmFua10ucGllY2UuY29sb3IgPSBzcmMuX2JvYXJkW2ZpbGVdW3JhbmtdLnBpZWNlLmNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogICBGRU5cbiAgICAgKi9cblxuICAgIGdldEZFTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEZFTkJvYXJkKCkgKyAnICcgK1xuICAgICAgICAgICAgICAgdGhpcy5fZ2V0RkVOVHVybigpICsgJyAnICtcbiAgICAgICAgICAgICAgIHRoaXMuX2dldEZFTkNhc3RsaW5nKCkgKyAnICcgK1xuICAgICAgICAgICAgICAgdGhpcy5fZ2V0RkVORW5QYXNzYW50KCkgKyAnICcgK1xuICAgICAgICAgICAgICAgdGhpcy5fZ2V0RkVOQ291bnRzKCk7XG4gICAgfVxuXG4gICAgX2dldEZFTlBpZWNlKGZpbGUsIHJhbmspIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlU3F1YXJlKGZpbGUsIHJhbmspKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IHBpZWNlID0gdGhpcy5nZXRQaWVjZVR5cGUoZmlsZSwgIHJhbmspO1xuICAgICAgICBpZiAoIXBpZWNlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IEZFTjtcbiAgICAgICAgc3dpdGNoIChwaWVjZSkge1xuXG4gICAgICAgICAgICBjYXNlICdwYXduJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAncCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Jvb2snOlxuICAgICAgICAgICAgICAgIEZFTiA9ICdyJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAna25pZ2h0JzpcbiAgICAgICAgICAgICAgICBGRU4gPSAnbic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2Jpc2hvcCc6XG4gICAgICAgICAgICAgICAgRkVOID0gJ2InO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdxdWVlbic6XG4gICAgICAgICAgICAgICAgRkVOID0gJ3EnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdraW5nJzpcbiAgICAgICAgICAgICAgICBGRU4gPSAnayc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgIH1cblxuICAgICAgICAgaWYgKHRoaXMuZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSA9PT0gJ3doaXRlJykgcmV0dXJuIEZFTi50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgcmV0dXJuIEZFTjtcblxuICAgIH1cblxuICAgIF9nZXRGRU5Cb2FyZCgpIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgICAgICAgZm9yIChsZXQgcmFuayA9IDc7IHJhbmsgPj0gMDsgcmFuay0tKSB7XG4gICAgICAgICAgICBsZXQgdmFjYW5jeSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9nZXRGRU5QaWVjZShmaWxlLCByYW5rKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFjYW5jeSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHZhY2FuY3k7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWNhbmN5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5fZ2V0RkVOUGllY2UoZmlsZSwgcmFuayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFjYW5jeSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWNhbmN5ICE9PSAwKSByZXN1bHQgKz0gdmFjYW5jeTtcbiAgICAgICAgICAgIGlmIChyYW5rID4gMCkgcmVzdWx0ICs9ICcvJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBfZ2V0RkVOVHVybigpIHtcblxuICAgICAgICBpZiAodGhpcy5fdHVybiA9PT0gJ3doaXRlJykge1xuICAgICAgICAgICAgcmV0dXJuICd3JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnYic7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9nZXRGRU5DYXN0bGluZygpIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nhc3RsaW5nLndoaXRlICUgMiA9PSAxKSByZXN1bHQgKz0gJ0snO1xuICAgICAgICBpZiAodGhpcy5fY2FzdGxpbmcud2hpdGUgPiAxKSByZXN1bHQgKz0gJ1EnO1xuICAgICAgICBpZiAodGhpcy5fY2FzdGxpbmcuYmxhY2sgJSAyID09IDEpIHJlc3VsdCArPSAnayc7XG4gICAgICAgIGlmICh0aGlzLl9jYXN0bGluZy5ibGFjayA+IDEpIHJlc3VsdCArPSAncSc7XG5cbiAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuICctJztcblxuICAgIH1cblxuICAgIF9nZXRGRU5FblBhc3NhbnQoKSB7XG5cbiAgICAgICAgbGV0IGVuUGFzc2FudCA9IHRoaXMuX2VuUGFzc2FudDtcbiAgICAgICAgaWYgKCF0aGlzLl9lblBhc3NhbnQpIHJldHVybiAnLSc7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRBbGdlYnJhaWNCeURpZ2l0cyhlblBhc3NhbnQuZmlsZSwgZW5QYXNzYW50LnJhbmspO1xuXG4gICAgfVxuXG4gICAgX2dldEZFTkNvdW50cygpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fY291bnRGaWZ0eU1vdmUgKyAnICcgKyB0aGlzLl9jb3VudDtcblxuICAgIH1cblxuICAgIF9nZXRBbGdlYnJhaWNCeURpZ2l0cyhmaWxlLCByYW5rKSB7XG4gICAgICAgIGxldCBzaGlmdEZpbGUgPSA5NztcbiAgICAgICAgbGV0IHNoaWZ0UmFuayA9IDE7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGZpbGUgKyBzaGlmdEZpbGUpICsgKHJhbmsgKyBzaGlmdFJhbmspO1xuICAgIH1cblxuICAgIHNldFBvc2l0aW9uQnlGRU4oRkVOKSB7XG5cbiAgICAgICAgbGV0IHBpZWNlU2V0LFxuICAgICAgICAgICAgaGFzaCxcbiAgICAgICAgICAgIHRhaWw7XG5cbiAgICAgICAgaGFzaCA9IHRoaXMuX3BhcnNlRkVOKEZFTik7XG5cbiAgICAgICAgcGllY2VTZXQgPSB0aGlzLl9nZXRQaWVjZXNCeUZFTihoYXNoLnJhbmtzKTtcbiAgICAgICAgdGFpbCA9IGhhc2gudGFpbDtcbiAgICAgICAgaWYgKHBpZWNlU2V0ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5zZXRVcFBvc2l0aW9uKHBpZWNlU2V0KTtcblxuICAgICAgICBpZiAodGFpbFswXSA9PT0gJ3cnKSB0aGlzLnNldFR1cm4oJ3doaXRlJyk7XG4gICAgICAgIGlmICh0YWlsWzBdID09PSAnYicpIHRoaXMuc2V0VHVybignYmxhY2snKTtcblxuICAgICAgICB0aGlzLl9zZXRGRU5DYXN0bGluZyh0YWlsWzFdKTtcblxuICAgIH1cblxuICAgIF9zZXRGRU5DYXN0bGluZyhGRU4pIHtcblxuICAgICAgICBsZXQgaSxcbiAgICAgICAgICAgIG4gPSBGRU4ubGVuZ3RoLFxuICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIHdoaXRlOiAwLFxuICAgICAgICAgICAgICAgIGJsYWNrOiAwXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChGRU4gIT09ICctJykge1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChGRU5baV0pIHtcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdLJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC53aGl0ZSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQud2hpdGUgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2snOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJsYWNrICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdxJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ibGFjayArPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jYXN0bGluZyA9IHtcbiAgICAgICAgICAgIHdoaXRlOiByZXN1bHQud2hpdGUsXG4gICAgICAgICAgICBibGFjazogcmVzdWx0LmJsYWNrXG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICBfcGFyc2VGRU4oRkVOKSB7XG5cbiAgICAgICAgbGV0IHRhaWwsXG4gICAgICAgICAgICByYW5rcyA9IEZFTi5zcGxpdCgnLycpO1xuICAgICAgICBpZiAocmFua3MubGVuZ3RoICE9IDgpIHJldHVybiBudWxsO1xuICAgICAgICB0YWlsID0gcmFua3NbN10uc3BsaXQoJyAnKTtcbiAgICAgICAgcmFua3NbN10gPSB0YWlsWzBdO1xuICAgICAgICB0YWlsLnNoaWZ0KCk7XG4gICAgICAgIHJhbmtzLnJldmVyc2UoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmFua3M6IHJhbmtzLFxuICAgICAgICAgICAgdGFpbDogdGFpbFxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgX2dldFBpZWNlc0J5RkVOKHJhbmtzKSB7XG5cbiAgICAgICAgbGV0IHJhbmssXG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgcmFua1NldCxcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIGZvciAocmFuayA9IDA7IHJhbmsgPCA4OyByYW5rKyspIHtcbiAgICAgICAgICAgIHJhbmtTZXQgPSB0aGlzLl9nZXRSYW5rQnlGRU4ocmFua3NbcmFua10pO1xuICAgICAgICAgICAgaWYgKHJhbmtTZXQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKHJhbmtTZXQubGVuZ3RoICE9IDgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZm9yIChmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgcmFuazogcmFuayxcbiAgICAgICAgICAgICAgICAgICAgcGllY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHJhbmtTZXRbZmlsZV0udHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiByYW5rU2V0W2ZpbGVdLmNvbG9yXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBfZ2V0UmFua0J5RkVOKEZFTikge1xuXG4gICAgICAgIGxldCBpLCBqLCBuLFxuICAgICAgICAgICAgbGVuZ3RoID0gRkVOLmxlbmd0aCxcbiAgICAgICAgICAgIGNvdW50ID0gMCxcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIGlmIChsZW5ndGggPiA4KSByZXR1cm4gbnVsbDtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKCtGRU5baV0gPiAwICYmICtGRU5baV0gPCA5KSB7XG5cbiAgICAgICAgICAgICAgICBuID0gK0ZFTltpXTtcblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCArIG4gPCA5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2NvdW50XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJlc3VsdFtjb3VudF0gPSB7fTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKEZFTltpXS50b0xvd2VyQ2FzZSgpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbY291bnRdLnR5cGUgPSAncm9vayc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICduJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtjb3VudF0udHlwZSA9ICdrbmlnaHQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbY291bnRdLnR5cGUgPSAnYmlzaG9wJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2NvdW50XS50eXBlID0gJ3F1ZWVuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2snOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2NvdW50XS50eXBlID0gJ2tpbmcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbY291bnRdLnR5cGUgPSAncGF3bic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoRkVOW2ldLnRvTG93ZXJDYXNlKCkgPT09IEZFTltpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbY291bnRdLmNvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbY291bnRdLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA+IDgpIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvdW50ICE9IDgpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbn0iLCJcbi8qXG4gKiAgICAgakNoZXNzIH4gamNoZXNzLmpzXG4gKiAgICAgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmltcG9ydCBKQm9hcmQgZnJvbSAnLi9qYm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQ2hlc3Mge1xuXG4gICAgLypcbiAgICAgKiAgIElOSVRJQUxJWkFUSU9OXG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tYWluQm9hcmQgPSBuZXcgSkJvYXJkO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRVRVUFxuICAgICAqL1xuXG4gICAgc2V0VXBJbml0aWFsKCkge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5zZXRVcEluaXRpYWwoKTtcbiAgICB9XG5cbiAgICBzZXRVcFBvc2l0aW9uKHBpZWNlU2V0KSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkLnNldFVwUG9zaXRpb24ocGllY2VTZXQpO1xuICAgIH1cblxuICAgIHNldFBvc2l0aW9uQnlGRU4oRkVOKSB7XG4gICAgICAgIHRoaXMubWFpbkJvYXJkLnNldFBvc2l0aW9uQnlGRU4oRkVOKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgR0VUVEVSU1xuICAgICAqL1xuXG4gICAgZ2V0U3F1YXJlKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkJvYXJkLmdldFNxdWFyZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICBnZXRTcXVhcmVDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFBpZWNlVHlwZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLnR5cGU7XG4gICAgfVxuXG4gICAgZ2V0UGllY2VDb2xvcihmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRTcXVhcmUoZmlsZSwgcmFuaykgJiYgdGhpcy5tYWluQm9hcmQuZ2V0U3F1YXJlKGZpbGUsIHJhbmspLnBpZWNlLmNvbG9yO1xuICAgIH1cblxuICAgIGdldFR1cm4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Cb2FyZC5nZXRUdXJuKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIFBJQ0tcbiAgICAgKi9cblxuICAgIHBpY2tTcXVhcmUoZmlsZSwgcmFuaykge1xuICAgICAgICB0aGlzLm1haW5Cb2FyZC5waWNrU3F1YXJlKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogICBTRUxFQ1RcbiAgICAgKi9cblxuICAgIGlzU3F1YXJlU2VsZWN0ZWQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuaXNTcXVhcmVTZWxlY3RlZChmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICAgTUFSS1xuICAgICAqL1xuXG4gICAgaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuaXNTcXVhcmVNYXJrZWQoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgIERPTUZFTlxuICAgICAqL1xuXG4gICAgZ2V0RkVOKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluQm9hcmQuZ2V0RkVOKCk7XG4gICAgfVxuXG59Il19
