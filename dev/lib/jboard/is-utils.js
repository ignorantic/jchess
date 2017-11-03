/**
 * Check file and rank of square.
 * @param {number|Object.<string, number>} a
 * @param {number} [b]
 * @returns {boolean}
 */
export function isSquare(a, b) {
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

/**
 * Check is there pawn promotion on board.
 * @param type
 * @param color
 * @param stopRank
 * @returns {boolean}
 */
export function isPawnPromotion(type, color, stopRank) {
  return (
    type === 0
    && ((color === 1 && stopRank === 7)
      || (color === 2 && stopRank === 0))
  );
}

/**
 * Is this piece freind?
 * @param {Array} board
 * @param {number} color - Color of piece.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isFriend(board, color, file, rank) {
  if (!isSquare(file, rank)) return false;
  if (board[file][rank].piece.type === null) return false;
  return color === board[file][rank].piece.color;
}

/**
 * Is this piece foe?
 * @param {Array} board
 * @param {number} color - Color of piece.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isFoe(board, color, file, rank) {
  if (!isSquare(file, rank)) return false;
  if (board[file][rank].piece.type === null) return false;
  return color !== board[file][rank].piece.color;
}

/**
 * Is this piece a foe pawn?
 * @param {Array} board
 * @param {number} color - Color of piece.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isFoesPawn(board, color, file, rank) {
  if (!isSquare(file, rank)) return false;
  return board[file][rank].piece.type === 0 && isFoe(board, color, file, rank);
}

/**
 * Is this square empty?
 * @param {Array} board
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isEmpty(board, file, rank) {
  if (!isSquare(file, rank)) return false;
  return board[file][rank].piece.type === null;
}

/**
 * Check is the capturing en-passant possible.
 * @param {{file: number, rank: number}} square
 * @param {?{file: number, rank: number}} enPassant
 * @returns {boolean}
 */
export function isEnPassant(square, enPassant) {
  if (!enPassant) return false;
  return enPassant.file === square.file && enPassant.rank === square.rank;
}
