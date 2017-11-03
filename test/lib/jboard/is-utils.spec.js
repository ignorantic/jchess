/* eslint-disable no-unused-expressions */
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import JBoard from '../../../dev/lib/jboard/jboard';
import * as is from '../../../dev/lib/jboard/is-utils';

describe('is-utils', () => {
  describe('isEnPassant', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN('4k3/p2pppp1/1p6/1P1P1P2/P1p4p/8/3PP1PP/R3K3 w - - 0 1');
    });

    it('isEnPassant return false or true', () => {
      expect(is.isEnPassant({ file: 6, rank: 2 }, jboard.enPassant)).to.be.false;
      jboard.handleMove({ file: 6, rank: 1 }, { file: 6, rank: 3 });
      expect(is.isEnPassant({ file: 6, rank: 2 }, jboard.enPassant)).to.be.true;
      expect(is.isEnPassant({ file: 6, rank: 5 }, jboard.enPassant)).to.be.false;
      jboard.handleMove({ file: 6, rank: 6 }, { file: 6, rank: 4 });
      expect(is.isEnPassant({ file: 6, rank: 5 }, jboard.enPassant)).to.be.true;
      jboard.handleMove({ file: 5, rank: 4 }, { file: 6, rank: 5 });
      expect(is.isEnPassant({ file: 6, rank: 5 }, jboard.enPassant)).to.be.false;
      jboard.handleMove({ file: 4, rank: 6 }, { file: 4, rank: 4 });
      expect(is.isEnPassant({ file: 4, rank: 5 }, jboard.enPassant)).to.be.true;
      jboard.handleMove({ file: 0, rank: 0 }, { file: 1, rank: 0 });
      expect(is.isEnPassant({ file: 4, rank: 5 }, jboard.enPassant)).to.be.false;
    });
  });

  describe('isSquare', () => {
    it('return false if square isn\'t correct', () => {
      expect(is.isSquare(0)).to.be.false;
      expect(is.isSquare(8)).to.be.false;
      expect(is.isSquare(0, null)).to.be.false;
      expect(is.isSquare(null, 5)).to.be.false;
      expect(is.isSquare(0, undefined)).to.be.false;
      expect(is.isSquare(undefined, 2)).to.be.false;
      expect(is.isSquare(0, 8)).to.be.false;
      expect(is.isSquare(8, 0)).to.be.false;
      expect(is.isSquare(-1, 0)).to.be.false;
      expect(is.isSquare(0, -1)).to.be.false;
      expect(is.isSquare({ file: 0, rank: 8 })).to.be.false;
      expect(is.isSquare({ file: 8, rank: 5 })).to.be.false;
      expect(is.isSquare({ file: 2, rank: 8 })).to.be.false;
      expect(is.isSquare({ file: 3, rank: 9 })).to.be.false;
      expect(is.isSquare({ file: null, rank: 9 })).to.be.false;
      expect(is.isSquare({ file: 3, rank: undefined })).to.be.false;
    });

    it('return true if square is correct', () => {
      expect(is.isSquare(0, 0)).to.be.true;
      expect(is.isSquare(7, 7)).to.be.true;
      expect(is.isSquare(0, 3)).to.be.true;
      expect(is.isSquare(3, 5)).to.be.true;
      expect(is.isSquare({ file: 1, rank: 7 })).to.be.true;
      expect(is.isSquare({ file: 5, rank: 4 })).to.be.true;
      expect(is.isSquare({ file: 6, rank: 2 })).to.be.true;
      expect(is.isSquare({ file: 7, rank: 0 })).to.be.true;
    });
  });
});
