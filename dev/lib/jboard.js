/** Class representation a chess board. */
export default class JBoard {
  /** Create a board. */
  constructor() {
    this.initConsts();
    this.initFields();
    this.initBoard();
    this.paintBoard();
  }

  /** Initialize constants. */
  initConsts() {
    const rook = [
      { file: 0, rank: 1 }, { file: 1, rank: 0 },
      { file: 0, rank: -1 }, { file: -1, rank: 0 },
    ];

    const bishop = [
      { file: 1, rank: 1 }, { file: 1, rank: -1 },
      { file: -1, rank: -1 }, { file: -1, rank: 1 },
    ];

    const knight = [
      { file: 1, rank: 2 }, { file: 2, rank: 1 },
      { file: 2, rank: -1 }, { file: 1, rank: -2 },
      { file: -1, rank: -2 }, { file: -2, rank: -1 },
      { file: -2, rank: 1 }, { file: -1, rank: 2 },
    ];

    this.moves = {
      rook: [...rook],
      knight: [...knight],
      bishop: [...bishop],
      queen: [...rook, ...bishop],
      king: [...rook, ...bishop],
    };
  }

  /** Initialize fields. */
  initFields() {
    this.board = [];
    this.turn = 'white';
    this.count = 1;
    this.countFiftyMove = 0;
    this.select = null;
    this.enPassant = null;
    this.castling = { white: 0, black: 0 };
  }

  /** Initialize board array. */
  initBoard() {
    for (let i = 0; i < 8; i += 1) {
      this.board[i] = [];

      for (let j = 0; j < 8; j += 1) {
        this.board[i][j] = {
          selected: false,
          marked: false,
          piece: { type: null, color: null },
          id: `${i}.${j}`,
        };
      }
    }
  }

  /** Set color of squares. */
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

  /** Set up initial position. */
  setUp() {
    this.setPositionByFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  }

  /**
   * Set up position by FEN.
   * @param FEN
   */
  setPositionByFEN(FEN) {
    const hash = JBoard.splitFEN(FEN);
    if (hash === null) return;
    const pieceArray = JBoard.parseFENRanks(hash.ranks);
    if (pieceArray === null) return;
    this.setPiecesByArray(pieceArray);
    this.parseFENTurn(hash.tail[0]);
    this.parseFENCastling(hash.tail[1]);
    this.parseFENEnPassant(hash.tail[2]);
  }

  /** Reset position and state of game. */
  resetPosition() {
    this.resetSelected();
    this.resetMarked();

    this.board.forEach((item, file) => {
      item.forEach((square, rank) => {
        this.removePiece(file, rank);
      });
    });

    this.turn = 'white';
    this.count = 1;
    this.countFiftyMove = 0;
    this.enPassant = null;
    this.castling = { white: 0, black: 0 };
  }

  /**
   * Return board array.
   * @returns {Array.<*>}
   */
  getBoard() {
    return [].concat(this.board);
  }

  /**
   * Return object of square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @returns {?Object}
   */
  getSquare(file, rank) {
    if (!JBoard.isSquare(file, rank)) return null;
    return this.board[file][rank];
  }

  /**
   * Return color of square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @returns {?Object}
   */
  getSquareColor(file, rank) {
    const square = this.getSquare(file, rank);
    return square && square.color;
  }

  /**
   * Return type of piece.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @returns {?string}
   */
  getPieceType(file, rank) {
    const square = this.getSquare(file, rank);
    return square && square.piece.type;
  }

  /**
   * Return color of piece.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @returns {?string}
   */
  getPieceColor(file, rank) {
    const square = this.getSquare(file, rank);
    return square && square.piece.color;
  }

  /**
   * Set piece on square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @param type
   * @returns {boolean}
   */
  setPieceType(file, rank, type) {
    this.board[file][rank].piece.type = type;
    return true;
  }

  /**
   * Set color of piece on square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @param color
   * @returns {boolean}
   */
  setPieceColor(file, rank, color) {
    this.board[file][rank].piece.color = color;
    return true;
  }

  /**
   * Set piece and its color on square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @param type
   * @param color
   * @returns {boolean}
   */
  setPiece(file, rank, type, color) {
    this.board[file][rank].piece = {
      type,
      color,
    };

    return true;
  }

  /**
   * Remove capturing piece if an en-passant capture was made
   * and check capturing en-passant for next turn.
   * @param start
   * @param stop
   */
  handleEnPassant(start, stop) {
    if (this.getPieceType(start.file, start.rank) === 'pawn') {
      if (this.isEnPassant(stop)) {
        // capture en-passant
        this.removePiece(stop.file, start.rank);
      } else if (Math.abs(start.rank - stop.rank) === 2) {
        // check en-passant for next turn
        this.checkEnPassant(stop);
        return;
      }
    }

    this.enPassant = null;
  }

