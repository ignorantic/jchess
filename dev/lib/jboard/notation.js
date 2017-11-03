import { isSquare } from './is-utils';

/**
 * Return algebraic notation of square.
 * @param {number} file
 * @param {number} rank
 * @returns {?string}
 */
export function squareToAlg(file, rank) {
  if (!isSquare(file, rank)) return null;
  const shiftFile = 97;
  const shiftRank = 1;
  return String.fromCharCode(file + shiftFile) + (rank + shiftRank);
}

/**
 * Return square via algebraic notation.
 * @param {string} str
 * @return {?{file: number, rank: number}}
 */
export function algToSquare(str) {
  const shiftFile = 97;
  const shiftRank = 1;
  if (str.length !== 2 || typeof str !== 'string' || typeof +str[1] !== 'number') return null;
  const alg = str.toLowerCase();
  const result = {
    file: alg.charCodeAt(0) - shiftFile,
    rank: alg[1] - shiftRank,
  };
  if (!isSquare(result.file, result.rank)) return null;
  return result;
}

/**
 * Return algebraic notation of move.
 * @param {{file: number, rank: number}} start - Start square of move.
 * @param {{file: number, rank: number}} stop - Stop square of move.
 * @param {number} [promType] - Type of piece for pawn promotion.
 * @return {?string}
 */
export function toAlgebraic(start, stop, promType) {
  if (
    !start || !stop
    || !isSquare(start.file, start.rank)
    || !isSquare(stop.file, stop.rank)
  ) return null;
  const stra = squareToAlg(start.file, start.rank);
  const stpa = squareToAlg(stop.file, stop.rank);
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
