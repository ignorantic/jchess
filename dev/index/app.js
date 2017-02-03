import JChess from '../lib/jchess';
import initBoard from '../components/board/board';
import initSidebar from '../components/sidebar/sidebar';
import initFEN from '../components/fen/fen';

document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let jchess = new JChess;
    jchess.setUpInitial();
    initBoard(jchess);
    initSidebar(jchess);
    initFEN(jchess);

});