  /**
   * Check possible capturing en-passant for next turn.
   * @param square
   */
  checkEnPassant(square) {
    const { file, rank } = square;
    const color = this.turn;
    if (
      this.isFoesPawn(color, file - 1, rank)
      || this.isFoesPawn(color, file + 1, rank)
    ) {
      if (color === 'white') {
        if (rank === 3) this.enPassant = { file, rank: 2 };
      } else if (rank === 4) this.enPassant = { file, rank: 5 };
    }
  }

  /**
   * Return square if capturing en-passant is possible.
   * @returns {?Object}
   */
  getEnPassant() {
    return this.enPassant;
  }

  /**
   * Check is the capturing en-passant possible.
   * @param square
   * @returns {boolean}
   */
  isEnPassant(square) {
    const pass = this.getEnPassant();
    if (!pass) return false;
    return pass.file === square.file && pass.rank === square.rank;
  }

  /**
   * Pick square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @param promType
   */
  pickSquare(file, rank, promType) {
    if (!this.getSquare(file, rank)) return;
    if (this.isSquareMarked(file, rank)) {
      this.handleMove(this.select, { file, rank }, promType);
      this.resetSelected();
      this.resetMarked();
    } else {
      this.resetSelected();
      this.selectSquare(file, rank);
      this.markMoves(file, rank);
    }
  }

  /**
   * Return turn.
   * @returns {string|string}
   */
  getTurn() {
    return this.turn;
  }

  /** Pass turn. */
  passTurn() {
    if (this.turn === 'white') {
      this.turn = 'black';
    } else {
      this.turn = 'white';
    }
  }

  /**
   * Select square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   */
  selectSquare(file, rank) {
    this.select = { file, rank };
    this.board[file][rank].selected = true;
  }

  /**
   * Clear selected square.
   */
  resetSelected() {
    this.board.forEach((file) => {
      file.forEach((item) => {
        const square = item;
        square.selected = false;
      });
    });
    this.select = null;
  }

  /**
   * Check is the square selected.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @returns {?boolean}
   */
  isSquareSelected(file, rank) {
    const square = this.getSquare(file, rank);
    if (!square) return null;
    return square.selected;
  }

  /**
   * Clear marked squares.
   */
  resetMarked() {
    this.board.forEach((file) => {
      file.forEach((item) => {
        const square = item;
        square.marked = false;
      });
    });
  }

  /**
   * Check is the square marked.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @returns {?boolean}
   */
  isSquareMarked(file, rank) {
    const square = this.getSquare(file, rank);
    if (!square) return null;
    return square.marked;
  }

  /**
   * Mark square for valid moves.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   */
  markMoves(file, rank) {
    this.resetMarked();
    if (this.getPieceColor(file, rank) !== this.turn) return;
    if (this.getPieceType(file, rank)) {
      const moves = this.getMoves(file, rank);
      if (!moves) return;
      moves.forEach((item) => {
        this.board[item.file][item.rank].marked = true;
      });
    }
  }

  /**
   * Return array of valid moves for piece on square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @returns {?Array}
   */
  getMoves(file, rank) {
    switch (this.getPieceType(file, rank)) {
      case 'pawn': {
        return this.getMovesPawn(file, rank);
      }
      case 'king': {
        return this.getMovesKing(file, rank);
      }
      default: {
        return this.getMovesPiece(file, rank);
      }
    }
  }

  /**
   * Return array of valid moves for all pieces of the color.
   * @param color
   * @returns {Array}
   */
  getAllMoves(color) {
    let moves = [];
    for (let file = 0; file < 8; file += 1) {
      for (let rank = 0; rank < 8; rank += 1) {
        if (this.getPieceColor(file, rank) === color) {
          const move = this.getMoves(file, rank);
          if (move) moves = moves.concat(move);
        }
      }
    }

    return moves;
  }

