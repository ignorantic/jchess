import JChess from '../lib/jchess';
import initBoard from '../components/board/board';

document.addEventListener('DOMContentLoaded', () => {
    let jchess = new JChess;
    // jchess.setUpInitial();
    jchess.setUpPosition([
        {
            file: 0,
            rank: 0,
            piece: {
                type: 'rook',
                color: 'white'
            }
        },
        {
            file: 1,
            rank: 0,
            piece: {
                type: 'knight',
                color: 'white'
            }
        },
        {
            file: 2,
            rank: 0,
            piece: {
                type: 'bishop',
                color: 'white'
            }
        },
        {
            file: 3,
            rank: 0,
            piece: {
                type: 'queen',
                color: 'white'
            }
        },
        {
            file: 4,
            rank: 0,
            piece: {
                type: 'king',
                color: 'white'
            }
        },
        {
            file: 5,
            rank: 0,
            piece: {
                type: 'bishop',
                color: 'white'
            }
        },
        {
            file: 6,
            rank: 0,
            piece: {
                type: 'knight',
                color: 'white'
            }
        },
        {
            file: 7,
            rank: 0,
            piece: {
                type: 'rook',
                color: 'white'
            }
        },
        {
            file: 0,
            rank: 7,
            piece: {
                type: 'rook',
                color: 'black'
            }
        },
        {
            file: 2,
            rank: 2,
            piece: {
                type: 'knight',
                color: 'black'
            }
        },
        {
            file: 2,
            rank: 7,
            piece: {
                type: 'bishop',
                color: 'black'
            }
        },
        {
            file: 3,
            rank: 7,
            piece: {
                type: 'queen',
                color: 'black'
            }
        },
        {
            file: 4,
            rank: 7,
            piece: {
                type: 'king',
                color: 'black'
            }
        },
        {
            file: 5,
            rank: 7,
            piece: {
                type: 'bishop',
                color: 'black'
            }
        },
        {
            file: 5,
            rank: 4,
            piece: {
                type: 'knight',
                color: 'black'
            }
        },
        {
            file: 7,
            rank: 7,
            piece: {
                type: 'rook',
                color: 'black'
            }
        },
        {
            file: 0,
            rank: 1,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 1,
            rank: 1,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 4,
            rank: 1,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 5,
            rank: 3,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 6,
            rank: 2,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 7,
            rank: 1,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 3,
            rank: 4,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 3,
            rank: 5,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 2,
            rank: 4,
            piece: {
                type: 'pawn',
                color: 'black'
            }
        },
        {
            file: 7,
            rank: 3,
            piece: {
                type: 'pawn',
                color: 'black'
            }
        },
        {
            file: 0,
            rank: 6,
            piece: {
                type: 'pawn',
                color: 'black'
            }
        },
        {
            file: 1,
            rank: 6,
            piece: {
                type: 'pawn',
                color: 'black'
            }
        },
        {
            file: 5,
            rank: 6,
            piece: {
                type: 'pawn',
                color: 'black'
            }
        },
        {
            file: 6,
            rank: 6,
            piece: {
                type: 'pawn',
                color: 'black'
            }
        }
    ]);
    initBoard(jchess);
})