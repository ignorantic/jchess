
/*
 *     board.js for jChess project
 *     2016 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

export default function initBoard(jchess) {
    'use strict';

    let wrap = document.querySelector('.board-wrap'),
        board = document.createElement('section');
    board.classList.add('board');
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            let square = document.createElement('div');
            square.classList.add('board__square');
            if (rank === 1) {
                square.classList.add('board__piece');
            }
            square.classList.add('board__square_' + jchess.getSquareColor(file, rank).color);
            board.appendChild(square);
        }
    }
    wrap.appendChild(board);
}