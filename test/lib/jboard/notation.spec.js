/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as nt from '../../../dev/lib/jboard/notation';

describe('Notation', () => {
  describe('squareToAlg', () => {
    it('return null if square is illegal', () => {
      expect(nt.squareToAlg(0)).to.be.null;
      expect(nt.squareToAlg(0, -1)).to.be.null;
      expect(nt.squareToAlg(8, 8)).to.be.null;
    });

    it('return string if OK', () => {
      expect(nt.squareToAlg(0, 0)).to.be.equal('a1');
      expect(nt.squareToAlg(4, 3)).to.be.equal('e4');
      expect(nt.squareToAlg(7, 7)).to.be.equal('h8');
    });
  });

  describe('algToSquare', () => {
    it('return null if square is illegal', () => {
      expect(nt.algToSquare(0)).to.be.null;
      expect(nt.algToSquare('b')).to.be.null;
      expect(nt.algToSquare('7e')).to.be.null;
      expect(nt.algToSquare('j1')).to.be.null;
      expect(nt.algToSquare('e9')).to.be.null;
    });

    it('return number if OK', () => {
      expect(nt.algToSquare('a2').file).to.be.equal(0);
      expect(nt.algToSquare('a2').rank).to.be.equal(1);
      expect(nt.algToSquare('c7').file).to.be.equal(2);
      expect(nt.algToSquare('c7').rank).to.be.equal(6);
      expect(nt.algToSquare('f4').file).to.be.equal(5);
      expect(nt.algToSquare('f4').rank).to.be.equal(3);
    });
  });

  describe('toAlgebraic', () => {
    it('return null if arguments aren\'t correct', () => {
      expect(nt.toAlgebraic({ file: 7, rank: 7 }, { file: 0, rank: 8 })).to.be.null;
      expect(nt.toAlgebraic({ file: -1, rank: 7 }, { file: 0, rank: 0 })).to.be.null;
      expect(nt.toAlgebraic({ file: 1, rank: 7 })).to.be.null;
      expect(nt.toAlgebraic()).to.be.null;
    });

    it('return string if OK', () => {
      expect(nt.toAlgebraic({ file: 1, rank: 1 }, { file: 1, rank: 2 })).to.be.equal('b2b3');
      expect(nt.toAlgebraic({ file: 7, rank: 7 }, { file: 0, rank: 0 })).to.be.equal('h8a1');
      expect(nt.toAlgebraic({ file: 0, rank: 6 }, { file: 0, rank: 7 }, 4))
        .to.be.equal('a7a8q');
    });
  });
});
