/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { isInCheck, isCheckmate } from '../../../dev/app/lib/jboard/utils';

describe('Utils', () => {
  describe('isInCheck', () => {
    it('white kings is not in check', () => {
      const fen = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R b KQkq - 0 1';
      expect(isInCheck(fen, 2)).to.be.false;
    });

    it('white king in check by queen', () => {
      const fen = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/5P1p/2n2NP1/PP2P2P/RNBqK2R w KQkq - 0 1';
      expect(isInCheck(fen, 1)).to.be.true;
    });

    it('white king in check by bishop', () => {
      const fen = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/5NP1/PP2P2P/RNBnK2R w KQkq - 0 1';
      expect(isInCheck(fen, 1)).to.be.true;
    });

    it('black king in check by pawn', () => {
      const fen = 'r3k2r/pp1P1pp1/b7/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNB1K2R b KQkq - 0 1';
      expect(isInCheck(fen, 2)).to.be.true;
    });
  });

  describe('isCheckmate', () => {
    it('return true if there\'s checkmate', () => {
      expect(isCheckmate('6rk/5Npp/8/8/8/8/8/4K3 b - - 0 1')).to.be.true;
    });

    it('return true if there\'s checkmate', () => {
      expect(isCheckmate('6rk/5NpP/8/8/8/8/8/4K2R b - - 0 1')).to.be.true;
    });

    it('return true if there\'s checkmate', () => {
      expect(isCheckmate('6rk/5Np1/7R/8/8/8/8/4K3 b - - 0 1')).to.be.true;
    });

    it('return true if there\'s checkmate', () => {
      expect(isCheckmate('6rk/6p1/7R/8/8/8/8/B3K3 b - - 0 1')).to.be.true;
    });

    it('return true if there\'s checkmate', () => {
      expect(isCheckmate('6rk/8/5r1Q/8/8/8/8/B3K3 b - - 0 1')).to.be.true;
    });

    it('return false if theresn\'t checkmate', () => {
      expect(isCheckmate('6rk/5NpP/8/8/8/8/8/4K3 b - - 0 1')).to.be.false;
    });

    it('return false if theresn\'t checkmate', () => {
      expect(isCheckmate('6rk/6p1/7R/8/8/8/8/4K3 b - - 0 1')).to.be.false;
    });

    it('return false if theresn\'t checkmate', () => {
      expect(isCheckmate('6rk/6p1/5p1R/8/8/8/8/B3K3 b - - 0 1')).to.be.false;
    });

    it('return false if theresn\'t checkmate', () => {
      expect(isCheckmate('6rk/8/5r1R/8/8/8/8/B3K3 b - - 0 1')).to.be.false;
    });

    it('return false if theresn\'t checkmate', () => {
      expect(isCheckmate('6rk/6b1/5r1Q/8/8/8/8/B3K3 b - - 0 1')).to.be.false;
    });
  });
});
