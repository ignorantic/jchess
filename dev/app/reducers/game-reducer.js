import ACTIONS from '../consts';
import boardModel from '../board-model';

const initialState = {
  board: [[]],
  fen: boardModel.initialFEN,
  prevFen: boardModel.initialFEN,
  turn: 1,
  check: false,
  checkmate: false,
  halfCount: 0,
  currentLine: 0,
  lines: [[{ fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' }]],
  lastMove: '',
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SELECT: {
      return {
        ...state,
        ...action.gamePayload,
      };
    }
    case ACTIONS.MOVE:
    case ACTIONS.UPDATE_POSITION:
    case ACTIONS.GOTO:
    case ACTIONS.CHANGE_FEN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default game;
