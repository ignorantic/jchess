import ACTIONS from '../consts';

const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const initialState = {
  board: [[]],
  FEN: initialFEN,
  prevFEN: initialFEN,
  initialFEN,
  turn: 1,
  check: false,
  checkmate: false,
  halfCount: 0,
  currentLine: 0,
  lines: [[{ FEN: initialFEN }]],
  lastMove: '',
  selected: null,
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
