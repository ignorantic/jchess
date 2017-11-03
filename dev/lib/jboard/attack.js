import * as is from './is-utils';

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
 * @param {number} piece
 * @param {number} color - Color of piece.
 * @param {number} file
 * @param {number} rank
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

      if (is.isSquare(trg)) {
        if (is.isFriend(board, color, trg.file, trg.rank)) {
          break;
        } else {
          result.push({ ...trg });
        }
      } else {
        break;
      }

      if (is.isFoe(board, color, trg.file, trg.rank)) {
        break;
      }
    }
  });

  return result;
}

/**
 * Is this square under attack of foe pawn?
 * @param {Array} board
 * @param {number} color
 * @param {number} file
 * @param {number} rank
 * @returns {boolean}
 */
export function isSquareAttackedByPawn(board, color, file, rank) {
  const targetRank = (color === 1) ? rank + 1 : rank - 1;
  const targetFile = [file - 1, file + 1];

  const result = targetFile.filter((item) => {
    if (!is.isSquare(item, targetRank)) return false;
    return board[item][targetRank].piece.type === 0
      && is.isFoe(board, color, item, targetRank);
  });

  return result.length > 0;
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
  let result = false;
  if (isSquareAttackedByPawn(board, color, file, rank)) {
    result = true;
  } else {
    Object.keys(moves).forEach((type) => {
      const squares = getAttackedSquares(board, +type, color, file, rank);
      if (squares) {
        squares.forEach((item) => {
          if (board[item.file][item.rank].piece.type === +type) {
            result = true;
          }
        });
      }
    });
  }
  return result;
}
