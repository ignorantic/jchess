
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

    /*
     *   CONSTRUCTOR
     */

    constructor() {
        this.board = [];
        this._initBoard();
        this._paintBoard();
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
        pieceSet.forEach(
            (item) => {
                this._setUpPiece(item.file, item.rank, item.piece.type, item.piece.color);
            }
        )
    }

    _setUpPiece(file, rank, type, color) {
        if (!this._validateSquare(file, rank)) return null;
        this.board[file][rank].piece = {
            type: type,
            color: color,
            getMoves: this._getMovesPawn
        }
        return true;
    }

    /*
     *   GETTER
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
     *   PICK
     */

    pickSquare(file, rank) {
        let square = this.getSquare(file, rank);
        if (!square) return null;
        this._resetSelect()
        square.selected = true;
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
     *   MARK FOR MOVE
     */

    _markMoves(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        this._resetMarks();
        if (!!this.getPieceType(file, rank)) {
            let moves = this._getMovesPawn(file, rank);
            if (!moves) return null;
            moves.forEach(
                (item) => {
                    this.board[item.file][item.rank].marked = true;
                }
            )
        }
    }

    _getMovesPawn(file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        if (!(this.getPieceType(file, rank) === 'pawn')) return null;
        let result = [];
        let moveDirection = (this.getPieceColor(file, rank) === 'white') ? 1 : -1

        let targetFile = file;
        let targetRank = rank + moveDirection;

        if (this._validateSquare(targetFile, targetRank)) {

            if (!this.getPieceType(targetFile, targetRank)) {
                pushMove(targetFile, targetRank);

                if ((moveDirection * rank == 1) || (moveDirection * rank == -6)) {

                    targetRank = rank + 2 * moveDirection;
                    if (!this.getPieceType(targetFile, targetRank)) {
                        pushMove(targetFile, targetRank);
                    }
                }
            }
        }

        targetRank = rank + moveDirection;
        targetFile = file - 1;
        checkCapture(this, targetFile, targetRank)
        targetFile = file + 1;
        checkCapture(this, targetFile, targetRank)

        if (result.length) return result;
        return null;

        function checkCapture(self, file, rank) {
            if (self._validateSquare(file, rank)) {
                if (isCapture(self, file, rank)) {
                    pushMove(file, rank);
                }
            }
        }

        function isCapture(self, file, rank) {
            return (self.getPieceColor(file, rank) == 'black' && moveDirection == 1) ||
                (self.getPieceColor(file, rank) == 'white' && moveDirection == -1);
        }

        function pushMove(file, rank) {
            let move = {
                file: file,
                rank: rank
            };
            result.push(move);
        }
    }

    /*
     *   VALIDATORS
     */

    _validateSquare(file, rank) {
        return (file >= 0 && file <= 7 && rank >= 0 && rank <= 7);
    }
}