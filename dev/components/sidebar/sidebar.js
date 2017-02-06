/*
 *     sidebar.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

export default function initSidebar(jchess) {

    'use strict';

    let reset = document.querySelector('#btn_sreset');

    reset.addEventListener('click', () => {
        jchess.setUpInitial();
        let event = new Event('change');
        let board = document.querySelector('#board');
        let FEN = document.querySelector('#fen');
        board.dispatchEvent(event);
        FEN.dispatchEvent(event);
    });

}