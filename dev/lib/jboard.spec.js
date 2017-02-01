
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
    let CASTLING_POSITION = [
        {
            file: 0,
            rank: 0,
            piece: {
                type: 'rook',
                color: 'white'
            }
        },
        {
            file: 3,
            rank: 0,
            piece: {
                type: 'knight',
                color: 'black'
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
            file: 4,
            rank: 7,
            piece: {
                type: 'king',
                color: 'black'
            }
        },
        {
            file: 3,
            rank: 5,
            piece: {
                type: 'bishop',
                color: 'white'
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
            file: 2,
            rank: 1,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 5,
            rank: 1,
            piece: {
                type: 'pawn',
                color: 'white'
            }
        },
        {
            file: 6,
            rank: 1,
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
        },
        {
            file: 7,
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

        it('check property\'s value', () => {

            expect(jboard.selectFile).be.null;
            expect(jboard.selectRank).be.null;
            expect(jboard.enPassant).be.null;
            jboard.castling.white.should.be.equal(3);
            jboard.castling.black.should.be.equal(3);

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

        it('check rooks', () => {

            jboard.board[0][0].piece.type.should.be.equal('rook');
            jboard.board[0][0].piece.color.should.be.equal('white');

            jboard.board[7][0].piece.type.should.be.equal('rook');
            jboard.board[7][0].piece.color.should.be.equal('white');

            jboard.board[0][7].piece.type.should.be.equal('rook');
            jboard.board[0][7].piece.color.should.be.equal('black');

            jboard.board[7][7].piece.type.should.be.equal('rook');
            jboard.board[7][7].piece.color.should.be.equal('black');

        })

        it('check knights', () => {

            jboard.board[1][0].piece.type.should.be.equal('knight');
            jboard.board[1][0].piece.color.should.be.equal('white');

            jboard.board[6][0].piece.type.should.be.equal('knight');
            jboard.board[6][0].piece.color.should.be.equal('white');

            jboard.board[1][7].piece.type.should.be.equal('knight');
            jboard.board[1][7].piece.color.should.be.equal('black');

            jboard.board[6][7].piece.type.should.be.equal('knight');
            jboard.board[6][7].piece.color.should.be.equal('black');

        })

        it('check bishops', () => {

            jboard.board[2][0].piece.type.should.be.equal('bishop');
            jboard.board[2][0].piece.color.should.be.equal('white');

            jboard.board[5][0].piece.type.should.be.equal('bishop');
            jboard.board[5][0].piece.color.should.be.equal('white');

            jboard.board[2][7].piece.type.should.be.equal('bishop');
            jboard.board[2][7].piece.color.should.be.equal('black');

            jboard.board[5][7].piece.type.should.be.equal('bishop');
            jboard.board[5][7].piece.color.should.be.equal('black');

        })

        it('check queens', () => {

            jboard.board[3][0].piece.type.should.be.equal('queen');
            jboard.board[3][0].piece.color.should.be.equal('white');
            jboard.board[3][7].piece.type.should.be.equal('queen');
            jboard.board[3][7].piece.color.should.be.equal('black');

        })

        it('check kings', () => {

            jboard.board[4][0].piece.type.should.be.equal('king');
            jboard.board[4][0].piece.color.should.be.equal('white');
            jboard.board[4][7].piece.type.should.be.equal('king');
            jboard.board[4][7].piece.color.should.be.equal('black');

        })

        it('check white pawns', () => {

            jboard.board[0][1].piece.type.should.be.equal('pawn');
            jboard.board[7][1].piece.color.should.be.equal('white');

        })

        it('check black pawns', () => {

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

        it('check pawn', () => {

            jboard.board[0][1].piece.type.should.be.equal('pawn');
            jboard.board[0][1].piece.color.should.be.equal('white');

        })

        it('check knight', () => {

            jboard.board[1][2].piece.type.should.be.equal('knight');
            jboard.board[1][2].piece.color.should.be.equal('black');

        })

        it('check queen', () => {

            jboard.board[5][7].piece.type.should.be.equal('queen');
            jboard.board[5][7].piece.color.should.be.equal('black');

        })
    })

    describe('resetPosition', () => {

        let jboard;

        before(() => {

            jboard = new JBoard;
            jboard.setUpInitial();

        })

        it('check pawn a2 before reset', () => {

            jboard.board[0][1].piece.type.should.be.equal('pawn');
            jboard.board[0][1].piece.color.should.be.equal('white');

        })

        it('check knight b1 before reset', () => {

            jboard.board[1][0].piece.type.should.be.equal('knight');
            jboard.board[1][0].piece.color.should.be.equal('white');

        })

        it('check rook h8 before reset', () => {

            jboard.board[7][7].piece.type.should.be.equal('rook');
            jboard.board[7][7].piece.color.should.be.equal('black');

        })

        it('check pawn a2 after reset', () => {

            jboard.resetPosition();

            expect(jboard.board[0][1].piece.type).be.null;
            expect(jboard.board[0][1].piece.color).be.null;

        })

        it('check knight b1 after reset', () => {

            expect(jboard.board[1][0].piece.type).be.null;
            expect(jboard.board[1][0].piece.color).be.null;

        })

        it('check rook h8 after reset', () => {

            expect(jboard.board[7][7].piece.type).be.null;
            expect(jboard.board[7][7].piece.color).be.null;

        })

    })

    describe('_setUpPiece', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('check square h2 before setup', () => {

            expect(jboard.board[7][1].piece.type).be.null;
            expect(jboard.board[7][1].piece.color).be.null;

        })

        it('check square c3 before setup', () => {

            expect(jboard.board[2][2].piece.type).be.null;
            expect(jboard.board[2][2].piece.color).be.null;

        })

        it('check square e4 before setup', () => {

            expect(jboard.board[4][3].piece.type).be.null;
            expect(jboard.board[4][3].piece.color).be.null;

        })

        it('check square h2 after setup', () => {

            jboard._setUpPiece(7, 1, 'pawn', 'white');
            jboard.board[7][1].piece.type.should.be.equal('pawn');
            jboard.board[7][1].piece.color.should.be.equal('white');

        })

        it('check square c3 after setup', () => {

            jboard._setUpPiece(2, 2, 'knight', 'white');
            jboard.board[2][2].piece.type.should.be.equal('knight');
            jboard.board[2][2].piece.color.should.be.equal('white');

        })

        it('check square e4 after setup', () => {

            jboard._setUpPiece(4, 3, 'rook', 'black');
            jboard.board[4][3].piece.type.should.be.equal('rook');
            jboard.board[4][3].piece.color.should.be.equal('black');

        })

    })
    
    /*
     *   SQUARE GETTERS
     */

    describe('getSquareColor', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {

            expect(jboard.getSquareColor(0, 8)).to.be.null;
            expect(jboard.getSquareColor(8, 0)).to.be.null;
            expect(jboard.getSquareColor(-1, 0)).to.be.null;
            expect(jboard.getSquareColor(0, -1)).to.be.null;

        })

        it('return "black" for (0, 0), etc', () => {

            jboard.getSquareColor(0, 0).should.be.equal('black');
            jboard.getSquareColor(0, 2).should.be.equal('black');

            jboard.getSquareColor(1, 1).should.be.equal('black');
            jboard.getSquareColor(7, 7).should.be.equal('black');

            jboard.getSquareColor(5, 7).should.be.equal('black');
            jboard.getSquareColor(3, 7).should.be.equal('black');

        })

        it('return "white" for (0, 1), etc', () => {

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
     *   SQUARE SETTERS
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
     *   EN PASSANT
     */

    describe('_checkEnPassant', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {

            /*
             *   !!! ADD SOMETHING !!!
             */

        })

    })

    describe('_getEnPassant', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {

            /*
             *   !!! ADD SOMETHING !!!
             */

        })

    })

    describe('_setEnPassant', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {

            /*
             *   !!! ADD SOMETHING !!!
             */

        })

    })

    describe('_isEnPassant', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {

            /*
             *   !!! ADD SOMETHING !!!
             */

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
     *   MARK MOVES
     */

    describe('_resetMarks', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('reset marked square', () => {

            /*
             *   !!! ADD SOMETHING !!!
             */

        })
    })

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
     *   DO MOVE
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
     *   CHECK MOVE
     */

    describe('_checkMove', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;

        })

        beforeEach(() => {
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return false if arguments aren\'t correct', () => {

            expect(jboard._checkMove(0, 5, 8, 7)).to.be.null;
            expect(jboard._checkMove(0, -1, 7, 7)).to.be.null;
            expect(jboard._checkMove(0, 0, 6, 9)).to.be.null;
            expect(jboard._checkMove(10, 8, 18, 8)).to.be.null;

        })

        it('return false if there is no piece on start square', () => {

            expect(jboard._checkMove(0, 2, 4, 3)).to.be.null;
            expect(jboard._checkMove(3, 2, 7, 7)).to.be.null;
            expect(jboard._checkMove(6, 7, 4, 6)).to.be.null;
            expect(jboard._checkMove(5, 5, 2, 0)).to.be.null;

        })

        it('return true if move is legal', () => {

            expect(jboard._checkMove(4, 1, 4, 3)).to.be.true;
            expect(jboard._checkMove(2, 4, 2, 3)).to.be.true;
            expect(jboard._checkMove(6, 6, 6, 5)).to.be.true;
            expect(jboard._checkMove(0, 1, 0, 3)).to.be.true;

        })

        it('return false if move is illegal', () => {

            expect(jboard._checkMove(5, 6, 5, 5)).to.be.false;

        })
    })

    /*
     *   GET PAWN MOVES
     */

    describe('_getMovesPawn', () => {

        let jboard;

        before(() => {

            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);

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
     *   GET KNIGHT MOVES
     */

    describe('_getMovesKnight', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
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
     *   GET KING MOVES
     */

    describe('_getMovesKing', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(CASTLING_POSITION);
        })

        it('return two squares for white king', () => {

            let moves = jboard._getMovesKing(4, 0);

            expect(moves[0].file).to.be.equal(4);
            expect(moves[0].rank).to.be.equal(1);

            expect(moves[1].file).to.be.equal(5);
            expect(moves[1].rank).to.be.equal(0);

            expect(moves[2].file).to.be.equal(3);
            expect(moves[2].rank).to.be.equal(0);

            expect(moves[3].file).to.be.equal(3);
            expect(moves[3].rank).to.be.equal(1);

            expect(moves[4]).to.be.undefined;

        })

    })

    /*
     *   GET ROOK MOVES
     */

    describe('_getMovesRook', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
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
     *   GET BISHOP MOVES
     */

    describe('_getMovesBishop', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(TEST_POSITION);
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
     *   GET PIECE MOVES
     */

    describe('_getMovesPiece', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {

            /*
             *   !!! ADD SOMETHING !!!
             */

        })

    })

    describe('_getAttackedSquares', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(CASTLING_POSITION);
        })

        it('return squares, which are attacked by bishop move', () => {

            let square = jboard._getAttackedSquares('bishop', 'black', 1, 7);

            expect(square[0].file).to.be.equal(2);
            expect(square[0].rank).to.be.equal(6);

            expect(square[1].file).to.be.equal(3);
            expect(square[1].rank).to.be.equal(5);

            expect(square[2]).to.be.undefined;

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

    /*
     *   SERVICES
     */

    describe('_pushMove', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {

            /*
             *   !!! ADD SOMETHING !!!
             */

        })

    })

    describe('_isFriend', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {

            /*
             *   !!! ADD SOMETHING !!!
             */

        })

    })

    describe('_isFoe', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        it('return null if arguments aren\'t correct', () => {

            /*
             *   !!! ADD SOMETHING !!!
             */

        })

    })

    describe('_isSquareAttacked', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(CASTLING_POSITION);
        })

        it('return false if square isn\'t correct', () => {

            expect(jboard._isSquareAttacked(0, 8)).to.be.null;
            expect(jboard._isSquareAttacked(8, 0)).to.be.null;
            expect(jboard._isSquareAttacked(-1, 0)).to.be.null;
            expect(jboard._isSquareAttacked(0, -1)).to.be.null;

        })

        it('return true if square is attacked', () => {

            jboard._isSquareAttacked('white', 2, 2).should.be.true;
            jboard._isSquareAttacked('white', 2, 7).should.be.true;
            jboard._isSquareAttacked('black', 4, 6).should.be.true;
            jboard._isSquareAttacked('black', 5, 7).should.be.true;

            jboard._isSquareAttacked('white', 0, 5).should.be.true;
            jboard._isSquareAttacked('white', 1, 5).should.be.true;
            jboard._isSquareAttacked('black', 3, 2).should.be.true;
            jboard._isSquareAttacked('black', 5, 2).should.be.true;

        })

        it('return true if square isn\'t attacked', () => {

            jboard._isSquareAttacked('black', 0, 3).should.be.false;
            jboard._isSquareAttacked('black', 6, 3).should.be.false;
            jboard._isSquareAttacked('white', 6, 2).should.be.false;
            jboard._isSquareAttacked('white', 1, 0).should.be.false;

        })

    })

    describe('_isSquareAttackedByPawn', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(CASTLING_POSITION);
        })

        it('return false if square isn\'t correct', () => {

            expect(jboard._isSquareAttackedByPawn(0, 8)).to.be.null;
            expect(jboard._isSquareAttackedByPawn(8, 0)).to.be.null;
            expect(jboard._isSquareAttackedByPawn(-1, 0)).to.be.null;
            expect(jboard._isSquareAttackedByPawn(0, -1)).to.be.null;

        })

        it('return true if square is attacked by pawn', () => {

            jboard._isSquareAttackedByPawn('white', 0, 5).should.be.true;
            jboard._isSquareAttackedByPawn('white', 1, 5).should.be.true;
            jboard._isSquareAttackedByPawn('black', 3, 2).should.be.true;
            jboard._isSquareAttackedByPawn('black', 5, 2).should.be.true;

        })

        it('return false if square isn\'t attacked by pawn', () => {

            jboard._isSquareAttackedByPawn('white', 0, 4).should.be.false;
            jboard._isSquareAttackedByPawn('white', 1, 4).should.be.false;
            jboard._isSquareAttackedByPawn('black', 3, 3).should.be.false;
            jboard._isSquareAttackedByPawn('black', 5, 3).should.be.false;

        })

    })

    describe('_isCheck', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
        })

        beforeEach(() => {
            jboard.setUpPosition(TEST_POSITION);
        })

        it('return false if square isn\'t correct', () => {

            expect(jboard._isCheck('red')).to.be.null;
            expect(jboard._isCheck('green')).to.be.null;

        })

        it('both kings are not in check', () => {

            expect(jboard._isCheck('white')).to.be.false;
            expect(jboard._isCheck('black')).to.be.false;

        })

        it('white king is in check by queen', () => {

            jboard._doMove(3, 3, 5, 1);
            expect(jboard._isCheck('white')).to.be.true;

        })

        it('white king is in discovered check by bishop', () => {

            jboard._doMove(2, 2, 3, 5);
            expect(jboard._isCheck('white')).to.be.true;

        })

        it('black king is in check by pawn', () => {

            jboard._doMove(3, 5, 3, 6);
            expect(jboard._isCheck('black')).to.be.true;

        })

    })

    describe('_getKing', () => {

        let jboard;

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(CASTLING_POSITION);
        })

        it('return false if square isn\'t correct', () => {

            expect(jboard._getKing('red')).to.be.null;
            expect(jboard._getKing('green')).to.be.null;

        })

        it('return white king position', () => {

            let square = jboard._getKing('white');

            expect(square.file).to.be.equal(4);
            expect(square.rank).to.be.equal(0);

        })

        it('return black king position', () => {

            let square = jboard._getKing('black');

            expect(square.file).to.be.equal(4);
            expect(square.rank).to.be.equal(7);

        })

    })

    describe('_cloneBoard', () => {

        let jboard;
        let newBoard

        before(() => {
            jboard = new JBoard;
            jboard.setUpPosition(CASTLING_POSITION);
            newBoard = jboard._cloneBoard(jboard);
        })

        it('check white rook position on new board', () => {
            expect(newBoard.getPieceType(0, 0)).to.be.equal('rook');
        })

        it('check white rook position on new board after move on source board', () => {
            expect(jboard.getPieceType(0, 0)).to.be.equal('rook');
            jboard._doMove(0, 0, 1, 0);
            expect(jboard.getPieceType(0, 0)).to.be.null;
            expect(newBoard.getPieceType(0, 0)).to.be.equal('rook');
        })

        it('check black rook position on source board after move on new board', () => {
            expect(newBoard.getPieceType(0, 7)).to.be.equal('rook');
            newBoard._doMove(0, 7, 1, 7);
            expect(newBoard.getPieceType(0, 7)).to.be.null;
            expect(jboard.getPieceType(0, 7)).to.be.equal('rook');
        })

    })

})