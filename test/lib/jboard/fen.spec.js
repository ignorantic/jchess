/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { parseFENRank, parseFENBoard, parseFENEnPassant } from '../../../dev/app/lib/jboard/fen';

describe('FEN utils', () => {
  describe('parseFENRank', () => {
    it('return null for too long string', () => {
      expect(parseFENRank('rnbqkbnrr')).to.be.null;
    });

    it('return null for incorrect string', () => {
      expect(parseFENRank('rnbqk5nr')).to.be.null;
      expect(parseFENRank('77b7nr')).to.be.null;
      expect(parseFENRank('r9knr')).to.be.null;
      expect(parseFENRank('90')).to.be.null;
      expect(parseFENRank('r7000r')).to.be.null;
      expect(parseFENRank('rnfqkbnr')).to.be.null;
    });

    it('return array for correct string', () => {
      expect(parseFENRank('rnbqk1nr')[0].type).to.be.equal(1);
      expect(parseFENRank('rnbqk1nr')[0].color).to.be.equal(2);
      expect(parseFENRank('rn1qk1nr')[7].type).to.be.equal(1);
      expect(parseFENRank('rn1qk1nr')[7].color).to.be.equal(2);
      expect(parseFENRank('rnbq2nr')[1].type).to.be.equal(2);
      expect(parseFENRank('rnbq2nr')[1].color).to.be.equal(2);
      expect(parseFENRank('rnbqk1nr')[6].type).to.be.equal(2);
      expect(parseFENRank('rnbqk1nr')[6].color).to.be.equal(2);
      expect(parseFENRank('1nbqk1nr')[3].type).to.be.equal(4);
      expect(parseFENRank('r1Bq4')[2].type).to.be.equal(3);
      expect(parseFENRank('r1Bq4')[2].color).to.be.equal(1);
    });
  });

  describe('parseFENEnPassant', () => {
    it('return null for "-"', () => {
      const board = parseFENBoard([
        'R3K3', '3PP2P', '6P1', 'P1p4p', '1P1Pp3', '1p6', 'p2p1pp1', '4k3',
      ]);
      expect(parseFENEnPassant('-', board)).to.be.null;
    });

    it('return { file: 4, rank: 5 } for "e6"', () => {
      const board = parseFENBoard([
        'R3K3', '3PP2P', '6P1', 'P1p4p', '1P1Pp3', '1p6', 'p2p1pp1', '4k3',
      ]);
      const enPassant = parseFENEnPassant('e6', board);
      expect(enPassant.file).to.be.equal(4);
      expect(enPassant.rank).to.be.equal(5);
    });
  });
});
