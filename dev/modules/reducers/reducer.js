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
      };
    }
    case consts.CLEAR_POSITION:
    case consts.SETUP_POSITION:
    case consts.CHANGE_FEN: {
      return {
        ...state,
        board: action.payload.board,
        fen: action.payload.fen,
        turn: action.payload.turn,
        check: action.payload.check,
        checkmate: action.payload.checkmate,
      };
    }
    case consts.DRAG: {
      return {
        ...state,
        drag: [state.drag[0], state.drag[1], action.payload[0], action.payload[1]],
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
        focus: action.payload,
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
