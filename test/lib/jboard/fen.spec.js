/* eslint-disable no-unused-expressions */
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import JBoard from '../../../dev/app/lib/jboard/jboard';
import { generateFEN, getFENEnPassant, getFENPiece, getFENCastling, getFENBoard, getFENTurn,
  parseFENRank, parseFENBoard, parseFENEnPassant } from '../../../dev/app/lib/jboard/fen';

describe('FEN utils', () => {
  const TEST_POSITION = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1';

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

  describe('getFENEnPassant', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return "-" for initial position', () => {
      jboard.setUp();
      expect(getFENEnPassant(jboard.enPassant)).to.be.equal('-');
    });

    it('return "-" for test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(getFENEnPassant(jboard.enPassant)).to.be.equal('-');
    });

    it('return "b3" for test position after two moves', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      jboard.handleMove({ file: 0, rank: 1 }, { file: 0, rank: 3 });
      expect(getFENEnPassant(jboard.enPassant)).to.be.equal('-');
      jboard.handleMove({ file: 2, rank: 4 }, { file: 2, rank: 3 });
      jboard.handleMove({ file: 1, rank: 1 }, { file: 1, rank: 3 });
      expect(getFENEnPassant(jboard.enPassant)).to.be.equal('b3');
    });
  });

  describe('generateFEN', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('get FEN of initial position', () => {
      jboard.setUp();
      expect(generateFEN(
        jboard.board, jboard.turn, jboard.castling, jboard.enPassant,
        jboard.countFiftyMove, jboard.fullCount,
      )).to.be.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    });

    it('get FEN of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(generateFEN(
        jboard.board, jboard.turn, jboard.castling, jboard.enPassant,
        jboard.countFiftyMove, jboard.fullCount,
      )).to.be.equal('r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1');
    });
  });

  describe('getFENPiece', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('return null if square utils empty', () => {
      expect(getFENPiece(0, 4, jboard.board)).to.be.null;
      expect(getFENPiece(4, 5, jboard.board)).to.be.null;
      expect(getFENPiece(6, 3, jboard.board)).to.be.null;
    });

    it('return FEN of white pieces', () => {
      expect(getFENPiece(0, 0, jboard.board)).to.be.equal('R');
      expect(getFENPiece(4, 0, jboard.board)).to.be.equal('K');
      expect(getFENPiece(2, 1, jboard.board)).to.be.equal('P');
    });

    it('return FEN of black pieces', () => {
      expect(getFENPiece(1, 7, jboard.board)).to.be.equal('n');
      expect(getFENPiece(2, 7, jboard.board)).to.be.equal('b');
      expect(getFENPiece(3, 7, jboard.board)).to.be.equal('q');
    });
  });

  describe('getFENBoard', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('get FEN _board of initial position', () => {
      jboard.setUp();
      expect(getFENBoard(jboard.board))
        .to.be.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    });

    it('get FEN _board of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(getFENBoard(jboard.board))
        .to.be.equal('r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R');
    });
  });

  describe('getFENTurn', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('get FEN turn of initial position', () => {
      jboard.setUp();
      expect(getFENTurn(jboard.turn)).to.be.equal('w');
    });

    it('get FEN turn of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(getFENTurn(jboard.turn)).to.be.equal('w');
    });
  });

  describe('getFENCastling', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('get FEN castling of initial position', () => {
      jboard.setUp();
      expect(getFENCastling(jboard.castling)).to.be.equal('KQkq');
    });

    it('get FEN castling of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(getFENCastling(jboard.castling)).to.be.equal('KQkq');
    });

    it('get "Qk" if castling available in queenside for white ' +
      'and in kingside for black', () => {
      jboard.castling[1] = 2;
      jboard.castling[2] = 1;
      expect(getFENCastling(jboard.castling)).to.be.equal('Qk');
    });

    it('get "Kq" if castling available in kingside for white ' +
      'and in queenside for black', () => {
      jboard.castling[1] = 1;
      jboard.castling[2] = 2;
      expect(getFENCastling(jboard.castling)).to.be.equal('Kq');
    });

    it('get "-" if castling unavailable', () => {
      jboard.castling[1] = 0;
      jboard.castling[2] = 0;
      expect(getFENCastling(jboard.castling)).to.be.equal('-');
    });
  });
});
