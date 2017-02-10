
/**
 *     jChess ~ jboard.js
 *     2017 by Andrii Sorokin
 */

export default class JBoard {

    /**
     *   CONSTRUCTOR
     */

    constructor() {

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

        this.INITIAL_POSITION = [
            {
                file: 0,
                rank: 0,
                piece: {
                    type: 'rook',
                    color: 'white'
                }
            },
            {
                file: 1,
                rank: 0,
                piece: {
                    type: 'knight',
                    color: 'white'
                }
            },
            {
                file: 2,
                rank: 0,
                piece: {
                    type: 'bishop',
                    color: 'white'
                }
            },
            {
                file: 3,
                rank: 0,
                piece: {
                    type: 'queen',
                    color: 'white'
                }
            },
            {
                file: 4,
                rank: 0,
                piece: {
                    type: 'king',
                    color: 'white'
                }
            },
            {
                file: 5,
                rank: 0,
                piece: {
                    type: 'bishop',
                    color: 'white'
                }
            },
            {
                file: 6,
                rank: 0,
                piece: {
                    type: 'knight',
                    color: 'white'
                }
            },
            {
                file: 7,
                rank: 0,
                piece: {
                    type: 'rook',
                    color: 'white'
                }
            },
            {
                file: 0,
                rank: 7,
                piece: {
                    type: 'rook',
                    color: 'black'
                }
            },
            {
                file: 1,
                rank: 7,
                piece: {
                    type: 'knight',
                    color: 'black'
                }
            },
            {
                file: 2,
                rank: 7,
                piece: {
                    type: 'bishop',
                    color: 'black'
                }
            },
            {
                file: 3,
                rank: 7,
                piece: {
                    type: 'queen',
                    color: 'black'
                }
            },
            {
                file: 4,
                rank: 7,
                piece: {
                    type: 'king',
                    color: 'black'
                }
            },
            {
                file: 5,
                rank: 7,
                piece: {
                    type: 'bishop',
                    color: 'black'
                }
            },
            {
                file: 6,
                rank: 7,
                piece: {
                    type: 'knight',
                    color: 'black'
                }
            },
            {
                file: 7,
                rank: 7,
                piece: {
                    type: 'rook',
                    color: 'black'
                }
            },

            {
                file: 0,
                rank: 1,
                piece: {
                    type: 'pawn',
                    color: 'white'
                }
            },
            {
                file: 1,
                rank: 1,
                piece: {
                    type: 'pawn',
                    color: 'white'
                }
            },
            {
                file: 2,
                rank: 1,
                piece: {
                    type: 'pawn',
                    color: 'white'
                }
            },
            {
                file: 3,
                rank: 1,
                piece: {
                    type: 'pawn',
                    color: 'white'
                }
            },
            {
                file: 4,
                rank: 1,
                piece: {
                    type: 'pawn',
                    color: 'white'
                }
            },
            {
                file: 5,
                rank: 1,
                piece: {
                    type: 'pawn',
                    color: 'white'
                }
            },
            {
                file: 6,
                rank: 1,
                piece: {
                    type: 'pawn',
                    color: 'white'
                }
            },
            {
                file: 7,
                rank: 1,
                piece: {
                    type: 'pawn',
                    color: 'white'
                }
            },
            {
                file: 0,
                rank: 6,
                piece: {
                    type: 'pawn',
                    color: 'black'
                }
            },
            {
                file: 1,
                rank: 6,
                piece: {
                    type: 'pawn',
                    color: 'black'
                }
            },
            {
                file: 2,
                rank: 6,
                piece: {
                    type: 'pawn',
                    color: 'black'
                }
            },
            {
                file: 3,
                rank: 6,
                piece: {
                    type: 'pawn',
                    color: 'black'
                }
            },
            {
                file: 4,
                rank: 6,
                piece: {
                    type: 'pawn',
                    color: 'black'
                }
            },
            {
                file: 5,
                rank: 6,
                piece: {
                    type: 'pawn',
                    color: 'black'
                }
            },
            {
                file: 6,
                rank: 6,
                piece: {
                    type: 'pawn',
                    color: 'black'
                }
            },
            {
                file: 7,
                rank: 6,
                piece: {
                    type: 'pawn',
                    color: 'black'
                }
            }
        ];
        this.MOVES = {
            rook: [
                {
                    file: 0,
                    rank: 1
                },
                {
                    file: 1,
                    rank: 0
                },
                {
                    file: 0,
                    rank: -1
                },
                {
                    file: -1,
                    rank: 0
                }
            ],
            knight: [
                {
                    file: 1,
                    rank: 2
                },
                {
                    file: 2,
                    rank: 1
                },
                {
                    file: 2,
                    rank: -1
                },
                {
                    file: 1,
                    rank: -2
                },
                {
                    file: -1,
                    rank: -2
                },
                {
                    file: -2,
                    rank: -1
                },
                {
                    file: -2,
                    rank: 1
                },
                {
                    file: -1,
                    rank: 2
                }
            ],
            bishop: [
                {
                    file: 1,
                    rank: 1
                },
                {
                    file: 1,
                    rank: -1
                },
                {
                    file: -1,
                    rank: -1
                },
                {
                    file: -1,
                    rank: 1
                }
            ],
            queen: [
                {
                    file: 0,
                    rank: 1
                },
                {
                    file: 1,
                    rank: 1
                },
                {
                    file: 1,
                    rank: 0
                },
                {
                    file: 1,
                    rank: -1
                },
                {
                    file: 0,
                    rank: -1
                },
                {
                    file: -1,
                    rank: -1
                },
                {
                    file: -1,
                    rank: 0
                },
                {
                    file: -1,
                    rank: 1
                }
            ],
            king: [
                {
                    file: 0,
                    rank: 1
                },
                {
                    file: 1,
                    rank: 1
                },
                {
                    file: 1,
                    rank: 0
                },
                {
                    file: 1,
                    rank: -1
                },
                {
                    file: 0,
                    rank: -1
                },
                {
                    file: -1,
                    rank: -1
                },
                {
                    file: -1,
                    rank: 0
                },
                {
                    file: -1,
                    rank: 1
                }
            ]
        };

    }

