import { isSquare } from './utils';

/**
 * Return algebraic notation of square.
 * @param {number} file
 * @param {number} rank
 * @returns {?string}
 */
export function squareToUCI(file, rank) {
  if (!isSquare(file, rank)) return null;
  const shiftFile = 97;
  const shiftRank = 1;
  return String.fromCharCode(file + shiftFile) + (rank + shiftRank);
}

/**
 * Return square via algebraic notation.
 * @param {string} move
 * @return {?{file: number, rank: number}}
 */
export function UCIToSquare(move) {
  const shiftFile = 97;
  const shiftRank = 1;
  if (move.length !== 2 || typeof move !== 'string' || typeof +move[1] !== 'number') return null;
  const alg = move.toLowerCase();
  const result = {
    file: alg.charCodeAt(0) - shiftFile,
    rank: alg[1] - shiftRank,
  };
  if (!isSquare(result.file, result.rank)) return null;
  return result;
}

/**
 * Helper for functions UCIToSAN and UCIToFAN.
 * Return string of move in figurine algebraic notation.
 * @param {Array.<Array>} board
 * @param {string} move
 * @param {Array.<string>} pieces
 * @return {string}
 */
export function UCIToAN(board, move, pieces) {
  const stop = move.slice(2, 4);
  const stopSquare = UCIToSquare(move.slice(2, 4));
  const pieceNum = board[stopSquare.file][stopSquare.rank].piece.type;
  const piece = pieces[pieceNum].toUpperCase();
  return `${piece}${stop}`;
}

/**
 * Return string of move in standart algebraic notation.
 * @param {Array.<Array>} board
 * @param {string} move
 * @return {string}
 */
export function UCIToSAN(board, move) {
  const pieces = ['', 'r', 'n', 'b', 'q', 'k'];
  return UCIToAN(board, move, pieces);
}

/**
 * Return string of move in figurine algebraic notation.
 * @param {Array.<Array>} board
 * @param {string} move
 * @return {string}
 */
export function UCIToFAN(board, move) {
  const pieces = ['', '\u265C', '\u265E', '\u265D', '\u265B', '\u265A'];
  return UCIToAN(board, move, pieces);
}

/**
 * Return algebraic notation of move.
 * @param {{file: number, rank: number}} start - Start square of move.
 * @param {{file: number, rank: number}} stop - Stop square of move.
 * @param {number} [promType] - Type of piece for pawn promotion.
 * @return {?string}
 */
export function toUCI(start, stop, promType) {
  if (
    !start || !stop
    || !isSquare(start.file, start.rank)
    || !isSquare(stop.file, stop.rank)
  ) return null;
  const stra = squareToUCI(start.file, start.rank);
  const stpa = squareToUCI(stop.file, stop.rank);
  const pieces = [null, 'r', 'n', 'b', 'q'];
  const pt = pieces[promType] || '';
  return `${stra}${stpa}${pt}`;
}

/**
 * Map the piece type to digit.
 * @param piece
 * @returns {?number}
 */
export function mapPieceType(piece) {
  const pieceMap = {
    p: 0, r: 1, n: 2, b: 3, q: 4, k: 5,
  };
  const key = piece.toLowerCase();
  if (!Object.keys(pieceMap).includes(key)) return null;
  return pieceMap[key];
}

/**
 * Map the piece to object.
 * @param piece
 * @returns {?Object}
 */
export function mapPiece(piece) {
  const result = {};
  result.type = mapPieceType(piece);
  if (result.type === null) return null;
  result.color = piece.toLowerCase() === piece ? 2 : 1;
  return result;
}
