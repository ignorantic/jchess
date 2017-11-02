import consts from '../constants/consts';

const reducer = (state, action) => {
  switch (action.type) {
    case consts.UPDATE_POSITION: {
      return {
        ...state,
        board: action.payload.board,
        fen: action.payload.fen,
        turn: action.payload.turn,
        check: action.payload.check,
        checkmate: action.payload.checkmate,
        focus: action.payload.focus,
        drag: action.payload.drag,
        halfCount: action.payload.halfCount,
        currentLine: action.payload.currentLine,
        lines: action.payload.lines,
      };
    }
    case consts.CLEAR_POSITION:
    case consts.SETUP_POSITION:
    case consts.GOTO:
    case consts.CHANGE_FEN: {
      return {
        ...state,
        board: action.payload.board,
        fen: action.payload.fen,
        turn: action.payload.turn,
        check: action.payload.check,
        checkmate: action.payload.checkmate,
        halfCount: action.payload.halfCount,
        currentLine: action.payload.currentLine,
        lines: action.payload.lines,
      };
    }
    case consts.RELEASE: {
      return {
        ...state,
        drag: [],
      };
    }
    case consts.CHANGE_FOCUS: {
      return {
        ...state,
        focus: action.payload.focus,
      };
    }
    case consts.FLIP_BOARD: {
      return {
        ...state,
        flip: !state.flip,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
