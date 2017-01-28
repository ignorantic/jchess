
/*
 *     jsnautic.spec.js
 *     2015-2016 by Andrii Sorokin
 */

import JChess from './jchess';
import {describe, it, before} from 'mocha';

describe('jChess', () => {

    let INITIAL_POSITION = [
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
            file: 2,
            rank: 2,
            piece: {
                type: 'knight',
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
        }
    ];

    /*
     *   INITIALIZATION
     */

    describe('constructor', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
        })

        it('check size of board' , () => {
            jchess.board.length.should.be.equal(8);
            jchess.board[0].length.should.be.equal(8);
            jchess.board[7].length.should.be.equal(8);
        })

        it('check square colors' , () => {
            jchess.board[0][0].color.should.be.equal('black');
            jchess.board[0][7].color.should.be.equal('white');
            jchess.board[7][0].color.should.be.equal('white');
            jchess.board[7][7].color.should.be.equal('black');
        })
    })

    /*
     *   SETUP
     */

    describe('setUpInitial', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
            jchess.setUpInitial();
        })

        it('check rooks' , () => {
            jchess.board[0][0].piece.type.should.be.equal('rook');
            jchess.board[0][0].piece.color.should.be.equal('white');
            jchess.board[7][0].piece.type.should.be.equal('rook');
            jchess.board[7][0].piece.color.should.be.equal('white');
            jchess.board[0][7].piece.type.should.be.equal('rook');
            jchess.board[0][7].piece.color.should.be.equal('black');
            jchess.board[7][7].piece.type.should.be.equal('rook');
            jchess.board[7][7].piece.color.should.be.equal('black');
        })

        it('check knights' , () => {
            jchess.board[1][0].piece.type.should.be.equal('knight');
            jchess.board[1][0].piece.color.should.be.equal('white');
            jchess.board[6][0].piece.type.should.be.equal('knight');
            jchess.board[6][0].piece.color.should.be.equal('white');
            jchess.board[1][7].piece.type.should.be.equal('knight');
            jchess.board[1][7].piece.color.should.be.equal('black');
            jchess.board[6][7].piece.type.should.be.equal('knight');
            jchess.board[6][7].piece.color.should.be.equal('black');
        })

        it('check bishops' , () => {
            jchess.board[2][0].piece.type.should.be.equal('bishop');
            jchess.board[2][0].piece.color.should.be.equal('white');
            jchess.board[5][0].piece.type.should.be.equal('bishop');
            jchess.board[5][0].piece.color.should.be.equal('white');
            jchess.board[2][7].piece.type.should.be.equal('bishop');
            jchess.board[2][7].piece.color.should.be.equal('black');
            jchess.board[5][7].piece.type.should.be.equal('bishop');
            jchess.board[5][7].piece.color.should.be.equal('black');
        })

        it('check queens' , () => {
            jchess.board[3][0].piece.type.should.be.equal('queen');
            jchess.board[3][0].piece.color.should.be.equal('white');
            jchess.board[3][7].piece.type.should.be.equal('queen');
            jchess.board[3][7].piece.color.should.be.equal('black');
        })

        it('check kings' , () => {
            jchess.board[4][0].piece.type.should.be.equal('king');
            jchess.board[4][0].piece.color.should.be.equal('white');
            jchess.board[4][7].piece.type.should.be.equal('king');
            jchess.board[4][7].piece.color.should.be.equal('black');
        })

        it('check white pawns' , () => {
            jchess.board[0][1].piece.type.should.be.equal('pawn');
            jchess.board[7][1].piece.color.should.be.equal('white');
        })

        it('check black pawns' , () => {
            jchess.board[0][6].piece.type.should.be.equal('pawn');
            jchess.board[7][6].piece.color.should.be.equal('black');
        })
    })

    describe('setUpPosition', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
            jchess.setUpPosition([
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
            jchess.board[0][1].piece.type.should.be.equal('pawn');
            jchess.board[0][1].piece.color.should.be.equal('white');
        })

        it('check knight' , () => {
            jchess.board[1][2].piece.type.should.be.equal('knight');
            jchess.board[1][2].piece.color.should.be.equal('black');
        })

        it('check queen' , () => {
            jchess.board[5][7].piece.type.should.be.equal('queen');
            jchess.board[5][7].piece.color.should.be.equal('black');
        })
    })

    /*
     *   GETTER
     */

    describe('getSquareColor', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
        })

        it('return null if arguments aren\'t correct' , () => {
            expect(jchess.getSquareColor(0, 8)).to.be.null;
            expect(jchess.getSquareColor(8, 0)).to.be.null;
            expect(jchess.getSquareColor(-1, 0)).to.be.null;
            expect(jchess.getSquareColor(0, -1)).to.be.null;
        })

        it('return "black" for (0, 0), etc' , () => {
            jchess.getSquareColor(0, 0).should.be.equal('black');
            jchess.getSquareColor(0, 2).should.be.equal('black');
            jchess.getSquareColor(1, 1).should.be.equal('black');
            jchess.getSquareColor(7, 7).should.be.equal('black');
            jchess.getSquareColor(5, 7).should.be.equal('black');
            jchess.getSquareColor(3, 7).should.be.equal('black');
        })

        it('return "white" for (0, 1), etc' , () => {
            jchess.getSquareColor(0, 1).should.be.equal('white');
            jchess.getSquareColor(0, 3).should.be.equal('white');
            jchess.getSquareColor(1, 2).should.be.equal('white');
            jchess.getSquareColor(0, 7).should.be.equal('white');
            jchess.getSquareColor(2, 7).should.be.equal('white');
            jchess.getSquareColor(6, 7).should.be.equal('white');
        })
    })

    describe('getPieceType', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
            jchess.setUpInitial();
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jchess.getPieceType(0, 8)).to.be.null;
            expect(jchess.getPieceType(8, 0)).to.be.null;
            expect(jchess.getPieceType(-1, 0)).to.be.null;
            expect(jchess.getPieceType(0, -1)).to.be.null;
        })

        it('return piece type for (0, 0), etc', () => {
            expect(jchess.getPieceType(0, 2)).to.be.null;
            expect(jchess.getPieceType(4, 4)).to.be.null;
            jchess.getPieceType(0, 0).should.be.equal('rook');
            jchess.getPieceType(7, 7).should.be.equal('rook');
            jchess.getPieceType(1, 0).should.be.equal('knight');
            jchess.getPieceType(6, 7).should.be.equal('knight');
            jchess.getPieceType(5, 7).should.be.equal('bishop');
            jchess.getPieceType(1, 1).should.be.equal('pawn');
            jchess.getPieceType(6, 6).should.be.equal('pawn');
            jchess.getPieceType(3, 0).should.be.equal('queen');
            jchess.getPieceType(4, 7).should.be.equal('king');
        })
    })

    describe('getPieceColor', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
            jchess.setUpInitial();
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jchess.getPieceColor(0, 8)).to.be.null;
            expect(jchess.getPieceColor(8, 0)).to.be.null;
            expect(jchess.getPieceColor(-1, 0)).to.be.null;
            expect(jchess.getPieceColor(0, -1)).to.be.null;
        })

        it('return piece color for (0, 0), etc', () => {
            expect(jchess.getPieceType(1, 2)).to.be.null;
            expect(jchess.getPieceType(3, 5)).to.be.null;
            jchess.getPieceColor(0, 1).should.be.equal('white');
            jchess.getPieceColor(1, 0).should.be.equal('white');
            jchess.getPieceColor(2, 0).should.be.equal('white');
            jchess.getPieceColor(2, 7).should.be.equal('black');
            jchess.getPieceColor(3, 0).should.be.equal('white');
            jchess.getPieceColor(3, 7).should.be.equal('black');
            jchess.getPieceColor(4, 1).should.be.equal('white');
            jchess.getPieceColor(5, 6).should.be.equal('black');
            jchess.getPieceColor(6, 7).should.be.equal('black');
            jchess.getPieceColor(7, 6).should.be.equal('black');
        })
    })

    /*
     *   PICK
     */

    describe('pickSquare', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
            jchess.setUpPosition(INITIAL_POSITION);
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jchess.pickSquare(0, 8)).to.be.null;
            expect(jchess.pickSquare(8, 0)).to.be.null;
            expect(jchess.pickSquare(-1, 0)).to.be.null;
            expect(jchess.pickSquare(0, -1)).to.be.null;
        })

        it('return true if arguments are correct', () => {
            expect(jchess.pickSquare(0, 0)).to.be.true;
            expect(jchess.pickSquare(1, 5)).to.be.true;
            expect(jchess.pickSquare(5, 6)).to.be.true;
            expect(jchess.pickSquare(7, 7)).to.be.true;
        })

        it('check selected square', () => {
            jchess.pickSquare(1, 5);
            jchess.isSquareSelected(1, 5).should.be.true;
            jchess.isSquareSelected(7, 7).should.be.false;
            jchess.pickSquare(6, 7);
            jchess.isSquareSelected(5, 1).should.be.false;
            jchess.isSquareSelected(6, 7).should.be.true;
        })

        it('check marked square', () => {
            jchess.pickSquare(0, 1);
            jchess.isSquareMarked(0, 1).should.be.false;
            jchess.isSquareMarked(0, 2).should.be.true;
            jchess.isSquareMarked(0, 3).should.be.true;
            jchess.isSquareMarked(0, 4).should.be.false;
            jchess.isSquareMarked(1, 2).should.be.false;
        })
    })

    /*
     *   SELECT
     */

    describe('_resetSelect', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
            jchess.pickSquare(4, 4);
        })

        it('reset selected square', () => {
            expect(jchess.isSquareSelected(4, 4)).to.be.true;
            expect(jchess.isSquareSelected(4, 5)).to.be.false;
            jchess._resetSelect(jchess.board);
            expect(jchess.isSquareSelected(4, 4)).to.be.false;
            expect(jchess.isSquareSelected(4, 5)).to.be.false;
        })
    })

    describe('isSquareSelected', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jchess.isSquareSelected(0, 8)).to.be.null;
            expect(jchess.isSquareSelected(8, 0)).to.be.null;
            expect(jchess.isSquareSelected(-1, 0)).to.be.null;
            expect(jchess.isSquareSelected(0, -1)).to.be.null;
        })

        it('return true or false if arguments are correct', () => {
            jchess.pickSquare(1, 5);
            expect(jchess.isSquareSelected(0, 0)).to.be.false;
            expect(jchess.isSquareSelected(1, 5)).to.be.true;
            jchess.pickSquare(7, 7);
            expect(jchess.isSquareSelected(1, 5)).to.be.false;
            expect(jchess.isSquareSelected(7, 7)).to.be.true;
        })
    })

    /*
     *   MARK
     */

    describe('_markMoves and isSquareMarked', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
            jchess.setUpPosition(INITIAL_POSITION);
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jchess._markMoves(0, 8)).to.be.null;
            expect(jchess._markMoves(8, 0)).to.be.null;
            expect(jchess._markMoves(-1, 0)).to.be.null;
            expect(jchess._markMoves(0, -1)).to.be.null;
        })

        it('mark two squares for pawn a2', () => {
            jchess._markMoves(jchess.board, 0, 1);
            expect(jchess.isSquareMarked(0, 2)).to.be.true;
            expect(jchess.isSquareMarked(0, 3)).to.be.true;
            expect(jchess.isSquareMarked(0, 4)).to.be.false;
            expect(jchess.isSquareMarked(1, 2)).to.be.false;
        })

        it('mark only square for pawn c5', () => {
            jchess._markMoves(jchess.board, 2, 4);
            expect(jchess.isSquareMarked(2, 3)).to.be.true;
            expect(jchess.isSquareMarked(2, 2)).to.be.false;
            expect(jchess.isSquareMarked(3, 3)).to.be.false;
            expect(jchess.isSquareMarked(1, 3)).to.be.false;
        })

        it('mark no square for pawn d5', () => {
            jchess._markMoves(jchess.board, 3, 4);
            expect(jchess.isSquareMarked(3, 5)).to.be.false;
            expect(jchess.isSquareMarked(3, 6)).to.be.false;
            expect(jchess.isSquareMarked(2, 5)).to.be.false;
            expect(jchess.isSquareMarked(4, 5)).to.be.false;
        })

        it('mark no square for pawn f4', () => {
            jchess._markMoves(jchess.board, 5, 3);
            expect(jchess.isSquareMarked(5, 4)).to.be.false;
            expect(jchess.isSquareMarked(5, 5)).to.be.false;
            expect(jchess.isSquareMarked(4, 4)).to.be.false;
            expect(jchess.isSquareMarked(6, 4)).to.be.false;
        })
    })

    /*
     *   MARK FOR MOVE
     */

    describe('_getMovesPawn', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
            jchess.setUpPosition(INITIAL_POSITION);
        })

        it('return null if arguments aren\'t correct', () => {
            expect(jchess._getMovesPawn(jchess.board, 0, 8)).to.be.null;
            expect(jchess._getMovesPawn(jchess.board, 8, 0)).to.be.null;
            expect(jchess._getMovesPawn(jchess.board, -1, 0)).to.be.null;
            expect(jchess._getMovesPawn(jchess.board, 0, -1)).to.be.null;
        })

        it('return object if piece is pawn', () => {
            expect(typeof jchess._getMovesPawn(jchess.board, 1, 1)).to.be.equal('object');
            expect(typeof jchess._getMovesPawn(jchess.board, 3, 4)).to.be.equal('object');
        })

        it('return null if piece isn\'t pawn', () => {
            expect(jchess._getMovesPawn(jchess.board, 2, 2)).to.be.null;
            expect(jchess._getMovesPawn(jchess.board, 5, 4)).to.be.null;
        })

        it('return two squares for pawn a2', () => {
            let moves = jchess._getMovesPawn(jchess.board, 0, 1);
            expect(moves[0].file).to.be.equal(0);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1].file).to.be.equal(0);
            expect(moves[1].rank).to.be.equal(3);
            expect(moves[2]).to.be.undefined;
        })

        it('return two squares for pawn e2', () => {
            let moves = jchess._getMovesPawn(jchess.board, 4, 1);
            expect(moves[0].file).to.be.equal(4);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1].file).to.be.equal(4);
            expect(moves[1].rank).to.be.equal(3);
            expect(moves[2]).to.be.undefined;
        })

        it('return only square for pawn c5', () => {
            let moves = jchess._getMovesPawn(jchess.board, 2, 4);
            expect(moves[0].file).to.be.equal(2);
            expect(moves[0].rank).to.be.equal(3);
            expect(moves[1]).to.be.undefined;
        })

        it('return null for pawn d5', () => {
            let moves = jchess._getMovesPawn(jchess.board, 3, 4);
            expect(moves).to.be.null;
        })

        it('return null for pawn f4', () => {
            let moves = jchess._getMovesPawn(jchess.board, 5, 3);
            expect(moves).to.be.null;
        })

        it('return three squares for pawn b2', () => {
            let moves = jchess._getMovesPawn(jchess.board, 1, 1);
            expect(moves[0].file).to.be.equal(1);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1].file).to.be.equal(1);
            expect(moves[1].rank).to.be.equal(3);
            expect(moves[2].file).to.be.equal(2);
            expect(moves[2].rank).to.be.equal(2);
            expect(moves[3]).to.be.undefined;
        })

        it('return only square for pawn h2', () => {
            let moves = jchess._getMovesPawn(jchess.board, 7, 1);
            expect(moves[0].file).to.be.equal(7);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1]).to.be.undefined;
        })

        it('return two squares for pawn h4', () => {
            let moves = jchess._getMovesPawn(jchess.board, 7, 3);
            expect(moves[0].file).to.be.equal(7);
            expect(moves[0].rank).to.be.equal(2);
            expect(moves[1].file).to.be.equal(6);
            expect(moves[1].rank).to.be.equal(2);
            expect(moves[2]).to.be.undefined;
        })
    })

    /*
     *   MOVE
     */

    describe('_doMove', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
        })

        it('return false if square isn\'t correct', () => {

        })
    })

    /*
     *   VALIDATORS
     */

    describe('_validateSquare', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
        })

        it('return false if square isn\'t correct', () => {
            expect(jchess._validateSquare(0, 8)).to.be.false;
            expect(jchess._validateSquare(8, 0)).to.be.false;
            expect(jchess._validateSquare(-1, 0)).to.be.false;
            expect(jchess._validateSquare(0, -1)).to.be.false;
        })

        it('return true if square is correct', () => {
            expect(jchess._validateSquare(0, 0)).to.be.true;
            expect(jchess._validateSquare(7, 7)).to.be.true;
            expect(jchess._validateSquare(0, 3)).to.be.true;
            expect(jchess._validateSquare(3, 5)).to.be.true;
        })
    })
})