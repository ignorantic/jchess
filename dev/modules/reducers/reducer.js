import consts from '../constants/consts';

const reducer = (state, action) => {
  switch (action.type) {
    case consts.UPDATE_POSITION:
      return {
        ...state,
        board: action.payload.board,
        fen: action.payload.fen,
        turn: action.payload.turn,
        check: action.payload.check,
        checkmate: action.payload.checkmate,
        focus: {
          file: action.payload.focus.file,
          rank: action.payload.focus.rank,
        },
      };
    case consts.CLEAR_POSITION:
    case consts.SETUP_POSITION:
    case consts.CHANGE_FEN:
      return {
        ...state,
        board: action.payload.board,
        fen: action.payload.fen,
        turn: action.payload.turn,
        check: action.payload.check,
        checkmate: action.payload.checkmate,
      };
    case consts.CHANGE_FOCUS:
      return {
        ...state,
        focus: {
          file: action.payload.file,
          rank: action.payload.rank,
        },
      };
    case consts.FLIP_BOARD:
      return {
        ...state,
        flip: !state.flip,
      };
    default:
      return state;
  }
};

export default reducer;
