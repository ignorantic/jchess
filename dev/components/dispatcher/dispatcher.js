
/**
 *     dispatcher.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import JChess from '../../lib/jchess';
import DOMBoard from '../dom_board/dom_board';
import DOMTurnIndicator from '../dom_turn_indicator/dom_turn_indicator';
import DOMSidebar from '../dom_sidebar/dom_sidebar';
import DOMFEN from '../dom_fen/dom_fen';


export default class Dispatcher {

    constructor() {

        this.chess = new JChess;
        this.chess.setUpInitial();

        this.DOMBoard = new DOMBoard(this);
        this.DOMSidebar = new DOMSidebar(this);
        this.DOMFEN = new DOMFEN(this);
        this.DOMTurnIndicator = new DOMTurnIndicator(this);

    }

    boardClick() {

        let self = this;

        return (e) => {
            self.chess.pickSquare(+e.target.dataset.file, +e.target.dataset.rank);
            self.DOMBoard.render(self.chess);
            self.DOMFEN.update(self.chess);
            self.DOMTurnIndicator.update(self.chess);
        };

    }

    resetClick() {

        let self = this;

        return () => {
            self.chess.setUpInitial();
            self.DOMBoard.render(self.chess);
            self.DOMFEN.update(self.chess);
            self.DOMTurnIndicator.update(self.chess);
        };

    }

    FENChange() {

        let self = this;

        return () => {
            self.chess.setPositionByFEN(self.DOMFEN.getFEN());
            self.DOMBoard.render(self.chess);
            self.DOMFEN.update(self.chess);
            self.DOMTurnIndicator.update(self.chess);
        };

    }

}