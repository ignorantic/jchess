
/*
 *     board.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

export default function initBoard(jchess) {

    'use strict';

    let wrap = document.querySelector('.board-wrap'),
        board = document.createElement('section');

    board.classList.add('board');
    board.id = 'board';

    board.addEventListener('change', () => {
        drawBoard(jchess);
    });

    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            let square = newSquare(jchess, file, rank);
            square.addEventListener('click', handlerClick);
            board.appendChild(square);
        }
    }

    wrap.appendChild(board);
    return true;

    function handlerClick(e) {
        jchess.pickSquare(+e.target.dataset.file, +e.target.dataset.rank);
        drawBoard(jchess);
        let FEN = document.querySelector('#fen');
        let event = new Event('change');
        FEN.dispatchEvent(event);
    }
}

function drawBoard(jchess) {

    'use strict';

    let squares = document.getElementsByClassName('board__square');

    for (let i = 0; i < squares.length; i++) {

        let file = squares[i].dataset.file,
            rank = squares[i].dataset.rank;

        if (squares[i].dataset.selected != jchess.isSquareSelected(file, rank)) {
            drawSquare(squares[i], jchess, file, rank);
        }

        if (squares[i].dataset.marked != jchess.isSquareMarked(file, rank)) {
            drawSquare(squares[i], jchess, file, rank);
        }

        if (squares[i].dataset.piece != jchess.getPieceType(file, rank)) {
            drawSquare(squares[i], jchess, file, rank);
        }

    }

    return true;

}

function newSquare(jchess, file, rank) {

    'use strict';

    let square = document.createElement('div');
    square.dataset.file = file;
    square.dataset.rank = rank;
    drawSquare(square, jchess, file, rank);
    return square;

}

function drawSquare(square, jchess, file, rank) {

    'use strict';

    square.dataset.selected = +jchess.isSquareSelected(file, rank);
    square.dataset.marked = +jchess.isSquareMarked(file, rank);
    square.dataset.piece = +!!jchess.getPieceType(file, rank);
    setClasses(square, jchess, file, rank);
    return true;

}

function setClasses(square, jchess, file, rank) {

    'use strict';

    square.removeAttribute('class');
    square.classList.add('board__square');
    square.classList.add('board__square_' + jchess.getSquareColor(file, rank));

    if (square.dataset.selected == 1) {
        square.classList.add('board__square_selected');
    }

    if (square.dataset.marked == 1) {
        square.classList.add('board__square_marked_' + jchess.getSquareColor(file, rank));
    }

    if (square.dataset.piece == 1) {
        square.classList.add('board__square_' + jchess.getPieceType(file, rank) + '_'
            + jchess.getPieceColor(file, rank));
    }

    return true;
}