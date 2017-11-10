import { parseFEN } from './fen';

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
 * Check utils there pawn promotion on board.
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
 * Check utils the capturing en-passant possible.
 * @param {{file: number, rank: number}} square
 * @param {?{file: number, rank: number}} enPassant
 * @returns {boolean}
 */
export function isEnPassant(square, enPassant) {
  if (!enPassant) return false;
  return enPassant.file === square.file && enPassant.rank === square.rank;
}

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

const moves = {
  1: [...rook],
  2: [...knight],
  3: [...bishop],
  4: [...rook, ...bishop],
  5: [...rook, ...bishop],
};

/**
 * Return array of square under attack by the piece.
 * @param {Array} board
 * @param {number} piece - Type of piece.
 * @param {number} color - Color of piece.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {?Array}
 */
export function getAttackedSquares(board, piece, color, file, rank) {
  const count = (piece === 5 || piece === 2) ? 1 : 7;
  const result = [];

  moves[piece].forEach((item) => {
    let i = 0;
    while (i < count) {
      i += 1;
      const trg = {
        file: file + (i * item.file),
        rank: rank + (i * item.rank),
      };

      if (isSquare(trg)) {
        if (isFriend(board, color, trg.file, trg.rank)) {
          break;
        } else {
          result.push({ ...trg });
        }
      } else {
        break;
      }

      if (isFoe(board, color, trg.file, trg.rank)) {
        break;
      }
    }
  });

  return result;
}

/**
 * Is this square under attack?
 * @param {Array} board
 * @param {number} color - Color of active side.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isSquareAttacked(board, color, file, rank) {
  function isSquareAttackedByPawn() {
    const targetRank = (color === 1) ? rank + 1 : rank - 1;
    const targetFile = [file - 1, file + 1];

    return targetFile.some(item => (
      isSquare(item, targetRank) && isFoesPawn(board, color, item, targetRank)
    ));
  }

  function isSquareAttackedByPiece() {
    return Object.keys(moves).some((type) => {
      const squares = getAttackedSquares(board, +type, color, file, rank);
      return squares.some(item => board[item.file][item.rank].piece.type === +type);
    });
  }

  return isSquareAttackedByPawn() || isSquareAttackedByPiece();
}

/**
 * Return square on which the king stand.
 * @param {Array} board
 * @param {number} kingColor - Color of king.
 * @returns {?Object}
 */
export function getKing(board, kingColor) {
  for (let file = 0; file < 8; file += 1) {
    for (let rank = 0; rank < 8; rank += 1) {
      const { type, color } = board[file][rank].piece;
      if (type === 5 && color === kingColor) {
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
 * Is there check on the board?
 * @param {string} FEN
 * @returns {boolean}
 */
export function isInCheck(FEN) {
  const { board, turn: color } = parseFEN(FEN);
  const king = getKing(board, color);
  if (king) {
    const { file, rank } = king;
    return isSquareAttacked(board, color, file, rank);
  }

  return false;
}
