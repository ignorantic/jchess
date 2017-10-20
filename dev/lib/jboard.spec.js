import JBoard from './jboard';
import {describe, it, before, beforeEach} from 'mocha';
import chai from 'chai';
const expect = chai.expect;

describe('jBoard', () => {

  let TEST_POSITION = [
    {
      file: 0,
      rank: 0,
      piece: {
        type: 'rook',
        color: 'white'
      }
    },
    {
      file: 1,
      rank: 0,
      piece: {
        type: 'knight',
        color: 'white'
      }
    },
    {
      file: 2,
      rank: 0,
      piece: {
        type: 'bishop',
        color: 'white'
      }
    },
    {
      file: 3,
      rank: 0,
      piece: {
        type: 'queen',
        color: 'white'
      }
    },
    {
      file: 4,
      rank: 0,
      piece: {
        type: 'king',
        color: 'white'
      }
    },
    {
      file: 7,
      rank: 4,
      piece: {
        type: 'bishop',
        color: 'white'
      }
    },
    {
      file: 5,
      rank: 2,
      piece: {
        type: 'knight',
        color: 'white'
      }
    },
    {
      file: 7,
      rank: 0,
      piece: {
        type: 'rook',
        color: 'white'
      }
    },
    {
      file: 0,
      rank: 7,
      piece: {
        type: 'rook',
        color: 'black'
      }
    },
    {
      file: 2,
      rank: 2,
      piece: {
        type: 'knight',
        color: 'black'
      }
    },
    {
      file: 0,
      rank: 5,
      piece: {
        type: 'bishop',
        color: 'black'
      }
    },
    {
      file: 3,
      rank: 3,
      piece: {
        type: 'queen',
        color: 'black'
      }
    },
    {
      file: 4,
      rank: 7,
      piece: {
        type: 'king',
        color: 'black'
      }
    },
    {
      file: 0,
      rank: 4,
      piece: {
        type: 'bishop',
        color: 'black'
      }
    },
    {
      file: 5,
      rank: 4,
      piece: {
        type: 'knight',
        color: 'black'
      }
    },
    {
      file: 7,
      rank: 7,
      piece: {
        type: 'rook',
        color: 'black'
      }
    },
    {
      file: 0,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 1,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 4,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 5,
      rank: 3,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 6,
      rank: 2,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 7,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 3,
      rank: 4,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 3,
      rank: 5,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 2,
      rank: 4,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    },
    {
      file: 7,
      rank: 3,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    },
    {
      file: 0,
      rank: 6,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    },
    {
      file: 1,
      rank: 6,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    },
    {
      file: 5,
      rank: 6,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    },
    {
      file: 6,
      rank: 6,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    }
  ];
  let CASTLING_POSITION = [
    {
      file: 0,
      rank: 0,
      piece: {
        type: 'rook',
        color: 'white'
      }
    },
    {
      file: 3,
      rank: 0,
      piece: {
        type: 'knight',
        color: 'black'
      }
    },
    {
      file: 4,
      rank: 0,
      piece: {
        type: 'king',
        color: 'white'
      }
    },
    {
      file: 7,
      rank: 0,
      piece: {
        type: 'rook',
        color: 'white'
      }
    },
    {
      file: 0,
      rank: 7,
      piece: {
        type: 'rook',
        color: 'black'
      }
    },
    {
      file: 4,
      rank: 7,
      piece: {
        type: 'king',
        color: 'black'
      }
    },
    {
      file: 3,
      rank: 5,
      piece: {
        type: 'bishop',
        color: 'white'
      }
    },
    {
      file: 7,
      rank: 7,
      piece: {
        type: 'rook',
        color: 'black'
      }
    },

    {
      file: 0,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 1,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 2,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 5,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 6,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 7,
      rank: 1,
      piece: {
        type: 'pawn',
        color: 'white'
      }
    },
    {
      file: 0,
      rank: 6,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    },
    {
      file: 1,
      rank: 6,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    },
    {
      file: 5,
      rank: 6,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    },
    {
      file: 6,
      rank: 6,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    },
    {
      file: 7,
      rank: 6,
      piece: {
        type: 'pawn',
        color: 'black'
      }
    }
  ];

  /*
   *   INITIALIZATION
   */

  describe('constructor', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('check size of _board', () => {

      expect(jboard._board.length).be.equal(8);
      expect(jboard._board[0].length).be.equal(8);
      expect(jboard._board[7].length).be.equal(8);

    });

    it('check property\'s value', () => {

      expect(jboard._selectFile).be.null;
      expect(jboard._selectRank).be.null;
      expect(jboard._enPassant).be.null;

    });

    it('check square colors', () => {

      expect(jboard._board[0][0].color).be.equal('black');
      expect(jboard._board[0][7].color).be.equal('white');
      expect(jboard._board[7][0].color).be.equal('white');
      expect(jboard._board[7][7].color).be.equal('black');

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

      expect(jboard._board[0][0].piece.type).be.equal('rook');
      expect(jboard._board[0][0].piece.color).be.equal('white');

      expect(jboard._board[7][0].piece.type).be.equal('rook');
      expect(jboard._board[7][0].piece.color).be.equal('white');

      expect(jboard._board[0][7].piece.type).be.equal('rook');
      expect(jboard._board[0][7].piece.color).be.equal('black');

      expect(jboard._board[7][7].piece.type).be.equal('rook');
      expect(jboard._board[7][7].piece.color).be.equal('black');

    });

    it('check knights', () => {

      expect(jboard._board[1][0].piece.type).be.equal('knight');
      expect(jboard._board[1][0].piece.color).be.equal('white');

      expect(jboard._board[6][0].piece.type).be.equal('knight');
      expect(jboard._board[6][0].piece.color).be.equal('white');

      expect(jboard._board[1][7].piece.type).be.equal('knight');
      expect(jboard._board[1][7].piece.color).be.equal('black');

      expect(jboard._board[6][7].piece.type).be.equal('knight');
      expect(jboard._board[6][7].piece.color).be.equal('black');

    });

    it('check bishops', () => {

      expect(jboard._board[2][0].piece.type).be.equal('bishop');
      expect(jboard._board[2][0].piece.color).be.equal('white');

      expect(jboard._board[5][0].piece.type).be.equal('bishop');
      expect(jboard._board[5][0].piece.color).be.equal('white');

      expect(jboard._board[2][7].piece.type).be.equal('bishop');
      expect(jboard._board[2][7].piece.color).be.equal('black');

      expect(jboard._board[5][7].piece.type).be.equal('bishop');
      expect(jboard._board[5][7].piece.color).be.equal('black');

    });

    it('check queens', () => {

      expect(jboard._board[3][0].piece.type).be.equal('queen');
      expect(jboard._board[3][0].piece.color).be.equal('white');
      expect(jboard._board[3][7].piece.type).be.equal('queen');
      expect(jboard._board[3][7].piece.color).be.equal('black');

    });

    it('check kings', () => {

      expect(jboard._board[4][0].piece.type).be.equal('king');
      expect(jboard._board[4][0].piece.color).be.equal('white');
      expect(jboard._board[4][7].piece.type).be.equal('king');
      expect(jboard._board[4][7].piece.color).be.equal('black');

    });

    it('check white pawns', () => {

      expect(jboard._board[0][1].piece.type).be.equal('pawn');
      expect(jboard._board[7][1].piece.color).be.equal('white');

    });

    it('check black pawns', () => {

      expect(jboard._board[0][6].piece.type).be.equal('pawn');
      expect(jboard._board[7][6].piece.color).be.equal('black');

    });

    it('check castlings', () => {

      expect(jboard._castling.white).be.equal(3);
      expect(jboard._castling.black).be.equal(3);

    });

  });

  describe('_setPiecesByArray', () => {

    let jboard;

    before(() => {

      jboard = new JBoard();
      jboard._setPiecesByArray([
        {
          file: 0,
          rank: 1,
          piece: {
            type: 'pawn',
            color: 'white'
          }
        },
        {
          file: 1,
          rank: 2,
          piece: {
            type: 'knight',
            color: 'black'
          }
        },
        {
          file: 5,
          rank: 7,
          piece: {
            type: 'queen',
            color: 'black'
          }
        }
      ]);

    });

    it('check pawn', () => {

      expect(jboard._board[0][1].piece.type).be.equal('pawn');
      expect(jboard._board[0][1].piece.color).be.equal('white');

    });

    it('check knight', () => {

      expect(jboard._board[1][2].piece.type).be.equal('knight');
      expect(jboard._board[1][2].piece.color).be.equal('black');

    });

    it('check queen', () => {

      expect(jboard._board[5][7].piece.type).be.equal('queen');
      expect(jboard._board[5][7].piece.color).be.equal('black');

    });
  });

  describe('resetPosition', () => {

    let jboard;

    before(() => {

      jboard = new JBoard();
      jboard.setUpInitial();

    });

    it('check pawn a2 before reset', () => {

      expect(jboard._board[0][1].piece.type).be.equal('pawn');
      expect(jboard._board[0][1].piece.color).be.equal('white');

    });

    it('check knight b1 before reset', () => {

      expect(jboard._board[1][0].piece.type).be.equal('knight');
      expect(jboard._board[1][0].piece.color).be.equal('white');

    });

    it('check rook h8 before reset', () => {

      expect(jboard._board[7][7].piece.type).be.equal('rook');
      expect(jboard._board[7][7].piece.color).be.equal('black');

    });

    it('check pawn a2 after reset', () => {

      jboard.resetPosition();

      expect(jboard._board[0][1].piece.type).be.null;
      expect(jboard._board[0][1].piece.color).be.null;

    });

    it('check knight b1 after reset', () => {

      expect(jboard._board[1][0].piece.type).be.null;
      expect(jboard._board[1][0].piece.color).be.null;

    });

    it('check rook h8 after reset', () => {

      expect(jboard._board[7][7].piece.type).be.null;
      expect(jboard._board[7][7].piece.color).be.null;

    });

  });

  describe('_setPiece', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('check square h2 before setup', () => {

      expect(jboard._board[7][1].piece.type).be.null;
      expect(jboard._board[7][1].piece.color).be.null;

    });

    it('check square c3 before setup', () => {

      expect(jboard._board[2][2].piece.type).be.null;
      expect(jboard._board[2][2].piece.color).be.null;

    });

    it('check square e4 before setup', () => {

      expect(jboard._board[4][3].piece.type).be.null;
      expect(jboard._board[4][3].piece.color).be.null;

    });

    it('check square h2 after setup', () => {

      jboard._setPiece(7, 1, 'pawn', 'white');
      expect(jboard._board[7][1].piece.type).be.equal('pawn');
      expect(jboard._board[7][1].piece.color).be.equal('white');

    });

    it('check square c3 after setup', () => {

      jboard._setPiece(2, 2, 'knight', 'white');
      expect(jboard._board[2][2].piece.type).be.equal('knight');
      expect(jboard._board[2][2].piece.color).be.equal('white');

    });

    it('check square e4 after setup', () => {

      jboard._setPiece(4, 3, 'rook', 'black');
      expect(jboard._board[4][3].piece.type).be.equal('rook');
      expect(jboard._board[4][3].piece.color).be.equal('black');

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

      expect(jboard.getSquareColor(0, 0)).be.equal('black');
      expect(jboard.getSquareColor(0, 2)).be.equal('black');

      expect(jboard.getSquareColor(1, 1)).be.equal('black');
      expect(jboard.getSquareColor(7, 7)).be.equal('black');

      expect(jboard.getSquareColor(5, 7)).be.equal('black');
      expect(jboard.getSquareColor(3, 7)).be.equal('black');

    });

    it('return "white" for (0, 1), etc', () => {

      expect(jboard.getSquareColor(0, 1)).be.equal('white');
      expect(jboard.getSquareColor(0, 3)).be.equal('white');

      expect(jboard.getSquareColor(1, 2)).be.equal('white');
      expect(jboard.getSquareColor(0, 7)).be.equal('white');

      expect(jboard.getSquareColor(2, 7)).be.equal('white');
      expect(jboard.getSquareColor(6, 7)).be.equal('white');

    });
  });

  describe('getPieceType', () => {

    let jboard;

    before(() => {

      jboard = new JBoard();
      jboard.setUpInitial();

    });

    it('return piece type for (0, 0), etc', () => {

      expect(jboard.getPieceType(0, 2)).to.be.null;
      expect(jboard.getPieceType(4, 4)).to.be.null;

      expect(jboard.getPieceType(0, 0)).be.equal('rook');
      expect(jboard.getPieceType(7, 7)).be.equal('rook');
      expect(jboard.getPieceType(1, 0)).be.equal('knight');
      expect(jboard.getPieceType(6, 7)).be.equal('knight');
      expect(jboard.getPieceType(5, 7)).be.equal('bishop');
      expect(jboard.getPieceType(1, 1)).be.equal('pawn');
      expect(jboard.getPieceType(6, 6)).be.equal('pawn');
      expect(jboard.getPieceType(3, 0)).be.equal('queen');
      expect(jboard.getPieceType(4, 7)).be.equal('king');

    });
  });

  describe('getPieceColor', () => {

    let jboard;

    before(() => {

      jboard = new JBoard();
      jboard.setUpInitial();

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

      expect(jboard.getPieceColor(0, 1)).be.equal('white');
      expect(jboard.getPieceColor(1, 0)).be.equal('white');
      expect(jboard.getPieceColor(2, 0)).be.equal('white');
      expect(jboard.getPieceColor(2, 7)).be.equal('black');
      expect(jboard.getPieceColor(3, 0)).be.equal('white');
      expect(jboard.getPieceColor(3, 7)).be.equal('black');
      expect(jboard.getPieceColor(4, 1)).be.equal('white');
      expect(jboard.getPieceColor(5, 6)).be.equal('black');
      expect(jboard.getPieceColor(6, 7)).be.equal('black');
      expect(jboard.getPieceColor(7, 6)).be.equal('black');

    });
  });

  /*
   *   SQUARE SETTERS
   */

  describe('_setPieceType', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {

      expect(jboard._setPieceType(0, 8, 'pawn')).to.be.null;
      expect(jboard._setPieceType(8, 0, 'king')).to.be.null;
      expect(jboard._setPieceType(-5, 5, 'bishop')).to.be.null;
      expect(jboard._setPieceType(0, -1, 'queen')).to.be.null;

    });

    it('return true if setting was successful', () => {

      expect(jboard._setPieceType(0, 0, 'pawn')).to.be.true;
      expect(jboard._setPieceType(1, 1, 'knight')).to.be.true;
      expect(jboard._setPieceType(7, 6, null)).to.be.true;
      expect(jboard._setPieceType(5, 4, 'bishop')).to.be.true;

    });

    it('set piece type and check', () => {

      expect(jboard.getPieceType(1, 2)).to.be.null;
      jboard._setPieceType(1, 2, 'pawn');
      expect(jboard.getPieceType(1, 2)).to.be.equal('pawn');

      expect(jboard.getPieceType(2, 4)).to.be.null;
      jboard._setPieceType(2, 4, 'queen');
      expect(jboard.getPieceType(2, 4)).to.be.equal('queen');

      expect(jboard.getPieceType(1, 1)).to.be.equal('knight');
      jboard._setPieceType(1, 1, 'bishop');
      expect(jboard.getPieceType(1, 1)).to.be.equal('bishop');

      expect(jboard.getPieceType(2, 4)).to.be.equal('queen');
      jboard._setPieceType(2, 4, 'king');
      expect(jboard.getPieceType(2, 4)).to.be.equal('king');

    });
  });

  describe('_setPieceColor', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return null if arguments aren\'t correct', () => {

      expect(jboard._setPieceColor(0, 8, 'white')).to.be.null;
      expect(jboard._setPieceColor(8, 0, 'white')).to.be.null;
      expect(jboard._setPieceColor(-3, 0, 'black')).to.be.null;
      expect(jboard._setPieceColor(0, -1, 'black')).to.be.null;

    });

    it('return true if setting was successful', () => {

      expect(jboard._setPieceColor(0, 0, 'white')).to.be.true;
      expect(jboard._setPieceColor(1, 1, 'white')).to.be.true;
      expect(jboard._setPieceColor(7, 6, null)).to.be.true;
      expect(jboard._setPieceColor(5, 4, 'black')).to.be.true;

    });

    it('set piece type and check', () => {

      expect(jboard.getPieceColor(1, 2)).to.be.null;
      jboard._setPieceColor(1, 2, 'black');
      expect(jboard.getPieceColor(1, 2)).to.be.equal('black');

      expect(jboard.getPieceColor(2, 4)).to.be.null;
      jboard._setPieceColor(2, 4, 'white');
      expect(jboard.getPieceColor(2, 4)).to.be.equal('white');

      expect(jboard.getPieceColor(1, 1)).to.be.equal('white');
      jboard._setPieceColor(1, 1, 'black');
      expect(jboard.getPieceColor(1, 1)).to.be.equal('black');

      expect(jboard.getPieceColor(5, 4)).to.be.equal('black');
      jboard._setPieceColor(5, 4, 'white');
      expect(jboard.getPieceColor(5, 4)).to.be.equal('white');

    });
  });

  /*
   *   EN PASSANT
   */

  describe('_checkEnPassant', () => {

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

  describe('_getEnPassant', () => {

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

  describe('_setEnPassant', () => {

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

  describe('_isEnPassant', () => {

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
      jboard._setPiecesByArray(TEST_POSITION);

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
      expect(jboard.isSquareSelected(1, 5)).be.true;
      expect(jboard.isSquareSelected(7, 7)).be.false;

      jboard.pickSquare(6, 7);
      expect(jboard.isSquareSelected(5, 1)).be.false;
      expect(jboard.isSquareSelected(6, 7)).be.true;

    });

    it('check marked square', () => {

      jboard.pickSquare(0, 1);

      expect(jboard.isSquareMarked(0, 1)).be.false;
      expect(jboard.isSquareMarked(0, 2)).be.true;
      expect(jboard.isSquareMarked(0, 3)).be.true;
      expect(jboard.isSquareMarked(0, 4)).be.false;
      expect(jboard.isSquareMarked(1, 2)).be.false;

    });
  });

  /*
   *   SELECT
   */

  describe('_resetSelect', () => {

    let jboard;

    before(() => {

      jboard = new JBoard();
      jboard.pickSquare(4, 4);

    });

    it('reset selected square', () => {

      expect(jboard.isSquareSelected(4, 4)).to.be.true;
      expect(jboard.isSquareSelected(4, 5)).to.be.false;
      jboard._resetSelect(jboard._board);
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

  describe('_resetMarks', () => {

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

  describe('_markMoves and isSquareMarked', () => {

    let jboard;

    before(() => {

      jboard = new JBoard();
      jboard._setPiecesByArray(TEST_POSITION);

    });

    it('return null if arguments aren\'t correct', () => {

      expect(jboard._markMoves(0, 8)).to.be.null;
      expect(jboard._markMoves(8, 0)).to.be.null;
      expect(jboard._markMoves(-1, 0)).to.be.null;
      expect(jboard._markMoves(0, -1)).to.be.null;

    });

    it('mark two squares for pawn a2', () => {

      jboard._markMoves(0, 1);
      expect(jboard.isSquareMarked(0, 2)).to.be.true;
      expect(jboard.isSquareMarked(0, 3)).to.be.true;
      expect(jboard.isSquareMarked(0, 4)).to.be.false;
      expect(jboard.isSquareMarked(1, 2)).to.be.false;

    });

    it('mark only square for pawn c5', () => {

      jboard._passTurn();
      jboard._markMoves(2, 4);
      expect(jboard.isSquareMarked(2, 3)).to.be.true;
      expect(jboard.isSquareMarked(2, 2)).to.be.false;
      expect(jboard.isSquareMarked(3, 3)).to.be.false;
      expect(jboard.isSquareMarked(1, 3)).to.be.false;

    });

    it('mark no square for pawn d5', () => {

      jboard._markMoves(3, 4);
      expect(jboard.isSquareMarked(3, 5)).to.be.false;
      expect(jboard.isSquareMarked(3, 6)).to.be.false;
      expect(jboard.isSquareMarked(2, 5)).to.be.false;
      expect(jboard.isSquareMarked(4, 5)).to.be.false;

    });

    it('mark no square for pawn f4', () => {

      jboard._markMoves(5, 3);
      expect(jboard.isSquareMarked(5, 4)).to.be.false;
      expect(jboard.isSquareMarked(5, 5)).to.be.false;
      expect(jboard.isSquareMarked(4, 4)).to.be.false;
      expect(jboard.isSquareMarked(6, 4)).to.be.false;

    });
  });

  /*
   *   DO MOVE
   */

  describe('_doMove', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();

    });

    beforeEach(() => {
      jboard._setPiecesByArray(TEST_POSITION);
    });

    it('return null if arguments aren\'t correct', () => {

      expect(jboard._doMove(0, 5, 8, 7)).to.be.null;
      expect(jboard._doMove(0, -1, 7, 7)).to.be.null;
      expect(jboard._doMove(0, 0, 6, 9)).to.be.null;
      expect(jboard._doMove(10, 8, 18, 8)).to.be.null;

    });

    it('return null if there is no piece on start square', () => {

      expect(jboard._doMove(0, 2, 4, 3)).to.be.null;
      expect(jboard._doMove(3, 2, 7, 7)).to.be.null;
      expect(jboard._doMove(6, 7, 4, 6)).to.be.null;
      expect(jboard._doMove(5, 5, 2, 0)).to.be.null;

    });

    it('return null if start piece color equal stop piece color', () => {

      expect(jboard._doMove(7, 1, 6, 2)).to.be.null;
      expect(jboard._doMove(2, 0, 1, 1)).to.be.null;
      expect(jboard._doMove(3, 7, 4, 7)).to.be.null;
      expect(jboard._doMove(5, 4, 6, 6)).to.be.null;

    });

    it('return true if move was successful', () => {

      expect(jboard._doMove(4, 1, 4, 3)).to.be.true;
      expect(jboard._doMove(2, 4, 2, 3)).to.be.true;
      expect(jboard._doMove(6, 6, 6, 5)).to.be.true;
      expect(jboard._doMove(0, 1, 0, 3)).to.be.true;

    });

    it('check stop square if move was successful', () => {

      let color = jboard.getPieceColor(0, 1);
      let type = jboard.getPieceType(0, 1);

      jboard._doMove(0, 1, 0, 3);

      expect(jboard.getPieceColor(0, 3) === color).to.be.true;
      expect(jboard.getPieceType(0, 3) === type).to.be.true;

      color = jboard.getPieceColor(7, 3);
      type = jboard.getPieceType(7, 3);

      jboard._doMove(7, 3, 6, 2);

      expect(jboard.getPieceColor(6, 2) === color).to.be.true;
      expect(jboard.getPieceType(6, 2) === type).to.be.true;

    });

    it('check start square if move was successful', () => {

      expect(jboard.getPieceColor(0, 1)).to.be.equal('white');
      expect(jboard.getPieceType(0, 1)).to.be.equal('pawn');
      jboard._doMove(0, 1, 0, 3);
      expect(jboard.getPieceColor(0, 1)).to.be.null;
      expect(jboard.getPieceType(0, 1)).to.be.null;

      expect(jboard.getPieceColor(7, 3)).to.be.equal('black');
      expect(jboard.getPieceType(7, 3)).to.be.equal('pawn');
      jboard._doMove(7, 3, 6, 2);
      expect(jboard.getPieceColor(7, 3)).to.be.null;
      expect(jboard.getPieceType(7, 3)).to.be.null;

    });
  });

  /*
   *   CHECK MOVE
   */

  describe('_checkMove', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();

    });

    beforeEach(() => {
      jboard._setPiecesByArray(TEST_POSITION);
    });

    it('return false if arguments aren\'t correct', () => {

      expect(jboard._checkMove(0, 5, 8, 7)).to.be.null;
      expect(jboard._checkMove(0, -1, 7, 7)).to.be.null;
      expect(jboard._checkMove(0, 0, 6, 9)).to.be.null;
      expect(jboard._checkMove(10, 8, 18, 8)).to.be.null;

    });

    it('return false if there is no piece on start square', () => {

      expect(jboard._checkMove(0, 2, 4, 3)).to.be.null;
      expect(jboard._checkMove(3, 2, 7, 7)).to.be.null;
      expect(jboard._checkMove(6, 7, 4, 6)).to.be.null;
      expect(jboard._checkMove(5, 5, 2, 0)).to.be.null;

    });

    it('return true if move is legal', () => {

      expect(jboard._checkMove(4, 1, 4, 3)).to.be.true;
      expect(jboard._checkMove(2, 4, 2, 3)).to.be.true;
      expect(jboard._checkMove(6, 6, 6, 5)).to.be.true;
      expect(jboard._checkMove(0, 1, 0, 3)).to.be.true;

    });

    it('return false if move is illegal', () => {

      expect(jboard._checkMove(5, 6, 5, 5)).to.be.false;

    });
  });

  /*
   *   GET PAWN MOVES
   */

  describe('_getMovesPawn', () => {

    let jboard;

    before(() => {

      jboard = new JBoard();
      jboard._setPiecesByArray(TEST_POSITION);

    });

    it('return two squares for pawn a2', () => {

      let moves = jboard._getMovesPawn(0, 1);
      expect(moves[0].file).to.be.equal(0);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1].file).to.be.equal(0);
      expect(moves[1].rank).to.be.equal(3);
      expect(moves[2]).to.be.undefined;

    });

    it('return two squares for pawn e2', () => {

      let moves = jboard._getMovesPawn(4, 1);

      expect(moves[0].file).to.be.equal(4);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1].file).to.be.equal(4);
      expect(moves[1].rank).to.be.equal(3);
      expect(moves[2]).to.be.undefined;

    });

    it('return only square for pawn c5', () => {

      let moves = jboard._getMovesPawn(2, 4);

      expect(moves[0].file).to.be.equal(2);
      expect(moves[0].rank).to.be.equal(3);
      expect(moves[1]).to.be.undefined;

    });

    it('return null for pawn d5', () => {

      let moves = jboard._getMovesPawn(3, 4);
      expect(moves[0]).to.be.undefined;

    });

    it('return null for pawn f4', () => {

      let moves = jboard._getMovesPawn(5, 3);
      expect(moves[0]).to.be.undefined;

    });

    it('return three squares for pawn b2', () => {

      let moves = jboard._getMovesPawn(1, 1);

      expect(moves[0].file).to.be.equal(1);
      expect(moves[0].rank).to.be.equal(2);

      expect(moves[1].file).to.be.equal(1);
      expect(moves[1].rank).to.be.equal(3);

      expect(moves[2].file).to.be.equal(2);
      expect(moves[2].rank).to.be.equal(2);

      expect(moves[3]).to.be.undefined;

    });

    it('return only square for pawn h2', () => {

      let moves = jboard._getMovesPawn(7, 1);

      expect(moves[0].file).to.be.equal(7);
      expect(moves[0].rank).to.be.equal(2);
      expect(moves[1]).to.be.undefined;

    });

    it('return two squares for pawn h4', () => {

      let moves = jboard._getMovesPawn(7, 3);

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

  describe('_getMovesKing', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard._setPiecesByArray(CASTLING_POSITION);
    });

    it('return two squares for white king', () => {

      let moves = jboard._getMovesKing(4, 0);

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

      let moves = jboard._getMovesKing(4, 7);

      expect(moves[0].file).to.be.equal(3);
      expect(moves[0].rank).to.be.equal(6);

      expect(moves[1].file).to.be.equal(3);
      expect(moves[1].rank).to.be.equal(7);

      expect(moves[2].file).to.be.equal(2);
      expect(moves[2].rank).to.be.equal(7);

      expect(moves[3]).to.be.undefined;

    });

  });

  describe('_getCastlingMove', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard._setPiecesByArray(CASTLING_POSITION);
    });

    it('return only move for white king', () => {

      let moves = jboard._getCastlingMove(4, 0);

      expect(moves[0].file).to.be.equal(6);
      expect(moves[0].rank).to.be.equal(0);

      expect(moves[1]).to.be.undefined;

    });

    it('return only move for black king', () => {

      let moves = jboard._getCastlingMove(4, 7);

      expect(moves[0].file).to.be.equal(2);
      expect(moves[0].rank).to.be.equal(7);

      expect(moves[1]).to.be.undefined;

    });

  });

  /*
   *   GET PIECE MOVES
   */

  describe('_getMovesPiece', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard._setPiecesByArray(TEST_POSITION);
    });

    it('return two squares for knight c3', () => {

      let moves = jboard._getMovesPiece(2, 2);

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

      let moves = jboard._getMovesPiece(5, 4);

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

      let moves = jboard._getMovesPiece(7, 7);

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

      let moves = jboard._getMovesPiece(7, 4);

      expect(moves[0].file).to.be.equal(6);
      expect(moves[0].rank).to.be.equal(3);

      expect(moves[1].file).to.be.equal(6);
      expect(moves[1].rank).to.be.equal(5);

      expect(moves[2].file).to.be.equal(5);
      expect(moves[2].rank).to.be.equal(6);

      expect(moves[3]).to.be.undefined;

    });
  });

  describe('_getAttackedSquares', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard._setPiecesByArray(CASTLING_POSITION);
    });

    it('return squares, which are attacked by bishop move', () => {

      let square = jboard._getAttackedSquares('bishop', 'black', 1, 7);

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

  describe('_validateSquare', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return false if square isn\'t correct', () => {

      expect(jboard._validateSquare(0, 8)).to.be.false;
      expect(jboard._validateSquare(8, 0)).to.be.false;
      expect(jboard._validateSquare(-1, 0)).to.be.false;
      expect(jboard._validateSquare(0, -1)).to.be.false;

    });

    it('return true if square is correct', () => {

      expect(jboard._validateSquare(0, 0)).to.be.true;
      expect(jboard._validateSquare(7, 7)).to.be.true;
      expect(jboard._validateSquare(0, 3)).to.be.true;
      expect(jboard._validateSquare(3, 5)).to.be.true;

    });
  });

  /*
   *   SERVICES
   */

  describe('_pushMove', () => {

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

  describe('_isFriend', () => {

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

  describe('_isFoe', () => {

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

  describe('_isSquareAttacked', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard._setPiecesByArray(CASTLING_POSITION);
    });

    it('return false if square isn\'t correct', () => {

      expect(jboard._isSquareAttacked(0, 8)).to.be.null;
      expect(jboard._isSquareAttacked(8, 0)).to.be.null;
      expect(jboard._isSquareAttacked(-1, 0)).to.be.null;
      expect(jboard._isSquareAttacked(0, -1)).to.be.null;

    });

    it('return true if square is attacked', () => {

      expect(jboard._isSquareAttacked('white', 2, 2)).be.true;
      expect(jboard._isSquareAttacked('white', 2, 7)).be.true;
      expect(jboard._isSquareAttacked('black', 4, 6)).be.true;
      expect(jboard._isSquareAttacked('black', 5, 7)).be.true;

      expect(jboard._isSquareAttacked('white', 0, 5)).be.true;
      expect(jboard._isSquareAttacked('white', 1, 5)).be.true;
      expect(jboard._isSquareAttacked('black', 3, 2)).be.true;
      expect(jboard._isSquareAttacked('black', 5, 2)).be.true;

    });

    it('return true if square isn\'t attacked', () => {

      expect(jboard._isSquareAttacked('black', 0, 3)).be.false;
      expect(jboard._isSquareAttacked('black', 6, 3)).be.false;
      expect(jboard._isSquareAttacked('white', 6, 2)).be.false;
      expect(jboard._isSquareAttacked('white', 1, 0)).be.false;

    });

  });

  describe('_isSquareAttackedByPawn', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard._setPiecesByArray(CASTLING_POSITION);
    });

    it('return false if square isn\'t correct', () => {

      expect(jboard._isSquareAttackedByPawn(0, 8)).to.be.null;
      expect(jboard._isSquareAttackedByPawn(8, 0)).to.be.null;
      expect(jboard._isSquareAttackedByPawn(-1, 0)).to.be.null;
      expect(jboard._isSquareAttackedByPawn(0, -1)).to.be.null;

    });

    it('return true if square is attacked by pawn', () => {

      expect(jboard._isSquareAttackedByPawn('white', 0, 5)).be.true;
      expect(jboard._isSquareAttackedByPawn('white', 1, 5)).be.true;
      expect(jboard._isSquareAttackedByPawn('black', 3, 2)).be.true;
      expect(jboard._isSquareAttackedByPawn('black', 5, 2)).be.true;

    });

    it('return false if square isn\'t attacked by pawn', () => {

      expect(jboard._isSquareAttackedByPawn('white', 0, 4)).be.false;
      expect(jboard._isSquareAttackedByPawn('white', 1, 4)).be.false;
      expect(jboard._isSquareAttackedByPawn('black', 3, 3)).be.false;
      expect(jboard._isSquareAttackedByPawn('black', 5, 3)).be.false;

    });

  });

  describe('_isCheck', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    beforeEach(() => {
      jboard._setPiecesByArray(TEST_POSITION);
    });

    it('return false if square isn\'t correct', () => {

      expect(jboard._isCheck('red')).to.be.null;
      expect(jboard._isCheck('green')).to.be.null;

    });

    it('both kings are not in check', () => {

      expect(jboard._isCheck('white')).to.be.false;
      expect(jboard._isCheck('black')).to.be.false;

    });

    it('white king is in check by queen', () => {

      jboard._doMove(3, 3, 5, 1);
      expect(jboard._isCheck('white')).to.be.true;

    });

    it('white king is in discovered check by bishop', () => {

      jboard._doMove(2, 2, 3, 5);
      expect(jboard._isCheck('white')).to.be.true;

    });

    it('black king is in check by pawn', () => {

      jboard._doMove(3, 5, 3, 6);
      expect(jboard._isCheck('black')).to.be.true;

    });

  });

  describe('_getKing', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard._setPiecesByArray(CASTLING_POSITION);
    });

    it('return false if square isn\'t correct', () => {

      expect(jboard._getKing('red')).to.be.null;
      expect(jboard._getKing('green')).to.be.null;

    });

    it('return white king position', () => {

      let square = jboard._getKing('white');

      expect(square.file).to.be.equal(4);
      expect(square.rank).to.be.equal(0);

    });

    it('return black king position', () => {

      let square = jboard._getKing('black');

      expect(square.file).to.be.equal(4);
      expect(square.rank).to.be.equal(7);

    });

  });

  describe('_cloneBoard', () => {

    let jboard;
    let newBoard;

    before(() => {
      jboard = new JBoard();
      jboard._setPiecesByArray(CASTLING_POSITION);
      newBoard = jboard._cloneBoard(jboard);
    });

    it('check white rook position on new _board', () => {
      expect(newBoard.getPieceType(0, 0)).to.be.equal('rook');
    });

    it('check white rook position on new _board after move on source _board', () => {
      expect(jboard.getPieceType(0, 0)).to.be.equal('rook');
      jboard._doMove(0, 0, 1, 0);
      expect(jboard.getPieceType(0, 0)).to.be.null;
      expect(newBoard.getPieceType(0, 0)).to.be.equal('rook');
    });

    it('check black rook position on source _board after move on new _board', () => {
      expect(newBoard.getPieceType(0, 7)).to.be.equal('rook');
      newBoard._doMove(0, 7, 1, 7);
      expect(newBoard.getPieceType(0, 7)).to.be.null;
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
        .equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    });

    it('get FEN of test position', () => {
      jboard._setPiecesByArray(TEST_POSITION);
      expect(jboard.getFEN()).to.be
        .equal('r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1');
    });

  });

  describe('_getFENPiece', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
      jboard.setUpInitial();
    });

    it('return null if square is empty', () => {
      expect(jboard._getFENPiece(0, 4)).to.be.null;
      expect(jboard._getFENPiece(4, 5)).to.be.null;
      expect(jboard._getFENPiece(6, 3)).to.be.null;
    });

    it('return FEN of white pieces', () => {
      expect(jboard._getFENPiece(0, 0)).to.be.equal('R');
      expect(jboard._getFENPiece(4, 0)).to.be.equal('K');
      expect(jboard._getFENPiece(2, 1)).to.be.equal('P');
    });

    it('return FEN of black pieces', () => {
      expect(jboard._getFENPiece(1, 7)).to.be.equal('n');
      expect(jboard._getFENPiece(2, 7)).to.be.equal('b');
      expect(jboard._getFENPiece(3, 7)).to.be.equal('q');
    });

  });

  describe('_getFENBoard', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('get FEN _board of initial position', () => {
      jboard.setUpInitial();
      expect(jboard._getFENBoard()).to.be
        .equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    });

    it('get FEN _board of test position', () => {
      jboard._setPiecesByArray(TEST_POSITION);
      expect(jboard._getFENBoard()).to.be
        .equal('r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R');
    });

  });

  describe('_getFENTurn', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('get FEN turn of initial position', () => {
      jboard.setUpInitial();
      expect(jboard._getFENTurn()).to.be.equal('w');
    });

    it('get FEN turn of test position', () => {
      jboard._setPiecesByArray(TEST_POSITION);
      expect(jboard._getFENTurn()).to.be.equal('w');
    });

  });

  describe('_getFENCastling', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('get FEN castling of initial position', () => {
      jboard.setUpInitial();
      expect(jboard._getFENCastling()).to.be.equal('KQkq');
    });

    it('get FEN castling of test position', () => {
      jboard._setPiecesByArray(TEST_POSITION);
      expect(jboard._getFENCastling()).to.be.equal('KQkq');
    });

    it('get "Qk" if castling available in queenside for white ' +
      'and in kingside for black', () => {
      jboard._castling.white = 2;
      jboard._castling.black = 1;
      expect(jboard._getFENCastling()).to.be.equal('Qk');
    });

    it('get "Kq" if castling available in kingside for white ' +
      'and in queenside for black', () => {
      jboard._castling.white = 1;
      jboard._castling.black = 2;
      expect(jboard._getFENCastling()).to.be.equal('Kq');
    });

    it('get "-" if castling unavailable', () => {
      jboard._castling.white = 0;
      jboard._castling.black = 0;
      expect(jboard._getFENCastling()).to.be.equal('-');
    });

  });

  describe('_getFENEnPassant', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return "-" for initial position', () => {
      jboard.setUpInitial();
      expect(jboard._getFENEnPassant()).to.be.equal('-');
    });

    it('return "-" for test position', () => {
      jboard._setPiecesByArray(TEST_POSITION);
      expect(jboard._getFENEnPassant()).to.be.equal('-');
    });

    it('return "b3" for test position after two moves', () => {
      jboard._setPiecesByArray(TEST_POSITION);
      jboard._turn = 'black';
      jboard._doMove(2, 4, 2, 3);
      jboard._doMove(1, 1, 1, 3);
      expect(jboard._getFENEnPassant()).to.be.equal('b3');
    });

  });

  describe('setPositionByFEN', () => {

    // let jboard;

    before(() => {
      // jboard = new JBoard();
    });

    it('get 8 string for setting ranks', () => {

    });

  });

  describe('_parseFENRank', () => {

    let jboard;

    before(() => {
      jboard = new JBoard();
    });

    it('return null for too long string', () => {
      expect(jboard._parseFENRank('rnbqkbnrr')).to.be.null;
    });

    it('return null for incorrect string', () => {
      expect(jboard._parseFENRank('rnbqk5nr')).to.be.null;
      expect(jboard._parseFENRank('77b7nr')).to.be.null;
      expect(jboard._parseFENRank('r9knr')).to.be.null;
      expect(jboard._parseFENRank('90')).to.be.null;
      expect(jboard._parseFENRank('r7000r')).to.be.null;
      expect(jboard._parseFENRank('rnfqkbnr')).to.be.null;
    });

    it('return array for correct string', () => {
      expect(jboard._parseFENRank('rnbqk1nr')[0].type).to.be.equal('rook');
      expect(jboard._parseFENRank('rnbqk1nr')[0].color).to.be.equal('black');
      expect(jboard._parseFENRank('rn1qk1nr')[7].type).to.be.equal('rook');
      expect(jboard._parseFENRank('rn1qk1nr')[7].color).to.be.equal('black');
      expect(jboard._parseFENRank('rnbq2nr')[1].type).to.be.equal('knight');
      expect(jboard._parseFENRank('rnbq2nr')[1].color).to.be.equal('black');
      expect(jboard._parseFENRank('rnbqk1nr')[6].type).to.be.equal('knight');
      expect(jboard._parseFENRank('rnbqk1nr')[6].color).to.be.equal('black');
      expect(jboard._parseFENRank('1nbqk1nr')[3].type).to.be.equal('queen');
      expect(jboard._parseFENRank('r1Bq4')[2].type).to.be.equal('bishop');
      expect(jboard._parseFENRank('r1Bq4')[2].color).to.be.equal('white');
    });

  });

});
