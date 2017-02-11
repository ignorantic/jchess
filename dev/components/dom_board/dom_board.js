
/**
 *     dom_board.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

export default class DOMBoard {

    /**
     *   CONSTRUCTOR
     */

    constructor(dispatcher) {
        this.init(dispatcher);
    }

    init(dispatcher) {

        let board = document.querySelector('section.board'),
            fragment = document.createDocumentFragment();

        for (let file = 0; file < 8; file++) {
            for (let rank = 0; rank < 8; rank++) {
                let square = this.newSquare(dispatcher.chess, file, rank);
                square.addEventListener('click', dispatcher.boardClick());
                fragment.appendChild(square);
            }
        }

        board.appendChild(fragment);

    }

    render(chess) {

        let squares = document.querySelectorAll('div.board__square');
        let length = squares.length;

        for (let i = 0; i < length; i++) {

            let file = squares[i].dataset.file,
                rank = squares[i].dataset.rank;

            if (squares[i].dataset.selected != chess.isSquareSelected(file, rank)) {
                this.drawSquare(squares[i], chess, file, rank);
            }

            if (squares[i].dataset.marked != chess.isSquareMarked(file, rank)) {
                this.drawSquare(squares[i], chess, file, rank);
            }

            if (squares[i].dataset.piece != chess.getPieceType(file, rank)) {
                this.drawSquare(squares[i], chess, file, rank);
            }

        }

        return true;

    }

    newSquare(chess, file, rank) {

        let square = document.createElement('div');
        square.dataset.file = file;
        square.dataset.rank = rank;
        this.drawSquare(square, chess, file, rank);
        return square;

    }

    drawSquare(square, chess, file, rank) {

        square.dataset.selected = +chess.isSquareSelected(file, rank);
        square.dataset.marked = +chess.isSquareMarked(file, rank);
        square.dataset.piece = +!!chess.getPieceType(file, rank);
        this.setClasses(square, chess, file, rank);
        return true;

    }

    setClasses(square, chess, file, rank) {

        square.removeAttribute('class');
        square.classList.add('board__square');
        square.classList.add('board__square_' + chess.getSquareColor(file, rank));

        if (square.dataset.selected == 1) {
            square.classList.add('board__square_selected');
        }

        if (square.dataset.marked == 1) {
            square.classList.add('board__square_marked_' + chess.getSquareColor(file, rank));
        }

        if (square.dataset.piece == 1) {
            square.classList.add('board__square_' + chess.getPieceType(file, rank) + '_'
                + chess.getPieceColor(file, rank));
        }

        return true;
    }

}
