
/**
 *     dom_fen.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

export default class DOMFEN {

    constructor(dispatcher) {
        this.update(dispatcher.chess);
        let elemFEN = document.querySelector('#fen');
        elemFEN.addEventListener('change', dispatcher.FENChange());
    }

    update(chess) {
        let elemFEN = document.querySelector('#fen');
        let currentCaretPosition = this.getCaretPosition(elemFEN);
        elemFEN.value = chess.getFEN();
        this.setCaretPosition(elemFEN, currentCaretPosition);
    }

    getFEN() {
        let elemFEN = document.querySelector('#fen');
        return elemFEN.value;
    }

    setFEN(FEN) {
        let elemFEN = document.querySelector('#fen');
        elemFEN.value = FEN;
    }

    getCaretPosition (input) {
        if (input.createRange) {
            let range = document.selection.createRange.duplicate();
            range.moveStart('character', -input.value.length);
            return range.text.length;
        } else {
            return input.selectionStart;
        }
    }

    setCaretPosition(input, pos) {
        input.setSelectionRange(pos, pos);
    }

}