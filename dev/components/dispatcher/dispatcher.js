
/**
 *     dispatcher.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import JChess from '../../lib/jchess';
import DOMBoard from '../dom_board/dom_board';
import DOMSidebar from '../dom_sidebar/dom_sidebar';
import DOMFEN from '../dom_fen/dom_fen';


export default class Dispatcher {

    /**
     *   CONSTRUCTOR
     */

    constructor() {

        this.chess = new JChess;
        this.chess.setUpInitial();

        this.DOMBoard = new DOMBoard(this);
        this.DOMSidebar = new DOMSidebar(this);
        this.DOMFEN = new DOMFEN(this);

    }

    boardClick() {

        let self = this;

        return (e) => {
            self.chess.pickSquare(+e.target.dataset.file, +e.target.dataset.rank);
            self.DOMBoard.drawBoard(self.chess);
            self.DOMFEN.update(self.chess);
        };

    }

    resetClick() {

        let self = this;

        return () => {
            self.chess.setUpInitial();
            self.DOMBoard.drawBoard(self.chess);
            self.DOMFEN.update(self.chess);
        };

    }

    boardChange() {

        let self = this;

        return () => {
            self.DOMBoard.drawBoard(self.chess);
        };

    }

    FENChange() {

        // let self = this;
        //
        // return () => {
        //
        // };

    }

}