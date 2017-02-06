/*
 *     fen.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

export default function initFEN(jchess) {

    'use strict';

    let FEN = document.querySelector('#fen');

    FEN.value = jchess.getFEN();

    FEN.addEventListener('change', () => {
        FEN.value = jchess.getFEN();
    });
}