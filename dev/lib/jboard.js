export default class JBoard {
  /**
   *   CONSTRUCTOR
   */
  constructor() {
    this.board = [];

    this.initBoard();
    this.paintBoard();

    this.turn = 'white';
    this.count = 1;
    this.countFiftyMove = 0;

    this.selectFile = null;
    this.selectRank = null;

    this.enPassant = null;

    this.castling = {
      white: 0,
      black: 0,
    };

    this.INITIAL_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.MOVES = {
      rook: [
        { file: 0, rank: 1 },
        { file: 1, rank: 0 },
        { file: 0, rank: -1 },
        { file: -1, rank: 0 },
      ],
      knight: [
        { file: 1, rank: 2 },
        { file: 2, rank: 1 },
        { file: 2, rank: -1 },
        { file: 1, rank: -2 },
        { file: -1, rank: -2 },
        { file: -2, rank: -1 },
        { file: -2, rank: 1 },
        { file: -1, rank: 2 },
      ],
      bishop: [
        { file: 1, rank: 1 },
        { file: 1, rank: -1 },
        { file: -1, rank: -1 },
        { file: -1, rank: 1 },
      ],
      queen: [
        { file: 0, rank: 1 },
        { file: 1, rank: 1 },
        { file: 1, rank: 0 },
        { file: 1, rank: -1 },
        { file: 0, rank: -1 },
        { file: -1, rank: -1 },
        { file: -1, rank: 0 },
        { file: -1, rank: 1 },
      ],
      king: [
        { file: 0, rank: 1 },
        { file: 1, rank: 1 },
        { file: 1, rank: 0 },
        { file: 1, rank: -1 },
        { file: 0, rank: -1 },
        { file: -1, rank: -1 },
        { file: -1, rank: 0 },
        { file: -1, rank: 1 },
      ],
    };
  }

  /**
   *   INITIALIZATION
   */

  initBoard() {
    for (let i = 0; i < 8; i += 1) {
      this.board[i] = [];
      for (let j = 0; j < 8; j += 1) {
        this.board[i][j] = {
          selected: false,
          marked: false,
          piece: {
            type: null,
            color: null,
          },
          id: `${i}.${j}`,
        };
      }
    }
  }

  paintBoard() {
    let countSquare = 1;
    for (let i = 0; i < 8; i += 1) {
      countSquare += 1;
      for (let j = 0; j < 8; j += 1) {
        countSquare += 1;
        this.board[i][j].color = countSquare % 2 ? 'black' : 'white';
      }
    }
  }

  /**
   *   SETUP
   */

  setUpInitial() {
    this.setPositionByFEN(this.INITIAL_POSITION);
  }

  setPositionByFEN(FEN) {
    const hash = this.constructor.splitFEN(FEN);

    if (hash === null) {
      return null;
    }

    const pieceArray = this.parseFENRanks(hash.ranks);

    if (pieceArray === null) {
      return null;
    }

    this.setPiecesByArray(pieceArray)
      .parseFENTurn(hash.tail[0])
      .parseFENCastling(hash.tail[1])
      .parseFENEnPassant(hash.tail[2]);

    return this;
  }

  resetPosition() {
    this.resetSelect()
      .resetMarks()
      .board.forEach((item, file) => {
        item.forEach((square, rank) => {
          this.setPiece(file, rank, null, null);
        });
      });
  }

  /**
   *   GENERAL GETTERS
   */

  getBoard() {
    return [].concat(this.board);
  }

  /**
   *   SQUARE GETTERS
   */

  getSquare(file, rank) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }
    return this.board[file][rank];
  }

  getSquareColor(file, rank) {
    return this.getSquare(file, rank) && this.getSquare(file, rank).color;
  }

  getPieceType(file, rank) {
    return this.getSquare(file, rank) && this.getSquare(file, rank).piece.type;
  }

  getPieceColor(file, rank) {
    return this.getSquare(file, rank) && this.getSquare(file, rank).piece.color;
  }

  /**
   *   SQUARE SETTERS
   */

  setPieceType(file, rank, type) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }
    this.board[file][rank].piece.type = type;
    return true;
  }

  setPieceColor(file, rank, color) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }
    this.board[file][rank].piece.color = color;
    return true;
  }

  setPiece(file, rank, type, color) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }
    this.board[file][rank].piece = {
      type,
      color,
    };
    return true;
  }

  /**
   *   EN PASSANT
   */

  checkEnPassant(startFile, startRank, stopFile, stopRank) {
    const piece = this.getPieceType(startFile, startRank);

    if (piece === 'pawn') {
      if (this.isEnPassant(stopFile, stopRank)) this.removePiece(stopFile, startRank);
      this.setEnPassant(null);

      if (Math.abs(startRank - stopRank) === 2) {
        const color = this.getPieceColor(startFile, startRank);

        if (this.isFoesPawn(color, stopFile - 1, stopRank) ||
          this.isFoesPawn(color, stopFile + 1, stopRank)) {
          if (color === 'white') {
            if (stopRank === 3) this.setEnPassant(stopFile, 2);
          } else if (stopRank === 4) this.setEnPassant(stopFile, 5);
        }
      }

      return true;
    }

    this.setEnPassant(null);
    return true;
  }

  getEnPassant() {
    return this.enPassant;
  }

  setEnPassant(file, rank) {
    if (!this.constructor.validateSquare(file, rank) || (rank !== 2 && rank !== 5)) {
      this.enPassant = null;
      return false;
    }

    this.enPassant = {
      file,
      rank,
    };

    return true;
  }

  isEnPassant(file, rank) {
    const pass = this.getEnPassant();
    if (!pass) {
      return false;
    }
    return pass.file === file && pass.rank === rank;
  }

  /**
   *   PICK
   */

  pickSquare(file, rank) {
    const square = this.getSquare(file, rank);
    if (!square) {
      return null;
    }

    if (this.isSquareMarked(file, rank)) {
      this.doMove(this.selectFile, this.selectRank, file, rank);

      this.selectFile = null;
      this.selectRank = null;
      this.resetMarks()
        .resetSelect();
    } else {
      this.resetSelect();
      square.selected = true;
      this.selectFile = file;
      this.selectRank = rank;
      this.markMoves(file, rank);
    }

    return true;
  }

  passTurn() {
    if (this.turn === 'white') {
      this.turn = 'black';
    } else {
      this.turn = 'white';
    }
  }

  getTurn() {
    return this.turn;
  }

  setTurn(color) {
    if (color === 'white') this.turn = 'white';
    if (color === 'black') this.turn = 'black';
  }

  /**
   *   SELECT
   */

  resetSelect() {
    this.board.forEach((file) => {
      file.forEach((item) => {
        const square = item;
        square.selected = false;
      });
    });

    return this;
  }

  isSquareSelected(file, rank) {
    const square = this.getSquare(file, rank);
    if (!square) {
      return null;
    }
    return square.selected;
  }

  /**
   *   MARK MOVES
   */

  resetMarks() {
    this.board.forEach((file) => {
      file.forEach((item) => {
        const square = item;
        square.marked = false;
      });
    });

    return this;
  }

  isSquareMarked(file, rank) {
    const square = this.getSquare(file, rank);
    if (!square) {
      return null;
    }
    return square.marked;
  }

  markMoves(file, rank) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }
    this.resetMarks();

    if (this.getPieceColor(file, rank) !== this.turn) {
      return null;
    }

    if (this.getPieceType(file, rank)) {
      const moves = this.getMoves(file, rank);
      if (!moves) {
        return null;
      }
      moves.forEach((item) => {
        this.board[item.file][item.rank].marked = true;
      });
    }
    return this;
  }

  /**
   *   GET MOVES
   */

  getMoves(file, rank) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }

    switch (this.getPieceType(file, rank)) {
      case 'pawn':
        return this.getMovesPawn(file, rank);

      case 'king':
        return this.getMovesKing(file, rank);

      default:
        return this.getMovesPiece(file, rank);
    }
  }

  /**
   *   DO MOVE
   */

  doMove(startFile, startRank, stopFile, stopRank) {
    this.checkEnPassant(startFile, startRank, stopFile, stopRank);

    const type = this.getPieceType(startFile, startRank);
    const color = this.getPieceColor(startFile, startRank);
    let capture = false;

    if (!this.constructor.validateSquare(startFile, startRank)) {
      return null;
    }
    if (!this.constructor.validateSquare(stopFile, stopRank)) {
      return null;
    }
    if (this.isEmpty(startFile, startRank)) {
      return null;
    }
    if (this.isFriend(color, stopFile, stopRank)) {
      return null;
    }

    if (type === 'king' && Math.abs(startFile - stopFile) === 2) {
      this.doCastling(color, stopFile);
    } else {
      capture = this.isFoe(color, stopFile, stopRank);
      this.setPiece(stopFile, stopRank, type, color);
      this.removePiece(startFile, startRank);
    }

    if (type === 'king' || type === 'rook') {
      this.checkCastling(color, type, startFile);
    }

    if (color === 'black') {
      this.count += 1;
    }

    if (capture || type === 'pawn') {
      this.countFiftyMove = 0;
    } else {
      this.countFiftyMove += 1;
    }

    this.passTurn();

    return true;
  }

  /**
   *   CHECK MOVE
   */

  checkMove(startFile, startRank, stopFile, stopRank) {
    const checkBoard = this.cloneBoard(this);

    if (checkBoard.doMove(startFile, startRank, stopFile, stopRank)) {
      return !checkBoard.isCheck(this.getPieceColor(startFile, startRank));
    }
    return null;
  }

  /**
   *   GET PAWN MOVES
   */

  getMovesPawn(file, rank) {
    const moves = [];
    const pawnColor = this.getPieceColor(file, rank);
    const moveDirection = (pawnColor === 'white') ? 1 : -1;

    let targetFile = file;
    let targetRank = rank + moveDirection;

    if (this.constructor.validateSquare(targetFile, targetRank)) {
      if (!this.getPieceType(targetFile, targetRank)) {
        moves.push({ file: targetFile, rank: targetRank });
        if ((pawnColor === 'white' && rank === 1) ||
          (pawnColor === 'black' && rank === 6)) {
          targetRank = rank + (2 * moveDirection);
          if (!this.getPieceType(targetFile, targetRank)) {
            moves.push({ file: targetFile, rank: targetRank });
          }
        }
      }
    }

    targetRank = rank + moveDirection;

    targetFile = file - 1;
    if (this.isFoe(pawnColor, targetFile, targetRank) ||
      (this.isEnPassant(targetFile, targetRank))) {
      moves.push({ file: targetFile, rank: targetRank });
    }

    targetFile = file + 1;
    if (this.isFoe(pawnColor, targetFile, targetRank) ||
      (this.isEnPassant(targetFile, targetRank))) {
      moves.push({ file: targetFile, rank: targetRank });
    }

    return this.filterMoves(moves, file, rank);
  }

  /**
   *   GET KING MOVES
   */

  getMovesKing(file, rank) {
    const moves = this.getMovesPiece(file, rank);
    const castling = this.getCastlingMove(file, rank);

    if (castling) castling.forEach(item => moves.push(item));

    return this.filterMoves(moves, file, rank);
  }

  getCastlingMove(file, rank) {
    if (!(file === 4 && (rank === 0 || rank === 7))) {
      return null;
    }
    const color = (rank === 0) ? 'white' : 'black';
    if (this.castling[color] === 0) {
      return null;
    }
    if (this.isCheck(color)) {
      return null;
    }
    const result = [];

    if (this.castling[color] > 1 && !this.isSquareAttacked(color, file - 1, rank) &&
      (this.isEmpty(file - 1, rank)) && (this.isEmpty(file - 2, rank)) &&
      (this.isEmpty(file - 3, rank))) {
      result.push({ file: 2, rank });
    }

    if (this.castling[color] % 2 === 1 && !this.isSquareAttacked(color, file + 1, rank) &&
      (this.isEmpty(file + 1, rank)) && (this.isEmpty(file + 2, rank))) {
      result.push({ file: 6, rank });
    }

    return result;
  }

  checkCastling(color, type, file) {
    if (this.castling[color] > 0) {
      if (type === 'king') {
        this.castling[color] = 0;
      }
      if (type === 'rook') {
        if (file === 0 && this.castling[color] > 1) {
          this.castling[color] -= 2;
        }
        if (file === 7 && this.castling[color] % 2 === 1) {
          this.castling[color] -= 1;
        }
      }
    }
  }

  doCastling(color, file) {
    if (color === 'white') {
      this.setPiece(file, 0, 'king', 'white');
      this.removePiece(4, 0);

      if (file === 2) {
        this.setPiece(3, 0, 'rook', 'white');
        this.removePiece(0, 0);
      } else {
        this.setPiece(5, 0, 'rook', 'white');
        this.removePiece(7, 0);
      }
    } else {
      this.setPiece(file, 7, 'king', 'black');
      this.removePiece(4, 7);

      if (file === 2) {
        this.setPiece(3, 7, 'rook', 'black');
        this.removePiece(0, 7);
      } else {
        this.setPiece(5, 7, 'rook', 'black');
        this.removePiece(7, 7);
      }
    }
  }

  /**
   *   GET PIECE MOVES
   */

  getMovesPiece(file, rank) {
    const piece = this.getPieceType(file, rank);
    const color = this.getPieceColor(file, rank);

    const moves = this.getAttackedSquares(piece, color, file, rank);

    return this.filterMoves(moves, file, rank);
  }

  filterMoves(moves, file, rank) {
    if (!moves) {
      return null;
    }

    return moves.filter(item => this.checkMove(file, rank, item.file, item.rank));
  }

  getAttackedSquares(piece, color, file, rank) {
    const moves = this.MOVES[piece];
    const count = (piece === 'king' || piece === 'knight') ? 1 : 7;
    const result = [];

    moves.forEach((item) => {
      let i = 0;
      while (i < count) {
        i += 1;
        const targetFile = file + (i * item.file);
        const targetRank = rank + (i * item.rank);

        if (this.constructor.validateSquare(targetFile, targetRank)) {
          if (this.isFriend(color, targetFile, targetRank)) {
            break;
          } else {
            result.push({ file: targetFile, rank: targetRank });
          }
        } else {
          break;
        }

        if (this.isFoe(color, targetFile, targetRank)) {
          break;
        }
      }
    });

    if (result.length > 0) {
      return result;
    }
    return null;
  }

  /**
   *   VALIDATORS
   */

  static validateSquare(file, rank) {
    return (file !== null && rank !== null) &&
      (file >= 0 && file <= 7 && rank >= 0 && rank <= 7);
  }

  /**
   *   SERVICES
   */

  isFriend(color, file, rank) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }
    if (!this.getPieceType(file, rank)) {
      return false;
    }
    return (color === this.getPieceColor(file, rank));
  }

  isFoe(color, file, rank) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }
    if (!this.getPieceType(file, rank)) {
      return false;
    }
    return (color !== this.getPieceColor(file, rank));
  }

  isFoesPawn(color, file, rank) {
    return this.getPieceType(file, rank) === 'pawn' && this.isFoe(color, file, rank);
  }

  isEmpty(file, rank) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }
    return this.getPieceType(file, rank) === null;
  }

  isSquareAttacked(color, file, rank) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }

    let result = false;

    if (this.isSquareAttackedByPawn(color, file, rank)) {
      result = true;
    } else {
      const pieces = ['rook', 'knight', 'bishop', 'queen', 'king'];

      pieces.forEach((type) => {
        const squares = this.getAttackedSquares(type, color, file, rank);

        if (squares) {
          squares.forEach((item) => {
            if (this.getPieceType(item.file, item.rank) === type) {
              result = true;
            }
          });
        }
      });
    }

    return result;
  }

  isSquareAttackedByPawn(color, file, rank) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }

    const targetRank = (color === 'white') ? rank + 1 : rank - 1;
    const targetFile = [file - 1, file + 1];

    const result = targetFile.filter(item => this.getPieceType(item, targetRank) === 'pawn' &&
      this.isFoe(color, item, targetRank));

    return result.length > 0;
  }

  isCheck(color) {
    const king = this.getKing(color);
    return king && this.isSquareAttacked(color, king.file, king.rank);
  }

  isMate(color) {
    if (!this.isCheck(color).length) return false;
    const moves = this.getMoves(color);
    return !moves.length;
  }

  getKing(color) {
    if (color !== 'white' && color !== 'black') {
      return null;
    }

    for (let file = 0; file < 8; file += 1) {
      for (let rank = 0; rank < 8; rank += 1) {
        if (this.getPieceType(file, rank) === 'king' &&
          this.getPieceColor(file, rank) === color) {
          return {
            file,
            rank,
          };
        }
      }
    }
    return this;
  }

  removePiece(file, rank) {
    this.setPieceType(file, rank, null);
    this.setPieceColor(file, rank, null);
  }

  cloneBoard(src) {
    const newBoard = new JBoard();

    if (src.enPassant !== null) {
      newBoard.enPassant = {
        file: src.enPassant.file,
        rank: src.enPassant.rank,
      };
    } else {
      newBoard.enPassant = null;
    }

    newBoard.turn = this.turn;

    newBoard.castling = {
      white: src.castling.white,
      black: src.castling.black,
    };

    for (let file = 0; file < 8; file += 1) {
      for (let rank = 0; rank < 8; rank += 1) {
        newBoard.board[file][rank].piece.type = src.board[file][rank].piece.type;
        newBoard.board[file][rank].piece.color = src.board[file][rank].piece.color;
      }
    }

    return newBoard;
  }

  /**
   *   FEN
   */

  getFEN() {
    return `${this.getFENBoard()} ${
      this.getFENTurn()} ${
      this.getFENCastling()} ${
      this.getFENEnPassant()} ${
      this.getFENCounts()}`;
  }

  getFENPiece(file, rank) {
    if (!this.constructor.validateSquare(file, rank)) {
      return null;
    }
    const piece = this.getPieceType(file, rank);
    if (!piece) {
      return null;
    }
    let FEN;
    switch (piece) {
      case 'pawn':
        FEN = 'p';
        break;

      case 'rook':
        FEN = 'r';
        break;

      case 'knight':
        FEN = 'n';
        break;

      case 'bishop':
        FEN = 'b';
        break;

      case 'queen':
        FEN = 'q';
        break;

      case 'king':
        FEN = 'k';
        break;

      default:
        break;
    }

    if (this.getPieceColor(file, rank) === 'white') {
      return FEN.toUpperCase();
    }
    return FEN;
  }

  getFENBoard() {
    let result = '';

    for (let rank = 7; rank >= 0; rank -= 1) {
      let vacancy = 0;
      for (let file = 0; file < 8; file += 1) {
        if (this.getFENPiece(file, rank) !== null) {
          if (vacancy !== 0) {
            result += vacancy;
            vacancy = 0;
          }
          result += this.getFENPiece(file, rank);
        } else {
          vacancy += 1;
        }
      }
      if (vacancy !== 0) {
        result += vacancy;
      }
      if (rank > 0) {
        result += '/';
      }
    }

    return result;
  }

  getFENTurn() {
    if (this.turn === 'white') {
      return 'w';
    }
    return 'b';
  }

  getFENCastling() {
    let result = '';

    if (this.castling.white % 2 === 1) {
      result += 'K';
    }
    if (this.castling.white > 1) {
      result += 'Q';
    }
    if (this.castling.black % 2 === 1) {
      result += 'k';
    }
    if (this.castling.black > 1) {
      result += 'q';
    }
    if (result) {
      return result;
    }
    return '-';
  }

  getFENEnPassant() {
    const { enPassant } = this;
    if (!this.enPassant) {
      return '-';
    }
    return this.constructor.getAlgebraicByDigits(enPassant.file, enPassant.rank);
  }

  getFENCounts() {
    const { countFiftyMove, count } = this;
    return `${countFiftyMove} ${count}`;
  }

  static getAlgebraicByDigits(file, rank) {
    const shiftFile = 97;
    const shiftRank = 1;
    return String.fromCharCode(file + shiftFile) + (rank + shiftRank);
  }

  parseFENTurn(FEN) {
    if (FEN === 'w') {
      this.setTurn('white');
    }
    if (FEN === 'b') {
      this.setTurn('black');
    }

    return this;
  }

  parseFENCastling(FEN) {
    let black = 0;
    let white = 0;
    let i;
    let countK = 0;
    let countk = 0;
    let countQ = 0;
    let countq = 0;

    const { length } = FEN;

    if (FEN === '-' || length > 4) {
      this.castling = {
        white: 0,
        black: 0,
      };
      return this;
    }

    for (i = 0; i < length; i += 1) {
      switch (FEN[i]) {
        case 'K':
          if (!countK) white += 1;
          countK += 1;
          break;

        case 'Q':
          if (!countQ) white += 2;
          countQ += 1;
          break;

        case 'k':
          if (!countk) black += 1;
          countk += 1;
          break;

        case 'q':
          if (!countq) black += 2;
          countq += 1;
          break;

        default:
          break;
      }
    }

    this.castling = {
      white,
      black,
    };

    return this;
  }

  parseFENEnPassant(FEN) {
    const fileShift = 97;

    if (FEN.length !== 2) {
      this.enPassant = null;
      return this;
    }

    const rank = +FEN[1] - 1;

    if (rank !== 2 && rank !== 5) {
      this.enPassant = null;
      return this;
    }

    const file = FEN.charCodeAt(0) - fileShift;

    if (file < 0 || file > 7) {
      this.enPassant = null;
      return this;
    }

    if (this.getPieceType(file, rank) !== null) {
      this.enPassant = null;
      return this;
    }

    if (this.checkFENEnPassant(file, rank)) {
      this.enPassant = {
        file,
        rank,
      };
    }

    return this;
  }

  checkFENEnPassant(file, rank) {
    let foeColor;
    let friendColor;
    let neighborRank;

    switch (rank) {
      case 2:
        friendColor = 'black';
        foeColor = 'white';
        neighborRank = 4;
        break;

      case 5:
        friendColor = 'white';
        foeColor = 'black';
        neighborRank = 3;
        break;

      default:
        return false;
    }

    if (this.getPieceType(file, neighborRank) !== 'pawn' ||
      this.getPieceColor(file, neighborRank) !== friendColor) {
      return false;
    }

    return !((this.getPieceType(file - 1, neighborRank) !== 'pawn' ||
      this.getPieceColor(file - 1, neighborRank) !== foeColor) &&
      (this.getPieceType(file + 1, neighborRank) !== 'pawn' ||
        this.getPieceColor(file + 1, neighborRank) !== foeColor));
  }

  static splitFEN(FEN) {
    const ranks = FEN.split('/');
    if (ranks.length !== 8) {
      return null;
    }
    const tail = ranks[7].split(' ');
    const lastRank = tail[0];
    ranks[7] = lastRank;
    tail.shift();
    if (tail.length !== 5) {
      return null;
    }
    ranks.reverse();

    return {
      ranks,
      tail,
    };
  }

  parseFENRanks(ranks) {
    let file;
    let rank;
    let rankSet;
    const result = [];

    for (rank = 0; rank < 8; rank += 1) {
      rankSet = this.constructor.parseFENRank(ranks[rank]);
      if (rankSet === null) {
        return null;
      }
      if (rankSet.length !== 8) {
        return null;
      }
      for (file = 0; file < 8; file += 1) {
        result.push({
          file,
          rank,
          piece: {
            type: rankSet[file].type,
            color: rankSet[file].color,
          },
        });
      }
    }

    return result;
  }

  static parseFENRank(FEN) {
    let i;
    let j;
    let n;
    let count = 0;
    const { length } = FEN;
    const result = [];

    if (length > 8) {
      return null;
    }

    for (i = 0; i < length; i += 1) {
      if (+FEN[i] > 0 && +FEN[i] < 9) {
        n = +FEN[i];

        if (count + n < 9) {
          for (j = 0; j < n; j += 1) {
            result[count] = {
              type: null,
              color: null,
            };
            count += 1;
          }
        } else {
          return null;
        }
      } else {
        result[count] = {};
        switch (FEN[i].toLowerCase()) {
          case 'r':
            result[count].type = 'rook';
            break;

          case 'n':
            result[count].type = 'knight';
            break;

          case 'b':
            result[count].type = 'bishop';
            break;

          case 'q':
            result[count].type = 'queen';
            break;

          case 'k':
            result[count].type = 'king';
            break;

          case 'p':
            result[count].type = 'pawn';
            break;

          default:
            return null;
        }

        if (FEN[i].toLowerCase() === FEN[i]) {
          result[count].color = 'black';
        } else {
          result[count].color = 'white';
        }

        count += 1;
      }

      if (count > 8) {
        return null;
      }
    }

    if (count !== 8) {
      return null;
    }

    return result;
  }

  setPiecesByArray(pieceSet) {
    this.turn = 'white';

    this.count = 1;
    this.countFiftyMove = 0;

    this.enPassant = null;

    this.castling = {
      white: 3,
      black: 3,
    };

    this.resetPosition();
    pieceSet.forEach((item) => {
      this.setPiece(item.file, item.rank, item.piece.type, item.piece.color);
    });

    return this;
  }
}
