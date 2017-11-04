/* eslint-disable no-unused-expressions */
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import JBoard from '../../../dev/app/lib/jboard/jboard';
import * as attack from '../../../dev/app/lib/jboard/attack';

describe('attack', () => {
  const CASTLING_POSITION = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R w KQkq - 0 1';

  describe('getAttackedSquares', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return squares, which are attacked by bishop move', () => {
      const square = attack.getAttackedSquares(jboard.board, 3, 2, 1, 7);

      expect(square[0].file).to.be.equal(2);
      expect(square[0].rank).to.be.equal(6);

      expect(square[1].file).to.be.equal(3);
      expect(square[1].rank).to.be.equal(5);

      expect(square[2]).to.be.undefined;
    });
  });

  describe('isSquareAttacked', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return true if square is attacked', () => {
      expect(attack.isSquareAttacked(jboard.board, 1, 2, 2)).to.be.true;
      expect(attack.isSquareAttacked(jboard.board, 1, 2, 7)).to.be.true;
      expect(attack.isSquareAttacked(jboard.board, 2, 4, 6)).to.be.true;
      expect(attack.isSquareAttacked(jboard.board, 2, 5, 7)).to.be.true;

      expect(attack.isSquareAttacked(jboard.board, 1, 0, 5)).to.be.true;
      expect(attack.isSquareAttacked(jboard.board, 1, 1, 5)).to.be.true;
      expect(attack.isSquareAttacked(jboard.board, 2, 3, 2)).to.be.true;
      expect(attack.isSquareAttacked(jboard.board, 2, 5, 2)).to.be.true;
    });

    it('return true if square isn\'t attacked', () => {
      expect(attack.isSquareAttacked(jboard.board, 2, 0, 3)).to.be.false;
      expect(attack.isSquareAttacked(jboard.board, 2, 6, 3)).to.be.false;
      expect(attack.isSquareAttacked(jboard.board, 1, 6, 2)).to.be.false;
      expect(attack.isSquareAttacked(jboard.board, 1, 1, 0)).to.be.false;
    });
  });

  describe('isSquareAttackedByPawn', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return true if square is attacked by pawn', () => {
      expect(attack.isSquareAttackedByPawn(jboard.board, 1, 0, 5)).to.be.true;
      expect(attack.isSquareAttackedByPawn(jboard.board, 1, 1, 5)).to.be.true;
      expect(attack.isSquareAttackedByPawn(jboard.board, 2, 3, 2)).to.be.true;
      expect(attack.isSquareAttackedByPawn(jboard.board, 2, 5, 2)).to.be.true;
    });

    it('return false if square isn\'t attacked by pawn', () => {
      expect(attack.isSquareAttackedByPawn(jboard.board, 1, 0, 4)).to.be.false;
      expect(attack.isSquareAttackedByPawn(jboard.board, 1, 1, 4)).to.be.false;
      expect(attack.isSquareAttackedByPawn(jboard.board, 2, 3, 3)).to.be.false;
      expect(attack.isSquareAttackedByPawn(jboard.board, 2, 5, 3)).to.be.false;
    });
  });
});
