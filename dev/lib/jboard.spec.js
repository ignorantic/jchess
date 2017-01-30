
/*
 *     jboard ~ jboard.spec.js
 *     2017 by Andrii Sorokin
 */

import JBoard from './jboard';
import {describe, it, before, beforeEach} from 'mocha';

describe('jBoard', () => {

    let TEST_POSITION = [
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
            file: 7,
            rank: 4,
            piece: {
                type: 'bishop',
                color: 'white'
            }
        },
        {
            file: 5,
            rank: 2,
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
            file: 0,
            rank: 5,
            piece: {
                type: 'bishop',
                color: 'black'
            }
        },
        {
            file: 3,
            rank: 3,
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
            file: 0,
            rank: 4,
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
    ];

    /*
     *   INITIALIZATION
     */

    describe('constructor', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('check size of board', () => {
            jboard.board.length.should.be.equal(8);
            jboard.board[0].length.should.be.equal(8);
            jboard.board[7].length.should.be.equal(8);
        })

        it('check square colors', () => {
            jboard.board[0][0].color.should.be.equal('black');
            jboard.board[0][7].color.should.be.equal('white');
            jboard.board[7][0].color.should.be.equal('white');
            jboard.board[7][7].color.should.be.equal('black');
        })
    })

    /*
     *   SETUP
     */

    describe('setUpInitial', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpInitial();
        })

        it('check rooks' , () => {
            jboard.board[0][0].piece.type.should.be.equal('rook');
            jboard.board[0][0].piece.color.should.be.equal('white');
            jboard.board[7][0].piece.type.should.be.equal('rook');
            jboard.board[7][0].piece.color.should.be.equal('white');
            jboard.board[0][7].piece.type.should.be.equal('rook');
            jboard.board[0][7].piece.color.should.be.equal('black');
            jboard.board[7][7].piece.type.should.be.equal('rook');
            jboard.board[7][7].piece.color.should.be.equal('black');
        })

        it('check knights' , () => {
            jboard.board[1][0].piece.type.should.be.equal('knight');
            jboard.board[1][0].piece.color.should.be.equal('white');
            jboard.board[6][0].piece.type.should.be.equal('knight');
            jboard.board[6][0].piece.color.should.be.equal('white');
            jboard.board[1][7].piece.type.should.be.equal('knight');
            jboard.board[1][7].piece.color.should.be.equal('black');
            jboard.board[6][7].piece.type.should.be.equal('knight');
            jboard.board[6][7].piece.color.should.be.equal('black');
        })

        it('check bishops' , () => {
            jboard.board[2][0].piece.type.should.be.equal('bishop');
            jboard.board[2][0].piece.color.should.be.equal('white');
            jboard.board[5][0].piece.type.should.be.equal('bishop');
            jboard.board[5][0].piece.color.should.be.equal('white');
            jboard.board[2][7].piece.type.should.be.equal('bishop');
            jboard.board[2][7].piece.color.should.be.equal('black');
            jboard.board[5][7].piece.type.should.be.equal('bishop');
            jboard.board[5][7].piece.color.should.be.equal('black');
        })

        it('check queens' , () => {
            jboard.board[3][0].piece.type.should.be.equal('queen');
            jboard.board[3][0].piece.color.should.be.equal('white');
            jboard.board[3][7].piece.type.should.be.equal('queen');
            jboard.board[3][7].piece.color.should.be.equal('black');
        })

        it('check kings' , () => {
            jboard.board[4][0].piece.type.should.be.equal('king');
            jboard.board[4][0].piece.color.should.be.equal('white');
            jboard.board[4][7].piece.type.should.be.equal('king');
            jboard.board[4][7].piece.color.should.be.equal('black');
        })

        it('check white pawns' , () => {
            jboard.board[0][1].piece.type.should.be.equal('pawn');
            jboard.board[7][1].piece.color.should.be.equal('white');
        })

        it('check black pawns' , () => {
            jboard.board[0][6].piece.type.should.be.equal('pawn');
            jboard.board[7][6].piece.color.should.be.equal('black');
        })
    })

    describe('setUpPosition', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition([
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
                    rank: 2,
                    piece: {
                        type: 'knight',
                        color: 'black'
                    }
                },
                {
                    file: 5,
                    rank: 7,
                    piece: {
                        type: 'queen',
                        color: 'black'
                    }
                }
            ]);
        })

        it('check pawn' , () => {
            jboard.board[0][1].piece.type.should.be.equal('pawn');
            jboard.board[0][1].piece.color.should.be.equal('white');
        })

        it('check knight' , () => {
            jboard.board[1][2].piece.type.should.be.equal('knight');
            jboard.board[1][2].piece.color.should.be.equal('black');
        })

        it('check queen' , () => {
            jboard.board[5][7].piece.type.should.be.equal('queen');
            jboard.board[5][7].piece.color.should.be.equal('black');
        })
    })
    
    /*
     *   GETTERS
     */

    describe('getSquareColor', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct' , () => {
            expect(jboard.getSquareColor(0, 8)).to.be.null;
            expect(jboard.getSquareColor(8, 0)).to.be.null;
            expect(jboard.getSquareColor(-1, 0)).to.be.null;
            expect(jboard.getSquareColor(0, -1)).to.be.null;
        })

        it('return "black" for (0, 0), etc' , () => {
            jboard.getSquareColor(0, 0).should.be.equal('black');
            jboard.getSquareColor(0, 2).should.be.equal('black');
            jboard.getSquareColor(1, 1).should.be.equal('black');
            jboard.getSquareColor(7, 7).should.be.equal('black');
            jboard.getSquareColor(5, 7).should.be.equal('black');
            jboard.getSquareColor(3, 7).should.be.equal('black');
        })

        it('return "white" for (0, 1), etc' , () => {
            jboard.getSquareColor(0, 1).should.be.equal('white');
            jboard.getSquareColor(0, 3).should.be.equal('white');
            jboard.getSquareColor(1, 2).should.be.equal('white');
            jboard.getSquareColor(0, 7).should.be.equal('white');
            jboard.getSquareColor(2, 7).should.be.equal('white');
            jboard.getSquareColor(6, 7).should.be.equal('white');
        })
    })

    describe('getPieceType', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpInitial();
        })

        it('return piece type for (0, 0), etc', () => {
            expect(jboard.getPieceType(0, 2)).to.be.null;
            expect(jboard.getPieceType(4, 4)).to.be.null;
            jboard.getPieceType(0, 0).should.be.equal('rook');
            jboard.getPieceType(7, 7).should.be.equal('rook');
            jboard.getPieceType(1, 0).should.be.equal('knight');
            jboard.getPieceType(6, 7).should.be.equal('knight');
            jboard.getPieceType(5, 7).should.be.equal('bishop');
            jboard.getPieceType(1, 1).should.be.equal('pawn');
            jboard.getPieceType(6, 6).should.be.equal('pawn');
            jboard.getPieceType(3, 0).should.be.equal('queen');
            jboard.getPieceType(4, 7).should.be.equal('king');
        })
    })

    describe('getPieceColor', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpInitial();
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jboard.getPieceColor(0, 8)).to.be.null;
            expect(jboard.getPieceColor(8, 0)).to.be.null;
            expect(jboard.getPieceColor(-1, 0)).to.be.null;
            expect(jboard.getPieceColor(0, -1)).to.be.null;
        })

        it('return piece color for (0, 0), etc', () => {
            expect(jboard.getPieceType(1, 2)).to.be.null;
            expect(jboard.getPieceType(3, 5)).to.be.null;
            jboard.getPieceColor(0, 1).should.be.equal('white');
            jboard.getPieceColor(1, 0).should.be.equal('white');
            jboard.getPieceColor(2, 0).should.be.equal('white');
            jboard.getPieceColor(2, 7).should.be.equal('black');
            jboard.getPieceColor(3, 0).should.be.equal('white');
            jboard.getPieceColor(3, 7).should.be.equal('black');
            jboard.getPieceColor(4, 1).should.be.equal('white');
            jboard.getPieceColor(5, 6).should.be.equal('black');
            jboard.getPieceColor(6, 7).should.be.equal('black');
            jboard.getPieceColor(7, 6).should.be.equal('black');
        })
    })

    /*
     *   SETTERS
     */

    describe('setPieceType', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jboard.setPieceType(0, 8, 'pawn')).to.be.null;
            expect(jboard.setPieceType(8, 0, 'king')).to.be.null;
            expect(jboard.setPieceType(-5, 5, 'bishop')).to.be.null;
            expect(jboard.setPieceType(0, -1, 'queen')).to.be.null;
        })

        it('return true if setting was successful', () => {
            expect(jboard.setPieceType(0, 0, 'pawn')).to.be.true;
            expect(jboard.setPieceType(1, 1, 'knight')).to.be.true;
            expect(jboard.setPieceType(7, 6, null)).to.be.true;
            expect(jboard.setPieceType(5, 4, 'bishop')).to.be.true;
        })

        it('set piece type and check', () => {
            expect(jboard.getPieceType(1, 2)).to.be.null;
            jboard.setPieceType(1, 2, 'pawn');
            expect(jboard.getPieceType(1, 2)).to.be.equal('pawn');

            expect(jboard.getPieceType(2, 4)).to.be.null;
            jboard.setPieceType(2, 4, 'queen');
            expect(jboard.getPieceType(2, 4)).to.be.equal('queen');

            expect(jboard.getPieceType(1, 1)).to.be.equal('knight');
            jboard.setPieceType(1, 1, 'bishop');
            expect(jboard.getPieceType(1, 1)).to.be.equal('bishop');

            expect(jboard.getPieceType(2, 4)).to.be.equal('queen');
            jboard.setPieceType(2, 4, 'king');
            expect(jboard.getPieceType(2, 4)).to.be.equal('king');
        })
    })

    describe('setPieceColor', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jboard.setPieceColor(0, 8, 'white')).to.be.null;
            expect(jboard.setPieceColor(8, 0, 'white')).to.be.null;
            expect(jboard.setPieceColor(-3, 0, 'black')).to.be.null;
            expect(jboard.setPieceColor(0, -1, 'black')).to.be.null;
        })

        it('return true if setting was successful', () => {
            expect(jboard.setPieceColor(0, 0, 'white')).to.be.true;
            expect(jboard.setPieceColor(1, 1, 'white')).to.be.true;
            expect(jboard.setPieceColor(7, 6, null)).to.be.true;
            expect(jboard.setPieceColor(5, 4, 'black')).to.be.true;
        })

        it('set piece type and check', () => {
            expect(jboard.getPieceColor(1, 2)).to.be.null;
            jboard.setPieceColor(1, 2, 'black');
            expect(jboard.getPieceColor(1, 2)).to.be.equal('black');

            expect(jboard.getPieceColor(2, 4)).to.be.null;
            jboard.setPieceColor(2, 4, 'white');
            expect(jboard.getPieceColor(2, 4)).to.be.equal('white');

            expect(jboard.getPieceColor(1, 1)).to.be.equal('white');
            jboard.setPieceColor(1, 1, 'black');
            expect(jboard.getPieceColor(1, 1)).to.be.equal('black');

            expect(jboard.getPieceColor(5, 4)).to.be.equal('black');
            jboard.setPieceColor(5, 4, 'white');
            expect(jboard.getPieceColor(5, 4)).to.be.equal('white');
        })
    })
    
    /*
     *   PICK
     */

    describe('pickSquare', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jboard.pickSquare(0, 8)).to.be.null;
            expect(jboard.pickSquare(8, 0)).to.be.null;
            expect(jboard.pickSquare(-1, 0)).to.be.null;
            expect(jboard.pickSquare(0, -1)).to.be.null;
        })

        it('return true if arguments are correct', () => {
            expect(jboard.pickSquare(0, 0)).to.be.true;
            expect(jboard.pickSquare(1, 5)).to.be.true;
            expect(jboard.pickSquare(5, 6)).to.be.true;
            expect(jboard.pickSquare(7, 7)).to.be.true;
        })

        it('check selected square', () => {
            jboard.pickSquare(1, 5);
            jboard.isSquareSelected(1, 5).should.be.true;
            jboard.isSquareSelected(7, 7).should.be.false;
            jboard.pickSquare(6, 7);
            jboard.isSquareSelected(5, 1).should.be.false;
            jboard.isSquareSelected(6, 7).should.be.true;
        })

        it('check marked square', () => {
            jboard.pickSquare(0, 1);
            jboard.isSquareMarked(0, 1).should.be.false;
            jboard.isSquareMarked(0, 2).should.be.true;
            jboard.isSquareMarked(0, 3).should.be.true;
            jboard.isSquareMarked(0, 4).should.be.false;
            jboard.isSquareMarked(1, 2).should.be.false;
        })
    })

    /*
     *   SELECT
     */

    describe('_resetSelect', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.pickSquare(4, 4);
        })

        it('reset selected square', () => {
            expect(jboard.isSquareSelected(4, 4)).to.be.true;
            expect(jboard.isSquareSelected(4, 5)).to.be.false;
            jboard._resetSelect(jboard.board);
            expect(jboard.isSquareSelected(4, 4)).to.be.false;
            expect(jboard.isSquareSelected(4, 5)).to.be.false;
        })
    })

    describe('isSquareSelected', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jboard.isSquareSelected(0, 8)).to.be.null;
            expect(jboard.isSquareSelected(8, 0)).to.be.null;
            expect(jboard.isSquareSelected(-1, 0)).to.be.null;
            expect(jboard.isSquareSelected(0, -1)).to.be.null;
        })

        it('return true or false if arguments are correct', () => {
            jboard.pickSquare(1, 5);
            expect(jboard.isSquareSelected(0, 0)).to.be.false;
            expect(jboard.isSquareSelected(1, 5)).to.be.true;
            jboard.pickSquare(7, 7);
            expect(jboard.isSquareSelected(1, 5)).to.be.false;
            expect(jboard.isSquareSelected(7, 7)).to.be.true;
        })
    })

    /*
     *   MARK
     */

    describe('_markMoves and isSquareMarked', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jboard._markMoves(0, 8)).to.be.null;
            expect(jboard._markMoves(8, 0)).to.be.null;
            expect(jboard._markMoves(-1, 0)).to.be.null;
            expect(jboard._markMoves(0, -1)).to.be.null;
        })

        it('mark two squares for pawn a2', () => {
            jboard._markMoves(0, 1);
            expect(jboard.isSquareMarked(0, 2)).to.be.true;
            expect(jboard.isSquareMarked(0, 3)).to.be.true;
            expect(jboard.isSquareMarked(0, 4)).to.be.false;
            expect(jboard.isSquareMarked(1, 2)).to.be.false;
        })

        it('mark only square for pawn c5', () => {
            jboard._markMoves(2, 4);
            expect(jboard.isSquareMarked(2, 3)).to.be.true;
            expect(jboard.isSquareMarked(2, 2)).to.be.false;
            expect(jboard.isSquareMarked(3, 3)).to.be.false;
            expect(jboard.isSquareMarked(1, 3)).to.be.false;
        })

        it('mark no square for pawn d5', () => {
            jboard._markMoves(3, 4);
            expect(jboard.isSquareMarked(3, 5)).to.be.false;
            expect(jboard.isSquareMarked(3, 6)).to.be.false;
            expect(jboard.isSquareMarked(2, 5)).to.be.false;
            expect(jboard.isSquareMarked(4, 5)).to.be.false;
        })

        it('mark no square for pawn f4', () => {
            jboard._markMoves(5, 3);
            expect(jboard.isSquareMarked(5, 4)).to.be.false;
            expect(jboard.isSquareMarked(5, 5)).to.be.false;
            expect(jboard.isSquareMarked(4, 4)).to.be.false;
            expect(jboard.isSquareMarked(6, 4)).to.be.false;
        })
    })

    /*
     *   MOVE
     */

    describe('_doMove', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;

        })

        beforeEach(() => {
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jboard._doMove(0, 5, 8, 7)).to.be.null;
            expect(jboard._doMove(0, -1, 7, 7)).to.be.null;
            expect(jboard._doMove(0, 0, 6, 9)).to.be.null;
            expect(jboard._doMove(10, 8, 18, 8)).to.be.null;
        })

        it('return null if there is no piece on start square', () => {
            expect(jboard._doMove(0, 2, 4, 3)).to.be.null;
            expect(jboard._doMove(3, 2, 7, 7)).to.be.null;
            expect(jboard._doMove(6, 7, 4, 6)).to.be.null;
            expect(jboard._doMove(5, 5, 2, 0)).to.be.null;
        })

        it('return null if start piece color equal stop piece color', () => {
            expect(jboard._doMove(7, 1, 6, 2)).to.be.null;
            expect(jboard._doMove(2, 0, 1, 1)).to.be.null;
            expect(jboard._doMove(3, 7, 4, 7)).to.be.null;
            expect(jboard._doMove(5, 4, 6, 6)).to.be.null;
        })

        it('return true if move was successful', () => {
            expect(jboard._doMove(4, 1, 4, 3)).to.be.true;
            expect(jboard._doMove(2, 4, 2, 3)).to.be.true;
            expect(jboard._doMove(6, 6, 6, 5)).to.be.true;
            expect(jboard._doMove(0, 1, 0, 3)).to.be.true;
        })

        it('check stop square if move was successful', () => {
            let color = jboard.getPieceColor(0, 1);
            let type = jboard.getPieceType(0, 1);

            jboard._doMove(0, 1, 0, 3);

            expect(jboard.getPieceColor(0, 3) === color).to.be.true;
            expect(jboard.getPieceType(0, 3) === type).to.be.true;

            color = jboard.getPieceColor(7, 3);
            type = jboard.getPieceType(7, 3);

            jboard._doMove(7, 3, 6, 2);

            expect(jboard.getPieceColor(6, 2) === color).to.be.true;
            expect(jboard.getPieceType(6, 2) === type).to.be.true;
        })

        it('check start square if move was successful', () => {
            expect(jboard.getPieceColor(0, 1)).to.be.equal('white');
            expect(jboard.getPieceType(0, 1)).to.be.equal('pawn');
            jboard._doMove(0, 1, 0, 3);
            expect(jboard.getPieceColor(0, 1)).to.be.null;
            expect(jboard.getPieceType(0, 1)).to.be.null;

            expect(jboard.getPieceColor(7, 3)).to.be.equal('black');
            expect(jboard.getPieceType(7, 3)).to.be.equal('pawn');
            jboard._doMove(7, 3, 6, 2);
            expect(jboard.getPieceColor(7, 3)).to.be.null;
            expect(jboard.getPieceType(7, 3)).to.be.null;
        })
    })

    /*
     *   PAWN MOVES
     */

    describe('_getMovesPawn', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return object if piece is pawn', () => {
            expect(typeof jboard._getMovesPawn(1, 1)).to.be.equal('object');
            expect(typeof jboard._getMovesPawn(3, 4)).to.be.equal('object');
        })

        it('return two squares for pawn a2', () => {
            let moves = jboard._getMovesPawn(0, 1);
            expect(moves[0].file).to.be.equal(0);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1].file).to.be.equal(0);
            expect(moves[1].rank).to.be.equal(3);
            expect(moves[2]).to.be.undefined;
        })

        it('return two squares for pawn e2', () => {
            let moves = jboard._getMovesPawn(4, 1);

            expect(moves[0].file).to.be.equal(4);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1].file).to.be.equal(4);
            expect(moves[1].rank).to.be.equal(3);
            expect(moves[2]).to.be.undefined;
        })

        it('return only square for pawn c5', () => {
            let moves = jboard._getMovesPawn(2, 4);

            expect(moves[0].file).to.be.equal(2);
            expect(moves[0].rank).to.be.equal(3);
            expect(moves[1]).to.be.undefined;
        })

        it('return null for pawn d5', () => {
            let moves = jboard._getMovesPawn(3, 4);
            expect(moves).to.be.null;
        })

        it('return null for pawn f4', () => {
            let moves = jboard._getMovesPawn(5, 3);
            expect(moves).to.be.null;
        })

        it('return three squares for pawn b2', () => {
            let moves = jboard._getMovesPawn(1, 1);

            expect(moves[0].file).to.be.equal(1);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1].file).to.be.equal(1);
            expect(moves[1].rank).to.be.equal(3);
            expect(moves[2].file).to.be.equal(2);
            expect(moves[2].rank).to.be.equal(2);
            expect(moves[3]).to.be.undefined;
        })

        it('return only square for pawn h2', () => {
            let moves = jboard._getMovesPawn(7, 1);

            expect(moves[0].file).to.be.equal(7);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1]).to.be.undefined;
        })

        it('return two squares for pawn h4', () => {
            let moves = jboard._getMovesPawn(7, 3);

            expect(moves[0].file).to.be.equal(7);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1].file).to.be.equal(6);
            expect(moves[1].rank).to.be.equal(2);
            expect(moves[2]).to.be.undefined;
        })
    })

    /*
     *   KNIGHT MOVES
     */

    describe('_getMovesKnight', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return object if piece is knight', () => {
            expect(typeof jboard._getMovesKnight(1, 0)).to.be.equal('object');
            expect(typeof jboard._getMovesKnight(2, 2)).to.be.equal('object');
        })

        it('return two squares for knight c3', () => {
            let moves = jboard._getMovesKnight(2, 2);

            expect(moves[0].file).to.be.equal(3);
            expect(moves[0].rank).to.be.equal(4);
            expect(moves[1].file).to.be.equal(4);
            expect(moves[1].rank).to.be.equal(3);
            expect(moves[2].file).to.be.equal(4);
            expect(moves[2].rank).to.be.equal(1);
            expect(moves[3].file).to.be.equal(3);
            expect(moves[3].rank).to.be.equal(0);
            expect(moves[4].file).to.be.equal(1);
            expect(moves[4].rank).to.be.equal(0);
            expect(moves[5].file).to.be.equal(0);
            expect(moves[5].rank).to.be.equal(1);
            expect(moves[6].file).to.be.equal(0);
            expect(moves[6].rank).to.be.equal(3);
            expect(moves[7].file).to.be.equal(1);
            expect(moves[7].rank).to.be.equal(4);

            expect(moves[8]).to.be.undefined;
        })

        it('return two squares for knight f5', () => {
            let moves = jboard._getMovesKnight(5, 4);

            expect(moves[0].file).to.be.equal(7);
            expect(moves[0].rank).to.be.equal(5);
            expect(moves[1].file).to.be.equal(6);
            expect(moves[1].rank).to.be.equal(2);
            expect(moves[2].file).to.be.equal(4);
            expect(moves[2].rank).to.be.equal(2);
            expect(moves[3].file).to.be.equal(3);
            expect(moves[3].rank).to.be.equal(5);
            expect(moves[4].file).to.be.equal(4);
            expect(moves[4].rank).to.be.equal(6);

            expect(moves[5]).to.be.undefined;
        })
    })

    /*
     *   KING MOVES
     */

    describe('_getMovesKing', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return object if piece is king', () => {
            expect(typeof jboard._getMovesKing(1, 0)).to.be.equal('object');
            expect(typeof jboard._getMovesKing(2, 2)).to.be.equal('object');
        })

        it('return two squares for white king', () => {
            let moves = jboard._getMovesKing(4, 0);

            expect(moves[0].file).to.be.equal(5);
            expect(moves[0].rank).to.be.equal(1);
            expect(moves[1].file).to.be.equal(5);
            expect(moves[1].rank).to.be.equal(0);
            expect(moves[2].file).to.be.equal(3);
            expect(moves[2].rank).to.be.equal(1);

            expect(moves[3]).to.be.undefined;
        })
    })

    /*
     *   ROOK MOVES
     */

    describe('_getMovesRook', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return object if piece is rook', () => {
            expect(typeof jboard._getMovesRook(1, 0)).to.be.equal('object');
            expect(typeof jboard._getMovesRook(2, 2)).to.be.equal('object');
        })

        it('return two squares for rook h8', () => {
            let moves = jboard._getMovesRook(7, 7);

            expect(moves[0].file).to.be.equal(7);
            expect(moves[0].rank).to.be.equal(6);
            expect(moves[1].file).to.be.equal(7);
            expect(moves[1].rank).to.be.equal(5);
            expect(moves[2].file).to.be.equal(7);
            expect(moves[2].rank).to.be.equal(4);
            expect(moves[3].file).to.be.equal(6);
            expect(moves[3].rank).to.be.equal(7);
            expect(moves[4].file).to.be.equal(5);
            expect(moves[4].rank).to.be.equal(7);

            expect(moves[5]).to.be.undefined;
        })
    })

    /*
     *   BISHOP MOVES
     */

    describe('_getMovesBishop', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return object if piece is bishop', () => {
            expect(typeof jboard._getMovesBishop(1, 0)).to.be.equal('object');
            expect(typeof jboard._getMovesBishop(2, 2)).to.be.equal('object');
        })

        it('return two squares for bishop h5', () => {
            let moves = jboard._getMovesBishop(7, 4);

            expect(moves[0].file).to.be.equal(6);
            expect(moves[0].rank).to.be.equal(3);
            expect(moves[1].file).to.be.equal(6);
            expect(moves[1].rank).to.be.equal(5);
            expect(moves[2].file).to.be.equal(5);
            expect(moves[2].rank).to.be.equal(6);

            expect(moves[3]).to.be.undefined;
        })
    })

    /*
     *   VALIDATORS
     */

    describe('_validateSquare', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return false if square isn\'t correct', () => {
            expect(jboard._validateSquare(0, 8)).to.be.false;
            expect(jboard._validateSquare(8, 0)).to.be.false;
            expect(jboard._validateSquare(-1, 0)).to.be.false;
            expect(jboard._validateSquare(0, -1)).to.be.false;
        })

        it('return true if square is correct', () => {
            expect(jboard._validateSquare(0, 0)).to.be.true;
            expect(jboard._validateSquare(7, 7)).to.be.true;
            expect(jboard._validateSquare(0, 3)).to.be.true;
            expect(jboard._validateSquare(3, 5)).to.be.true;
        })
    })
})