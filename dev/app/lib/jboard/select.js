import { parseFEN } from './fen';
import { isSquare, isFoe, isEnPassant, getAttackedSquares, isSquareAttacked,
  isEmpty } from './utils';

/**
 * Return array of move objects for any pieces.
 * @param {Array} board
 * @param {number} file
 * @param {number} rank
 * @returns {Array}
 */
function getPieceMoves(board, file, rank) {
  const { type, color } = board[file][rank].piece;
  const moves = getAttackedSquares(board, type, color, file, rank);
  // return filterMoves(moves, file, rank);
  return moves;
}

/**
 * Return array of castling move objects.
 * @param {Object} position
 * @param {number} file
 * @param {number} rank
 * @returns {Array}
 */
function getCastlingMove(position, file, rank) {
  const { board, castling } = position;
  if (!(file === 4 && (rank === 0 || rank === 7))) return null;
  const color = (rank === 0) ? 1 : 2;
  if (castling[color] === 0) return null;
  // if (isInCheck(color)) return null;
  const result = [];

  if (
    castling[color] > 1
    && !isSquareAttacked(board, color, file - 1, rank)
    && (isEmpty(board, file - 1, rank))
    && (isEmpty(board, file - 2, rank))
    && (isEmpty(board, file - 3, rank))
  ) {
    result.push({ file: 2, rank });
  }

  if (
    castling[color] % 2 === 1 && !isSquareAttacked(board, color, file + 1, rank)
    && (isEmpty(board, file + 1, rank)) && (isEmpty(board, file + 2, rank))
  ) {
    result.push({ file: 6, rank });
  }

  return result;
}

/**
 * Return array of move objects for king.
 * @param {Object} position
 * @param {number} file
 * @param {number} rank
 * @returns {Array}
 */
function getKingMoves(position, file, rank) {
  const { board } = position;
  let moves = getPieceMoves(board, file, rank);
  const castlingMove = getCastlingMove(position, file, rank);

  if (castlingMove) moves = moves.concat(castlingMove);

  // return filterMoves(moves, file, rank);
  return moves;
}

/**
 * Return array of captures for pawn.
 * @param {Object} position
 * @param {number} file
 * @param {number} targetRank
 * @param {number} color
 * @returns {Array}
 */
function getPawnCaptures(position, file, targetRank, color) {
  const { board, enPassant } = position;
  const moves = [];
  const targets = [
    { file: file - 1, rank: targetRank },
    { file: file + 1, rank: targetRank },
  ];

  targets.forEach((item) => {
    if (
      isFoe(board, color, item.file, item.rank)
      || (isEnPassant(item, enPassant))
    ) {
      moves.push({ ...item });
    }
  });

  return moves;
}

// /**
//  * Check utils there discovered check on board.
//  * @param {string} FEN - FEN.
//  * @param {{file: number, rank: number}} start - Start square of move.
//  * @param {{file: number, rank: number}} stop - Stop square of move.
//  * @returns {boolean}
//  */
// function isNoDiscoveredCheck(FEN, start, stop) {
//   const checkBoard = new JBoard();
//   checkBoard.setPositionByFEN(FEN);
//   const { file, rank } = start;
//   const { color } = checkBoard.board[file][rank].piece;
//   if (checkBoard.handleMove(start, stop)) {
//     return !checkBoard.isInCheck(color);
//   }
//
//   return false;
// }

// /**
//  * Filter illegal moves.
//  * @param {Array} moves
//  * @param {number} file
//  * @param {number} rank
//  * @returns {Array}
//  */
// function filterMoves(moves, file, rank) {
//   if (!moves) return null;
//   return moves.filter((item) => {
//     const start = { file, rank };
//     return isNoDiscoveredCheck(getFEN(), start, item);
//   });
// }

/**
 * Return array of move objects for pawn.
 * @param {Object} position
 * @param {number} file
 * @param {number} rank
 * @returns {Array}
 */
function getPawnMoves(position, file, rank) {
  const { board } = position;
  let moves = [];
  const { color } = board[file][rank].piece;
  const direction = (color === 1) ? 1 : -1;
  const target = { file, rank: rank + direction };

  if (isSquare(target)) {
    if (board[target.file][target.rank].piece.type === null) {
      moves.push({ ...target });
      if (
        (color === 1 && rank === 1)
        || (color === 2 && rank === 6)
      ) {
        target.rank = rank + (2 * direction);
        if (board[target.file][target.rank].piece.type === null) {
          moves.push({ ...target });
        }
      }
    }
  }

  moves = moves.concat(getPawnCaptures(position, file, rank + direction, color));

  // return filterMoves(moves, file, rank);
  return moves;
}

/**
 * Return array of valid moves for piece on square.
 * @param {Object} position
 * @param {number} file - The file value.
 * @param {number} rank - The rank value.
 * @returns {Array}
 */
function getMoves(position, file, rank) {
  const { board } = position;
  switch (board[file][rank].piece.type) {
    case 0: {
      return getPawnMoves(position, file, rank);
    }
    case 5: {
      return getKingMoves(board, file, rank);
    }
    case null: {
      return [];
    }
    default: {
      return getPieceMoves(board, file, rank);
    }
  }
}

/**
 * Mark square for valid moves.
 * @param {Object} position
 * @param {number} file - The file value.
 * @param {number} rank - The rank value.
 * @return {Array}
 */
function markMoves(position, file, rank) {
  const { board } = position;
  if (board[file][rank].piece.type === null) return null;
  const moves = getMoves(position, file, rank);
  if (!moves) return null;
  const newBord = [...board];
  moves.forEach((item) => {
    newBord[item.file][item.rank].marked = true;
  });
  return newBord;
}

/**
 * Select square.
 * @param {string} FEN
 * @param {number} file - The file value.
 * @param {number} rank - The rank value.
 * @return {Object}
 */
export default function select(FEN, file, rank) {
  if (typeof FEN !== 'string') return null;
  if (!isSquare(file, rank)) return null;
  const position = parseFEN(FEN);
  const { board, turn } = position;
  let newBoard;
  if (board[file][rank].piece.color === turn) {
    const markedBoard = markMoves(position, file, rank);
    newBoard = markedBoard || board;
  } else {
    newBoard = board;
  }
  newBoard[file][rank].selected = true;
  return { board: newBoard };
}
