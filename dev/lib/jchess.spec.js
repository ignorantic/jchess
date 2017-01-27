
/*
 *     jsnautic.spec.js
 *     2015-2016 by Andrii Sorokin
 */

import JChess from './jchess';
import {describe, it, before} from 'mocha';

describe('jChess', () => {
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

    describe('setUpPieces', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
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

    describe('pickSquare', () => {

        let jchess;

        before(() => {
            jchess = new JChess;
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
            jchess.board[1][5].selected.should.be.equal(true);
            jchess.board[7][7].selected.should.be.equal(false);
            jchess.pickSquare(6, 7);
            jchess.board[1][5].selected.should.be.equal(false);
            jchess.board[6][7].selected.should.be.equal(true);
        })
    })

    // describe('isSquareMarked', () => {
    //
    //     let jchess;
    //
    //     before(() => {
    //         jchess = new JChess;
    //         jchess.pickSquare(1, 5);
    //         jchess.pickSquare(7, 7);
    //     })
    //
    //     it('return null if arguments aren\'t correct', () => {
    //         expect(jchess.isSquareMarked(0, 8)).to.be.null;
    //         expect(jchess.isSquareMarked(8, 0)).to.be.null;
    //         expect(jchess.isSquareMarked(-1, 0)).to.be.null;
    //         expect(jchess.isSquareMarked(0, -1)).to.be.null;
    //     })
    //
    //     it('return true or false if arguments are correct', () => {
    //         expect(jchess.isSquareMarked(0, 0)).to.be.false;
    //         expect(jchess.isSquareMarked(1, 5)).to.be.true;
    //         expect(jchess.isSquareMarked(5, 6)).to.be.false;
    //         expect(jchess.isSquareMarked(7, 7)).to.be.true;
    //     })
    // })

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
})