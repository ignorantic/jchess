
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
            jchess.getSquareColor(0, 0).color.should.be.equal('black');
            jchess.getSquareColor(0, 2).color.should.be.equal('black');
            jchess.getSquareColor(1, 1).color.should.be.equal('black');
            jchess.getSquareColor(7, 7).color.should.be.equal('black');
            jchess.getSquareColor(5, 7).color.should.be.equal('black');
            jchess.getSquareColor(3, 7).color.should.be.equal('black');
        })

        it('return "white" for (0, 1), etc' , () => {
            jchess.getSquareColor(0, 1).color.should.be.equal('white');
            jchess.getSquareColor(0, 3).color.should.be.equal('white');
            jchess.getSquareColor(1, 2).color.should.be.equal('white');
            jchess.getSquareColor(0, 7).color.should.be.equal('white');
            jchess.getSquareColor(2, 7).color.should.be.equal('white');
            jchess.getSquareColor(6, 7).color.should.be.equal('white');
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
})