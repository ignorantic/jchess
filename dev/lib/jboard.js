
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
    static KNIGHT_MOVES = [
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
    ];
    static KING_MOVES = [
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
    ];
    static ROOK_MOVES = [
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
    ];
    static BISHOP_MOVES = [
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
    ];

    /*
     *   CONSTRUCTOR
     */

    constructor() {
        this.board = [];
        this._initBoard();
        this._paintBoard();
        this.selectFile = null;
        this.selectRank = null;
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
     *   GETTERS
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
     *   SETTERS
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
            return true;
        }

        this._resetSelect()
        square.selected = true;
        this.selectFile = file;
        this.selectRank = rank;
        this._markMoves(file, rank);

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
     *   PAWN MOVES
     */

    _getMovesPawn(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        if (!(this.getPieceType(file, rank) === 'pawn')) return null;

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
                    if (!this.getPieceType(targetFile, targetRank)) {
                        this._pushMove(result, targetFile, targetRank);
                    }
                }
            }
        }

        targetRank = rank + moveDirection;

        targetFile = file - 1;
        if (this._isFoe(pawnColor, targetFile, targetRank)) {
            this._pushMove(result, targetFile, targetRank);
        }

        targetFile = file + 1;
        if (this._isFoe(pawnColor, targetFile, targetRank)) {
            this._pushMove(result, targetFile, targetRank);
        }

        if (result.length) return result;
        return null;

    }

    /*
     *   KNIGHT MOVES
     */

    _getMovesKnight(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        if (!(this.getPieceType(file, rank) === 'knight')) return null;

        return this._getMovesPiece(file, rank, JBoard.KNIGHT_MOVES, 1);
    }

    /*
     *   KING MOVES
     */

    _getMovesKing(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        if (!(this.getPieceType(file, rank) === 'king')) return null;

        return this._getMovesPiece(file, rank, JBoard.KING_MOVES, 1);
    }

    /*
     *   ROOK MOVES
     */

    _getMovesRook(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        if (!(this.getPieceType(file, rank) === 'rook')) return null;

        return this._getMovesPiece(file, rank, JBoard.ROOK_MOVES, 7);
    }

    /*
     *   BISHOP MOVES
     */

    _getMovesBishop(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        if (!(this.getPieceType(file, rank) === 'bishop')) return null;

        return this._getMovesPiece(file, rank, JBoard.BISHOP_MOVES, 7);
    }

    /*
     *   QUEEN MOVES
     */

    _getMovesQueen(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        if (!(this.getPieceType(file, rank) === 'queen')) return null;

        return this._getMovesPiece(file, rank, JBoard.KING_MOVES, 7);
    }

    /*
     *   PiECE MOVES
     */

    _getMovesPiece(file, rank, pattern, count) {
        let result = [];
        let pieceColor = this.getPieceColor(file, rank);

        pattern.forEach((item) => {
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
        return (file >= 0 && file <= 7 && rank >= 0 && rank <= 7);
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