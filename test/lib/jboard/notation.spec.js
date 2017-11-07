/* eslint-disable no-unused-expressions */
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import JBoard from '../../../dev/app/lib/jboard/jboard';
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
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('return string if OK', () => {
      jboard.moveUCI('g1f3');
      expect(UCIToSAN(jboard.board, 'g1f3')).to.be.equal('Nf3');
    });
  });
});