    /**
     *   INITIALIZATION
     */

    _initBoard() {

        for (let i = 0; i < 8; i++) {
            this._board[i] = [];
            for (let j = 0; j < 8; j++) {
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

    _paintBoard() {

        let countSquare = 0;
        for (let i = 0; i < 8; i++) {
            countSquare++;
            for (let j = 0; j < 8; j++) {
                this._board[i][j].color = (countSquare++ % 2) ? 'black' : 'white';
            }
        }

    }

    /**
     *   SETUP
     */

    setUpInitial() {
        this.setUpPosition(this.INITIAL_POSITION);
    }

    setUpPosition(pieceSet) {

        this._turn = 'white';

        this._count = 1;
        this._countFiftyMove = 0;

        this._enPassant = null;

        this._castling = {
            white: 3,
            black: 3
        };

        this.resetPosition();
        pieceSet.forEach(
            (item) => {
                this._setUpPiece(item.file, item.rank, item.piece.type, item.piece.color);
            }
        );

    }

    resetPosition() {
        this._resetSelect();
        this._resetMarks();
        this._board.forEach(
            (item, file) => {
                item.forEach(
                    (square, rank) => {
                        this._setUpPiece(file, rank, null, null);
                    }
                );
            }
        );

    }

    _setUpPiece(file, rank, type, color) {

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

    getSquare(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        return this._board[file][rank];
    }

    getSquareColor(file, rank) {
        return this.getSquare(file, rank) && this.getSquare(file, rank).color;
    }

    getPieceType(file, rank) {
        return this.getSquare(file, rank) && this.getSquare(file, rank).piece.type;
    }

    getPieceColor(file, rank) {
        return this.getSquare(file, rank) && this.getSquare(file, rank).piece.color;
    }

    /**
     *   SQUARE SETTERS
     */

    setPieceType(file, rank, type) {

        if (!this._validateSquare(file, rank)) return null;
        this._board[file][rank].piece.type = type;
        return true;

    }

    setPieceColor(file, rank, color) {

        if (!this._validateSquare(file, rank)) return null;
        this._board[file][rank].piece.color = color;
        return true;

    }

    setPiece(file, rank, type, color) {

        if (!this._validateSquare(file, rank)) return null;
        this._board[file][rank].piece.color = color;
        this._board[file][rank].piece.type = type;
        return true;

    }

    /**
     *   EN PASSANT
     */

    _checkEnPassant(startFile, startRank, stopFile, stopRank) {

        let piece = this.getPieceType(startFile, startRank);

        if (piece == 'pawn') {

            this._isEnPassant(stopFile, stopRank) && this._removePiece(stopFile, startRank);
            this._setEnPassant(null);

            if (Math.abs(startRank - stopRank) == 2) {

                let color = this.getPieceColor(startFile, startRank);

                if (this._isFoesPawn(color, stopFile - 1, stopRank) ||
                    this._isFoesPawn(color, stopFile + 1, stopRank)) {

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

    _getEnPassant() {
        return this._enPassant;
    }

    _setEnPassant(file, rank) {

        if (!this._validateSquare(file, rank) || (rank != 2 && rank != 5)) {

            this._enPassant = null;
            return false;

        }

        this._enPassant = {
            file: file,
            rank: rank
        };

        return true;
    }

    _isEnPassant(file, rank) {

        let pass = this._getEnPassant();
        if (!pass) return false;
        return pass.file == file && pass.rank == rank;

    }

    /**
     *   PICK
     */

    pickSquare(file, rank) {

        let square = this.getSquare(file, rank);
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

    _passTurn() {

        if (this._turn === 'white') {
            this._turn = 'black';
        } else {
            this._turn = 'white';
        }

    }

    /**
     *   SELECT
     */

    _resetSelect() {

        this._board.forEach(
            (file) => {

                file.forEach(
                    (square) => {
                        square.selected = false;
                    }
                );

            }
        );

    }

    isSquareSelected(file, rank) {

        let square = this.getSquare(file, rank);
        if (!square) return null;
        return square.selected;

    }

    /**
     *   MARK MOVES
     */

    _resetMarks() {

        this._board.forEach(
            (file) => {

                file.forEach(
                    (square) => {
                        square.marked = false;
                    }
                );

            }
        );

    }

    isSquareMarked(file, rank) {

        let square = this.getSquare(file, rank);
        if (!square) return null;
        return square.marked;

    }

    _markMoves(file, rank) {

        if (!this._validateSquare(file, rank)) return null;
        this._resetMarks();

        if (this.getPieceColor(file, rank) !== this._turn) return null;

        if (!!this.getPieceType(file, rank)) {

            let moves = this._getMoves(file, rank);
            if (!moves) return null;
            moves.forEach(
                (item) => {
                    this._board[item.file][item.rank].marked = true;
                }
            );

        }

    }

    /**
     *   GET MOVES
     */

    _getMoves(file, rank) {

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

    _doMove(startFile, startRank, stopFile, stopRank) {

        this._checkEnPassant(startFile, startRank, stopFile, stopRank);

        let type = this.getPieceType(startFile, startRank);
        let color = this.getPieceColor(startFile, startRank);
        let capture = false;

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

    _checkMove(startFile, startRank, stopFile, stopRank) {

        let checkBoard = this._cloneBoard(this);

        if (checkBoard._doMove(startFile, startRank, stopFile, stopRank)) {
            return !checkBoard._isCheck(this.getPieceColor(startFile, startRank));
        } else {
            return null;
        }

    }

    /**
     *   GET PAWN MOVES
     */

    _getMovesPawn(file, rank) {

        let moves = [];
        let pawnColor = this.getPieceColor(file, rank);
        let moveDirection = (pawnColor == 'white') ? 1 : -1;

        let targetFile = file;
        let targetRank = rank + moveDirection;

        if (this._validateSquare(targetFile, targetRank)) {

            if (!this.getPieceType(targetFile, targetRank)) {
                this._pushMove(moves, targetFile, targetRank);

                if ((pawnColor == 'white' && rank == 1) || (pawnColor == 'black' && rank == 6)) {
                    targetRank = rank + 2 * moveDirection;
                    this.getPieceType(targetFile, targetRank) || this._pushMove(moves, targetFile, targetRank);
                }
            }

        }

        targetRank = rank + moveDirection;

        targetFile = file - 1;
        if (this._isFoe(pawnColor, targetFile, targetRank) || (this._isEnPassant(targetFile, targetRank))) {
            this._pushMove(moves, targetFile, targetRank);
        }

        targetFile = file + 1;
        if (this._isFoe(pawnColor, targetFile, targetRank) || (this._isEnPassant(targetFile, targetRank))) {
            this._pushMove(moves, targetFile, targetRank);
        }

        return this._filterMoves(moves, file, rank);

    }

    /**
     *   GET KING MOVES
     */

    _getMovesKing(file, rank) {

        let moves =  this._getMovesPiece(file, rank);
        let castling = this._getCastlingMove(file, rank);

        castling && castling.forEach((item) => moves.push(item));

        return this._filterMoves(moves, file, rank);

    }

    _getCastlingMove(file, rank) {

        if ( !(file === 4 && (rank === 0 || rank === 7))) return null;
        let color = (rank === 0) ? 'white' : 'black';
        if (this._castling[color] === 0) return null;
        if (this._isCheck(color)) return null;
        let result = [];

        if (this._castling[color] > 1 && !this._isSquareAttacked(color, file - 1, rank) &&
            (this._isEmpty(file - 1, rank)) && (this._isEmpty(file - 2, rank)) && (this._isEmpty(file - 3, rank))) {
            this._pushMove(result, 2, rank);
        }

        if (this._castling[color] % 2 === 1 && !this._isSquareAttacked(color, file + 1, rank) &&
            (this._isEmpty(file + 1, rank)) && (this._isEmpty(file + 2, rank))) {
            this._pushMove(result, 6, rank);
        }

        return result;

    }

    _checkCastling(color, type, file) {

        if (this._castling[color] > 0) {
            if (type == 'king') this._castling[color] = 0;
            if (type == 'rook') {
                if (file === 0 && this._castling[color] > 1) this._castling[color] -= 2;
                if (file === 7 && this._castling[color] % 2 == 1) this._castling[color] -= 1;
            }
        }

    }

    _doCastling(color, file) {

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

    _getMovesPiece(file, rank) {

        let piece = this.getPieceType(file, rank);
        let color = this.getPieceColor(file, rank);

        let moves = this._getAttackedSquares(piece, color, file, rank);

        return this._filterMoves(moves, file, rank);

    }

    _filterMoves(moves, file, rank) {

        if (!moves) return null;

        return moves.filter(
            (item) => {
                return this._checkMove(file, rank, item.file, item.rank);
            }
        );

    }

    _getAttackedSquares(piece, color, file, rank) {

        let moves = this.MOVES[piece];
        let count = (piece == 'king' || piece == 'knight') ? 1 : 7;
        let result = [];

        moves.forEach((item) => {
            let i = 0;
            while (i < count) {

                i++;
                let targetFile = file + i * item.file;
                let targetRank = rank + i * item.rank;

                if (this._validateSquare(targetFile, targetRank)) {

                    if (this._isFriend(color, targetFile, targetRank)) {
                        break;
                    } else {
                        this._pushMove(result, targetFile, targetRank);
                    }

                } else {
                    break;
                }

                if (this._isFoe(color, targetFile, targetRank)) break;
            }
        });

        if (result.length > 0) return result;
        return null;
    }

    /**
     *   VALIDATORS
     */

    _validateSquare(file, rank) {
        return (file !== null && rank !== null) && (file >= 0 && file <= 7 && rank >= 0 && rank <= 7);
    }

    /**
     *   SERVICES
     */

     _pushMove(result, file, rank) {

        let move = {
            file: file,
            rank: rank
        };
        result.push(move);

    }

     _isFriend(color, file, rank) {

         if (!this._validateSquare(file, rank)) return null;
         if (!this.getPieceType(file, rank)) return false;
         return (color === this.getPieceColor(file, rank));

    }

     _isFoe(color, file, rank) {

         if (!this._validateSquare(file, rank)) return null;
         if (!this.getPieceType(file, rank)) return false;
         return (color !== this.getPieceColor(file, rank));

    }

    _isFoesPawn(color, file, rank) {
        return this.getPieceType(file, rank) == 'pawn' && this._isFoe(color, file, rank);
    }

     _isEmpty(file, rank) {

         if (!this._validateSquare(file, rank)) return null;
         return this.getPieceType(file, rank) === null;

    }

    _isSquareAttacked(color, file, rank) {

        if (!this._validateSquare(file, rank)) return null;

        let result = false;

        if (this._isSquareAttackedByPawn(color, file, rank)) {

            result = true;

        } else {

            let pieces = ['rook', 'knight', 'bishop', 'queen', 'king'];

            pieces.forEach(
                (type) => {
                    let squares = this._getAttackedSquares(type, color, file, rank);

                    squares && squares.forEach(
                        (item) => {

                            if (this.getPieceType(item.file, item.rank) == type) result = true;

                        }
                    );
                }
            );

        }

        return result;

    }

    _isSquareAttackedByPawn(color, file, rank) {

        if (!this._validateSquare(file, rank)) return null;

        let targetRank = (color == 'white') ? rank + 1 : rank - 1;
        let targetFile = [file - 1, file + 1];

        let result = targetFile.filter(
            (item) => this.getPieceType(item, targetRank) == 'pawn' && this._isFoe(color, item, targetRank)
        );

        return result.length > 0;

    }

    _isCheck(color) {

        let king = this._getKing(color);

        if (king) {
            return this._isSquareAttacked(color, king.file, king.rank);
        }

        return null;
    }

    _getKing(color) {

        if (color != 'white' && color != 'black') return null;

        for (let file = 0; file < 8; file++) {
            for (let rank = 0; rank < 8; rank++) {
                if (this.getPieceType(file, rank) == 'king' && this.getPieceColor(file, rank) == color) {
                    return {
                        file: file,
                        rank: rank
                    };
                }
            }
        }

    }

    _removePiece(file, rank) {

        this.setPieceType(file, rank, null);
        this.setPieceColor(file, rank, null);

    }

    _cloneBoard(src) {

        let newBoard = new JBoard;

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

        for (let file = 0; file < 8; file++) {
            for (let rank = 0; rank < 8; rank++) {
                newBoard._board[file][rank].piece.type = src._board[file][rank].piece.type;
                newBoard._board[file][rank].piece.color = src._board[file][rank].piece.color;
            }
        }

        return newBoard;

    }

    /**
     *   DOMFEN
     */

    getFEN() {
        return this._getFENBoard() + ' ' +
               this._getFENTurn() + ' ' +
               this._getFENCastling() + ' ' +
               this._getFENEnPassant() + ' ' +
               this._getFENCounts();
    }

    _getFENPiece(file, rank) {

        if (!this._validateSquare(file, rank)) return null;
        let piece = this.getPieceType(file,  rank);
        if (!piece) return null;
        let FEN;
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

    _getFENBoard() {

        let result = '';

        for (let rank = 7; rank >= 0; rank--) {
            let vacancy = 0;
            for (let file = 0; file < 8; file++) {
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

    _getFENTurn() {

        if (this._turn === 'white') {
            return 'w';
        } else {
            return 'b';
        }

    }

    _getFENCastling() {

        let result = '';

        if (this._castling.white % 2 == 1) result += 'K';
        if (this._castling.white > 1) result += 'Q';
        if (this._castling.black % 2 == 1) result += 'k';
        if (this._castling.black > 1) result += 'q';

        if (result) return result;
        return '-';

    }

    _getFENEnPassant() {

        let enPassant = this._enPassant;
        if (!this._enPassant) return '-';
        return this._getAlgebraicByDigits(enPassant.file, enPassant.rank);

    }

    _getFENCounts() {

        return this._countFiftyMove + ' ' + this._count;

    }

    _getAlgebraicByDigits(file, rank) {
        let shiftFile = 97;
        let shiftRank = 1;
        return String.fromCharCode(file + shiftFile) + (rank + shiftRank);
    }

}