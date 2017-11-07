import { toUCI, UCIToSquare, mapPieceType, UCIToSAN, UCIToFAN } from './notation';
import { splitFEN, parseFENCastling, parseFENRanks, parseFENEnPassant, parseFENTurn,
  generateFEN } from './fen';
import { isSquare, isFoe, isFriend, isFoesPawn, isPawnPromotion, isSquareAttacked, isEmpty,
  isEnPassant, getAttackedSquares } from './utils';

/** Class representation a chess board. */
export default class JBoard {
  /** Create a board. */
  constructor() {
    this.initFields();
    this.initBoard();
    this.paintBoard();
  }

  /** Initialize fields. */
  initFields() {
    this.board = [];
    this.turn = 1;
    this.fullCount = 1;
    this.halfCount = 0;
    this.countFiftyMove = 0;
    this.selected = null;
    this.enPassant = null;
    this.castling = { 1: 0, 2: 0 };
    this.currentLine = 0;
    this.initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.lines = [[{ fen: this.initialFEN }]];
    this.lastMove = '';
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
        this.board[i][j].color = countSquare % 2 ? 2 : 1;
      }
    }
  }

  /** Set up initial position. */
  setUp() {
    this.resetPosition();
    this.setPositionByFEN(this.initialFEN);
  }

  /**
   * Set up position by FEN.
   * @param {string} FEN
   * @return {boolean}
   */
  setPositionByFEN(FEN) {
    const hash = splitFEN(FEN);
    if (hash === null) return false;
    const { ranks, tail } = hash;
    const pieceArray = parseFENRanks(ranks);
    if (pieceArray === null) return false;
    this.resetSelected();
    this.resetMarked();
    this.setPiecesByArray(pieceArray);
    this.turn = parseFENTurn(tail[0]);
    this.castling = parseFENCastling(tail[1]);
    this.enPassant = parseFENEnPassant(tail[2], this.board);
    this.countFiftyMove = +tail[3];
    this.fullCount = +tail[4];
    this.halfCount = ((this.fullCount * 2) + this.turn) - 3;
    return true;
  }

  /** Reset position and state of game. */
  resetPosition() {
    this.resetSelected();
    this.resetMarked();

    this.board.forEach((item, file) => {
      item.forEach((square, rank) => {
        this.removePiece({ file, rank });
      });
    });

    this.turn = 1;
    this.fullCount = 1;
    this.halfCount = 0;
    this.countFiftyMove = 0;
    this.enPassant = null;
    this.currentLine = 0;
    this.castling = { 1: 0, 2: 0 };
    this.currentLine = 0;
    this.lines = [[{ fen: this.initialFEN }]];
  }

  /**
   * Return game object
   * @return {{
   *   board: Array.<Array>, fen: string,
   *   turn: number, check: boolean, checkmate: boolean, halfCount: number,
   *   currentLine: number, lines: Array.<Array>,
   * }}
   */
  getGame() {
    return {
      board: this.getBoard(),
      fen: this.getFEN(),
      turn: this.getTurn(),
      check: this.isInCheck(),
      checkmate: this.isCheckmate(),
      halfCount: this.getHalfCount(),
      currentLine: this.getCurrentLine(),
      lines: this.getLines(),
    };
  }

  /**
   * Return board array.
   * @returns {Array.<Array>}
   */
  getBoard() {
    return this.board;
  }

  /**
   * Return object of square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @returns {?Object}
   */
  getSquare(file, rank) {
    if (!isSquare(file, rank)) return null;
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
   * @returns {?number}
   */
  getPieceType(file, rank) {
    const square = this.getSquare(file, rank);
    return square && square.piece.type;
  }

  /**
   * Return color of piece.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @returns {?number}
   */
  getPieceColor(file, rank) {
    const square = this.getSquare(file, rank);
    return square && square.piece.color;
  }

  getHalfCount() {
    return this.halfCount;
  }

  getCurrentLine() {
    return this.currentLine;
  }

  getLines() {
    return this.lines;
  }

  /**
   * Set piece on square.
   * @param {{file: number, rank: number}} square - The square.
   * @param {number|null} type - Type of piece.
   * @returns {boolean}
   */
  setPieceType(square, type) {
    this.board[square.file][square.rank].piece.type = type;
    return true;
  }

  /**
   * Set color of piece on square.
   * @param {{file: number, rank: number}} square - The square.
   * @param {number|null} color - Color of piece.
   * @returns {boolean}
   */
  setPieceColor(square, color) {
    this.board[square.file][square.rank].piece.color = color;
    return true;
  }

  /**
   * Set piece and its color on square.
   * @param {{file: number, rank: number}} square - The square.
   * @param {number} type - Type of piece.
   * @param {number} color - Color of piece.
   * @returns {boolean}
   */
  setPiece(square, type, color) {
    this.board[square.file][square.rank].piece = {
      type,
      color,
    };

    return true;
  }

  /**
   * Remove capturing piece if an en-passant capture was made
   * and check capturing en-passant for next turn.
   * @param {{file: number, rank: number}} start - Start square of move.
   * @param {{file: number, rank: number}} stop - Stop square of move.
   */
  handleEnPassant(start, stop) {
    if (this.getPieceType(start.file, start.rank) === 0) {
      if (isEnPassant(stop, this.enPassant)) {
        // capture en-passant
        this.removePiece({ file: stop.file, rank: start.rank });
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
   * @param {{file: number, rank: number}} square
   */
  checkEnPassant(square) {
    const { file, rank } = square;
    const color = this.turn;
    if (
      isFoesPawn(this.board, color, file - 1, rank)
      || isFoesPawn(this.board, color, file + 1, rank)
    ) {
      if (color === 1) {
        if (rank === 3) this.enPassant = { file, rank: 2 };
      } else if (rank === 4) this.enPassant = { file, rank: 5 };
    }
  }

  /**
   * Return square if capturing en-passant utils possible.
   * @returns {?Object}
   */
  getEnPassant() {
    return this.enPassant;
  }

  /**
   * Move piece to square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   * @param {number} [promType]
   * @return {?string}
   */
  move(file, rank, promType) {
    if (!isSquare(file, rank)) return null;
    if (
      this.isSquareMarked(file, rank)
      && this.handleMove(this.selected, { file, rank }, promType)
    ) return this.lastMove;

    return null;
  }

  /**
   * Select square.
   * @param {number} file - The file value.
   * @param {number} rank - The rank value.
   */
  select(file, rank) {
    if (!isSquare(file, rank)) return;
    this.resetSelected();
    this.selected = { file, rank };
    this.board[file][rank].selected = true;
    this.markMoves(file, rank);
  }

  /**
   * Return turn.
   * @returns {number}
   */
  getTurn() {
    return this.turn;
  }

  /** Pass turn. */
  passTurn() {
    if (this.turn === 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
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
    this.selected = null;
  }

  /**
   * Check utils the square selected.
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
   * Check utils the square marked.
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
    if (this.getPieceType(file, rank) !== null) {
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
   * @returns {Array}
   */
  getMoves(file, rank) {
    switch (this.getPieceType(file, rank)) {
      case 0: {
        return this.getPawnMoves(file, rank);
      }
      case 5: {
        return this.getKingMoves(file, rank);
      }
      case null: {
        return [];
      }
      default: {
        return this.getPieceMoves(file, rank);
      }
    }
  }

  /**
   * Return array of valid moves for all pieces of the color.
   * @param {number} color - Color of piece.
   * @returns {Array}
   */
  getAllMoves(color) {
    let moves = [];
    for (let f = 0; f < 8; f += 1) {
      for (let r = 0; r < 8; r += 1) {
        if (this.getPieceColor(f, r) === color) {
          const move = this.getMoves(f, r);
          if (move) moves = moves.concat(move);
        }
      }
    }

    return moves;
  }

  /**
   * Check utils the move possible.
   * @param {{file: number, rank: number}} start - Start square of move.
   * @param {{file: number, rank: number}} stop - Stop square of move.
   * @param {number} color - Color of piece.
   * @returns {boolean}
   */
  checkBeforeMove(start, stop, color) {
    if (isSquare(start)) {
      if (isSquare(stop)) {
        if (!isEmpty(this.board, start.file, start.rank)) {
          if (!isFriend(this.board, color, stop.file, stop.rank)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Check are there castling moves for next turn
   * and increase move fullCount.
   * @param {number} type - Type of piece.
   * @param {number} color - Color of piece.
   * @param {{file: number, rank: number}} start - Start square of move.
   * @param {{file: number, rank: number}} stop - Stop square of move.
   */
  checkAfterMove(type, color, start, stop) {
    this.checkCastling(color, type, start.file);
    if (color === 2) {
      this.fullCount += 1;
    }
    this.halfCount += 1;
    const promType = isPawnPromotion(type, color, stop.rank)
      ? this.getPieceType(stop.file, stop.rank)
      : null;
    this.passTurn();
    this.writeMove(start, stop, promType);
    this.resetSelected();
    this.resetMarked();
  }

  /**
   * Check fullCount of fifty-move rule.
   * @param {number} type - Type of piece.
   * @param {number} color - Color of piece.
   * @param {{file: number, rank: number}} stopSquare - Stop square of move.
   */
  checkFiftyMove(type, color, stopSquare) {
    const { file, rank } = stopSquare;
    const capture = isFoe(this.board, color, file, rank);
    if (capture || type === 0) {
      this.countFiftyMove = 0;
    } else {
      this.countFiftyMove += 1;
    }
  }

  /**
   * Write the move to line.
   * @param {{file: number, rank: number}} start
   * @param {{file: number, rank: number}} stop
   * @param {number} promType
   */
  writeMove(start, stop, promType) {
    this.lastMove = toUCI(start, stop, promType);
    this.lines[this.currentLine][this.halfCount] = {
      move: this.lastMove,
      san: UCIToSAN(this.board, this.lastMove),
      fan: UCIToFAN(this.board, this.lastMove),
      fen: this.getFEN(),
    };
  }

  /**
   * Make move on the board.
   * @param {number} type - Type of piece.
   * @param {number} color - Color of piece.
   * @param {{file: number, rank: number}} start - Start square of move.
   * @param {{file: number, rank: number}} stop - Stop square of move.
   * @param {number} [promType] - Type of piece for pawn promotion.
   */
  makeMove(type, color, start, stop, promType) {
    this.handleEnPassant(start, stop);
    // check castling
    if (type === 5 && Math.abs(start.file - stop.file) === 2) {
      this.doCastling(stop);
    } else {
      this.checkFiftyMove(type, color, stop);
      // check pawn promotion
      if (isPawnPromotion(type, color, stop.rank)) {
        this.setPiece(stop, promType || 4, color);
      } else {
        this.setPiece(stop, type, color);
      }

      this.removePiece(start);
    }
  }

  /**
   * Handle move.
   * @param {{file: number, rank: number}} start - Start square of move.
   * @param {{file: number, rank: number}} stop - Stop square of move.
   * @param {number} [promType] - Type of piece for pawn promotion.
   * @return {boolean}
   */
  handleMove(start, stop, promType) {
    const type = this.getPieceType(start.file, start.rank);
    const color = this.getPieceColor(start.file, start.rank);

    if (this.checkBeforeMove(start, stop, color)) {
      this.makeMove(type, color, start, stop, promType);
    } else return false;

    this.checkAfterMove(type, color, start, stop);
    return true;
  }

  /**
   * Check utils there discovered check on board.
   * @param {{file: number, rank: number}} start - Start square of move.
   * @param {{file: number, rank: number}} stop - Stop square of move.
   * @returns {boolean}
   */
  isDiscoveredCheck(start, stop) {
    const checkBoard = JBoard.cloneBoard(this);
    if (checkBoard.handleMove(start, stop, 4)) {
      const { file, rank } = start;
      const color = this.getPieceColor(file, rank);
      return !checkBoard.isInCheck(color);
    }

    return false;
  }

  /**
   * Return array of move objects for pawn.
   * @param {number} file
   * @param {number} rank
   * @returns {Array}
   */
  getPawnMoves(file, rank) {
    let moves = [];
    const pawnColor = this.getPieceColor(file, rank);
    const moveDirection = (pawnColor === 1) ? 1 : -1;
    const trg = { file, rank: rank + moveDirection };

    if (isSquare(trg)) {
      if (this.getPieceType(trg.file, trg.rank) === null) {
        moves.push({ ...trg });
        if (
          (pawnColor === 1 && rank === 1)
          || (pawnColor === 2 && rank === 6)
        ) {
          trg.rank = rank + (2 * moveDirection);
          if (this.getPieceType(trg.file, trg.rank) === null) {
            moves.push({ ...trg });
          }
        }
      }
    }

    moves = moves.concat(this.getPawnCaptures(file, rank + moveDirection, pawnColor));

    return this.filterMoves(moves, file, rank);
  }

  /**
   * Return array of captures for pawn.
   * @param {number} file
   * @param {number} targetRank
   * @param {number} color
   * @returns {Array}
   */
  getPawnCaptures(file, targetRank, color) {
    const moves = [];
    const targets = [
      { file: file - 1, rank: targetRank },
      { file: file + 1, rank: targetRank },
    ];

    targets.forEach((item) => {
      if (
        isFoe(this.board, color, item.file, item.rank)
        || (isEnPassant(item, this.enPassant))
      ) {
        moves.push({ ...item });
      }
    });

    return moves;
  }

  /**
   * Return array of move objects for king.
   * @param {number} file
   * @param {number} rank
   * @returns {Array}
   */
  getKingMoves(file, rank) {
    const moves = this.getPieceMoves(file, rank);
    const castling = this.getCastlingMove(file, rank);

    if (castling) castling.forEach(item => moves.push(item));

    return this.filterMoves(moves, file, rank);
  }

  /**
   * Return array of castling move objects.
   * @param {number} file
   * @param {number} rank
   * @returns {Array}
   */
  getCastlingMove(file, rank) {
    if (!(file === 4 && (rank === 0 || rank === 7))) return null;
    const color = (rank === 0) ? 1 : 2;
    if (this.castling[color] === 0) return null;
    if (this.isInCheck(color)) return null;
    const result = [];

    if (
      this.castling[color] > 1
      && !isSquareAttacked(this.board, color, file - 1, rank)
      && (isEmpty(this.board, file - 1, rank))
      && (isEmpty(this.board, file - 2, rank))
      && (isEmpty(this.board, file - 3, rank))
    ) {
      result.push({ file: 2, rank });
    }

    if (
      this.castling[color] % 2 === 1 && !isSquareAttacked(this.board, color, file + 1, rank)
      && (isEmpty(this.board, file + 1, rank)) && (isEmpty(this.board, file + 2, rank))
    ) {
      result.push({ file: 6, rank });
    }

    return result;
  }

  /**
   * Check possibility of castling move for next moves.
   * @param {number} color - Color of piece.
   * @param {number} type - Type of piece.
   * @param {number} file
   */
  checkCastling(color, type, file) {
    if (this.castling[color] > 0) {
      if (type === 5) {
        this.castling[color] = 0;
      }

      if (type === 1) {
        if (file === 0 && this.castling[color] > 1) {
          this.castling[color] -= 2;
        }

        if (file === 7 && this.castling[color] % 2 === 1) {
          this.castling[color] -= 1;
        }
      }
    }
  }

  /**
   * Do castling on the board.
   * @param {{file: number, rank: number}} kingStop
   */
  doCastling(kingStop) {
    const { file, rank } = kingStop;
    const color = rank ? 2 : 1;
    const startFile = file === 2 ? 0 : 7;
    const stopFile = file === 2 ? 3 : 5;
    this.setPiece({ file, rank }, 5, color);
    this.removePiece({ file: 4, rank });
    this.setPiece({ file: stopFile, rank }, 1, color);
    this.removePiece({ file: startFile, rank });
  }

  /**
   * Return array of move objects for any pieces.
   * @param {number} file
   * @param {number} rank
   * @returns {Array}
   */
  getPieceMoves(file, rank) {
    const piece = this.getPieceType(file, rank);
    const color = this.getPieceColor(file, rank);

    const moves = getAttackedSquares(this.board, piece, color, file, rank);

    return this.filterMoves(moves, file, rank);
  }

  /**
   * Filter illegal moves.
   * @param {Array} moves
   * @param {number} file
   * @param {number} rank
   * @returns {Array}
   */
  filterMoves(moves, file, rank) {
    if (!moves) return null;
    return moves.filter((item) => {
      const start = { file, rank };
      return this.isDiscoveredCheck(start, item);
    });
  }

  /**
   * Is there check on the board?
   * @param {number} [clr]
   * @returns {boolean}
   */
  isInCheck(clr) {
    const color = clr || this.turn;
    const king = this.getKing(color);
    if (king) {
      const { file, rank } = this.getKing(color);
      return isSquareAttacked(this.board, color, file, rank);
    }

    return false;
  }

  /**
   * Is there checkmate on the board?
   * @param {number} [clr]
   * @returns {boolean}
   */
  isCheckmate(clr) {
    const color = clr || this.turn;
    if (!this.isInCheck(color)) return false;
    const moves = this.getAllMoves(color);
    return !moves.length;
  }

  /**
   * Is this piece freind?
   * @param {number} file - File of square.
   * @param {number} rank - Rank of square.
   * @returns {boolean}
   */
  isFriend(file, rank) {
    return isFriend(this.board, this.turn, file, rank);
  }

  /**
   * Return square on which the king stand.
   * @param {number} color - Color of piece.
   * @returns {?Object}
   */
  getKing(color) {
    for (let file = 0; file < 8; file += 1) {
      for (let rank = 0; rank < 8; rank += 1) {
        if (
          this.getPieceType(file, rank) === 5
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

  /**
   * Remove piece from square.
   * @param {{file: number, rank: number}} square - The square.
   */
  removePiece(square) {
    this.setPieceType(square, null);
    this.setPieceColor(square, null);
  }

  /**
   * Do move via algebraic notation.
   * @param {string} str
   * @return {?string}
   */
  moveUCI(str) {
    if (typeof str !== 'string') return null;
    if (str.length < 4 || str.length > 5) return null;
    const alg = str.toLowerCase();
    const start = UCIToSquare(alg.slice(0, 2));
    const stop = UCIToSquare(alg.slice(2, 4));
    const piece = alg[4];
    let promType;
    if (piece === undefined) promType = false;
    else {
      promType = mapPieceType(piece);
      if (!promType || promType > 4) return null;
    }
    if (start === null || stop === null) return null;
    this.select(start.file, start.rank);
    const result = this.move(stop.file, stop.rank, promType);
    this.resetSelected();
    return result;
  }

  /**
   * Go to the move in the line.
   * @param {number} line
   * @param {number} move
   * @returns {boolean}
   */
  goto(line, move) {
    if (typeof line !== 'number' || typeof move !== 'number') return false;
    if (line !== this.currentLine || move !== this.halfCount) {
      if (this.lines[line][0] !== undefined) this.currentLine = line;
      if (move >= 0 && move < this.lines[line].length) this.halfCount = move;
      return this.setPositionByFEN(this.lines[this.currentLine][this.halfCount].fen);
    }
    return false;
  }

  /**
   * Go to next move in the line.
   * @return {boolean}
   */
  gotoNext() {
    return this.goto(this.currentLine, this.halfCount + 1);
  }

  /**
   * Go to prev move in the line.
   * @return {boolean}
   */
  gotoPrev() {
    return this.goto(this.currentLine, this.halfCount - 1);
  }

  /**
   * Go to start position.
   * @return {boolean}
   */
  gotoStart() {
    return this.goto(this.currentLine, 0);
  }

  /**
   * Go to last move in the line.
   * @return {boolean}
   */
  gotoEnd() {
    return this.goto(this.currentLine, this.lines[this.currentLine].length - 1);
  }

  /**
   * Return full FEN.
   * @returns {string}
   */
  getFEN() {
    return generateFEN(
      this.board, this.turn, this.castling, this.enPassant,
      this.countFiftyMove, this.fullCount,
    );
  }

  /**
   * Set up pieces by array.
   * @param {Array} pieceSet
   */
  setPiecesByArray(pieceSet) {
    this.turn = 1;
    this.fullCount = 1;
    this.countFiftyMove = 0;
    this.enPassant = null;
    this.castling = { 1: 3, 2: 3 };
    pieceSet.forEach((item) => {
      this.setPiece(item, item.piece.type, item.piece.color);
    });
  }

  /**
   * Clone board.
   * @param {JBoard} src
   * @returns {JBoard}
   */
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
      1: src.castling[1],
      2: src.castling[2],
    };

    for (let file = 0; file < 8; file += 1) {
      for (let rank = 0; rank < 8; rank += 1) {
        newBoard.board[file][rank].piece.type = src.board[file][rank].piece.type;
        newBoard.board[file][rank].piece.color = src.board[file][rank].piece.color;
      }
    }

    return newBoard;
  }
}
