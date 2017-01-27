
/*
 *     jChess ~ jchess.js
 *     2015-2016 by Andrii Sorokin
 */


export default class JChess {

    constructor() {

        this.board = [];
        JChess._paintBoard(this.board);
        JChess._setUpPieces(this.board);
    }

    static _paintBoard(board) {
        let countSquare = 0;
        for (let i = 0; i < 8; i++) {
            board[i] = [];
            countSquare++
            for (let j = 0; j < 8; j++) {
                board[i][j] = (countSquare++ % 2) ?
                    {
                        color: 'black',
                        selected: false,
                        marked: false
                    } :
                    {
                        color: 'white',
                        selected: false,
                        marked: false
                    };
            }
        }
    }

    getSquare(file, rank) {
        return JChess._getSquare(this.board, file, rank);
    }

    getSquareColor(file, rank) {
        return JChess._getSquare(this.board, file, rank) && JChess._getSquare(this.board, file, rank).color;
    }

    getPieceType(file, rank) {
        return JChess._getSquare(this.board, file, rank) && JChess._getSquare(this.board, file, rank).piece.type;
    }

    getPieceColor(file, rank) {
        return JChess._getSquare(this.board, file, rank) && JChess._getSquare(this.board, file, rank).piece.color;
    }

    setUpPieces() {
        return JChess._setUpPieces(this.board)
    }

    pickSquare(file, rank) {
        let square = JChess._getSquare(this.board, file, rank);
        if (!square) return null;
        this.board.forEach(
            (file) => {
                file.forEach(
                    (square) => {
                        square.selected = false;
                    }
                )
            }
        )
        square.selected = true;
        return true;
    }

    isSquareMarked(file, rank) {
        let square = JChess._getSquare(this.board, file, rank);
        if (!square) return null;
        return square.marked;
    }

    isSquareSelected(file, rank) {
        let square = JChess._getSquare(this.board, file, rank);
        if (!square) return null;
        return square.selected;
    }

    static _getSquare(board, file, rank) {
        if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
        return board[file][rank];
    }

    static _setUpPieces(board) {
        let pieceSet = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        for (let rank = 0; rank < 8; rank++) {
            switch (rank) {
                case 0:
                    board.forEach((item, index) =>
                        JChess._setUpPiece(board, index, rank, pieceSet[index], 'white')
                    );
                    break;
                case 7:
                    board.forEach((item, index) =>
                        JChess._setUpPiece(board, index, rank, pieceSet[index], 'black')
                    );
                    break;
                case 1:
                    for (let file = 0; file < 8; file++) {
                        JChess._setUpPiece(board, file, rank, 'pawn', 'white')
                    }
                    break;
                case 6:
                    for (let file = 0; file < 8; file++) {
                        JChess._setUpPiece(board, file, rank, 'pawn', 'black')
                    }
                    break;
                default:
                    for (let file = 0; file < 8; file++) {
                        JChess._setUpPiece(board, file, rank, null, null)
                    }

            }
        }
    }

    static _setUpPiece(board, file, rank, type, color) {
        if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
        board[file][rank].piece = {
            type: type,
            color: color
        }
        return true;
    }
}