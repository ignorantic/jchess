/* eslint-disable no-unused-expressions */
import { describe, it, before, beforeEach } from 'mocha';
import { expect } from 'chai';
import JBoard from '../../../dev/app/lib/jboard/jboard';

describe('jBoard', () => {
  const TEST_POSITION = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1';
  const CASTLING_POSITION = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R w KQkq - 0 1';

  /*
   *   INITIALIZATION
   */

  describe('constructor', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('check size of _board', () => {
      expect(jboard.board.length).to.be.equal(8);
      expect(jboard.board[0].length).to.be.equal(8);
      expect(jboard.board[7].length).to.be.equal(8);
    });

    it('check property\'s value', () => {
      expect(jboard.selected).to.be.null;
      expect(jboard.enPassant).to.be.null;
    });

    it('check square colors', () => {
      expect(jboard.board[0][0].color).to.be.equal(2);
      expect(jboard.board[0][7].color).to.be.equal(1);
      expect(jboard.board[7][0].color).to.be.equal(1);
      expect(jboard.board[7][7].color).to.be.equal(2);
    });
  });

  /*
   *   SETUP
   */

  describe('setUpInitial', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('check rooks', () => {
      expect(jboard.board[0][0].piece.type).to.be.equal(1);
      expect(jboard.board[0][0].piece.color).to.be.equal(1);

      expect(jboard.board[7][0].piece.type).to.be.equal(1);
      expect(jboard.board[7][0].piece.color).to.be.equal(1);

      expect(jboard.board[0][7].piece.type).to.be.equal(1);
      expect(jboard.board[0][7].piece.color).to.be.equal(2);

      expect(jboard.board[7][7].piece.type).to.be.equal(1);
      expect(jboard.board[7][7].piece.color).to.be.equal(2);
    });

    it('check knights', () => {
      expect(jboard.board[1][0].piece.type).to.be.equal(2);
      expect(jboard.board[1][0].piece.color).to.be.equal(1);

      expect(jboard.board[6][0].piece.type).to.be.equal(2);
      expect(jboard.board[6][0].piece.color).to.be.equal(1);

      expect(jboard.board[1][7].piece.type).to.be.equal(2);
      expect(jboard.board[1][7].piece.color).to.be.equal(2);

      expect(jboard.board[6][7].piece.type).to.be.equal(2);
      expect(jboard.board[6][7].piece.color).to.be.equal(2);
    });

    it('check bishops', () => {
      expect(jboard.board[2][0].piece.type).to.be.equal(3);
      expect(jboard.board[2][0].piece.color).to.be.equal(1);

      expect(jboard.board[5][0].piece.type).to.be.equal(3);
      expect(jboard.board[5][0].piece.color).to.be.equal(1);

      expect(jboard.board[2][7].piece.type).to.be.equal(3);
      expect(jboard.board[2][7].piece.color).to.be.equal(2);

      expect(jboard.board[5][7].piece.type).to.be.equal(3);
      expect(jboard.board[5][7].piece.color).to.be.equal(2);
    });

    it('check queens', () => {
      expect(jboard.board[3][0].piece.type).to.be.equal(4);
      expect(jboard.board[3][0].piece.color).to.be.equal(1);
      expect(jboard.board[3][7].piece.type).to.be.equal(4);
      expect(jboard.board[3][7].piece.color).to.be.equal(2);
    });

    it('check kings', () => {
      expect(jboard.board[4][0].piece.type).to.be.equal(5);
      expect(jboard.board[4][0].piece.color).to.be.equal(1);
      expect(jboard.board[4][7].piece.type).to.be.equal(5);
      expect(jboard.board[4][7].piece.color).to.be.equal(2);
    });

    it('check white pawns', () => {
      expect(jboard.board[0][1].piece.type).to.be.equal(0);
      expect(jboard.board[7][1].piece.color).to.be.equal(1);
    });

    it('check black pawns', () => {
      expect(jboard.board[0][6].piece.type).to.be.equal(0);
      expect(jboard.board[7][6].piece.color).to.be.equal(2);
    });

    it('check castlings', () => {
      expect(jboard.castling[1]).to.be.equal(3);
      expect(jboard.castling[2]).to.be.equal(3);
    });
  });

  describe('setPiecesByArray', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPiecesByArray([
        {
          file: 0,
          rank: 1,
          piece: {
            type: 0,
            color: 1,
          },
        },
        {
          file: 1,
          rank: 2,
          piece: {
            type: 2,
            color: 2,
          },
        },
        {
          file: 5,
          rank: 7,
          piece: {
            type: 4,
            color: 2,
          },
        },
      ]);
    });

    it('check pawn', () => {
      expect(jboard.board[0][1].piece.type).to.be.equal(0);
      expect(jboard.board[0][1].piece.color).to.be.equal(1);
    });

    it('check knight', () => {
      expect(jboard.board[1][2].piece.type).to.be.equal(2);
      expect(jboard.board[1][2].piece.color).to.be.equal(2);
    });

    it('check queen', () => {
      expect(jboard.board[5][7].piece.type).to.be.equal(4);
      expect(jboard.board[5][7].piece.color).to.be.equal(2);
    });
  });

  describe('resetPosition', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('check pawn a2 before reset', () => {
      expect(jboard.board[0][1].piece.type).to.be.equal(0);
      expect(jboard.board[0][1].piece.color).to.be.equal(1);
    });

    it('check knight b1 before reset', () => {
      expect(jboard.board[1][0].piece.type).to.be.equal(2);
      expect(jboard.board[1][0].piece.color).to.be.equal(1);
    });

    it('check rook h8 before reset', () => {
      expect(jboard.board[7][7].piece.type).to.be.equal(1);
      expect(jboard.board[7][7].piece.color).to.be.equal(2);
    });

    it('check pawn a2 after reset', () => {
      jboard.resetPosition();

      expect(jboard.board[0][1].piece.type).to.be.null;
      expect(jboard.board[0][1].piece.color).to.be.null;
    });

    it('check knight b1 after reset', () => {
      expect(jboard.board[1][0].piece.type).to.be.null;
      expect(jboard.board[1][0].piece.color).to.be.null;
    });

    it('check rook h8 after reset', () => {
      expect(jboard.board[7][7].piece.type).to.be.null;
      expect(jboard.board[7][7].piece.color).to.be.null;
    });
  });

  describe('setPiece', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('check square h2 before setup', () => {
      expect(jboard.board[7][1].piece.type).to.be.null;
      expect(jboard.board[7][1].piece.color).to.be.null;
    });

    it('check square c3 before setup', () => {
      expect(jboard.board[2][2].piece.type).to.be.null;
      expect(jboard.board[2][2].piece.color).to.be.null;
    });

    it('check square e4 before setup', () => {
      expect(jboard.board[4][3].piece.type).to.be.null;
      expect(jboard.board[4][3].piece.color).to.be.null;
    });

    it('check square h2 after setup', () => {
      jboard.setPiece({ file: 7, rank: 1 }, 0, 1);
      expect(jboard.board[7][1].piece.type).to.be.equal(0);
      expect(jboard.board[7][1].piece.color).to.be.equal(1);
    });

    it('check square c3 after setup', () => {
      jboard.setPiece({ file: 2, rank: 2 }, 2, 1);
      expect(jboard.board[2][2].piece.type).to.be.equal(2);
      expect(jboard.board[2][2].piece.color).to.be.equal(1);
    });

    it('check square e4 after setup', () => {
      jboard.setPiece({ file: 4, rank: 3 }, 1, 2);
      expect(jboard.board[4][3].piece.type).to.be.equal(1);
      expect(jboard.board[4][3].piece.color).to.be.equal(2);
    });
  });

  /*
   *   SQUARE GETTERS
   */

  describe('getSquareColor', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.getSquareColor(0, 8)).to.be.null;
      expect(jboard.getSquareColor(8, 0)).to.be.null;
      expect(jboard.getSquareColor(-1, 0)).to.be.null;
      expect(jboard.getSquareColor(0, -1)).to.be.null;
    });

    it('return "2"', () => {
      expect(jboard.getSquareColor(0, 0)).to.be.equal(2);
      expect(jboard.getSquareColor(0, 2)).to.be.equal(2);
      expect(jboard.getSquareColor(5, 7)).to.be.equal(2);
      expect(jboard.getSquareColor(3, 7)).to.be.equal(2);
    });

    it('return "1"', () => {
      expect(jboard.getSquareColor(0, 1)).to.be.equal(1);
      expect(jboard.getSquareColor(0, 3)).to.be.equal(1);
      expect(jboard.getSquareColor(1, 2)).to.be.equal(1);
      expect(jboard.getSquareColor(0, 7)).to.be.equal(1);
    });
  });

  describe('getPieceType', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('return piece type for (0, 0), etc', () => {
      expect(jboard.getPieceType(0, 2)).to.be.null;
      expect(jboard.getPieceType(4, 4)).to.be.null;

      expect(jboard.getPieceType(0, 0)).to.be.equal(1);
      expect(jboard.getPieceType(5, 7)).to.be.equal(3);
      expect(jboard.getPieceType(6, 6)).to.be.equal(0);
      expect(jboard.getPieceType(4, 7)).to.be.equal(5);
    });
  });

  describe('getPieceColor', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.getPieceColor(8, 0)).to.be.null;
      expect(jboard.getPieceColor(0, -1)).to.be.null;
    });

    it('return piece color for (0, 0), etc', () => {
      expect(jboard.getPieceType(1, 2)).to.be.null;
      expect(jboard.getPieceType(3, 5)).to.be.null;

      expect(jboard.getPieceColor(2, 0)).to.be.equal(1);
      expect(jboard.getPieceColor(2, 7)).to.be.equal(2);
      expect(jboard.getPieceColor(3, 0)).to.be.equal(1);
      expect(jboard.getPieceColor(3, 7)).to.be.equal(2);
    });
  });

  /*
   *   SQUARE SETTERS
   */

  describe('setPieceType', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return true if setting was successful', () => {
      expect(jboard.setPieceType({ file: 1, rank: 1 }, 2)).to.be.true;
      expect(jboard.setPieceType({ file: 5, rank: 6 }, null)).to.be.true;
    });

    it('set piece type and check', () => {
      expect(jboard.getPieceType(1, 1)).to.be.equal(2);
      jboard.setPieceType({ file: 1, rank: 1 }, 3);
      expect(jboard.getPieceType(1, 1)).to.be.equal(3);
    });
  });

  describe('setPieceColor', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return true if setting was successful', () => {
      expect(jboard.setPieceColor({ file: 0, rank: 0 }, 1)).to.be.true;
      expect(jboard.setPieceColor({ file: 7, rank: 6 }, null)).to.be.true;
    });

    it('set piece type and check', () => {
      expect(jboard.getPieceColor(2, 4)).to.be.null;
      jboard.setPieceColor({ file: 2, rank: 4 }, 1);
      expect(jboard.getPieceColor(2, 4)).to.be.equal(1);
    });
  });

  /*
   *   EN PASSANT
   */

  describe('getEnPassant', () => {
    let jboard;

    beforeEach(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN('4k3/p2pppp1/1p6/1P1P1P2/P1p4p/8/3PP1PP/R3K3 w - - 0 1');
    });

    it('return null if theresn\'t en passant', () => {
      expect(jboard.getEnPassant()).to.be.null;
      jboard.handleMove({ file: 4, rank: 1 }, { file: 4, rank: 3 });
      expect(jboard.getEnPassant()).to.be.null;
      jboard.handleMove({ file: 6, rank: 6 }, { file: 6, rank: 4 });
      jboard.handleMove({ file: 0, rank: 0 }, { file: 0, rank: 2 });
      expect(jboard.getEnPassant()).to.be.null;
      jboard.handleMove({ file: 0, rank: 6 }, { file: 0, rank: 4 });
      jboard.handleMove({ file: 1, rank: 4 }, { file: 0, rank: 5 });
      expect(jboard.getEnPassant()).to.be.null;
      jboard.handleMove({ file: 4, rank: 6 }, { file: 4, rank: 4 });
      jboard.handleMove({ file: 4, rank: 0 }, { file: 5, rank: 0 });
      expect(jboard.getEnPassant()).to.be.null;
    });

    it('return square if en passant ithere\'s', () => {
      jboard.handleMove({ file: 6, rank: 1 }, { file: 6, rank: 3 });
      expect(jboard.getEnPassant().file).to.be.equal(6);
      expect(jboard.getEnPassant().rank).to.be.equal(2);
      jboard.handleMove({ file: 6, rank: 6 }, { file: 6, rank: 4 });
      expect(jboard.getEnPassant().file).to.be.equal(6);
      expect(jboard.getEnPassant().rank).to.be.equal(5);
    });
  });

  /*
   *   SELECT
   */

  describe('select', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('check selected square', () => {
      jboard.select(1, 5);
      expect(jboard.isSquareSelected(1, 5)).to.be.true;
      expect(jboard.isSquareSelected(7, 7)).to.be.false;

      jboard.select(6, 7);
      expect(jboard.isSquareSelected(5, 1)).to.be.false;
      expect(jboard.isSquareSelected(6, 7)).to.be.true;
    });

    it('check marked square', () => {
      jboard.select(0, 1);

      expect(jboard.isSquareMarked(0, 1)).to.be.false;
      expect(jboard.isSquareMarked(0, 2)).to.be.true;
      expect(jboard.isSquareMarked(0, 3)).to.be.true;
      expect(jboard.isSquareMarked(0, 4)).to.be.false;
      expect(jboard.isSquareMarked(1, 2)).to.be.false;
    });
  });

  /*
   *   SELECT
   */

  describe('resetSelect', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.select(4, 4);
    });

    it('reset selected square', () => {
      expect(jboard.isSquareSelected(4, 4)).to.be.true;
      expect(jboard.isSquareSelected(4, 5)).to.be.false;
      jboard.resetSelected(jboard.board);
      expect(jboard.isSquareSelected(4, 4)).to.be.false;
      expect(jboard.isSquareSelected(4, 5)).to.be.false;
    });
  });

  describe('isSquareSelected', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.isSquareSelected(0, 8)).to.be.null;
      expect(jboard.isSquareSelected(8, 0)).to.be.null;
      expect(jboard.isSquareSelected(-1, 0)).to.be.null;
      expect(jboard.isSquareSelected(0, -1)).to.be.null;
    });

    it('return true or false if arguments are correct', () => {
      jboard.select(1, 5);
      expect(jboard.isSquareSelected(0, 0)).to.be.false;
      expect(jboard.isSquareSelected(1, 5)).to.be.true;

      jboard.select(7, 7);
      expect(jboard.isSquareSelected(1, 5)).to.be.false;
      expect(jboard.isSquareSelected(7, 7)).to.be.true;
    });
  });

  /*
   *   MARK MOVES
   */

  describe('markMoves and isSquareMarked', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('mark two squares for pawn a2', () => {
      jboard.markMoves(0, 1);
      expect(jboard.isSquareMarked(0, 2)).to.be.true;
      expect(jboard.isSquareMarked(0, 3)).to.be.true;
      expect(jboard.isSquareMarked(0, 4)).to.be.false;
      expect(jboard.isSquareMarked(1, 2)).to.be.false;
    });

    it('mark only square for pawn c5', () => {
      jboard.passTurn();
      jboard.markMoves(2, 4);
      expect(jboard.isSquareMarked(2, 3)).to.be.true;
      expect(jboard.isSquareMarked(2, 2)).to.be.false;
      expect(jboard.isSquareMarked(3, 3)).to.be.false;
      expect(jboard.isSquareMarked(1, 3)).to.be.false;
    });

    it('mark no square for pawn d5', () => {
      jboard.markMoves(3, 4);
      expect(jboard.isSquareMarked(3, 5)).to.be.false;
      expect(jboard.isSquareMarked(3, 6)).to.be.false;
      expect(jboard.isSquareMarked(2, 5)).to.be.false;
      expect(jboard.isSquareMarked(4, 5)).to.be.false;
    });

    it('mark no square for pawn f4', () => {
      jboard.markMoves(5, 3);
      expect(jboard.isSquareMarked(5, 4)).to.be.false;
      expect(jboard.isSquareMarked(5, 5)).to.be.false;
      expect(jboard.isSquareMarked(4, 4)).to.be.false;
      expect(jboard.isSquareMarked(6, 4)).to.be.false;
    });
  });

  /*
   *   HANDLE MOVE
   */

  describe('handleMove', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    beforeEach(() => {
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return false if arguments aren\'t correct', () => {
      expect(jboard.handleMove({ file: 0, rank: 5 }, { file: 8, rank: 7 })).to.be.false;
      expect(jboard.handleMove({ file: 0, rank: -1 }, { file: 7, rank: 7 })).to.be.false;
      expect(jboard.handleMove({ file: 0, rank: 0 }, { file: 6, rank: 9 })).to.be.false;
      expect(jboard.handleMove({ file: 10, rank: 8 }, { file: 18, rank: 8 })).to.be.false;
    });

    it('return false if there utils no piece on start square', () => {
      expect(jboard.handleMove({ file: 0, rank: 2 }, { file: 4, rank: 3 })).to.be.false;
      expect(jboard.handleMove({ file: 3, rank: 2 }, { file: 7, rank: 7 })).to.be.false;
      expect(jboard.handleMove({ file: 6, rank: 7 }, { file: 4, rank: 6 })).to.be.false;
      expect(jboard.handleMove({ file: 5, rank: 5 }, { file: 2, rank: 0 })).to.be.false;
    });

    it('return false if start piece color equal stop piece color', () => {
      expect(jboard.handleMove({ file: 7, rank: 1 }, { file: 6, rank: 2 })).to.be.false;
      expect(jboard.handleMove({ file: 2, rank: 0 }, { file: 1, rank: 1 })).to.be.false;
      expect(jboard.handleMove({ file: 3, rank: 7 }, { file: 4, rank: 7 })).to.be.false;
      expect(jboard.handleMove({ file: 5, rank: 4 }, { file: 6, rank: 6 })).to.be.false;
    });

    it('return true if move was successful', () => {
      expect(jboard.handleMove({ file: 4, rank: 1 }, { file: 4, rank: 3 })).to.be.true;
      expect(jboard.handleMove({ file: 2, rank: 4 }, { file: 2, rank: 3 })).to.be.true;
      expect(jboard.handleMove({ file: 6, rank: 6 }, { file: 6, rank: 5 })).to.be.true;
      expect(jboard.handleMove({ file: 0, rank: 1 }, { file: 0, rank: 3 })).to.be.true;
    });

    it('check stop square if move was successful', () => {
      let color = jboard.getPieceColor(0, 1);
      let type = jboard.getPieceType(0, 1);

      jboard.handleMove({ file: 0, rank: 1 }, { file: 0, rank: 3 });

      expect(jboard.getPieceColor(0, 3) === color).to.be.true;
      expect(jboard.getPieceType(0, 3) === type).to.be.true;

      color = jboard.getPieceColor(7, 3);
      type = jboard.getPieceType(7, 3);

      jboard.handleMove({ file: 7, rank: 3 }, { file: 6, rank: 2 });

      expect(jboard.getPieceColor(6, 2) === color).to.be.true;
      expect(jboard.getPieceType(6, 2) === type).to.be.true;
    });

    it('check start square if move was successful', () => {
      expect(jboard.getPieceColor(0, 1)).to.be.equal(1);
      expect(jboard.getPieceType(0, 1)).to.be.equal(0);
      jboard.handleMove({ file: 0, rank: 1 }, { file: 0, rank: 3 });
      expect(jboard.getPieceColor(0, 1)).to.be.null;
      expect(jboard.getPieceType(0, 1)).to.be.null;

      expect(jboard.getPieceColor(7, 3)).to.be.equal(2);
      expect(jboard.getPieceType(7, 3)).to.be.equal(0);
      jboard.handleMove({ file: 7, rank: 3 }, { file: 6, rank: 2 });
      expect(jboard.getPieceColor(7, 3)).to.be.null;
      expect(jboard.getPieceType(7, 3)).to.be.null;
    });

    it('turn color after move', () => {
      expect(jboard.getTurn()).to.be.equal(1);
      jboard.handleMove({ file: 0, rank: 1 }, { file: 0, rank: 3 });
      expect(jboard.getTurn()).to.be.equal(2);
      jboard.handleMove({ file: 2, rank: 2 }, { file: 3, rank: 0 });
      expect(jboard.getTurn()).to.be.equal(1);
      jboard.handleMove({ file: 2, rank: 0 }, { file: 3, rank: 1 });
      expect(jboard.getTurn()).to.be.equal(2);
    });

    it('reset countFiftyMove after capturing', () => {
      jboard.handleMove({ file: 5, rank: 2 }, { file: 4, rank: 4 });
      expect(jboard.countFiftyMove).to.be.equal(1);
      jboard.handleMove({ file: 3, rank: 3 }, { file: 6, rank: 0 });
      expect(jboard.countFiftyMove).to.be.equal(2);
      jboard.handleMove({ file: 4, rank: 0 }, { file: 3, rank: 1 });
      expect(jboard.countFiftyMove).to.be.equal(3);
      jboard.handleMove({ file: 6, rank: 0 }, { file: 7, rank: 0 });
      expect(jboard.countFiftyMove).to.be.equal(0);
    });

    it('reset countFiftyMove after pawn move', () => {
      jboard.handleMove({ file: 5, rank: 2 }, { file: 4, rank: 4 });
      expect(jboard.countFiftyMove).to.be.equal(1);
      jboard.handleMove({ file: 3, rank: 3 }, { file: 6, rank: 0 });
      expect(jboard.countFiftyMove).to.be.equal(2);
      jboard.handleMove({ file: 4, rank: 0 }, { file: 3, rank: 1 });
      expect(jboard.countFiftyMove).to.be.equal(3);
      jboard.handleMove({ file: 2, rank: 4 }, { file: 2, rank: 3 });
      expect(jboard.countFiftyMove).to.be.equal(0);
    });
  });

  /*
   *   CHECK MOVE
   */

  describe('isDiscoveredCheck', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    beforeEach(() => {
      jboard.setPositionByFEN('Rn2k1bR/pp3pp1/3P4/b1pP3B/3q1P1p/2N3P1/PP2P2P/2BQK1Nr w KQkq - 0 1');
    });

    it('return false if arguments aren\'t correct', () => {
      expect(jboard.isDiscoveredCheck({ file: 0, rank: 4 }, { file: 8, rank: 7 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 0, rank: -1 }, { file: 7, rank: 7 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 7, rank: 7 }, { file: 6, rank: 9 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 10, rank: 8 }, { file: 18, rank: 8 })).to.be.false;
    });

    it('return false if there utils no piece on start square', () => {
      expect(jboard.isDiscoveredCheck({ file: 0, rank: 2 }, { file: 4, rank: 3 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 3, rank: 2 }, { file: 7, rank: 7 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 6, rank: 5 }, { file: 4, rank: 6 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 5, rank: 5 }, { file: 2, rank: 0 })).to.be.false;
    });

    it('return true if move utils legal', () => {
      expect(jboard.isDiscoveredCheck({ file: 4, rank: 1 }, { file: 4, rank: 3 })).to.be.true;
      expect(jboard.isDiscoveredCheck({ file: 2, rank: 4 }, { file: 2, rank: 3 })).to.be.true;
      expect(jboard.isDiscoveredCheck({ file: 6, rank: 6 }, { file: 6, rank: 5 })).to.be.true;
      expect(jboard.isDiscoveredCheck({ file: 0, rank: 1 }, { file: 0, rank: 3 })).to.be.true;
    });

    it('return false if move utils illegal', () => {
      expect(jboard.isDiscoveredCheck({ file: 5, rank: 6 }, { file: 5, rank: 5 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 6, rank: 7 }, { file: 7, rank: 6 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 1, rank: 7 }, { file: 2, rank: 5 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 2, rank: 2 }, { file: 4, rank: 3 })).to.be.false;
      expect(jboard.isDiscoveredCheck({ file: 6, rank: 0 }, { file: 5, rank: 2 })).to.be.false;
    });
  });

  /*
   *   GET PAWN MOVES
   */

  describe('getPawnMoves', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return two squares for pawn a2', () => {
      const moves = jboard.getPawnMoves(0, 1);
      expect(moves[0].file).to.be.equal(0);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1].file).to.be.equal(0);
      expect(moves[1].rank).to.be.equal(3);
      expect(moves[2]).to.be.undefined;
    });

    it('return two squares for pawn e2', () => {
      const moves = jboard.getPawnMoves(4, 1);

      expect(moves[0].file).to.be.equal(4);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1].file).to.be.equal(4);
      expect(moves[1].rank).to.be.equal(3);
      expect(moves[2]).to.be.undefined;
    });

    it('return only square for pawn c5', () => {
      const moves = jboard.getPawnMoves(2, 4);

      expect(moves[0].file).to.be.equal(2);
      expect(moves[0].rank).to.be.equal(3);
      expect(moves[1]).to.be.undefined;
    });

    it('return null for pawn d5', () => {
      const moves = jboard.getPawnMoves(3, 4);
      expect(moves[0]).to.be.undefined;
    });

    it('return null for pawn f4', () => {
      const moves = jboard.getPawnMoves(5, 3);
      expect(moves[0]).to.be.undefined;
    });

    it('return three squares for pawn b2', () => {
      const moves = jboard.getPawnMoves(1, 1);

      expect(moves[0].file).to.be.equal(1);
      expect(moves[0].rank).to.be.equal(2);

      expect(moves[1].file).to.be.equal(1);
      expect(moves[1].rank).to.be.equal(3);

      expect(moves[2].file).to.be.equal(2);
      expect(moves[2].rank).to.be.equal(2);

      expect(moves[3]).to.be.undefined;
    });

    it('return only square for pawn h2', () => {
      const moves = jboard.getPawnMoves(7, 1);

      expect(moves[0].file).to.be.equal(7);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1]).to.be.undefined;
    });

    it('return two squares for pawn h4', () => {
      const moves = jboard.getPawnMoves(7, 3);

      expect(moves[0].file).to.be.equal(7);
      expect(moves[0].rank).to.be.equal(2);

      expect(moves[1].file).to.be.equal(6);
      expect(moves[1].rank).to.be.equal(2);

      expect(moves[2]).to.be.undefined;
    });
  });

  /*
   *   GET KING MOVES
   */

  describe('getKingMoves', () => {
    let jboard;

    beforeEach(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return two squares for white king', () => {
      const moves = jboard.getKingMoves(4, 0);

      expect(moves[0].file).to.be.equal(4);
      expect(moves[0].rank).to.be.equal(1);

      expect(moves[1].file).to.be.equal(5);
      expect(moves[1].rank).to.be.equal(0);

      expect(moves[2].file).to.be.equal(3);
      expect(moves[2].rank).to.be.equal(0);

      expect(moves[3].file).to.be.equal(3);
      expect(moves[3].rank).to.be.equal(1);

      expect(moves[4].file).to.be.equal(6);
      expect(moves[4].rank).to.be.equal(0);

      expect(moves[5]).to.be.undefined;
    });

    it('return two squares for black king', () => {
      const moves = jboard.getKingMoves(4, 7);

      expect(moves[0].file).to.be.equal(3);
      expect(moves[0].rank).to.be.equal(7);

      expect(moves[1].file).to.be.equal(3);
      expect(moves[1].rank).to.be.equal(6);

      expect(moves[2].file).to.be.equal(2);
      expect(moves[2].rank).to.be.equal(7);

      expect(moves[3]).to.be.undefined;
    });
  });

  /*
   *   CASTLING
   */

  describe('getCastlingMove', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return only move for white king', () => {
      const moves = jboard.getCastlingMove(4, 0);

      expect(moves[0].file).to.be.equal(6);
      expect(moves[0].rank).to.be.equal(0);

      expect(moves[1]).to.be.undefined;
    });

    it('return only move for black king', () => {
      const moves = jboard.getCastlingMove(4, 7);

      expect(moves[0].file).to.be.equal(2);
      expect(moves[0].rank).to.be.equal(7);

      expect(moves[1]).to.be.undefined;
    });

    it('return both moves for black king after bishop move', () => {
      jboard.handleMove({ file: 3, rank: 5 }, { file: 4, rank: 4 });

      const moves = jboard.getCastlingMove(4, 7);

      expect(moves[0].file).to.be.equal(2);
      expect(moves[0].rank).to.be.equal(7);

      expect(moves[1].file).to.be.equal(6);
      expect(moves[1].rank).to.be.equal(7);
    });
  });

  describe('castling', () => {
    let jboard;

    beforeEach(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('castling for white king', () => {
      jboard.select(4, 0);
      jboard.move(2, 0);
      expect(jboard.getPieceType(2, 0)).to.be.equal(null);
      jboard.select(4, 0);
      jboard.move(6, 0);
      expect(jboard.getPieceType(6, 0)).to.be.equal(5);
      expect(jboard.getPieceColor(6, 0)).to.be.equal(1);
    });

    it('castling for black king', () => {
      jboard.select(4, 0);
      jboard.move(6, 0);
      jboard.select(4, 7);
      jboard.move(6, 7);
      expect(jboard.getPieceType(6, 7)).to.be.equal(null);
      jboard.select(4, 7);
      jboard.move(2, 7);
      expect(jboard.getPieceType(2, 7)).to.be.equal(5);
      expect(jboard.getPieceColor(2, 7)).to.be.equal(2);
    });

    it('castling after knight and bishop moves', () => {
      jboard.select(3, 5);
      jboard.move(1, 3);
      jboard.select(3, 0);
      jboard.move(2, 2);
      jboard.select(1, 3);
      jboard.move(2, 2);
      jboard.select(4, 7);
      jboard.move(6, 7);
      expect(jboard.getPieceType(6, 7)).to.be.equal(5);
      expect(jboard.getPieceColor(6, 7)).to.be.equal(2);
      jboard.select(4, 0);
      jboard.move(2, 0);
      expect(jboard.getPieceType(2, 0)).to.be.equal(5);
      expect(jboard.getPieceColor(2, 0)).to.be.equal(1);
    });
  });

  /*
   *   GET PIECE MOVES
   */

  describe('getPieceMoves', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return two squares for knight c3', () => {
      const moves = jboard.getPieceMoves(2, 2);

      expect(moves[0].file).to.be.equal(3);
      expect(moves[0].rank).to.be.equal(4);

      expect(moves[1].file).to.be.equal(4);
      expect(moves[1].rank).to.be.equal(3);

      expect(moves[2].file).to.be.equal(4);
      expect(moves[2].rank).to.be.equal(1);

      expect(moves[3].file).to.be.equal(3);
      expect(moves[3].rank).to.be.equal(0);

      expect(moves[4].file).to.be.equal(1);
      expect(moves[4].rank).to.be.equal(0);

      expect(moves[5].file).to.be.equal(0);
      expect(moves[5].rank).to.be.equal(1);

      expect(moves[6].file).to.be.equal(0);
      expect(moves[6].rank).to.be.equal(3);

      expect(moves[7].file).to.be.equal(1);
      expect(moves[7].rank).to.be.equal(4);

      expect(moves[8]).to.be.undefined;
    });

    it('return two squares for knight f5', () => {
      const moves = jboard.getPieceMoves(5, 4);

      expect(moves[0].file).to.be.equal(7);
      expect(moves[0].rank).to.be.equal(5);

      expect(moves[1].file).to.be.equal(6);
      expect(moves[1].rank).to.be.equal(2);

      expect(moves[2].file).to.be.equal(4);
      expect(moves[2].rank).to.be.equal(2);

      expect(moves[3].file).to.be.equal(3);
      expect(moves[3].rank).to.be.equal(5);

      expect(moves[4].file).to.be.equal(4);
      expect(moves[4].rank).to.be.equal(6);

      expect(moves[5]).to.be.undefined;
    });

    it('return two squares for rook h8', () => {
      const moves = jboard.getPieceMoves(7, 7);

      expect(moves[0].file).to.be.equal(7);
      expect(moves[0].rank).to.be.equal(6);

      expect(moves[1].file).to.be.equal(7);
      expect(moves[1].rank).to.be.equal(5);

      expect(moves[2].file).to.be.equal(7);
      expect(moves[2].rank).to.be.equal(4);

      expect(moves[3].file).to.be.equal(6);
      expect(moves[3].rank).to.be.equal(7);

      expect(moves[4].file).to.be.equal(5);
      expect(moves[4].rank).to.be.equal(7);

      expect(moves[5]).to.be.undefined;
    });

    it('return two squares for bishop h5', () => {
      const moves = jboard.getPieceMoves(7, 4);

      expect(moves[0].file).to.be.equal(6);
      expect(moves[0].rank).to.be.equal(3);

      expect(moves[1].file).to.be.equal(6);
      expect(moves[1].rank).to.be.equal(5);

      expect(moves[2].file).to.be.equal(5);
      expect(moves[2].rank).to.be.equal(6);

      expect(moves[3]).to.be.undefined;
    });
  });

  /*
   *   PAWN PROMOTION
   */

  describe('pawn promotion', () => {
    let jboard;

    beforeEach(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN('B4bnr/P4P1P/8/8/5K2/8/P1ppk1pR/2R5 w - - 0 1');
    });

    it('can\'t move white pawns', () => {
      jboard.select(0, 6);
      jboard.move(0, 7);
      expect(jboard.getPieceType(0, 7)).to.be.not.equal(4);
      jboard.select(5, 6);
      jboard.move(5, 7);
      expect(jboard.getPieceType(5, 7)).to.be.not.equal(4);
      jboard.select(7, 6);
      jboard.move(7, 7);
      expect(jboard.getPieceType(7, 7)).to.be.not.equal(4);
    });

    it('move white pawn on "g" to make a promotion to queen', () => {
      jboard.select(5, 6);
      jboard.move(6, 7);
      expect(jboard.getPieceType(6, 7)).to.be.equal(4);
      jboard.select(7, 6);
      jboard.move(6, 7);
      expect(jboard.getPieceType(7, 6)).to.be.equal(0);
    });

    it('move white pawn on "h" to make a promotion to rook', () => {
      jboard.select(7, 6);
      jboard.move(6, 7, 1);
      expect(jboard.getPieceType(6, 7)).to.be.equal(1);
    });

    it('move white pawn on "g" to make a promotion to knight', () => {
      jboard.select(5, 6);
      jboard.move(6, 7, 2);
      expect(jboard.getPieceType(6, 7)).to.be.equal(2);
    });

    it('can\'t move black pawns', () => {
      jboard.select(5, 6);
      jboard.move(6, 7);
      jboard.select(2, 1);
      jboard.move(2, 0);
      expect(jboard.getPieceType(2, 0)).to.be.not.equal(4);
      jboard.select(6, 1);
      jboard.move(6, 0);
      expect(jboard.getPieceType(6, 0)).to.be.not.equal(4);
    });

    it('move black pawns to make a promotion to bishop', () => {
      jboard.select(5, 6);
      jboard.move(6, 7);
      jboard.select(3, 1);
      jboard.move(3, 0, 3);
      expect(jboard.getPieceType(3, 0)).to.be.equal(3);
    });

    it('move black pawns to make a promotion to rook', () => {
      jboard.select(5, 6);
      jboard.move(6, 7);
      jboard.select(3, 1);
      jboard.move(2, 0, 1);
      expect(jboard.getPieceType(2, 0)).to.be.equal(1);
    });
  });

  /*
   *   MOVEAN
   */

  describe('moveUCI', () => {
    let jboard;

    beforeEach(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.moveUCI('e4')).to.be.null;
      expect(jboard.moveUCI('e7e5QQ')).to.be.null;
      expect(jboard.moveUCI('e8e9')).to.be.null;
      expect(jboard.moveUCI('a5r4')).to.be.null;
      expect(jboard.moveUCI('d56d')).to.be.null;
      expect(jboard.moveUCI('b7b8p')).to.be.null;
      expect(jboard.moveUCI(null)).to.be.null;
    });

    it('return null if move utils illegal', () => {
      expect(jboard.moveUCI('e2e5')).to.be.null;
      expect(jboard.moveUCI('e7e5')).to.be.null;
      expect(jboard.moveUCI('a1a2')).to.be.null;
      expect(jboard.moveUCI('e8g8')).to.be.null;
      expect(jboard.moveUCI('d1e1')).to.be.null;
      expect(jboard.moveUCI('d6e7')).to.be.null;
      expect(jboard.moveUCI('e8c8')).to.be.null;
    });

    it('return string if OK', () => {
      expect(typeof jboard.moveUCI('e1f1')).to.be.equal('string');
      expect(typeof jboard.moveUCI('f5g3')).to.be.equal('string');
      expect(typeof jboard.moveUCI('f1g2')).to.be.equal('string');
      expect(typeof jboard.moveUCI('e8g8')).to.be.equal('string');
      expect(typeof jboard.moveUCI('d1d4')).to.be.equal('string');
      expect(typeof jboard.moveUCI('c5d4')).to.be.equal('string');
      expect(typeof jboard.moveUCI('g2f2')).to.be.equal('string');
      expect(typeof jboard.moveUCI('c3b1')).to.be.equal('string');
      expect(typeof jboard.moveUCI('d6d7')).to.be.equal('string');
      expect(typeof jboard.moveUCI('a8c8')).to.be.equal('string');
      expect(typeof jboard.moveUCI('d7c8n')).to.be.equal('string');
      expect(typeof jboard.moveUCI('b7b5')).to.be.equal('string');
      expect(typeof jboard.moveUCI('c8d6')).to.be.equal('string');
    });
  });

  describe('goto', () => {
    let jboard;

    beforeEach(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('return false if arguments aren\'t correct', () => {
      expect(jboard.goto('abc', 5)).to.be.false;
      expect(jboard.goto(0, 'xyz')).to.be.false;
      expect(jboard.goto([0, 'xyz'])).to.be.false;
      expect(jboard.goto({ abc: 7 })).to.be.false;
      expect(jboard.goto(null)).to.be.false;
    });

    it('return true if OK', () => {
      jboard.moveUCI('e2e4');
      jboard.moveUCI('e7e5');
      expect(jboard.goto(0, 0)).to.be.true;
      expect(jboard.goto(0, -1)).to.be.true;
      expect(jboard.goto(0, 1)).to.be.true;
    });

    it('check position after goto()', () => {
      jboard.moveUCI('e2e4');
      jboard.moveUCI('e7e5');
      jboard.moveUCI('g1f3');
      jboard.moveUCI('b8c6');
      expect(jboard.goto(0, 1)).to.be.true;
      expect(jboard.getPieceType(4, 3)).to.be.equal(0);
      expect(jboard.getPieceType(4, 4)).to.be.null;
      expect(jboard.getTurn()).to.be.equal(2);
      expect(jboard.goto(0, 4)).to.be.true;
      expect(jboard.getPieceType(2, 5)).to.be.equal(2);
      expect(jboard.getPieceType(5, 2)).to.be.equal(2);
      expect(jboard.getTurn()).to.be.equal(1);
    });
  });

  describe('writeMove', () => {
    let jboard;

    beforeEach(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('writes moves to lines array', () => {
      jboard.moveUCI('e2e4');
      expect(jboard.lines[0][1].move).to.be.equal('e2e4');
      jboard.moveUCI('g8f6');
      expect(jboard.lines[0][2].move).to.be.equal('g8f6');
    });
  });

  /*
   *   SERVICES
   */

  describe('isInCheck', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    beforeEach(() => {
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return false if square isn\'t correct', () => {
      expect(jboard.isInCheck('red')).to.be.false;
      expect(jboard.isInCheck('green')).to.be.false;
    });

    it('both kings are not in check', () => {
      expect(jboard.isInCheck(1)).to.be.false;
      expect(jboard.isInCheck(2)).to.be.false;
    });

    it('white king utils in check by queen', () => {
      jboard.handleMove({ file: 3, rank: 3 }, { file: 5, rank: 1 });
      expect(jboard.isInCheck(1)).to.be.true;
    });

    it('white king utils in discovered check by bishop', () => {
      jboard.handleMove({ file: 2, rank: 2 }, { file: 3, rank: 5 });
      expect(jboard.isInCheck(1)).to.be.true;
    });

    it('black king utils in check by pawn', () => {
      jboard.handleMove({ file: 3, rank: 5 }, { file: 3, rank: 6 });
      expect(jboard.isInCheck(2)).to.be.true;
    });
  });

  describe('isCheckmate and get Checkmate', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return true if there\'s checkmate', () => {
      jboard.setPositionByFEN('6rk/5Npp/8/8/8/8/8/4K3 b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.true;
      jboard.setPositionByFEN('6rk/5NpP/8/8/8/8/8/4K2R b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.true;
      jboard.setPositionByFEN('6rk/5Np1/7R/8/8/8/8/4K3 b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.true;
      jboard.setPositionByFEN('6rk/6p1/7R/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.true;
      jboard.setPositionByFEN('6rk/8/5r1Q/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.true;
    });

    it('return false if theresn\'t checkmate', () => {
      jboard.setPositionByFEN('6rk/5NpP/8/8/8/8/8/4K3 b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.false;
      jboard.setPositionByFEN('6rk/6p1/7R/8/8/8/8/4K3 b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.false;
      jboard.setPositionByFEN('6rk/6p1/5p1R/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.false;
      jboard.setPositionByFEN('6rk/8/5r1R/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.false;
      jboard.setPositionByFEN('6rk/6b1/5r1Q/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate(2)).to.be.false;
    });
  });

  describe('getKing', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return white king position', () => {
      const square = jboard.getKing(1);

      expect(square.file).to.be.equal(4);
      expect(square.rank).to.be.equal(0);
    });

    it('return black king position', () => {
      const square = jboard.getKing(2);

      expect(square.file).to.be.equal(4);
      expect(square.rank).to.be.equal(7);
    });
  });

  describe('cloneBoard', () => {
    let jboard;
    let newBoard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
      newBoard = JBoard.cloneBoard(jboard);
    });

    it('check white rook position on new _board', () => {
      expect(newBoard.getPieceType(0, 0)).to.be.equal(1);
    });

    it('check white rook position on new _board after move on source _board', () => {
      expect(jboard.getPieceType(0, 0)).to.be.equal(1);
      jboard.handleMove({ file: 0, rank: 0 }, { file: 1, rank: 0 });
      expect(jboard.getPieceType(0, 0)).to.be.null;
      expect(newBoard.getPieceType(0, 0)).to.be.equal(1);
    });

    it('check black rook position on source _board after move on new _board', () => {
      expect(newBoard.getPieceType(0, 7)).to.be.equal(1);
      newBoard.handleMove({ file: 0, rank: 7 }, { file: 1, rank: 7 });
      expect(newBoard.getPieceType(0, 7)).to.be.null;
      expect(jboard.getPieceType(0, 7)).to.be.equal(1);
    });
  });
});
