
/*
 *     jChess ~ jboard.js
 *     2017 by Andrii Sorokin
 */

export default class JBoard {

    /*
     *   CONSTANTS
     */

    static INITIAL_POSITION = [
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
    static MOVES = {
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
    }

    /*
     *   CONSTRUCTOR
     */

    constructor() {

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

    _initBoard() {

        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            for (let j = 0; j < 8; j++) {
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

    _paintBoard() {

        let countSquare = 0;
        for (let i = 0; i < 8; i++) {
            countSquare++
            for (let j = 0; j < 8; j++) {
                this.board[i][j].color = (countSquare++ % 2) ? 'black' : 'white';
            }
        }

    }

    /*
     *   SETUP
     */

    setUpInitial() {
        this.setUpPosition(JBoard.INITIAL_POSITION);
    }

    setUpPosition(pieceSet) {

        this.resetPosition();
        pieceSet.forEach(
            (item) => {
                this._setUpPiece(item.file, item.rank, item.piece.type, item.piece.color);
            }
        )

    }

    resetPosition() {

        this.board.forEach(
            (item, file) => {
                item.forEach(
                    (square, rank) => {
                        this._setUpPiece(file, rank, null, null);
                    }
                )
            }
        )

    }

    _setUpPiece(file, rank, type, color) {

        if (!this._validateSquare(file, rank)) return null;
        this.board[file][rank].piece = {
            type: type,
            color: color
        }
        return true;

    }

    /*
     *   SQUARE GETTERS
     */

    getSquare(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        return this.board[file][rank];
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

    /*
     *   SQUARE SETTERS
     */

    setPieceType(file, rank, type) {

        if (!this._validateSquare(file, rank)) return null;
        this.board[file][rank].piece.type = type;
        return true;

    }

    setPieceColor(file, rank, color) {

        if (!this._validateSquare(file, rank)) return null;
        this.board[file][rank].piece.color = color;
        return true;

    }

    /*
     *   EN PASSANT
     */

    _checkEnPassant(file, rank) {

        let piece = this.getPieceType(this.selectFile, this.selectRank);

        if (piece == 'pawn') {

            if (this._isEnPassant(file, rank)) {

                this.setPieceType(file, this.selectRank, null);
                this.setPieceColor(file, this.selectRank, null);

            }

            this._setEnPassant(null);

            let color = this.getPieceColor(this.selectFile, this.selectRank);

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

    _getEnPassant() {
        return this.enPassant;
    }

    _setEnPassant(file, rank) {

        if (!this._validateSquare(file, rank) || (rank != 2 && rank != 5)) {
            this.enPassant = null;
            return false;
        }

        this.enPassant = {
            file: file,
            rank: rank
        }

        return true;
    }

    _isEnPassant(file, rank) {

        let pass = this._getEnPassant();
        if (!pass) return false;
        return pass.file == file && pass.rank == rank;

    }

    /*
     *   PICK
     */

    pickSquare(file, rank) {

        let square = this.getSquare(file, rank);
        if (!square) return null;

        if (this.isSquareMarked(file, rank)) {

            this._doMove(this.selectFile, this.selectRank, file, rank);

            this.selectFile = null;
            this.selectRank = null;
            this._resetMarks();
            this._resetSelect();

        } else {

            this._resetSelect()
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

    _resetSelect() {

        this.board.forEach(
            (file) => {

                file.forEach(
                    (square) => {
                        square.selected = false;
                    }
                )

            }
        )

    }

    isSquareSelected(file, rank) {

        let square = this.getSquare(file, rank);
        if (!square) return null;
        return square.selected;

    }

    /*
     *   MARK
     */

    _resetMarks() {

        this.board.forEach(
            (file) => {

                file.forEach(
                    (square) => {
                        square.marked = false;
                    }
                )

            }
        )

    }

    isSquareMarked(file, rank) {

        let square = this.getSquare(file, rank);
        if (!square) return null;
        return square.marked;

    }

    /*
     *   MARK MOVES
     */

    _markMoves(file, rank) {

        if (!this._validateSquare(file, rank)) return null;
        this._resetMarks();
        if (!!this.getPieceType(file, rank)) {
            let moves = this._getMoves(file, rank);
            if (!moves) return null;
            moves.forEach(
                (item) => {
                    this.board[item.file][item.rank].marked = true;
                }
            )
        }

    }

    /*
     *   GET MOVES
     */

    _getMoves(file, rank) {

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

    _doMove(startFile, startRank, stopFile, stopRank) {

        this._checkEnPassant(stopFile, stopRank);

        if (!this._validateSquare(startFile, startRank)) return null;
        if (!this._validateSquare(stopFile, stopRank)) return null;
        if (!this.getPieceType(startFile, startRank)) return null;
        if (this.getPieceColor(startFile, startRank) === this.getPieceColor(stopFile, stopRank)) return null;

        let type = this.getPieceType(startFile, startRank);
        let color = this.getPieceColor(startFile, startRank);

        this.setPieceType(stopFile, stopRank, type);
        this.setPieceColor(stopFile, stopRank, color);
        this.setPieceType(startFile, startRank, null);
        this.setPieceColor(startFile, startRank, null);

        return true;

    }

    /*
     *   GET PAWN MOVES
     */

    _getMovesPawn(file, rank) {

        let result = [];
        let pawnColor = this.getPieceColor(file, rank);
        let moveDirection = (pawnColor == 'white') ? 1 : -1

        let targetFile = file;
        let targetRank = rank + moveDirection;

        if (this._validateSquare(targetFile, targetRank)) {

            if (!this.getPieceType(targetFile, targetRank)) {
                this._pushMove(result, targetFile, targetRank);

                if ((pawnColor == 'white' && rank == 1) || (pawnColor == 'black' && rank == 6)) {

                    targetRank = rank + 2 * moveDirection;
                    this.getPieceType(targetFile, targetRank) || this._pushMove(result, targetFile, targetRank);

                }
            }

        }

        targetRank = rank + moveDirection;

        targetFile = file - 1;
        if (this._isFoe(pawnColor, targetFile, targetRank) || (this._isEnPassant(targetFile, targetRank))) {
            this._pushMove(result, targetFile, targetRank);
        }

        targetFile = file + 1;
        if (this._isFoe(pawnColor, targetFile, targetRank) || (this._isEnPassant(targetFile, targetRank))) {
            this._pushMove(result, targetFile, targetRank);
        }

        if (result.length) return result;
        return null;

    }

    /*
     *   GET KNIGHT MOVES
     */

    _getMovesKnight(file, rank) {
        return this._getMovesPiece(file, rank);
    }

    /*
     *   GET KING MOVES
     */

    _getMovesKing(file, rank) {
        return this._getMovesPiece(file, rank);
    }

    /*
     *   GET ROOK MOVES
     */

    _getMovesRook(file, rank) {
        return this._getMovesPiece(file, rank);
    }

    /*
     *   GET BISHOP MOVES
     */

    _getMovesBishop(file, rank) {
        return this._getMovesPiece(file, rank);
    }

    /*
     *   GET QUEEN MOVES
     */

    _getMovesQueen(file, rank) {
        return this._getMovesPiece(file, rank);
    }

    /*
     *   GET PIECE MOVES
     */

    _getMovesPiece(file, rank) {

        let pieceType = this.getPieceType(file, rank);
        let pieceColor = this.getPieceColor(file, rank);
        let moves = JBoard.MOVES[pieceType];
        let count = (pieceType == 'king' || pieceType == 'knight') ? 1 : 7;
        let result = [];

        moves.forEach((item) => {
            let i = 0;
            while (i < count) {
                i++;
                let targetFile = file + i * item.file;
                let targetRank = rank + i * item.rank;
                if (this._validateSquare(targetFile, targetRank)) {
                    if (!this._isFriend(pieceColor, targetFile, targetRank)) {
                        this._pushMove(result, targetFile, targetRank)
                    } else {
                        break;
                    }
                } else {
                    break;
                }
                if (this._isFoe(pieceColor, targetFile, targetRank)) break;
            }
        })

        if (result.length > 0) return result;
        return null;

    }

    /*
     *   VALIDATORS
     */

    _validateSquare(file, rank) {
        return (file !== null && rank !== null) && (file >= 0 && file <= 7 && rank >= 0 && rank <= 7);
    }

    /*
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
         return (color != this.getPieceColor(file, rank));

    }

}