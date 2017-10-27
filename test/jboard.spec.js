/* eslint-disable no-unused-expressions */
import { describe, it, before, beforeEach } from 'mocha';
import { expect } from 'chai';
import JBoard from '../dev/lib/jboard';

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
      expect(jboard.selectFile).to.be.null;
      expect(jboard.selectRank).to.be.null;
      expect(jboard.enPassant).to.be.null;
    });

    it('check square colors', () => {
      expect(jboard.board[0][0].color).to.be.equal('black');
      expect(jboard.board[0][7].color).to.be.equal('white');
      expect(jboard.board[7][0].color).to.be.equal('white');
      expect(jboard.board[7][7].color).to.be.equal('black');
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
      expect(jboard.board[0][0].piece.type).to.be.equal('rook');
      expect(jboard.board[0][0].piece.color).to.be.equal('white');

      expect(jboard.board[7][0].piece.type).to.be.equal('rook');
      expect(jboard.board[7][0].piece.color).to.be.equal('white');

      expect(jboard.board[0][7].piece.type).to.be.equal('rook');
      expect(jboard.board[0][7].piece.color).to.be.equal('black');

      expect(jboard.board[7][7].piece.type).to.be.equal('rook');
      expect(jboard.board[7][7].piece.color).to.be.equal('black');
    });

    it('check knights', () => {
      expect(jboard.board[1][0].piece.type).to.be.equal('knight');
      expect(jboard.board[1][0].piece.color).to.be.equal('white');

      expect(jboard.board[6][0].piece.type).to.be.equal('knight');
      expect(jboard.board[6][0].piece.color).to.be.equal('white');

      expect(jboard.board[1][7].piece.type).to.be.equal('knight');
      expect(jboard.board[1][7].piece.color).to.be.equal('black');

      expect(jboard.board[6][7].piece.type).to.be.equal('knight');
      expect(jboard.board[6][7].piece.color).to.be.equal('black');
    });

    it('check bishops', () => {
      expect(jboard.board[2][0].piece.type).to.be.equal('bishop');
      expect(jboard.board[2][0].piece.color).to.be.equal('white');

      expect(jboard.board[5][0].piece.type).to.be.equal('bishop');
      expect(jboard.board[5][0].piece.color).to.be.equal('white');

      expect(jboard.board[2][7].piece.type).to.be.equal('bishop');
      expect(jboard.board[2][7].piece.color).to.be.equal('black');

      expect(jboard.board[5][7].piece.type).to.be.equal('bishop');
      expect(jboard.board[5][7].piece.color).to.be.equal('black');
    });

    it('check queens', () => {
      expect(jboard.board[3][0].piece.type).to.be.equal('queen');
      expect(jboard.board[3][0].piece.color).to.be.equal('white');
      expect(jboard.board[3][7].piece.type).to.be.equal('queen');
      expect(jboard.board[3][7].piece.color).to.be.equal('black');
    });

    it('check kings', () => {
      expect(jboard.board[4][0].piece.type).to.be.equal('king');
      expect(jboard.board[4][0].piece.color).to.be.equal('white');
      expect(jboard.board[4][7].piece.type).to.be.equal('king');
      expect(jboard.board[4][7].piece.color).to.be.equal('black');
    });

    it('check white pawns', () => {
      expect(jboard.board[0][1].piece.type).to.be.equal('pawn');
      expect(jboard.board[7][1].piece.color).to.be.equal('white');
    });

    it('check black pawns', () => {
      expect(jboard.board[0][6].piece.type).to.be.equal('pawn');
      expect(jboard.board[7][6].piece.color).to.be.equal('black');
    });

    it('check castlings', () => {
      expect(jboard.castling.white).to.be.equal(3);
      expect(jboard.castling.black).to.be.equal(3);
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
            type: 'pawn',
            color: 'white',
          },
        },
        {
          file: 1,
          rank: 2,
          piece: {
            type: 'knight',
            color: 'black',
          },
        },
        {
          file: 5,
          rank: 7,
          piece: {
            type: 'queen',
            color: 'black',
          },
        },
      ]);
    });

    it('check pawn', () => {
      expect(jboard.board[0][1].piece.type).to.be.equal('pawn');
      expect(jboard.board[0][1].piece.color).to.be.equal('white');
    });

    it('check knight', () => {
      expect(jboard.board[1][2].piece.type).to.be.equal('knight');
      expect(jboard.board[1][2].piece.color).to.be.equal('black');
    });

    it('check queen', () => {
      expect(jboard.board[5][7].piece.type).to.be.equal('queen');
      expect(jboard.board[5][7].piece.color).to.be.equal('black');
    });
  });

  describe('resetPosition', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('check pawn a2 before reset', () => {
      expect(jboard.board[0][1].piece.type).to.be.equal('pawn');
      expect(jboard.board[0][1].piece.color).to.be.equal('white');
    });

    it('check knight b1 before reset', () => {
      expect(jboard.board[1][0].piece.type).to.be.equal('knight');
      expect(jboard.board[1][0].piece.color).to.be.equal('white');
    });

    it('check rook h8 before reset', () => {
      expect(jboard.board[7][7].piece.type).to.be.equal('rook');
      expect(jboard.board[7][7].piece.color).to.be.equal('black');
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
      jboard.setPiece(7, 1, 'pawn', 'white');
      expect(jboard.board[7][1].piece.type).to.be.equal('pawn');
      expect(jboard.board[7][1].piece.color).to.be.equal('white');
    });

    it('check square c3 after setup', () => {
      jboard.setPiece(2, 2, 'knight', 'white');
      expect(jboard.board[2][2].piece.type).to.be.equal('knight');
      expect(jboard.board[2][2].piece.color).to.be.equal('white');
    });

    it('check square e4 after setup', () => {
      jboard.setPiece(4, 3, 'rook', 'black');
      expect(jboard.board[4][3].piece.type).to.be.equal('rook');
      expect(jboard.board[4][3].piece.color).to.be.equal('black');
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

    it('return "black" for (0, 0), etc', () => {
      expect(jboard.getSquareColor(0, 0)).to.be.equal('black');
      expect(jboard.getSquareColor(0, 2)).to.be.equal('black');

      expect(jboard.getSquareColor(1, 1)).to.be.equal('black');
      expect(jboard.getSquareColor(7, 7)).to.be.equal('black');

      expect(jboard.getSquareColor(5, 7)).to.be.equal('black');
      expect(jboard.getSquareColor(3, 7)).to.be.equal('black');
    });

    it('return "white" for (0, 1), etc', () => {
      expect(jboard.getSquareColor(0, 1)).to.be.equal('white');
      expect(jboard.getSquareColor(0, 3)).to.be.equal('white');

      expect(jboard.getSquareColor(1, 2)).to.be.equal('white');
      expect(jboard.getSquareColor(0, 7)).to.be.equal('white');

      expect(jboard.getSquareColor(2, 7)).to.be.equal('white');
      expect(jboard.getSquareColor(6, 7)).to.be.equal('white');
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

      expect(jboard.getPieceType(0, 0)).to.be.equal('rook');
      expect(jboard.getPieceType(7, 7)).to.be.equal('rook');
      expect(jboard.getPieceType(1, 0)).to.be.equal('knight');
      expect(jboard.getPieceType(6, 7)).to.be.equal('knight');
      expect(jboard.getPieceType(5, 7)).to.be.equal('bishop');
      expect(jboard.getPieceType(1, 1)).to.be.equal('pawn');
      expect(jboard.getPieceType(6, 6)).to.be.equal('pawn');
      expect(jboard.getPieceType(3, 0)).to.be.equal('queen');
      expect(jboard.getPieceType(4, 7)).to.be.equal('king');
    });
  });

  describe('getPieceColor', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.getPieceColor(0, 8)).to.be.null;
      expect(jboard.getPieceColor(8, 0)).to.be.null;
      expect(jboard.getPieceColor(-1, 0)).to.be.null;
      expect(jboard.getPieceColor(0, -1)).to.be.null;
    });

    it('return piece color for (0, 0), etc', () => {
      expect(jboard.getPieceType(1, 2)).to.be.null;
      expect(jboard.getPieceType(3, 5)).to.be.null;

      expect(jboard.getPieceColor(0, 1)).to.be.equal('white');
      expect(jboard.getPieceColor(1, 0)).to.be.equal('white');
      expect(jboard.getPieceColor(2, 0)).to.be.equal('white');
      expect(jboard.getPieceColor(2, 7)).to.be.equal('black');
      expect(jboard.getPieceColor(3, 0)).to.be.equal('white');
      expect(jboard.getPieceColor(3, 7)).to.be.equal('black');
      expect(jboard.getPieceColor(4, 1)).to.be.equal('white');
      expect(jboard.getPieceColor(5, 6)).to.be.equal('black');
      expect(jboard.getPieceColor(6, 7)).to.be.equal('black');
      expect(jboard.getPieceColor(7, 6)).to.be.equal('black');
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

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.setPieceType(0, 8, 'pawn')).to.be.null;
      expect(jboard.setPieceType(8, 0, 'king')).to.be.null;
      expect(jboard.setPieceType(-5, 5, 'bishop')).to.be.null;
      expect(jboard.setPieceType(0, -1, 'queen')).to.be.null;
    });

    it('return true if setting was successful', () => {
      expect(jboard.setPieceType(0, 0, 'pawn')).to.be.true;
      expect(jboard.setPieceType(1, 1, 'knight')).to.be.true;
      expect(jboard.setPieceType(7, 6, null)).to.be.true;
      expect(jboard.setPieceType(5, 4, 'bishop')).to.be.true;
    });

    it('set piece type and check', () => {
      expect(jboard.getPieceType(1, 2)).to.be.null;
      jboard.setPieceType(1, 2, 'pawn');
      expect(jboard.getPieceType(1, 2)).to.be.equal('pawn');

      expect(jboard.getPieceType(2, 4)).to.be.null;
      jboard.setPieceType(2, 4, 'queen');
      expect(jboard.getPieceType(2, 4)).to.be.equal('queen');

      expect(jboard.getPieceType(1, 1)).to.be.equal('knight');
      jboard.setPieceType(1, 1, 'bishop');
      expect(jboard.getPieceType(1, 1)).to.be.equal('bishop');

      expect(jboard.getPieceType(2, 4)).to.be.equal('queen');
      jboard.setPieceType(2, 4, 'king');
      expect(jboard.getPieceType(2, 4)).to.be.equal('king');
    });
  });

  describe('setPieceColor', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.setPieceColor(0, 8, 'white')).to.be.null;
      expect(jboard.setPieceColor(8, 0, 'white')).to.be.null;
      expect(jboard.setPieceColor(-3, 0, 'black')).to.be.null;
      expect(jboard.setPieceColor(0, -1, 'black')).to.be.null;
    });

    it('return true if setting was successful', () => {
      expect(jboard.setPieceColor(0, 0, 'white')).to.be.true;
      expect(jboard.setPieceColor(1, 1, 'white')).to.be.true;
      expect(jboard.setPieceColor(7, 6, null)).to.be.true;
      expect(jboard.setPieceColor(5, 4, 'black')).to.be.true;
    });

    it('set piece type and check', () => {
      expect(jboard.getPieceColor(1, 2)).to.be.null;
      jboard.setPieceColor(1, 2, 'black');
      expect(jboard.getPieceColor(1, 2)).to.be.equal('black');

      expect(jboard.getPieceColor(2, 4)).to.be.null;
      jboard.setPieceColor(2, 4, 'white');
      expect(jboard.getPieceColor(2, 4)).to.be.equal('white');

      expect(jboard.getPieceColor(1, 1)).to.be.equal('white');
      jboard.setPieceColor(1, 1, 'black');
      expect(jboard.getPieceColor(1, 1)).to.be.equal('black');

      expect(jboard.getPieceColor(5, 4)).to.be.equal('black');
      jboard.setPieceColor(5, 4, 'white');
      expect(jboard.getPieceColor(5, 4)).to.be.equal('white');
    });
  });

  /*
   *   EN PASSANT
   */

  describe('EnPassant', () => {
    let jboard;

    beforeEach(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN('4k3/p2pppp1/1p6/1P1P1P2/P1p4p/8/3PP1PP/4K3 w - - 0 1');
    });

    it('isEnPassant return false or true', () => {
      expect(jboard.isEnPassant(6, 2)).to.be.false;
      jboard.doMove({ file: 6, rank: 1 }, { file: 6, rank: 3 });
      expect(jboard.isEnPassant(6, 2)).to.be.true;
      expect(jboard.isEnPassant(6, 5)).to.be.false;
      jboard.doMove({ file: 6, rank: 6 }, { file: 6, rank: 4 });
      expect(jboard.isEnPassant(6, 5)).to.be.true;
      jboard.doMove({ file: 5, rank: 4 }, { file: 6, rank: 5 });
      expect(jboard.isEnPassant(6, 5)).to.be.false;
      jboard.doMove({ file: 4, rank: 6 }, { file: 4, rank: 4 });
      expect(jboard.isEnPassant(4, 5)).to.be.true;
    });

    it('EnPassant return null if theresn\'t en passant', () => {
      expect(jboard.EnPassant).to.be.null;
      jboard.doMove({ file: 4, rank: 1 }, { file: 4, rank: 3 });
      expect(jboard.EnPassant).to.be.null;
      jboard.doMove({ file: 6, rank: 6 }, { file: 6, rank: 5 });
      expect(jboard.EnPassant).to.be.null;
      jboard.doMove({ file: 0, rank: 6 }, { file: 0, rank: 4 });
      jboard.doMove({ file: 1, rank: 4 }, { file: 0, rank: 5 });
      expect(jboard.EnPassant).to.be.null;
    });

    it('EnPassant return square if en passant ithere\'s', () => {
      jboard.doMove({ file: 6, rank: 1 }, { file: 6, rank: 3 });
      expect(jboard.EnPassant.file).to.be.equal(6);
      expect(jboard.EnPassant.rank).to.be.equal(2);
      jboard.doMove({ file: 6, rank: 6 }, { file: 6, rank: 4 });
      expect(jboard.EnPassant.file).to.be.equal(6);
      expect(jboard.EnPassant.rank).to.be.equal(5);
    });
  });

  /*
   *   PICK
   */

  describe('pickSquare', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.pickSquare(0, 8)).to.be.null;
      expect(jboard.pickSquare(8, 0)).to.be.null;
      expect(jboard.pickSquare(-1, 0)).to.be.null;
      expect(jboard.pickSquare(0, -1)).to.be.null;
    });

    it('return true if arguments are correct', () => {
      expect(jboard.pickSquare(0, 0)).to.be.true;
      expect(jboard.pickSquare(1, 5)).to.be.true;
      expect(jboard.pickSquare(5, 6)).to.be.true;
      expect(jboard.pickSquare(7, 7)).to.be.true;
    });

    it('check selected square', () => {
      jboard.pickSquare(1, 5);
      expect(jboard.isSquareSelected(1, 5)).to.be.true;
      expect(jboard.isSquareSelected(7, 7)).to.be.false;

      jboard.pickSquare(6, 7);
      expect(jboard.isSquareSelected(5, 1)).to.be.false;
      expect(jboard.isSquareSelected(6, 7)).to.be.true;
    });

    it('check marked square', () => {
      jboard.pickSquare(0, 1);

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
      jboard.pickSquare(4, 4);
    });

    it('reset selected square', () => {
      expect(jboard.isSquareSelected(4, 4)).to.be.true;
      expect(jboard.isSquareSelected(4, 5)).to.be.false;
      jboard.resetSelect(jboard.board);
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
      jboard.pickSquare(1, 5);
      expect(jboard.isSquareSelected(0, 0)).to.be.false;
      expect(jboard.isSquareSelected(1, 5)).to.be.true;

      jboard.pickSquare(7, 7);
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

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.markMoves(0, 8)).to.be.null;
      expect(jboard.markMoves(8, 0)).to.be.null;
      expect(jboard.markMoves(-1, 0)).to.be.null;
      expect(jboard.markMoves(0, -1)).to.be.null;
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
   *   DO MOVE
   */

  describe('doMove', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    beforeEach(() => {
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.doMove({ file: 0, rank: 5 }, { file: 8, rank: 7 })).to.be.null;
      expect(jboard.doMove({ file: 0, rank: -1 }, { file: 7, rank: 7 })).to.be.null;
      expect(jboard.doMove({ file: 0, rank: 0 }, { file: 6, rank: 9 })).to.be.null;
      expect(jboard.doMove({ file: 10, rank: 8 }, { file: 18, rank: 8 })).to.be.null;
    });

    it('return null if there is no piece on start square', () => {
      expect(jboard.doMove({ file: 0, rank: 2 }, { file: 4, rank: 3 })).to.be.null;
      expect(jboard.doMove({ file: 3, rank: 2 }, { file: 7, rank: 7 })).to.be.null;
      expect(jboard.doMove({ file: 6, rank: 7 }, { file: 4, rank: 6 })).to.be.null;
      expect(jboard.doMove({ file: 5, rank: 5 }, { file: 2, rank: 0 })).to.be.null;
    });

    it('return null if start piece color equal stop piece color', () => {
      expect(jboard.doMove({ file: 7, rank: 1 }, { file: 6, rank: 2 })).to.be.null;
      expect(jboard.doMove({ file: 2, rank: 0 }, { file: 1, rank: 1 })).to.be.null;
      expect(jboard.doMove({ file: 3, rank: 7 }, { file: 4, rank: 7 })).to.be.null;
      expect(jboard.doMove({ file: 5, rank: 4 }, { file: 6, rank: 6 })).to.be.null;
    });

    it('return true if move was successful', () => {
      expect(jboard.doMove({ file: 4, rank: 1 }, { file: 4, rank: 3 })).to.be.true;
      expect(jboard.doMove({ file: 2, rank: 4 }, { file: 2, rank: 3 })).to.be.true;
      expect(jboard.doMove({ file: 6, rank: 6 }, { file: 6, rank: 5 })).to.be.true;
      expect(jboard.doMove({ file: 0, rank: 1 }, { file: 0, rank: 3 })).to.be.true;
    });

    it('check stop square if move was successful', () => {
      let color = jboard.getPieceColor(0, 1);
      let type = jboard.getPieceType(0, 1);

      jboard.doMove({ file: 0, rank: 1 }, { file: 0, rank: 3 });

      expect(jboard.getPieceColor(0, 3) === color).to.be.true;
      expect(jboard.getPieceType(0, 3) === type).to.be.true;

      color = jboard.getPieceColor(7, 3);
      type = jboard.getPieceType(7, 3);

      jboard.doMove({ file: 7, rank: 3 }, { file: 6, rank: 2 });

      expect(jboard.getPieceColor(6, 2) === color).to.be.true;
      expect(jboard.getPieceType(6, 2) === type).to.be.true;
    });

    it('check start square if move was successful', () => {
      expect(jboard.getPieceColor(0, 1)).to.be.equal('white');
      expect(jboard.getPieceType(0, 1)).to.be.equal('pawn');
      jboard.doMove({ file: 0, rank: 1 }, { file: 0, rank: 3 });
      expect(jboard.getPieceColor(0, 1)).to.be.null;
      expect(jboard.getPieceType(0, 1)).to.be.null;

      expect(jboard.getPieceColor(7, 3)).to.be.equal('black');
      expect(jboard.getPieceType(7, 3)).to.be.equal('pawn');
      jboard.doMove({ file: 7, rank: 3 }, { file: 6, rank: 2 });
      expect(jboard.getPieceColor(7, 3)).to.be.null;
      expect(jboard.getPieceType(7, 3)).to.be.null;
    });

    it('turn color after move', () => {
      expect(jboard.Turn).to.be.equal('white');
      jboard.doMove({ file: 0, rank: 1 }, { file: 0, rank: 3 });
      expect(jboard.Turn).to.be.equal('black');
      jboard.doMove({ file: 2, rank: 2 }, { file: 3, rank: 0 });
      expect(jboard.Turn).to.be.equal('white');
      jboard.doMove({ file: 2, rank: 0 }, { file: 3, rank: 1 });
      expect(jboard.Turn).to.be.equal('black');
    });
  });

  /*
   *   CHECK MOVE
   */

  describe('checkMove', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    beforeEach(() => {
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return false if arguments aren\'t correct', () => {
      expect(jboard.checkMove({ file: 0, rank: 5 }, { file: 8, rank: 7 })).to.be.null;
      expect(jboard.checkMove({ file: 0, rank: -1 }, { file: 7, rank: 7 })).to.be.null;
      expect(jboard.checkMove({ file: 0, rank: 0 }, { file: 6, rank: 9 })).to.be.null;
      expect(jboard.checkMove({ file: 10, rank: 8 }, { file: 18, rank: 8 })).to.be.null;
    });

    it('return false if there is no piece on start square', () => {
      expect(jboard.checkMove({ file: 0, rank: 2 }, { file: 4, rank: 3 })).to.be.null;
      expect(jboard.checkMove({ file: 3, rank: 2 }, { file: 7, rank: 7 })).to.be.null;
      expect(jboard.checkMove({ file: 6, rank: 7 }, { file: 4, rank: 6 })).to.be.null;
      expect(jboard.checkMove({ file: 5, rank: 5 }, { file: 2, rank: 0 })).to.be.null;
    });

    it('return true if move is legal', () => {
      expect(jboard.checkMove({ file: 4, rank: 1 }, { file: 4, rank: 3 })).to.be.true;
      expect(jboard.checkMove({ file: 2, rank: 4 }, { file: 2, rank: 3 })).to.be.true;
      expect(jboard.checkMove({ file: 6, rank: 6 }, { file: 6, rank: 5 })).to.be.true;
      expect(jboard.checkMove({ file: 0, rank: 1 }, { file: 0, rank: 3 })).to.be.true;
    });

    it('return false if move is illegal', () => {
      expect(jboard.checkMove({ file: 5, rank: 6 }, { file: 5, rank: 5 })).to.be.false;
    });
  });

  /*
   *   GET PAWN MOVES
   */

  describe('getMovesPawn', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return two squares for pawn a2', () => {
      const moves = jboard.getMovesPawn(0, 1);
      expect(moves[0].file).to.be.equal(0);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1].file).to.be.equal(0);
      expect(moves[1].rank).to.be.equal(3);
      expect(moves[2]).to.be.undefined;
    });

    it('return two squares for pawn e2', () => {
      const moves = jboard.getMovesPawn(4, 1);

      expect(moves[0].file).to.be.equal(4);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1].file).to.be.equal(4);
      expect(moves[1].rank).to.be.equal(3);
      expect(moves[2]).to.be.undefined;
    });

    it('return only square for pawn c5', () => {
      const moves = jboard.getMovesPawn(2, 4);

      expect(moves[0].file).to.be.equal(2);
      expect(moves[0].rank).to.be.equal(3);
      expect(moves[1]).to.be.undefined;
    });

    it('return null for pawn d5', () => {
      const moves = jboard.getMovesPawn(3, 4);
      expect(moves[0]).to.be.undefined;
    });

    it('return null for pawn f4', () => {
      const moves = jboard.getMovesPawn(5, 3);
      expect(moves[0]).to.be.undefined;
    });

    it('return three squares for pawn b2', () => {
      const moves = jboard.getMovesPawn(1, 1);

      expect(moves[0].file).to.be.equal(1);
      expect(moves[0].rank).to.be.equal(2);

      expect(moves[1].file).to.be.equal(1);
      expect(moves[1].rank).to.be.equal(3);

      expect(moves[2].file).to.be.equal(2);
      expect(moves[2].rank).to.be.equal(2);

      expect(moves[3]).to.be.undefined;
    });

    it('return only square for pawn h2', () => {
      const moves = jboard.getMovesPawn(7, 1);

      expect(moves[0].file).to.be.equal(7);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1]).to.be.undefined;
    });

    it('return two squares for pawn h4', () => {
      const moves = jboard.getMovesPawn(7, 3);

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

  describe('getMovesKing', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return two squares for white king', () => {
      const moves = jboard.getMovesKing(4, 0);

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
      const moves = jboard.getMovesKing(4, 7);

      expect(moves[0].file).to.be.equal(3);
      expect(moves[0].rank).to.be.equal(6);

      expect(moves[1].file).to.be.equal(3);
      expect(moves[1].rank).to.be.equal(7);

      expect(moves[2].file).to.be.equal(2);
      expect(moves[2].rank).to.be.equal(7);

      expect(moves[3]).to.be.undefined;
    });
  });

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
  });

  /*
   *   GET PIECE MOVES
   */

  describe('getMovesPiece', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return two squares for knight c3', () => {
      const moves = jboard.getMovesPiece(2, 2);

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
      const moves = jboard.getMovesPiece(5, 4);

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
      const moves = jboard.getMovesPiece(7, 7);

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
      const moves = jboard.getMovesPiece(7, 4);

      expect(moves[0].file).to.be.equal(6);
      expect(moves[0].rank).to.be.equal(3);

      expect(moves[1].file).to.be.equal(6);
      expect(moves[1].rank).to.be.equal(5);

      expect(moves[2].file).to.be.equal(5);
      expect(moves[2].rank).to.be.equal(6);

      expect(moves[3]).to.be.undefined;
    });
  });

  describe('getAttackedSquares', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return squares, which are attacked by bishop move', () => {
      const square = jboard.getAttackedSquares('bishop', 'black', 1, 7);

      expect(square[0].file).to.be.equal(2);
      expect(square[0].rank).to.be.equal(6);

      expect(square[1].file).to.be.equal(3);
      expect(square[1].rank).to.be.equal(5);

      expect(square[2]).to.be.undefined;
    });
  });

  /*
   *   VALIDATORS
   */

  describe('isSquare', () => {
    it('return false if square isn\'t correct', () => {
      expect(JBoard.isSquare(0)).to.be.false;
      expect(JBoard.isSquare(8)).to.be.false;
      expect(JBoard.isSquare(0, null)).to.be.false;
      expect(JBoard.isSquare(null, 5)).to.be.false;
      expect(JBoard.isSquare(0, undefined)).to.be.false;
      expect(JBoard.isSquare(undefined, 2)).to.be.false;
      expect(JBoard.isSquare(0, 8)).to.be.false;
      expect(JBoard.isSquare(8, 0)).to.be.false;
      expect(JBoard.isSquare(-1, 0)).to.be.false;
      expect(JBoard.isSquare(0, -1)).to.be.false;
      expect(JBoard.isSquare({ file: 0, rank: 8 })).to.be.false;
      expect(JBoard.isSquare({ file: 8, rank: 5 })).to.be.false;
      expect(JBoard.isSquare({ file: 2, rank: 8 })).to.be.false;
      expect(JBoard.isSquare({ file: 3, rank: 9 })).to.be.false;
      expect(JBoard.isSquare({ file: null, rank: 9 })).to.be.false;
      expect(JBoard.isSquare({ file: 3, rank: undefined })).to.be.false;
    });

    it('return true if square is correct', () => {
      expect(JBoard.isSquare(0, 0)).to.be.true;
      expect(JBoard.isSquare(7, 7)).to.be.true;
      expect(JBoard.isSquare(0, 3)).to.be.true;
      expect(JBoard.isSquare(3, 5)).to.be.true;
      expect(JBoard.isSquare({ file: 1, rank: 7 })).to.be.true;
      expect(JBoard.isSquare({ file: 5, rank: 4 })).to.be.true;
      expect(JBoard.isSquare({ file: 6, rank: 2 })).to.be.true;
      expect(JBoard.isSquare({ file: 7, rank: 0 })).to.be.true;
    });
  });

  /*
   *   SERVICES
   */

  describe('isSquareAttacked', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return false if square isn\'t correct', () => {
      expect(jboard.isSquareAttacked(0, 8)).to.be.null;
      expect(jboard.isSquareAttacked(8, 0)).to.be.null;
      expect(jboard.isSquareAttacked(-1, 0)).to.be.null;
      expect(jboard.isSquareAttacked(0, -1)).to.be.null;
    });

    it('return true if square is attacked', () => {
      expect(jboard.isSquareAttacked('white', 2, 2)).to.be.true;
      expect(jboard.isSquareAttacked('white', 2, 7)).to.be.true;
      expect(jboard.isSquareAttacked('black', 4, 6)).to.be.true;
      expect(jboard.isSquareAttacked('black', 5, 7)).to.be.true;

      expect(jboard.isSquareAttacked('white', 0, 5)).to.be.true;
      expect(jboard.isSquareAttacked('white', 1, 5)).to.be.true;
      expect(jboard.isSquareAttacked('black', 3, 2)).to.be.true;
      expect(jboard.isSquareAttacked('black', 5, 2)).to.be.true;
    });

    it('return true if square isn\'t attacked', () => {
      expect(jboard.isSquareAttacked('black', 0, 3)).to.be.false;
      expect(jboard.isSquareAttacked('black', 6, 3)).to.be.false;
      expect(jboard.isSquareAttacked('white', 6, 2)).to.be.false;
      expect(jboard.isSquareAttacked('white', 1, 0)).to.be.false;
    });
  });

  describe('isSquareAttackedByPawn', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return false if square isn\'t correct', () => {
      expect(jboard.isSquareAttackedByPawn(0, 8)).to.be.null;
      expect(jboard.isSquareAttackedByPawn(8, 0)).to.be.null;
      expect(jboard.isSquareAttackedByPawn(-1, 0)).to.be.null;
      expect(jboard.isSquareAttackedByPawn(0, -1)).to.be.null;
    });

    it('return true if square is attacked by pawn', () => {
      expect(jboard.isSquareAttackedByPawn('white', 0, 5)).to.be.true;
      expect(jboard.isSquareAttackedByPawn('white', 1, 5)).to.be.true;
      expect(jboard.isSquareAttackedByPawn('black', 3, 2)).to.be.true;
      expect(jboard.isSquareAttackedByPawn('black', 5, 2)).to.be.true;
    });

    it('return false if square isn\'t attacked by pawn', () => {
      expect(jboard.isSquareAttackedByPawn('white', 0, 4)).to.be.false;
      expect(jboard.isSquareAttackedByPawn('white', 1, 4)).to.be.false;
      expect(jboard.isSquareAttackedByPawn('black', 3, 3)).to.be.false;
      expect(jboard.isSquareAttackedByPawn('black', 5, 3)).to.be.false;
    });
  });

  describe('isCheck', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    beforeEach(() => {
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return false if square isn\'t correct', () => {
      expect(jboard.isCheck('red')).to.be.null;
      expect(jboard.isCheck('green')).to.be.null;
    });

    it('both kings are not in check', () => {
      expect(jboard.isCheck('white')).to.be.false;
      expect(jboard.isCheck('black')).to.be.false;
    });

    it('white king is in check by queen', () => {
      jboard.doMove({ file: 3, rank: 3 }, { file: 5, rank: 1 });
      expect(jboard.isCheck('white')).to.be.true;
    });

    it('white king is in discovered check by bishop', () => {
      jboard.doMove({ file: 2, rank: 2 }, { file: 3, rank: 5 });
      expect(jboard.isCheck('white')).to.be.true;
    });

    it('black king is in check by pawn', () => {
      jboard.doMove({ file: 3, rank: 5 }, { file: 3, rank: 6 });
      expect(jboard.isCheck('black')).to.be.true;
    });
  });

  describe('isCheckmate and get Checkmate', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return true if there\'s checkmate', () => {
      jboard.setPositionByFEN('6rk/5Npp/8/8/8/8/8/4K3 b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.true;
      expect(jboard.Checkmate).to.be.true;
      jboard.setPositionByFEN('6rk/5NpP/8/8/8/8/8/4K2R b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.true;
      expect(jboard.Checkmate).to.be.true;
      jboard.setPositionByFEN('6rk/5Np1/7R/8/8/8/8/4K3 b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.true;
      expect(jboard.Checkmate).to.be.true;
      jboard.setPositionByFEN('6rk/6p1/7R/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.true;
      expect(jboard.Checkmate).to.be.true;
      jboard.setPositionByFEN('6rk/8/5r1Q/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.true;
      expect(jboard.Checkmate).to.be.true;
    });

    it('return false if theresn\'t checkmate', () => {
      jboard.setPositionByFEN('6rk/5NpP/8/8/8/8/8/4K3 b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.false;
      expect(jboard.Checkmate).to.be.false;
      jboard.setPositionByFEN('6rk/6p1/7R/8/8/8/8/4K3 b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.false;
      expect(jboard.Checkmate).to.be.false;
      jboard.setPositionByFEN('6rk/6p1/5p1R/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.false;
      expect(jboard.Checkmate).to.be.false;
      jboard.setPositionByFEN('6rk/8/5r1R/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.false;
      expect(jboard.Checkmate).to.be.false;
      jboard.setPositionByFEN('6rk/6b1/5r1Q/8/8/8/8/B3K3 b - - 0 1');
      expect(jboard.isCheckmate('black')).to.be.false;
      expect(jboard.Checkmate).to.be.false;
    });
  });

  describe('getKing', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return false if square isn\'t correct', () => {
      expect(jboard.getKing('red')).to.be.null;
      expect(jboard.getKing('green')).to.be.null;
    });

    it('return white king position', () => {
      const square = jboard.getKing('white');

      expect(square.file).to.be.equal(4);
      expect(square.rank).to.be.equal(0);
    });

    it('return black king position', () => {
      const square = jboard.getKing('black');

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
      newBoard = jboard.cloneBoard(jboard);
    });

    it('check white rook position on new _board', () => {
      expect(newBoard.getPieceType(0, 0)).to.be.equal('rook');
    });

    it('check white rook position on new _board after move on source _board', () => {
      expect(jboard.getPieceType(0, 0)).to.be.equal('rook');
      jboard.doMove({ file: 0, rank: 0 }, { file: 1, rank: 0 });
      expect(jboard.getPieceType(0, 0)).to.be.null;
      expect(newBoard.getPieceType(0, 0)).to.be.equal('rook');
    });

    it('check black rook position on source _board after move on new _board', () => {
      expect(newBoard.getPieceType(0, 7)).to.be.equal('rook');
      newBoard.doMove({ file: 0, rank: 7 }, { file: 1, rank: 7 });
      expect(newBoard.getPieceType(0, 7)).to.be.null;
      expect(jboard.getPieceType(0, 7)).to.be.equal('rook');
    });
  });

  /*
   *   FEN
   */

  describe('get FEN', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('get FEN of initial position', () => {
      jboard.setUp();
      expect(jboard.FEN)
        .to.be.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    });

    it('get FEN of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(jboard.FEN)
        .to.be.equal('r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1');
    });
  });

  describe('getFENPiece', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUp();
    });

    it('return null if square is empty', () => {
      expect(jboard.getFENPiece(0, 4)).to.be.null;
      expect(jboard.getFENPiece(4, 5)).to.be.null;
      expect(jboard.getFENPiece(6, 3)).to.be.null;
    });

    it('return FEN of white pieces', () => {
      expect(jboard.getFENPiece(0, 0)).to.be.equal('R');
      expect(jboard.getFENPiece(4, 0)).to.be.equal('K');
      expect(jboard.getFENPiece(2, 1)).to.be.equal('P');
    });

    it('return FEN of black pieces', () => {
      expect(jboard.getFENPiece(1, 7)).to.be.equal('n');
      expect(jboard.getFENPiece(2, 7)).to.be.equal('b');
      expect(jboard.getFENPiece(3, 7)).to.be.equal('q');
    });
  });

  describe('getFENBoard', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('get FEN _board of initial position', () => {
      jboard.setUp();
      expect(jboard.getFENBoard())
        .to.be.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    });

    it('get FEN _board of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(jboard.getFENBoard())
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
      expect(jboard.getFENTurn()).to.be.equal('w');
    });

    it('get FEN turn of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(jboard.getFENTurn()).to.be.equal('w');
    });
  });

  describe('getFENCastling', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('get FEN castling of initial position', () => {
      jboard.setUp();
      expect(jboard.getFENCastling()).to.be.equal('KQkq');
    });

    it('get FEN castling of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(jboard.getFENCastling()).to.be.equal('KQkq');
    });

    it('get "Qk" if castling available in queenside for white ' +
      'and in kingside for black', () => {
      jboard.castling.white = 2;
      jboard.castling.black = 1;
      expect(jboard.getFENCastling()).to.be.equal('Qk');
    });

    it('get "Kq" if castling available in kingside for white ' +
      'and in queenside for black', () => {
      jboard.castling.white = 1;
      jboard.castling.black = 2;
      expect(jboard.getFENCastling()).to.be.equal('Kq');
    });

    it('get "-" if castling unavailable', () => {
      jboard.castling.white = 0;
      jboard.castling.black = 0;
      expect(jboard.getFENCastling()).to.be.equal('-');
    });
  });

  describe('getFENEnPassant', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return "-" for initial position', () => {
      jboard.setUp();
      expect(jboard.getFENEnPassant()).to.be.equal('-');
    });

    it('return "-" for test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(jboard.getFENEnPassant()).to.be.equal('-');
    });

    it('return "b3" for test position after two moves', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      jboard.turn = 'black';
      jboard.doMove({ file: 2, rank: 4 }, { file: 2, rank: 3 });
      jboard.doMove({ file: 1, rank: 1 }, { file: 1, rank: 3 });
      expect(jboard.getFENEnPassant()).to.be.equal('b3');
    });
  });

  describe('parseFENRank', () => {
    it('return null for too long string', () => {
      expect(JBoard.parseFENRank('rnbqkbnrr')).to.be.null;
    });

    it('return null for incorrect string', () => {
      expect(JBoard.parseFENRank('rnbqk5nr')).to.be.null;
      expect(JBoard.parseFENRank('77b7nr')).to.be.null;
      expect(JBoard.parseFENRank('r9knr')).to.be.null;
      expect(JBoard.parseFENRank('90')).to.be.null;
      expect(JBoard.parseFENRank('r7000r')).to.be.null;
      expect(JBoard.parseFENRank('rnfqkbnr')).to.be.null;
    });

    it('return array for correct string', () => {
      expect(JBoard.parseFENRank('rnbqk1nr')[0].type).to.be.equal('rook');
      expect(JBoard.parseFENRank('rnbqk1nr')[0].color).to.be.equal('black');
      expect(JBoard.parseFENRank('rn1qk1nr')[7].type).to.be.equal('rook');
      expect(JBoard.parseFENRank('rn1qk1nr')[7].color).to.be.equal('black');
      expect(JBoard.parseFENRank('rnbq2nr')[1].type).to.be.equal('knight');
      expect(JBoard.parseFENRank('rnbq2nr')[1].color).to.be.equal('black');
      expect(JBoard.parseFENRank('rnbqk1nr')[6].type).to.be.equal('knight');
      expect(JBoard.parseFENRank('rnbqk1nr')[6].color).to.be.equal('black');
      expect(JBoard.parseFENRank('1nbqk1nr')[3].type).to.be.equal('queen');
      expect(JBoard.parseFENRank('r1Bq4')[2].type).to.be.equal('bishop');
      expect(JBoard.parseFENRank('r1Bq4')[2].color).to.be.equal('white');
    });
  });
});
