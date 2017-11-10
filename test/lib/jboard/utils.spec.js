/* eslint-disable no-unused-expressions */
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import JBoard from '../../../dev/app/lib/jboard/jboard';
import {
  isSquare, isEnPassant, getAttackedSquares, isSquareAttacked, isInCheck,
} from '../../../dev/app/lib/jboard/utils';

describe('Utils', () => {
  const CASTLING_POSITION = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R w KQkq - 0 1';

  describe('isEnPassant', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN('4k3/p2pppp1/1p6/1P1P1P2/P1p4p/8/3PP1PP/R3K3 w - - 0 1');
    });

    it('isEnPassant return false or true', () => {
      expect(isEnPassant({ file: 6, rank: 2 }, jboard.enPassant)).to.be.false;
      jboard.handleMove({ file: 6, rank: 1 }, { file: 6, rank: 3 });
      expect(isEnPassant({ file: 6, rank: 2 }, jboard.enPassant)).to.be.true;
      expect(isEnPassant({ file: 6, rank: 5 }, jboard.enPassant)).to.be.false;
      jboard.handleMove({ file: 6, rank: 6 }, { file: 6, rank: 4 });
      expect(isEnPassant({ file: 6, rank: 5 }, jboard.enPassant)).to.be.true;
      jboard.handleMove({ file: 5, rank: 4 }, { file: 6, rank: 5 });
      expect(isEnPassant({ file: 6, rank: 5 }, jboard.enPassant)).to.be.false;
      jboard.handleMove({ file: 4, rank: 6 }, { file: 4, rank: 4 });
      expect(isEnPassant({ file: 4, rank: 5 }, jboard.enPassant)).to.be.true;
      jboard.handleMove({ file: 0, rank: 0 }, { file: 1, rank: 0 });
      expect(isEnPassant({ file: 4, rank: 5 }, jboard.enPassant)).to.be.false;
    });
  });

  describe('isSquare', () => {
    it('return false if square isn\'t correct', () => {
      expect(isSquare(0)).to.be.false;
      expect(isSquare(8)).to.be.false;
      expect(isSquare(0, null)).to.be.false;
      expect(isSquare(null, 5)).to.be.false;
      expect(isSquare(0, undefined)).to.be.false;
      expect(isSquare(undefined, 2)).to.be.false;
      expect(isSquare(0, 8)).to.be.false;
      expect(isSquare(-1, 0)).to.be.false;
      expect(isSquare({ file: 8, rank: 5 })).to.be.false;
      expect(isSquare({ file: 2, rank: 8 })).to.be.false;
      expect(isSquare({ file: null, rank: 9 })).to.be.false;
      expect(isSquare({ file: 3, rank: undefined })).to.be.false;
    });

    it('return true if square utils correct', () => {
      expect(isSquare(0, 0)).to.be.true;
      expect(isSquare(3, 5)).to.be.true;
      expect(isSquare({ file: 5, rank: 4 })).to.be.true;
      expect(isSquare({ file: 6, rank: 2 })).to.be.true;
    });
  });

  describe('getAttackedSquares', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return squares, which are attacked by bishop move', () => {
      const square = getAttackedSquares(jboard.board, 3, 2, 1, 7);

      expect(square[0].file).to.be.equal(2);
      expect(square[0].rank).to.be.equal(6);

      expect(square[1].file).to.be.equal(3);
      expect(square[1].rank).to.be.equal(5);

      expect(square[2]).to.be.undefined;
    });

    it('return squares, which are attacked by knight move', () => {
      const square = getAttackedSquares(jboard.board, 2, 1, 4, 2);

      expect(square[0].file).to.be.equal(5);
      expect(square[0].rank).to.be.equal(4);

      expect(square[1].file).to.be.equal(6);
      expect(square[1].rank).to.be.equal(3);

      expect(square[2].file).to.be.equal(5);
      expect(square[2].rank).to.be.equal(0);

      expect(square[3].file).to.be.equal(3);
      expect(square[3].rank).to.be.equal(0);

      expect(square[4].file).to.be.equal(2);
      expect(square[4].rank).to.be.equal(3);

      expect(square[5].file).to.be.equal(3);
      expect(square[5].rank).to.be.equal(4);

      expect(square[6]).to.be.undefined;
    });
  });

  describe('isSquareAttacked', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return true if square utils attacked', () => {
      expect(isSquareAttacked(jboard.board, 1, 2, 2)).to.be.true;
      expect(isSquareAttacked(jboard.board, 2, 4, 6)).to.be.true;

      expect(isSquareAttacked(jboard.board, 1, 0, 5)).to.be.true;
      expect(isSquareAttacked(jboard.board, 2, 5, 2)).to.be.true;
    });

    it('return true if square isn\'t attacked', () => {
      expect(isSquareAttacked(jboard.board, 1, 6, 2)).to.be.false;
      expect(isSquareAttacked(jboard.board, 1, 1, 0)).to.be.false;
    });
  });

  describe('isInCheck', () => {
    it('white kings is not in check', () => {
      const fen = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R b KQkq - 0 1';
      expect(isInCheck(fen)).to.be.false;
    });

    it('white king in check by queen', () => {
      const fen = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/5P1p/2n2NP1/PP2P2P/RNBqK2R w KQkq - 0 1';
      expect(isInCheck(fen)).to.be.true;
    });

    it('white king in check by bishop', () => {
      const fen = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/5NP1/PP2P2P/RNBnK2R w KQkq - 0 1';
      expect(isInCheck(fen)).to.be.true;
    });

    it('black king in check by pawn', () => {
      const fen = 'r3k2r/pp1P1pp1/b7/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNB1K2R b KQkq - 0 1';
      expect(isInCheck(fen)).to.be.true;
    });
  });
});
