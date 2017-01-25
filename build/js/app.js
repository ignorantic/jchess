(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _jchess = require('../lib/jchess');

var _jchess2 = _interopRequireDefault(_jchess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
    var jchess = new _jchess2.default();
    console.log(jchess);
});

},{"../lib/jchess":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *     jChess ~ jchess.js
 *     2015-2016 by Andrii Sorokin
 */

var JChess = function () {
    function JChess() {
        _classCallCheck(this, JChess);

        this.board = [];
        JChess._paintBoard(this.board);
        JChess._setUpPieces(this.board);
    }

    _createClass(JChess, [{
        key: 'getSquareColor',
        value: function getSquareColor(file, rank) {
            return JChess._getSquareColor(this.board, file, rank);
        }
    }, {
        key: 'setUpPieces',
        value: function setUpPieces() {
            return JChess._setUpPieces(this.board);
        }
    }], [{
        key: '_paintBoard',
        value: function _paintBoard(board) {
            var countSquare = 0;
            for (var i = 0; i < 8; i++) {
                board[i] = [];
                countSquare++;
                for (var j = 0; j < 8; j++) {
                    board[i][j] = countSquare++ % 2 ? { color: 'black' } : { color: 'white' };
                }
            }
        }
    }, {
        key: '_getSquareColor',
        value: function _getSquareColor(board, file, rank) {
            if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
            return board[file][rank];
        }
    }, {
        key: '_setUpPieces',
        value: function _setUpPieces(board) {
            var pieceSet = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

            var _loop = function _loop(rank) {
                switch (rank) {
                    case 0:
                        board.forEach(function (item, index) {
                            return JChess._setUpPiece(board, index, rank, pieceSet[index], 'white');
                        });
                        break;
                    case 7:
                        board.forEach(function (item, index) {
                            return JChess._setUpPiece(board, index, rank, pieceSet[index], 'black');
                        });
                        break;
                    case 1:
                        for (var file = 0; file < 8; file++) {
                            JChess._setUpPiece(board, file, rank, 'pawn', 'white');
                        }
                        break;
                    case 6:
                        for (var _file = 0; _file < 8; _file++) {
                            JChess._setUpPiece(board, _file, rank, 'pawn', 'black');
                        }
                        break;
                    default:
                        for (var _file2 = 0; _file2 < 8; _file2++) {
                            JChess._setUpPiece(board, _file2, rank, null, null);
                        }

                }
            };

            for (var rank = 0; rank < 8; rank++) {
                _loop(rank);
            }
        }
    }, {
        key: '_setUpPiece',
        value: function _setUpPiece(board, file, rank, type, color) {
            if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
            board[file][rank].piece = {
                type: type,
                color: color
            };
            return true;
        }
    }]);

    return JChess;
}();

exports.default = JChess;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvaW5kZXgvYXBwLmpzIiwiZGV2L2xpYi9qY2hlc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2hELFFBQUksU0FBUyxzQkFBYjtBQUNBLFlBQVEsR0FBUixDQUFZLE1BQVo7QUFDSCxDQUhEOzs7Ozs7Ozs7Ozs7O0FDREE7Ozs7O0lBS3FCLE07QUFFakIsc0JBQWM7QUFBQTs7QUFFVixhQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0EsZUFBTyxXQUFQLENBQW1CLEtBQUssS0FBeEI7QUFDQSxlQUFPLFlBQVAsQ0FBb0IsS0FBSyxLQUF6QjtBQUNIOzs7O3VDQWFjLEksRUFBTSxJLEVBQU07QUFDdkIsbUJBQU8sT0FBTyxlQUFQLENBQXVCLEtBQUssS0FBNUIsRUFBbUMsSUFBbkMsRUFBeUMsSUFBekMsQ0FBUDtBQUNIOzs7c0NBT2E7QUFDVixtQkFBTyxPQUFPLFlBQVAsQ0FBb0IsS0FBSyxLQUF6QixDQUFQO0FBQ0g7OztvQ0F0QmtCLEssRUFBTztBQUN0QixnQkFBSSxjQUFjLENBQWxCO0FBQ0EsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixHQUF2QixFQUE0QjtBQUN4QixzQkFBTSxDQUFOLElBQVcsRUFBWDtBQUNBO0FBQ0EscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixHQUF2QixFQUE0QjtBQUN4QiwwQkFBTSxDQUFOLEVBQVMsQ0FBVCxJQUFlLGdCQUFnQixDQUFqQixHQUFzQixFQUFFLE9BQU8sT0FBVCxFQUF0QixHQUEyQyxFQUFFLE9BQU8sT0FBVCxFQUF6RDtBQUNIO0FBQ0o7QUFDSjs7O3dDQU1zQixLLEVBQU8sSSxFQUFNLEksRUFBTTtBQUN0QyxnQkFBSSxPQUFPLENBQVAsSUFBWSxPQUFPLENBQW5CLElBQXdCLE9BQU8sQ0FBL0IsSUFBb0MsT0FBTyxDQUEvQyxFQUFrRCxPQUFPLElBQVA7QUFDbEQsbUJBQU8sTUFBTSxJQUFOLEVBQVksSUFBWixDQUFQO0FBQ0g7OztxQ0FNbUIsSyxFQUFPO0FBQ3ZCLGdCQUFJLFdBQVcsQ0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixRQUFuQixFQUE2QixPQUE3QixFQUFzQyxNQUF0QyxFQUE4QyxRQUE5QyxFQUF3RCxRQUF4RCxFQUFrRSxNQUFsRSxDQUFmOztBQUR1Qix1Q0FFZCxJQUZjO0FBR25CLHdCQUFRLElBQVI7QUFDSSx5QkFBSyxDQUFMO0FBQ0ksOEJBQU0sT0FBTixDQUFjLFVBQUMsSUFBRCxFQUFPLEtBQVA7QUFBQSxtQ0FDVixPQUFPLFdBQVAsQ0FBbUIsS0FBbkIsRUFBMEIsS0FBMUIsRUFBaUMsSUFBakMsRUFBdUMsU0FBUyxLQUFULENBQXZDLEVBQXdELE9BQXhELENBRFU7QUFBQSx5QkFBZDtBQUdBO0FBQ0oseUJBQUssQ0FBTDtBQUNJLDhCQUFNLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBTyxLQUFQO0FBQUEsbUNBQ1YsT0FBTyxXQUFQLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWlDLElBQWpDLEVBQXVDLFNBQVMsS0FBVCxDQUF2QyxFQUF3RCxPQUF4RCxDQURVO0FBQUEseUJBQWQ7QUFHQTtBQUNKLHlCQUFLLENBQUw7QUFDSSw2QkFBSyxJQUFJLE9BQU8sQ0FBaEIsRUFBbUIsT0FBTyxDQUExQixFQUE2QixNQUE3QixFQUFxQztBQUNqQyxtQ0FBTyxXQUFQLENBQW1CLEtBQW5CLEVBQTBCLElBQTFCLEVBQWdDLElBQWhDLEVBQXNDLE1BQXRDLEVBQThDLE9BQTlDO0FBQ0g7QUFDRDtBQUNKLHlCQUFLLENBQUw7QUFDSSw2QkFBSyxJQUFJLFFBQU8sQ0FBaEIsRUFBbUIsUUFBTyxDQUExQixFQUE2QixPQUE3QixFQUFxQztBQUNqQyxtQ0FBTyxXQUFQLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWdDLElBQWhDLEVBQXNDLE1BQXRDLEVBQThDLE9BQTlDO0FBQ0g7QUFDRDtBQUNKO0FBQ0ksNkJBQUssSUFBSSxTQUFPLENBQWhCLEVBQW1CLFNBQU8sQ0FBMUIsRUFBNkIsUUFBN0IsRUFBcUM7QUFDakMsbUNBQU8sV0FBUCxDQUFtQixLQUFuQixFQUEwQixNQUExQixFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxFQUE0QyxJQUE1QztBQUNIOztBQXhCVDtBQUhtQjs7QUFFdkIsaUJBQUssSUFBSSxPQUFPLENBQWhCLEVBQW1CLE9BQU8sQ0FBMUIsRUFBNkIsTUFBN0IsRUFBcUM7QUFBQSxzQkFBNUIsSUFBNEI7QUE0QnBDO0FBQ0o7OztvQ0FFa0IsSyxFQUFPLEksRUFBTSxJLEVBQU0sSSxFQUFNLEssRUFBTztBQUMvQyxnQkFBSSxPQUFPLENBQVAsSUFBWSxPQUFPLENBQW5CLElBQXdCLE9BQU8sQ0FBL0IsSUFBb0MsT0FBTyxDQUEvQyxFQUFrRCxPQUFPLElBQVA7QUFDbEQsa0JBQU0sSUFBTixFQUFZLElBQVosRUFBa0IsS0FBbEIsR0FBMEI7QUFDdEIsc0JBQU0sSUFEZ0I7QUFFdEIsdUJBQU87QUFGZSxhQUExQjtBQUlBLG1CQUFPLElBQVA7QUFDSDs7Ozs7O2tCQXpFZ0IsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgSkNoZXNzIGZyb20gJy4uL2xpYi9qY2hlc3MnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGxldCBqY2hlc3MgPSBuZXcgSkNoZXNzO1xuICAgIGNvbnNvbGUubG9nKGpjaGVzcyk7XG59KSIsIlxuLypcbiAqICAgICBqQ2hlc3MgfiBqY2hlc3MuanNcbiAqICAgICAyMDE1LTIwMTYgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQ2hlc3Mge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgICAgICBKQ2hlc3MuX3BhaW50Qm9hcmQodGhpcy5ib2FyZCk7XG4gICAgICAgIEpDaGVzcy5fc2V0VXBQaWVjZXModGhpcy5ib2FyZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9wYWludEJvYXJkKGJvYXJkKSB7XG4gICAgICAgIGxldCBjb3VudFNxdWFyZSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICBib2FyZFtpXSA9IFtdO1xuICAgICAgICAgICAgY291bnRTcXVhcmUrK1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXSA9IChjb3VudFNxdWFyZSsrICUgMikgPyB7IGNvbG9yOiAnYmxhY2snIH0gOiB7IGNvbG9yOiAnd2hpdGUnIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNxdWFyZUNvbG9yKGZpbGUsIHJhbmspIHtcbiAgICAgICAgcmV0dXJuIEpDaGVzcy5fZ2V0U3F1YXJlQ29sb3IodGhpcy5ib2FyZCwgZmlsZSwgcmFuaylcbiAgICB9XG5cbiAgICBzdGF0aWMgX2dldFNxdWFyZUNvbG9yKGJvYXJkLCBmaWxlLCByYW5rKSB7XG4gICAgICAgIGlmIChmaWxlIDwgMCB8fCBmaWxlID4gNyB8fCByYW5rIDwgMCB8fCByYW5rID4gNykgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBib2FyZFtmaWxlXVtyYW5rXTtcbiAgICB9XG5cbiAgICBzZXRVcFBpZWNlcygpIHtcbiAgICAgICAgcmV0dXJuIEpDaGVzcy5fc2V0VXBQaWVjZXModGhpcy5ib2FyZClcbiAgICB9XG5cbiAgICBzdGF0aWMgX3NldFVwUGllY2VzKGJvYXJkKSB7XG4gICAgICAgIGxldCBwaWVjZVNldCA9IFsncm9vaycsICdrbmlnaHQnLCAnYmlzaG9wJywgJ3F1ZWVuJywgJ2tpbmcnLCAnYmlzaG9wJywgJ2tuaWdodCcsICdyb29rJ107XG4gICAgICAgIGZvciAobGV0IHJhbmsgPSAwOyByYW5rIDwgODsgcmFuaysrKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHJhbmspIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgSkNoZXNzLl9zZXRVcFBpZWNlKGJvYXJkLCBpbmRleCwgcmFuaywgcGllY2VTZXRbaW5kZXhdLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgSkNoZXNzLl9zZXRVcFBpZWNlKGJvYXJkLCBpbmRleCwgcmFuaywgcGllY2VTZXRbaW5kZXhdLCAnYmxhY2snKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBKQ2hlc3MuX3NldFVwUGllY2UoYm9hcmQsIGZpbGUsIHJhbmssICdwYXduJywgJ3doaXRlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGZpbGUgPSAwOyBmaWxlIDwgODsgZmlsZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBKQ2hlc3MuX3NldFVwUGllY2UoYm9hcmQsIGZpbGUsIHJhbmssICdwYXduJywgJ2JsYWNrJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgSkNoZXNzLl9zZXRVcFBpZWNlKGJvYXJkLCBmaWxlLCByYW5rLCBudWxsLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBfc2V0VXBQaWVjZShib2FyZCwgZmlsZSwgcmFuaywgdHlwZSwgY29sb3IpIHtcbiAgICAgICAgaWYgKGZpbGUgPCAwIHx8IGZpbGUgPiA3IHx8IHJhbmsgPCAwIHx8IHJhbmsgPiA3KSByZXR1cm4gbnVsbDtcbiAgICAgICAgYm9hcmRbZmlsZV1bcmFua10ucGllY2UgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSJdfQ==
