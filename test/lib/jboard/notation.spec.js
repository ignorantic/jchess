/* eslint-disable no-unused-expressions */
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import move from '../../../dev/app/lib/jboard/move';
import { squareToUCI, UCIToSquare, toUCI, UCIToSAN } from '../../../dev/app/lib/jboard/notation';

describe('Notation', () => {
  describe('squareToUCI', () => {
    it('return null if square utils illegal', () => {
      expect(squareToUCI(0)).to.be.null;
      expect(squareToUCI(0, -1)).to.be.null;
      expect(squareToUCI(8, 8)).to.be.null;
    });

    it('return string if OK', () => {
      expect(squareToUCI(0, 0)).to.be.equal('a1');
      expect(squareToUCI(4, 3)).to.be.equal('e4');
      expect(squareToUCI(7, 7)).to.be.equal('h8');
    });
  });

  describe('UCIToSquare', () => {
    it('return null if square utils illegal', () => {
      expect(UCIToSquare(0)).to.be.null;
      expect(UCIToSquare('b')).to.be.null;
      expect(UCIToSquare('7e')).to.be.null;
      expect(UCIToSquare('j1')).to.be.null;
      expect(UCIToSquare('e9')).to.be.null;
    });

    it('return number if OK', () => {
      expect(UCIToSquare('a2').file).to.be.equal(0);
      expect(UCIToSquare('a2').rank).to.be.equal(1);
      expect(UCIToSquare('c7').file).to.be.equal(2);
      expect(UCIToSquare('c7').rank).to.be.equal(6);
      expect(UCIToSquare('f4').file).to.be.equal(5);
      expect(UCIToSquare('f4').rank).to.be.equal(3);
    });
  });

  describe('toUCI', () => {
    it('return null if arguments aren\'t correct', () => {
      expect(toUCI({ file: 7, rank: 7 }, { file: 0, rank: 8 })).to.be.null;
      expect(toUCI({ file: -1, rank: 7 }, { file: 0, rank: 0 })).to.be.null;
      expect(toUCI({ file: 1, rank: 7 })).to.be.null;
      expect(toUCI()).to.be.null;
    });

    it('return string if OK', () => {
      expect(toUCI({ file: 1, rank: 1 }, { file: 1, rank: 2 })).to.be.equal('b2b3');
      expect(toUCI({ file: 7, rank: 7 }, { file: 0, rank: 0 })).to.be.equal('h8a1');
      expect(toUCI({ file: 0, rank: 6 }, { file: 0, rank: 7 }, 4))
        .to.be.equal('a7a8q');
    });
  });

  describe('UCIToSAN', () => {
    it('should return "Nf3"', () => {
      const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(UCIToSAN(FEN, 'g1f3')).to.be.equal('Nf3');
    });

    it('should return "Neg6"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'e7g6')).to.be.equal('Neg6');
    });

    it('should return "Qxa3"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'b2a3')).to.be.equal('Qxa3');
    });

    it('should return "Nfg6"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'f8g6')).to.be.equal('Nfg6');
    });

    it('should return "Ng6"', () => {
      const FEN = 'Q4n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'e7g6')).to.be.equal('Ng6');
    });

    it('should return "Bd6"', () => {
      const FEN = 'Q4b1k/2b3pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'c7d6')).to.be.equal('Bd6');
    });

    it('should return "Rde1"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 w - - 0 1';
      expect(UCIToSAN(FEN, 'd1e1')).to.be.equal('Rde1');
    });

    it('should return "Rfe1"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 w - - 0 1';
      expect(UCIToSAN(FEN, 'f1e1')).to.be.equal('Rfe1');
    });

    it('should return "R6d2"', () => {
      const FEN = '5n1k/2b1n1pp/p2R4/5p2/1Pp1p3/P3P1P1/1q3P1P/3R2K1 w - - 0 1';
      expect(UCIToSAN(FEN, 'd6d2')).to.be.equal('R6d2');
    });

    it('should return "Ra7"', () => {
      const FEN = '5nk1/7p/5Pp1/8/8/4qpP1/R6P/R6K w - - 0 1';
      expect(UCIToSAN(FEN, 'a2a7')).to.be.equal('Ra7');
    });

    it('should return "R7a2"', () => {
      const FEN = '5nk1/R6p/5Pp1/8/8/4qpP1/7P/R6K w - - 0 1';
      expect(UCIToSAN(FEN, 'a7a2')).to.be.equal('R7a2');
    });

    it('should return "Nc3d5"', () => {
      const FEN = '5n1k/2N1N1pp/p2R4/5p2/1Pp1p3/P1N1N1P1/1q3P1P/3R2K1 w - - 0 1';
      expect(UCIToSAN(FEN, 'c3d5')).to.be.equal('Nc3d5');
    });

    it('should return "bxa5"', () => {
      const FEN = '5n1k/6pp/p2R4/p1p2p2/1P2p1P1/P4PP1/1q3P1P/3R2K1 w - - 0 1';
      expect(UCIToSAN(FEN, 'b4a5')).to.be.equal('bxa5');
    });

    it('should return "g5"', () => {
      const FEN = '5n1k/6pp/p2R4/p1p2p2/1P2p1P1/P4PP1/1q3P1P/3R2K1 w - - 0 1';
      expect(UCIToSAN(FEN, 'g4g5')).to.be.equal('g5');
    });

    it('should return "Qxf2+"', () => {
      const FEN = '5n1k/6pp/p2R4/p1p2p2/1P2p1P1/P4PP1/1q3P1P/3R2K1 b - - 0 1';
      expect(UCIToSAN(FEN, 'b2f2')).to.be.equal('Qxf2+');
    });
  });
});
