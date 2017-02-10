
/**
 *     dom_fen.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

export default class DOMFEN {

    /**
     *   CONSTRUCTOR
     */

    constructor(dispatcher) {
        this.update(dispatcher.chess);
        let FEN = document.querySelector('#fen');
        FEN.addEventListener('change', dispatcher.FENChange());
    }

    update(chess) {
        let FEN = document.querySelector('#fen');
        FEN.value = chess.getFEN();
    }

}