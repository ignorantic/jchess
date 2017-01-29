
/*
 *     jChess ~ jchess.js
 *     2017 by Andrii Sorokin
 */

import JBoard from './jboard';

export default class JChess {

    /*
     *   INITIALIZATION
     */

    constructor() {
        this.mainBoard = new JBoard;
    }

    /*
     *   SETUP
     */

    setUpInitial() {
        this.mainBoard.setUpInitial();
    }

    setUpPosition(pieceSet) {
        this.mainBoard.setUpPosition(pieceSet);
    }

    /*
     *   GETTERS
     */

    getSquare(file, rank) {
        return this.mainBoard.getSquare(file, rank);
    }

    getSquareColor(file, rank) {
        return this.mainBoard.getSquare(file, rank) && this.mainBoard.getSquare(file, rank).color;
    }

    getPieceType(file, rank) {
        return this.mainBoard.getSquare(file, rank) && this.mainBoard.getSquare(file, rank).piece.type;
    }

    getPieceColor(file, rank) {
        return this.mainBoard.getSquare(file, rank) && this.mainBoard.getSquare(file, rank).piece.color;
    }

    /*
     *   PICK
     */

    pickSquare(file, rank) {
        this.mainBoard.pickSquare(file, rank)
    }

    /*
     *   SELECT
     */

    isSquareSelected(file, rank) {
        return this.mainBoard.isSquareSelected(file, rank);
    }

    /*
     *   MARK
     */

    isSquareMarked(file, rank) {
        return this.mainBoard.isSquareMarked(file, rank);
    }
}