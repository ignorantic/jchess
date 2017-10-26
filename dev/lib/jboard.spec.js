import { describe, it, before, beforeEach } from 'mocha';
import chai from 'chai';
import JBoard from './jboard';

const { expect } = chai;

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
      expect(jboard.selectFile).to.be.equal(null);
      expect(jboard.selectRank).to.be.equal(null);
      expect(jboard.enPassant).to.be.equal(null);
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
      jboard.setUpInitial();
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
      jboard.setUpInitial();
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

      expect(jboard.board[0][1].piece.type).to.be.equal(null);
      expect(jboard.board[0][1].piece.color).to.be.equal(null);
    });

    it('check knight b1 after reset', () => {
      expect(jboard.board[1][0].piece.type).to.be.equal(null);
      expect(jboard.board[1][0].piece.color).to.be.equal(null);
    });

    it('check rook h8 after reset', () => {
      expect(jboard.board[7][7].piece.type).to.be.equal(null);
      expect(jboard.board[7][7].piece.color).to.be.equal(null);
    });
  });

  describe('setPiece', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('check square h2 before setup', () => {
      expect(jboard.board[7][1].piece.type).to.be.equal(null);
      expect(jboard.board[7][1].piece.color).to.be.equal(null);
    });

    it('check square c3 before setup', () => {
      expect(jboard.board[2][2].piece.type).to.be.equal(null);
      expect(jboard.board[2][2].piece.color).to.be.equal(null);
    });

    it('check square e4 before setup', () => {
      expect(jboard.board[4][3].piece.type).to.be.equal(null);
      expect(jboard.board[4][3].piece.color).to.be.equal(null);
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
      expect(jboard.getSquareColor(0, 8)).to.be.equal(null);
      expect(jboard.getSquareColor(8, 0)).to.be.equal(null);
      expect(jboard.getSquareColor(-1, 0)).to.be.equal(null);
      expect(jboard.getSquareColor(0, -1)).to.be.equal(null);
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
      jboard.setUpInitial();
    });

    it('return piece type for (0, 0), etc', () => {
      expect(jboard.getPieceType(0, 2)).to.be.equal(null);
      expect(jboard.getPieceType(4, 4)).to.be.equal(null);

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
      jboard.setUpInitial();
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.getPieceColor(0, 8)).to.be.equal(null);
      expect(jboard.getPieceColor(8, 0)).to.be.equal(null);
      expect(jboard.getPieceColor(-1, 0)).to.be.equal(null);
      expect(jboard.getPieceColor(0, -1)).to.be.equal(null);
    });

    it('return piece color for (0, 0), etc', () => {
      expect(jboard.getPieceType(1, 2)).to.be.equal(null);
      expect(jboard.getPieceType(3, 5)).to.be.equal(null);

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
      expect(jboard.setPieceType(0, 8, 'pawn')).to.be.equal(null);
      expect(jboard.setPieceType(8, 0, 'king')).to.be.equal(null);
      expect(jboard.setPieceType(-5, 5, 'bishop')).to.be.equal(null);
      expect(jboard.setPieceType(0, -1, 'queen')).to.be.equal(null);
    });

    it('return true if setting was successful', () => {
      expect(jboard.setPieceType(0, 0, 'pawn')).to.be.equal(true);
      expect(jboard.setPieceType(1, 1, 'knight')).to.be.equal(true);
      expect(jboard.setPieceType(7, 6, null)).to.be.equal(true);
      expect(jboard.setPieceType(5, 4, 'bishop')).to.be.equal(true);
    });

    it('set piece type and check', () => {
      expect(jboard.getPieceType(1, 2)).to.be.equal(null);
      jboard.setPieceType(1, 2, 'pawn');
      expect(jboard.getPieceType(1, 2)).to.be.equal('pawn');

      expect(jboard.getPieceType(2, 4)).to.be.equal(null);
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
      expect(jboard.setPieceColor(0, 8, 'white')).to.be.equal(null);
      expect(jboard.setPieceColor(8, 0, 'white')).to.be.equal(null);
      expect(jboard.setPieceColor(-3, 0, 'black')).to.be.equal(null);
      expect(jboard.setPieceColor(0, -1, 'black')).to.be.equal(null);
    });

    it('return true if setting was successful', () => {
      expect(jboard.setPieceColor(0, 0, 'white')).to.be.equal(true);
      expect(jboard.setPieceColor(1, 1, 'white')).to.be.equal(true);
      expect(jboard.setPieceColor(7, 6, null)).to.be.equal(true);
      expect(jboard.setPieceColor(5, 4, 'black')).to.be.equal(true);
    });

    it('set piece type and check', () => {
      expect(jboard.getPieceColor(1, 2)).to.be.equal(null);
      jboard.setPieceColor(1, 2, 'black');
      expect(jboard.getPieceColor(1, 2)).to.be.equal('black');

      expect(jboard.getPieceColor(2, 4)).to.be.equal(null);
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

  describe('checkEnPassant', () => {
    // let jboard;

    before(() => {
      // jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {

      /*
       *   !!! ADD SOMETHING !!!
       */

    });
  });

  describe('getEnPassant', () => {
    // let jboard;

    before(() => {
      // jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {

      /*
       *   !!! ADD SOMETHING !!!
       */

    });
  });

  describe('setEnPassant', () => {
    // let jboard;

    before(() => {
      // jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {

      /*
       *   !!! ADD SOMETHING !!!
       */

    });
  });

  describe('isEnPassant', () => {
    // let jboard;

    before(() => {
      // jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {

      /*
       *   !!! ADD SOMETHING !!!
       */

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
      expect(jboard.pickSquare(0, 8)).to.be.equal(null);
      expect(jboard.pickSquare(8, 0)).to.be.equal(null);
      expect(jboard.pickSquare(-1, 0)).to.be.equal(null);
      expect(jboard.pickSquare(0, -1)).to.be.equal(null);
    });

    it('return true if arguments are correct', () => {
      expect(jboard.pickSquare(0, 0)).to.be.equal(true);
      expect(jboard.pickSquare(1, 5)).to.be.equal(true);
      expect(jboard.pickSquare(5, 6)).to.be.equal(true);
      expect(jboard.pickSquare(7, 7)).to.be.equal(true);
    });

    it('check selected square', () => {
      jboard.pickSquare(1, 5);
      expect(jboard.isSquareSelected(1, 5)).to.be.equal(true);
      expect(jboard.isSquareSelected(7, 7)).to.be.equal(false);

      jboard.pickSquare(6, 7);
      expect(jboard.isSquareSelected(5, 1)).to.be.equal(false);
      expect(jboard.isSquareSelected(6, 7)).to.be.equal(true);
    });

    it('check marked square', () => {
      jboard.pickSquare(0, 1);

      expect(jboard.isSquareMarked(0, 1)).to.be.equal(false);
      expect(jboard.isSquareMarked(0, 2)).to.be.equal(true);
      expect(jboard.isSquareMarked(0, 3)).to.be.equal(true);
      expect(jboard.isSquareMarked(0, 4)).to.be.equal(false);
      expect(jboard.isSquareMarked(1, 2)).to.be.equal(false);
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
      expect(jboard.isSquareSelected(4, 4)).to.be.equal(true);
      expect(jboard.isSquareSelected(4, 5)).to.be.equal(false);
      jboard.resetSelect(jboard.board);
      expect(jboard.isSquareSelected(4, 4)).to.be.equal(false);
      expect(jboard.isSquareSelected(4, 5)).to.be.equal(false);
    });
  });

  describe('isSquareSelected', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.isSquareSelected(0, 8)).to.be.equal(null);
      expect(jboard.isSquareSelected(8, 0)).to.be.equal(null);
      expect(jboard.isSquareSelected(-1, 0)).to.be.equal(null);
      expect(jboard.isSquareSelected(0, -1)).to.be.equal(null);
    });

    it('return true or false if arguments are correct', () => {
      jboard.pickSquare(1, 5);
      expect(jboard.isSquareSelected(0, 0)).to.be.equal(false);
      expect(jboard.isSquareSelected(1, 5)).to.be.equal(true);

      jboard.pickSquare(7, 7);
      expect(jboard.isSquareSelected(1, 5)).to.be.equal(false);
      expect(jboard.isSquareSelected(7, 7)).to.be.equal(true);
    });
  });

  /*
   *   MARK MOVES
   */

  describe('resetMarks', () => {
    // let jboard;

    before(() => {
      // jboard = new JBoard();
    });

    it('reset marked square', () => {

      /*
       *   !!! ADD SOMETHING !!!
       */

    });
  });

  describe('markMoves and isSquareMarked', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(TEST_POSITION);
    });

    it('return null if arguments aren\'t correct', () => {
      expect(jboard.markMoves(0, 8)).to.be.equal(null);
      expect(jboard.markMoves(8, 0)).to.be.equal(null);
      expect(jboard.markMoves(-1, 0)).to.be.equal(null);
      expect(jboard.markMoves(0, -1)).to.be.equal(null);
    });

    it('mark two squares for pawn a2', () => {
      jboard.markMoves(0, 1);
      expect(jboard.isSquareMarked(0, 2)).to.be.equal(true);
      expect(jboard.isSquareMarked(0, 3)).to.be.equal(true);
      expect(jboard.isSquareMarked(0, 4)).to.be.equal(false);
      expect(jboard.isSquareMarked(1, 2)).to.be.equal(false);
    });

    it('mark only square for pawn c5', () => {
      jboard.passTurn();
      jboard.markMoves(2, 4);
      expect(jboard.isSquareMarked(2, 3)).to.be.equal(true);
      expect(jboard.isSquareMarked(2, 2)).to.be.equal(false);
      expect(jboard.isSquareMarked(3, 3)).to.be.equal(false);
      expect(jboard.isSquareMarked(1, 3)).to.be.equal(false);
    });

    it('mark no square for pawn d5', () => {
      jboard.markMoves(3, 4);
      expect(jboard.isSquareMarked(3, 5)).to.be.equal(false);
      expect(jboard.isSquareMarked(3, 6)).to.be.equal(false);
      expect(jboard.isSquareMarked(2, 5)).to.be.equal(false);
      expect(jboard.isSquareMarked(4, 5)).to.be.equal(false);
    });

    it('mark no square for pawn f4', () => {
      jboard.markMoves(5, 3);
      expect(jboard.isSquareMarked(5, 4)).to.be.equal(false);
      expect(jboard.isSquareMarked(5, 5)).to.be.equal(false);
      expect(jboard.isSquareMarked(4, 4)).to.be.equal(false);
      expect(jboard.isSquareMarked(6, 4)).to.be.equal(false);
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
      expect(jboard.doMove(0, 5, 8, 7)).to.be.equal(null);
      expect(jboard.doMove(0, -1, 7, 7)).to.be.equal(null);
      expect(jboard.doMove(0, 0, 6, 9)).to.be.equal(null);
      expect(jboard.doMove(10, 8, 18, 8)).to.be.equal(null);
    });

    it('return null if there is no piece on start square', () => {
      expect(jboard.doMove(0, 2, 4, 3)).to.be.equal(null);
      expect(jboard.doMove(3, 2, 7, 7)).to.be.equal(null);
      expect(jboard.doMove(6, 7, 4, 6)).to.be.equal(null);
      expect(jboard.doMove(5, 5, 2, 0)).to.be.equal(null);
    });

    it('return null if start piece color equal stop piece color', () => {
      expect(jboard.doMove(7, 1, 6, 2)).to.be.equal(null);
      expect(jboard.doMove(2, 0, 1, 1)).to.be.equal(null);
      expect(jboard.doMove(3, 7, 4, 7)).to.be.equal(null);
      expect(jboard.doMove(5, 4, 6, 6)).to.be.equal(null);
    });

    it('return true if move was successful', () => {
      expect(jboard.doMove(4, 1, 4, 3)).to.be.equal(true);
      expect(jboard.doMove(2, 4, 2, 3)).to.be.equal(true);
      expect(jboard.doMove(6, 6, 6, 5)).to.be.equal(true);
      expect(jboard.doMove(0, 1, 0, 3)).to.be.equal(true);
    });

    it('check stop square if move was successful', () => {
      let color = jboard.getPieceColor(0, 1);
      let type = jboard.getPieceType(0, 1);

      jboard.doMove(0, 1, 0, 3);

      expect(jboard.getPieceColor(0, 3) === color).to.be.equal(true);
      expect(jboard.getPieceType(0, 3) === type).to.be.equal(true);

      color = jboard.getPieceColor(7, 3);
      type = jboard.getPieceType(7, 3);

      jboard.doMove(7, 3, 6, 2);

      expect(jboard.getPieceColor(6, 2) === color).to.be.equal(true);
      expect(jboard.getPieceType(6, 2) === type).to.be.equal(true);
    });

    it('check start square if move was successful', () => {
      expect(jboard.getPieceColor(0, 1)).to.be.equal('white');
      expect(jboard.getPieceType(0, 1)).to.be.equal('pawn');
      jboard.doMove(0, 1, 0, 3);
      expect(jboard.getPieceColor(0, 1)).to.be.equal(null);
      expect(jboard.getPieceType(0, 1)).to.be.equal(null);

      expect(jboard.getPieceColor(7, 3)).to.be.equal('black');
      expect(jboard.getPieceType(7, 3)).to.be.equal('pawn');
      jboard.doMove(7, 3, 6, 2);
      expect(jboard.getPieceColor(7, 3)).to.be.equal(null);
      expect(jboard.getPieceType(7, 3)).to.be.equal(null);
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
      expect(jboard.checkMove(0, 5, 8, 7)).to.be.equal(null);
      expect(jboard.checkMove(0, -1, 7, 7)).to.be.equal(null);
      expect(jboard.checkMove(0, 0, 6, 9)).to.be.equal(null);
      expect(jboard.checkMove(10, 8, 18, 8)).to.be.equal(null);
    });

    it('return false if there is no piece on start square', () => {
      expect(jboard.checkMove(0, 2, 4, 3)).to.be.equal(null);
      expect(jboard.checkMove(3, 2, 7, 7)).to.be.equal(null);
      expect(jboard.checkMove(6, 7, 4, 6)).to.be.equal(null);
      expect(jboard.checkMove(5, 5, 2, 0)).to.be.equal(null);
    });

    it('return true if move is legal', () => {
      expect(jboard.checkMove(4, 1, 4, 3)).to.be.equal(true);
      expect(jboard.checkMove(2, 4, 2, 3)).to.be.equal(true);
      expect(jboard.checkMove(6, 6, 6, 5)).to.be.equal(true);
      expect(jboard.checkMove(0, 1, 0, 3)).to.be.equal(true);
    });

    it('return false if move is illegal', () => {
      expect(jboard.checkMove(5, 6, 5, 5)).to.be.equal(false);
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
      expect(moves[2]).to.be.equal(undefined);
    });

    it('return two squares for pawn e2', () => {
      const moves = jboard.getMovesPawn(4, 1);

      expect(moves[0].file).to.be.equal(4);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1].file).to.be.equal(4);
      expect(moves[1].rank).to.be.equal(3);
      expect(moves[2]).to.be.equal(undefined);
    });

    it('return only square for pawn c5', () => {
      const moves = jboard.getMovesPawn(2, 4);

      expect(moves[0].file).to.be.equal(2);
      expect(moves[0].rank).to.be.equal(3);
      expect(moves[1]).to.be.equal(undefined);
    });

    it('return null for pawn d5', () => {
      const moves = jboard.getMovesPawn(3, 4);
      expect(moves[0]).to.be.equal(undefined);
    });

    it('return null for pawn f4', () => {
      const moves = jboard.getMovesPawn(5, 3);
      expect(moves[0]).to.be.equal(undefined);
    });

    it('return three squares for pawn b2', () => {
      const moves = jboard.getMovesPawn(1, 1);

      expect(moves[0].file).to.be.equal(1);
      expect(moves[0].rank).to.be.equal(2);

      expect(moves[1].file).to.be.equal(1);
      expect(moves[1].rank).to.be.equal(3);

      expect(moves[2].file).to.be.equal(2);
      expect(moves[2].rank).to.be.equal(2);

      expect(moves[3]).to.be.equal(undefined);
    });

    it('return only square for pawn h2', () => {
      const moves = jboard.getMovesPawn(7, 1);

      expect(moves[0].file).to.be.equal(7);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1]).to.be.equal(undefined);
    });

    it('return two squares for pawn h4', () => {
      const moves = jboard.getMovesPawn(7, 3);

      expect(moves[0].file).to.be.equal(7);
      expect(moves[0].rank).to.be.equal(2);

      expect(moves[1].file).to.be.equal(6);
      expect(moves[1].rank).to.be.equal(2);

      expect(moves[2]).to.be.equal(undefined);
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

      expect(moves[5]).to.be.equal(undefined);
    });

    it('return two squares for black king', () => {
      const moves = jboard.getMovesKing(4, 7);

      expect(moves[0].file).to.be.equal(3);
      expect(moves[0].rank).to.be.equal(6);

      expect(moves[1].file).to.be.equal(3);
      expect(moves[1].rank).to.be.equal(7);

      expect(moves[2].file).to.be.equal(2);
      expect(moves[2].rank).to.be.equal(7);

      expect(moves[3]).to.be.equal(undefined);
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

      expect(moves[1]).to.be.equal(undefined);
    });

    it('return only move for black king', () => {
      const moves = jboard.getCastlingMove(4, 7);

      expect(moves[0].file).to.be.equal(2);
      expect(moves[0].rank).to.be.equal(7);

      expect(moves[1]).to.be.equal(undefined);
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

      expect(moves[8]).to.be.equal(undefined);
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

      expect(moves[5]).to.be.equal(undefined);
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

      expect(moves[5]).to.be.equal(undefined);
    });

    it('return two squares for bishop h5', () => {
      const moves = jboard.getMovesPiece(7, 4);

      expect(moves[0].file).to.be.equal(6);
      expect(moves[0].rank).to.be.equal(3);

      expect(moves[1].file).to.be.equal(6);
      expect(moves[1].rank).to.be.equal(5);

      expect(moves[2].file).to.be.equal(5);
      expect(moves[2].rank).to.be.equal(6);

      expect(moves[3]).to.be.equal(undefined);
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

      expect(square[2]).to.be.equal(undefined);
    });
  });

  /*
   *   VALIDATORS
   */

  describe('validateSquare', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return false if square isn\'t correct', () => {
      expect(jboard.constructor.validateSquare(0, 8)).to.be.equal(false);
      expect(jboard.constructor.validateSquare(8, 0)).to.be.equal(false);
      expect(jboard.constructor.validateSquare(-1, 0)).to.be.equal(false);
      expect(jboard.constructor.validateSquare(0, -1)).to.be.equal(false);
    });

    it('return true if square is correct', () => {
      expect(jboard.constructor.validateSquare(0, 0)).to.be.equal(true);
      expect(jboard.constructor.validateSquare(7, 7)).to.be.equal(true);
      expect(jboard.constructor.validateSquare(0, 3)).to.be.equal(true);
      expect(jboard.constructor.validateSquare(3, 5)).to.be.equal(true);
    });
  });

  /*
   *   SERVICES
   */

  describe('pushMove', () => {
    // let jboard;

    before(() => {
      // jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {

      /*
       *   !!! ADD SOMETHING !!!
       */

    });
  });

  describe('isFriend', () => {
    // let jboard;

    before(() => {
      // jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {

      /*
       *   !!! ADD SOMETHING !!!
       */

    });
  });

  describe('isFoe', () => {
    // let jboard;

    before(() => {
      // jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {

      /*
       *   !!! ADD SOMETHING !!!
       */

    });
  });

  describe('isSquareAttacked', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return false if square isn\'t correct', () => {
      expect(jboard.isSquareAttacked(0, 8)).to.be.equal(null);
      expect(jboard.isSquareAttacked(8, 0)).to.be.equal(null);
      expect(jboard.isSquareAttacked(-1, 0)).to.be.equal(null);
      expect(jboard.isSquareAttacked(0, -1)).to.be.equal(null);
    });

    it('return true if square is attacked', () => {
      expect(jboard.isSquareAttacked('white', 2, 2)).to.be.equal(true);
      expect(jboard.isSquareAttacked('white', 2, 7)).to.be.equal(true);
      expect(jboard.isSquareAttacked('black', 4, 6)).to.be.equal(true);
      expect(jboard.isSquareAttacked('black', 5, 7)).to.be.equal(true);

      expect(jboard.isSquareAttacked('white', 0, 5)).to.be.equal(true);
      expect(jboard.isSquareAttacked('white', 1, 5)).to.be.equal(true);
      expect(jboard.isSquareAttacked('black', 3, 2)).to.be.equal(true);
      expect(jboard.isSquareAttacked('black', 5, 2)).to.be.equal(true);
    });

    it('return true if square isn\'t attacked', () => {
      expect(jboard.isSquareAttacked('black', 0, 3)).to.be.equal(false);
      expect(jboard.isSquareAttacked('black', 6, 3)).to.be.equal(false);
      expect(jboard.isSquareAttacked('white', 6, 2)).to.be.equal(false);
      expect(jboard.isSquareAttacked('white', 1, 0)).to.be.equal(false);
    });
  });

  describe('isSquareAttackedByPawn', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return false if square isn\'t correct', () => {
      expect(jboard.isSquareAttackedByPawn(0, 8)).to.be.equal(null);
      expect(jboard.isSquareAttackedByPawn(8, 0)).to.be.equal(null);
      expect(jboard.isSquareAttackedByPawn(-1, 0)).to.be.equal(null);
      expect(jboard.isSquareAttackedByPawn(0, -1)).to.be.equal(null);
    });

    it('return true if square is attacked by pawn', () => {
      expect(jboard.isSquareAttackedByPawn('white', 0, 5)).to.be.equal(true);
      expect(jboard.isSquareAttackedByPawn('white', 1, 5)).to.be.equal(true);
      expect(jboard.isSquareAttackedByPawn('black', 3, 2)).to.be.equal(true);
      expect(jboard.isSquareAttackedByPawn('black', 5, 2)).to.be.equal(true);
    });

    it('return false if square isn\'t attacked by pawn', () => {
      expect(jboard.isSquareAttackedByPawn('white', 0, 4)).to.be.equal(false);
      expect(jboard.isSquareAttackedByPawn('white', 1, 4)).to.be.equal(false);
      expect(jboard.isSquareAttackedByPawn('black', 3, 3)).to.be.equal(false);
      expect(jboard.isSquareAttackedByPawn('black', 5, 3)).to.be.equal(false);
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
      expect(jboard.isCheck('red')).to.be.equal(null);
      expect(jboard.isCheck('green')).to.be.equal(null);
    });

    it('both kings are not in check', () => {
      expect(jboard.isCheck('white')).to.be.equal(false);
      expect(jboard.isCheck('black')).to.be.equal(false);
    });

    it('white king is in check by queen', () => {
      jboard.doMove(3, 3, 5, 1);
      expect(jboard.isCheck('white')).to.be.equal(true);
    });

    it('white king is in discovered check by bishop', () => {
      jboard.doMove(2, 2, 3, 5);
      expect(jboard.isCheck('white')).to.be.equal(true);
    });

    it('black king is in check by pawn', () => {
      jboard.doMove(3, 5, 3, 6);
      expect(jboard.isCheck('black')).to.be.equal(true);
    });
  });

  describe('getKing', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setPositionByFEN(CASTLING_POSITION);
    });

    it('return false if square isn\'t correct', () => {
      expect(jboard.getKing('red')).to.be.equal(null);
      expect(jboard.getKing('green')).to.be.equal(null);
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
      jboard.doMove(0, 0, 1, 0);
      expect(jboard.getPieceType(0, 0)).to.be.equal(null);
      expect(newBoard.getPieceType(0, 0)).to.be.equal('rook');
    });

    it('check black rook position on source _board after move on new _board', () => {
      expect(newBoard.getPieceType(0, 7)).to.be.equal('rook');
      newBoard.doMove(0, 7, 1, 7);
      expect(newBoard.getPieceType(0, 7)).to.be.equal(null);
      expect(jboard.getPieceType(0, 7)).to.be.equal('rook');
    });
  });

  /*
   *   FEN
   */

  describe('getFEN', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUpInitial();
    });

    it('get FEN of initial position', () => {
      jboard.setUpInitial();
      expect(jboard.getFEN()).to.be
        .to.be.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    });

    it('get FEN of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(jboard.getFEN()).to.be
        .to.be.equal('r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1');
    });
  });

  describe('getFENPiece', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUpInitial();
    });

    it('return null if square is empty', () => {
      expect(jboard.getFENPiece(0, 4)).to.be.equal(null);
      expect(jboard.getFENPiece(4, 5)).to.be.equal(null);
      expect(jboard.getFENPiece(6, 3)).to.be.equal(null);
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
      jboard.setUpInitial();
      expect(jboard.getFENBoard()).to.be
        .to.be.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    });

    it('get FEN _board of test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(jboard.getFENBoard()).to.be
        .to.be.equal('r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R');
    });
  });

  describe('getFENTurn', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('get FEN turn of initial position', () => {
      jboard.setUpInitial();
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
      jboard.setUpInitial();
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
      jboard.setUpInitial();
      expect(jboard.getFENEnPassant()).to.be.equal('-');
    });

    it('return "-" for test position', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      expect(jboard.getFENEnPassant()).to.be.equal('-');
    });

    it('return "b3" for test position after two moves', () => {
      jboard.setPositionByFEN(TEST_POSITION);
      jboard.turn = 'black';
      jboard.doMove(2, 4, 2, 3);
      jboard.doMove(1, 1, 1, 3);
      expect(jboard.getFENEnPassant()).to.be.equal('b3');
    });
  });

  describe('parseFENRank', () => {
    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return null for too long string', () => {
      expect(jboard.constructor.parseFENRank('rnbqkbnrr')).to.be.equal(null);
    });

    it('return null for incorrect string', () => {
      expect(jboard.constructor.parseFENRank('rnbqk5nr')).to.be.equal(null);
      expect(jboard.constructor.parseFENRank('77b7nr')).to.be.equal(null);
      expect(jboard.constructor.parseFENRank('r9knr')).to.be.equal(null);
      expect(jboard.constructor.parseFENRank('90')).to.be.equal(null);
      expect(jboard.constructor.parseFENRank('r7000r')).to.be.equal(null);
      expect(jboard.constructor.parseFENRank('rnfqkbnr')).to.be.equal(null);
    });

    it('return array for correct string', () => {
      expect(jboard.constructor.parseFENRank('rnbqk1nr')[0].type).to.be.equal('rook');
      expect(jboard.constructor.parseFENRank('rnbqk1nr')[0].color).to.be.equal('black');
      expect(jboard.constructor.parseFENRank('rn1qk1nr')[7].type).to.be.equal('rook');
      expect(jboard.constructor.parseFENRank('rn1qk1nr')[7].color).to.be.equal('black');
      expect(jboard.constructor.parseFENRank('rnbq2nr')[1].type).to.be.equal('knight');
      expect(jboard.constructor.parseFENRank('rnbq2nr')[1].color).to.be.equal('black');
      expect(jboard.constructor.parseFENRank('rnbqk1nr')[6].type).to.be.equal('knight');
      expect(jboard.constructor.parseFENRank('rnbqk1nr')[6].color).to.be.equal('black');
      expect(jboard.constructor.parseFENRank('1nbqk1nr')[3].type).to.be.equal('queen');
      expect(jboard.constructor.parseFENRank('r1Bq4')[2].type).to.be.equal('bishop');
      expect(jboard.constructor.parseFENRank('r1Bq4')[2].color).to.be.equal('white');
    });
  });
});
