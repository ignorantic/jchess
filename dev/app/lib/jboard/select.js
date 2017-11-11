import { parseFEN } from './fen';
import { isSquare, getMoves } from './utils';

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
  return { board: newBoard, selected: { file, rank } };
}
