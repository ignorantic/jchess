import keyMirror from '../constants/consts';

const reducer = (state, action) => {
  switch (action.type) {
    case keyMirror.UPDATE_POSITION:
      return {
        board: action.payload.board,
        fen: action.payload.fen,
        turn: action.payload.turn,
        check: action.payload.check,
        mate: action.payload.mate,
        focus: {
          file: action.payload.focus.file,
          rank: action.payload.focus.rank,
        },
      };
    case keyMirror.RESET_POSITION:
    case keyMirror.CHANGE_FEN:
      return {
        ...state,
        board: action.payload.board,
        fen: action.payload.fen,
        turn: action.payload.turn,
        check: action.payload.check,
        mate: action.payload.mate,
      };
    case keyMirror.CHANGE_FOCUS:
      return {
        ...state,
        focus: {
          file: action.payload.file,
          rank: action.payload.rank,
        },
      };
    default:
      return state;
  }
};

export default reducer;
