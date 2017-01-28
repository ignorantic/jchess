
/*
 *     jChess ~ jchess.js
 *     2015-2016 by Andrii Sorokin
 */


export default class JChess {

    constructor() {

        this.board = [];
        this._initBoard(this.board);
        this._paintBoard(this.board);
    }

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

    _initBoard(board) {
        for (let i = 0; i < 8; i++) {
            board[i] = [];
            for (let j = 0; j < 8; j++) {
                board[i][j] = {
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

    _paintBoard(board) {
        let countSquare = 0;
        for (let i = 0; i < 8; i++) {
            countSquare++
            for (let j = 0; j < 8; j++) {
                board[i][j].color = (countSquare++ % 2) ? 'black' : 'white';
            }
        }
    }

    getSquare(file, rank) {
        return this._getSquare(this.board, file, rank);
    }

    _getSquare(board, file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        return board[file][rank];
    }

    getSquareColor(file, rank) {
        return this._getSquare(this.board, file, rank) && this._getSquare(this.board, file, rank).color;
    }

    getPieceType(file, rank) {
        return this._getPieceType(this.board, file, rank);
    }

    _getPieceType(board, file, rank) {
        return this._getSquare(board, file, rank) && this._getSquare(board, file, rank).piece.type;
    }

    getPieceColor(file, rank) {
        return this._getPieceColor(this.board, file, rank);
    }

    _getPieceColor(board, file, rank) {
        return this._getSquare(board, file, rank) && this._getSquare(board, file, rank).piece.color;
    }

    pickSquare(file, rank) {
        return this._pickSquare(this.board, file, rank);
    }

    _pickSquare(board, file, rank) {
        let square = this._getSquare(board, file, rank);
        if (!square) return null;
        this._resetSelect(board)
        square.selected = true;
        this._markMoves(board, file, rank);
        return true;
    }

    _markMoves(board, file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        this._resetMarks(board);
        if (!!this._getPieceType(board, file, rank)) {
            let moves = this._getMovesPawn(board, file, rank);
            if (!moves) return null;
            moves.forEach(
                (item) => {
                    board[item.file][item.rank].marked = true;
                }
            )
        }
    }

    _resetSelect(board) {
        board.forEach(
            (file) => {
                file.forEach(
                    (square) => {
                        square.selected = false;
                    }
                )
            }
        )
    }

    _resetMarks(board) {
        board.forEach(
            (file) => {
                file.forEach(
                    (square) => {
                        square.marked = false;
                    }
                )
            }
        )
    }

    isSquareSelected(file, rank) {
        return this._isSquareSelected(this.board, file, rank);
    }

    _isSquareSelected(board, file, rank) {
        let square = this._getSquare(board, file, rank);
        if (!square) return null;
        return square.selected;
    }

    isSquareMarked(file, rank) {
        return this._isSquareMarked(this.board, file, rank);
    }

    _isSquareMarked(board, file, rank) {
        let square = this._getSquare(board, file, rank);
        if (!square) return null;
        return square.marked;
    }

    setUpInitial() {
        this._setUpInitial(this.board);
    }

    _setUpInitial(board) {
        this._setUpPosition(board, JChess.INITIAL_POSITION);
    }

    setUpPosition(pieceSet) {
        this._setUpPosition(this.board, pieceSet)
    }

    _setUpPosition(board, pieceSet) {
        pieceSet.forEach(
            (item) => {
                this._setUpPiece(board, item.file, item.rank, item.piece.type, item.piece.color);
            }
        )
    }

    _setUpPiece(board, file, rank, type, color) {
        if (!this._validateSquare(file, rank)) return null;
        board[file][rank].piece = {
            type: type,
            color: color,
            getMoves: this._getMovesPawn
        }
        return true;
    }

    _getMovesPawn(board, file, rank) {
        if (!this._validateSquare(file, rank)) return null;
        if (!(this._getPieceType(board, file, rank) === 'pawn')) return null;
        let result = [];
        let moveDirection = (this._getPieceColor(board, file, rank) === 'white') ? 1 : -1

        if (this._validateSquare(file, rank + moveDirection)) {
            if (!this._getPieceType(board, file, rank + moveDirection)) {
                let move = {
                    file: file,
                    rank: rank + moveDirection
                };
                result.push(move);
                if ((moveDirection * rank === 1) || (moveDirection * rank === -6)) {
                    if (!this._getPieceType(board, file, rank + 2 * moveDirection)) {
                        let move = {
                            file: file,
                            rank: rank + 2 * moveDirection
                        };
                        result.push(move);
                    }
                }
            }
        }

        if (result.length) return result;
        return null;
    }

    _validateSquare(file, rank) {
        return (file >= 0 && file <= 7 && rank >= 0 && rank <= 7);
    }
}