/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import select from '../../../dev/app/lib/jboard/select';

describe('Move', () => {
  const TEST_POSITION = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1';
  const EN_PASSANT_POSITION = '4k3/p2p1pp1/1p6/1P1PpP2/P1p4p/8/3PP1PP/R3K3 w - e6 0 2';

  describe('select', () => {
    it('return null if arguments aren\'t correct', () => {
      expect(select('e4', TEST_POSITION)).to.be.null;
      expect(select('b7b8p')).to.be.null;
      expect(select(null)).to.be.null;
    });

    it('return object if OK', () => {
      expect(typeof select(TEST_POSITION, 4, 1)).to.be.equal('object');
      expect(typeof select(TEST_POSITION, 3, 2)).to.be.equal('object');
      expect(typeof select(TEST_POSITION, 6, 2)).to.be.equal('object');
    });

    it('check marked square', () => {
      expect(select(TEST_POSITION, 0, 1).board[0][2].marked).to.be.true;
      expect(select(TEST_POSITION, 0, 1).board[0][3].marked).to.be.true;
      expect(select(TEST_POSITION, 0, 1).board[0][4].marked).to.be.undefined;

      expect(select(TEST_POSITION, 5, 2).board[6][4].marked).to.be.true;
      expect(select(TEST_POSITION, 5, 2).board[7][3].marked).to.be.true;
      expect(select(TEST_POSITION, 5, 2).board[7][1].marked).to.be.undefined;
      expect(select(TEST_POSITION, 5, 2).board[6][0].marked).to.be.true;
      expect(select(TEST_POSITION, 5, 2).board[4][0].marked).to.be.undefined;
      expect(select(TEST_POSITION, 5, 2).board[3][1].marked).to.be.true;
      expect(select(TEST_POSITION, 5, 2).board[3][3].marked).to.be.true;
      expect(select(TEST_POSITION, 5, 2).board[4][4].marked).to.be.true;

      expect(select(TEST_POSITION, 0, 4).board[1][5].marked).to.be.undefined;
    });

    it('check marked square with en passant', () => {
      expect(select(EN_PASSANT_POSITION, 3, 4).board[3][5].marked).to.be.true;
      expect(select(EN_PASSANT_POSITION, 3, 4).board[4][5].marked).to.be.true;
      expect(select(EN_PASSANT_POSITION, 3, 4).board[2][5].marked).to.be.undefined;

      expect(select(EN_PASSANT_POSITION, 5, 4).board[5][5].marked).to.be.true;
      expect(select(EN_PASSANT_POSITION, 5, 4).board[4][5].marked).to.be.true;
      expect(select(EN_PASSANT_POSITION, 5, 4).board[6][5].marked).to.be.undefined;
    });
  });
});
