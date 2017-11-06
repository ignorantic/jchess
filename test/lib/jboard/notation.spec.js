/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as nt from '../../../dev/app/lib/jboard/an';

describe('Notation', () => {
  describe('squareToAlg', () => {
    it('return null if square utils illegal', () => {
      expect(nt.squareToAN(0)).to.be.null;
      expect(nt.squareToAN(0, -1)).to.be.null;
      expect(nt.squareToAN(8, 8)).to.be.null;
    });

    it('return string if OK', () => {
      expect(nt.squareToAN(0, 0)).to.be.equal('a1');
      expect(nt.squareToAN(4, 3)).to.be.equal('e4');
      expect(nt.squareToAN(7, 7)).to.be.equal('h8');
    });
  });

  describe('algToSquare', () => {
    it('return null if square utils illegal', () => {
      expect(nt.ANToSquare(0)).to.be.null;
      expect(nt.ANToSquare('b')).to.be.null;
      expect(nt.ANToSquare('7e')).to.be.null;
      expect(nt.ANToSquare('j1')).to.be.null;
      expect(nt.ANToSquare('e9')).to.be.null;
    });

    it('return number if OK', () => {
      expect(nt.ANToSquare('a2').file).to.be.equal(0);
      expect(nt.ANToSquare('a2').rank).to.be.equal(1);
      expect(nt.ANToSquare('c7').file).to.be.equal(2);
      expect(nt.ANToSquare('c7').rank).to.be.equal(6);
      expect(nt.ANToSquare('f4').file).to.be.equal(5);
      expect(nt.ANToSquare('f4').rank).to.be.equal(3);
    });
  });

  describe('toAlgebraic', () => {
    it('return null if arguments aren\'t correct', () => {
      expect(nt.toAN({ file: 7, rank: 7 }, { file: 0, rank: 8 })).to.be.null;
      expect(nt.toAN({ file: -1, rank: 7 }, { file: 0, rank: 0 })).to.be.null;
      expect(nt.toAN({ file: 1, rank: 7 })).to.be.null;
      expect(nt.toAN()).to.be.null;
    });

    it('return string if OK', () => {
      expect(nt.toAN({ file: 1, rank: 1 }, { file: 1, rank: 2 })).to.be.equal('b2b3');
      expect(nt.toAN({ file: 7, rank: 7 }, { file: 0, rank: 0 })).to.be.equal('h8a1');
      expect(nt.toAN({ file: 0, rank: 6 }, { file: 0, rank: 7 }, 4))
        .to.be.equal('a7a8q');
    });
  });
});