  /**
   * Check is the move possible.
   * @param {Object.<string, number>} start - Start square of move.
   * @param {Object.<string, number>} stop - Stop square of move.
   * @param color - Color of piece.
   * @returns {boolean}
   */
  checkBeforeMove(start, stop, color) {
    if (JBoard.isSquare(start)) {
      if (JBoard.isSquare(stop)) {
        if (!this.isEmpty(start.file, start.rank)) {
          if (!this.isFriend(color, stop.file, stop.rank)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Check are there castling moves for next turn
   * and increase move count.
   * @param type - Type of piece.
   * @param color - Color of piece.
   * @param startFile - Start file of move.
   */
  checkAfterMove(type, color, startFile) {
    this.checkCastling(color, type, startFile);
    if (color === 'black') {
      this.count += 1;
    }

    this.passTurn();
  }

  /**
   * Check count of fifty-move rule.
   * @param type - Type of piece.
   * @param color - Color of piece.
   * @param {Object.<string, number>} stopSquare - Stop square of move.
   */
  checkFiftyMove(type, color, stopSquare) {
    const { file, rank } = stopSquare;
    const capture = this.isFoe(color, file, rank);
    if (capture || type === 'pawn') {
      this.countFiftyMove = 0;
    } else {
      this.countFiftyMove += 1;
    }
  }

  /**
   * Do move on the board.
   * @param {string} type - Type of piece.
   * @param {string} color - Color of piece.
   * @param {Object.<string, number>} start - Start square of move.
   * @param {Object.<string, number>} stop - Stop square of move.
   * @param {string} promType - Type of piece for pawn promotion.
   */
  doMove(type, color, start, stop, promType) {
    this.handleEnPassant(start, stop);
    // check castling
    if (type === 'king' && Math.abs(start.file - stop.file) === 2) {
      this.doCastling(stop);
    } else {
      this.checkFiftyMove(type, color, stop);
      // check pawn promotion
      if (JBoard.handlePawnPromotin(type, color, stop.rank)) {
        this.setPiece(stop.file, stop.rank, promType || 'queen', color);
      } else {
        this.setPiece(stop.file, stop.rank, type, color);
      }

      this.removePiece(start.file, start.rank);
    }
  }

  /**
   * Handle move.
   * @param {Object.<string, number>} start - Start square of move.
   * @param {Object.<string, number>} stop - Stop square of move.
   * @param {string} promType - Type of piece for pawn promotion.
   */
  handleMove(start, stop, promType) {
    const type = this.getPieceType(start.file, start.rank);
    const color = this.getPieceColor(start.file, start.rank);

    if (this.checkBeforeMove(start, stop, color)) {
      this.doMove(type, color, start, stop, promType);
    } else return null;

    this.checkAfterMove(type, color, start.file);
    return true;
  }

  static handlePawnPromotin(type, color, stopRank) {
    return (
      type === 'pawn'
      && ((color === 'white' && stopRank === 7)
      || (color === 'black' && stopRank === 0))
    );
  }

  /**
   * Check is there discovered check on board.
   * @param {Object.<string, number>} start - Start square of move.
   * @param {Object.<string, number>} stop - Stop square of move.
   * @returns {boolean}
   */
  isDiscoveredCheck(start, stop) {
    const checkBoard = JBoard.cloneBoard(this);
    if (checkBoard.handleMove(start, stop, 'queen')) {
      const { file, rank } = start;
      const color = this.getPieceColor(file, rank);
      return !checkBoard.isCheck(color);
    }

    return false;
  }

  /**
   *   GET PAWN MOVES
   */

  getMovesPawn(file, rank) {
    const moves = [];
    const pawnColor = this.getPieceColor(file, rank);
    const moveDirection = (pawnColor === 'white') ? 1 : -1;
    const trg = {
      file,
      rank: rank + moveDirection,
    };

    if (JBoard.isSquare(trg)) {
      if (!this.getPieceType(trg.file, trg.rank)) {
        moves.push({ ...trg });
        if ((pawnColor === 'white' && rank === 1) ||
          (pawnColor === 'black' && rank === 6)) {
          trg.rank = rank + (2 * moveDirection);
          if (!this.getPieceType(trg.file, trg.rank)) {
            moves.push({ ...trg });
          }
        }
      }
    }

    trg.rank = rank + moveDirection;

    trg.file = file - 1;
    if (
      this.isFoe(pawnColor, trg.file, trg.rank)
      || (this.isEnPassant(trg))
    ) {
      moves.push({ ...trg });
    }

    trg.file = file + 1;
    if (
      this.isFoe(pawnColor, trg.file, trg.rank)
      || (this.isEnPassant(trg))
    ) {
      moves.push({ ...trg });
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
    if (!(file === 4 && (rank === 0 || rank === 7))) return null;
    const color = (rank === 0) ? 'white' : 'black';
    if (this.castling[color] === 0) return null;
    if (this.isCheck(color)) return null;
    const result = [];

    if (
      this.castling[color] > 1
      && !this.isSquareAttacked(color, file - 1, rank)
      && (this.isEmpty(file - 1, rank))
      && (this.isEmpty(file - 2, rank))
      && (this.isEmpty(file - 3, rank))
    ) {
      result.push({ file: 2, rank });
    }

    if (
      this.castling[color] % 2 === 1 && !this.isSquareAttacked(color, file + 1, rank)
      && (this.isEmpty(file + 1, rank)) && (this.isEmpty(file + 2, rank))
    ) {
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

  doCastling(kingStop) {
    const { file, rank } = kingStop;
    const color = rank ? 'black' : 'white';
    const startFile = file === 2 ? 0 : 7;
    const stopFile = file === 2 ? 3 : 5;
    this.setPiece(file, rank, 'king', color);
    this.removePiece(4, rank);
    this.setPiece(stopFile, rank, 'rook', color);
    this.removePiece(startFile, rank);
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
    if (!moves) return null;
    return moves.filter((item) => {
      const start = { file, rank };
      return this.isDiscoveredCheck(start, item);
    });
  }

  getAttackedSquares(piece, color, file, rank) {
    const moves = this.moves[piece];
    const count = (piece === 'king' || piece === 'knight') ? 1 : 7;
    const result = [];

    moves.forEach((item) => {
      let i = 0;
      while (i < count) {
        i += 1;
        const trg = {
          file: file + (i * item.file),
          rank: rank + (i * item.rank),
        };

        if (JBoard.isSquare(trg)) {
          if (this.isFriend(color, trg.file, trg.rank)) {
            break;
          } else {
            result.push({ ...trg });
          }
        } else {
          break;
        }

        if (this.isFoe(color, trg.file, trg.rank)) {
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
   *   SERVICES
   */

  static isSquare(a, b) {
    if (a === undefined || a === null || b === null) return false;
    if (typeof a === 'number') {
      if (typeof b === 'number') {
        return a >= 0 && a <= 7 && b >= 0 && b <= 7;
      }
    } else if (typeof a === 'object') {
      const { file, rank } = a;
      if (typeof file === 'number' && typeof rank === 'number') {
        return file >= 0 && file <= 7 && rank >= 0 && rank <= 7;
      }
    }
    return false;
  }

  isFriend(color, file, rank) {
    if (!this.getPieceType(file, rank)) return false;
    return (color === this.getPieceColor(file, rank));
  }

  isFoe(color, file, rank) {
    if (!this.getPieceType(file, rank)) return false;
    return (color !== this.getPieceColor(file, rank));
  }

  isFoesPawn(color, file, rank) {
    return this.getPieceType(file, rank) === 'pawn' && this.isFoe(color, file, rank);
  }

  isEmpty(file, rank) {
    return this.getPieceType(file, rank) === null;
  }

  isSquareAttacked(color, file, rank) {
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
    const targetRank = (color === 'white') ? rank + 1 : rank - 1;
    const targetFile = [file - 1, file + 1];

    const result = targetFile.filter(item => this.getPieceType(item, targetRank) === 'pawn' &&
      this.isFoe(color, item, targetRank));

    return result.length > 0;
  }

  isCheck(clr) {
    const color = clr || this.turn;
    const king = this.getKing(color);
    if (king) {
      const { file, rank } = this.getKing(color);
      return !!this.isSquareAttacked(color, file, rank);
    }

    return null;
  }

  isCheckmate(clr) {
    const color = clr || this.turn;
    if (!this.isCheck(color)) return false;
    const moves = this.getAllMoves(color);
    return !moves.length;
  }

  getKing(color) {
    for (let file = 0; file < 8; file += 1) {
      for (let rank = 0; rank < 8; rank += 1) {
        if (
          this.getPieceType(file, rank) === 'king'
          && this.getPieceColor(file, rank) === color
        ) {
          return {
            file,
            rank,
          };
        }
      }
    }

    return null;
  }

  removePiece(file, rank) {
    this.setPieceType(file, rank, null);
    this.setPieceColor(file, rank, null);
  }

  static cloneBoard(src) {
    const newBoard = new JBoard();

    if (src.enPassant !== null) {
      newBoard.enPassant = {
        file: src.enPassant.file,
        rank: src.enPassant.rank,
      };
    } else {
      newBoard.enPassant = null;
    }

    newBoard.turn = src.turn;

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
    const bd = this.getFENBoard();
    const tn = this.getFENTurn();
    const cs = this.getFENCastling();
    const ep = this.getFENEnPassant();
    const cn = this.getFENCounts();
    return `${bd} ${tn} ${cs} ${ep} ${cn}`;
  }

  getFENPiece(file, rank) {
    if (!JBoard.isSquare(file, rank)) return null;
    const piece = this.getPieceType(file, rank);
    if (!piece) return null;
    let FEN;
    switch (piece) {
      case 'pawn': {
        FEN = 'p';
        break;
      }
      case 'rook': {
        FEN = 'r';
        break;
      }
      case 'knight': {
        FEN = 'n';
        break;
      }
      case 'bishop': {
        FEN = 'b';
        break;
      }
      case 'queen': {
        FEN = 'q';
        break;
      }
      case 'king': {
        FEN = 'k';
        break;
      }
      default: {
        break;
      }
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
    if (!this.getEnPassant()) {
      return '-';
    }

    return JBoard.getAlgebraicByDigits(enPassant.file, enPassant.rank);
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
      this.turn = 'white';
    }

    if (FEN === 'b') {
      this.turn = 'black';
    }
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

      return;
    }

    for (i = 0; i < length; i += 1) {
      switch (FEN[i]) {
        case 'K': {
          if (!countK) white += 1;
          countK += 1;
          break;
        }
        case 'Q': {
          if (!countQ) white += 2;
          countQ += 1;
          break;
        }
        case 'k': {
          if (!countk) black += 1;
          countk += 1;
          break;
        }
        case 'q': {
          if (!countq) black += 2;
          countq += 1;
          break;
        }
        default: {
          break;
        }
      }
    }

    this.castling = {
      white,
      black,
    };
  }

  parseFENEnPassant(FEN) {
    const fileShift = 97;

    if (FEN.length !== 2) {
      this.enPassant = null;
      return;
    }

    const rank = +FEN[1] - 1;

    if (rank !== 2 && rank !== 5) {
      this.enPassant = null;
      return;
    }

    const file = FEN.charCodeAt(0) - fileShift;

    if (file < 0 || file > 7) {
      this.enPassant = null;
      return;
    }

    if (this.getPieceType(file, rank) !== null) {
      this.enPassant = null;
      return;
    }

    if (this.checkFENEnPassant(file, rank)) {
      this.enPassant = { file, rank };
    }
  }

  checkFENEnPassant(file, rank) {
    let foeColor;
    let friendColor;
    let neighborRank;

    switch (rank) {
      case 2: {
        friendColor = 'black';
        foeColor = 'white';
        neighborRank = 4;
        break;
      }
      case 5: {
        friendColor = 'white';
        foeColor = 'black';
        neighborRank = 3;
        break;
      }
      default: {
        return false;
      }
    }

    if (
      this.getPieceType(file, neighborRank) !== 'pawn'
      || this.getPieceColor(file, neighborRank) !== friendColor
    ) {
      return false;
    }

    return !(
      (this.getPieceType(file - 1, neighborRank) !== 'pawn'
      || this.getPieceColor(file - 1, neighborRank) !== foeColor)
      && (this.getPieceType(file + 1, neighborRank) !== 'pawn'
      || this.getPieceColor(file + 1, neighborRank) !== foeColor)
    );
  }

  static splitFEN(FEN) {
    const ranks = FEN.split('/');
    if (ranks.length !== 8) return null;
    const tail = ranks[7].split(' ');
    const lastRank = tail[0];
    ranks[7] = lastRank;
    tail.shift();
    if (tail.length !== 5) return null;
    ranks.reverse();

    return {
      ranks,
      tail,
    };
  }

  static parseFENRanks(ranks) {
    let file;
    let rank;
    let rankSet;
    const result = [];

    for (rank = 0; rank < 8; rank += 1) {
      rankSet = JBoard.parseFENRank(ranks[rank]);
      if (rankSet === null) return null;
      if (rankSet.length !== 8) return null;
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

    if (length > 8) return null;

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
        } else return null;
      } else {
        result[count] = {};
        switch (FEN[i].toLowerCase()) {
          case 'r': {
            result[count].type = 'rook';
            break;
          }
          case 'n': {
            result[count].type = 'knight';
            break;
          }
          case 'b': {
            result[count].type = 'bishop';
            break;
          }
          case 'q': {
            result[count].type = 'queen';
            break;
          }
          case 'k': {
            result[count].type = 'king';
            break;
          }
          case 'p': {
            result[count].type = 'pawn';
            break;
          }
          default: {
            return null;
          }
        }
        if (FEN[i].toLowerCase() === FEN[i]) {
          result[count].color = 'black';
        } else {
          result[count].color = 'white';
        }

        count += 1;
      }

      if (count > 8) return null;
    }

    if (count !== 8) return null;

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
  }
}
