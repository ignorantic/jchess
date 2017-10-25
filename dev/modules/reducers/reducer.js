import keyMirror from '../constants/consts';

const reducer = (state, action) => {
  switch (action.type) {
    case keyMirror.UPDATE_POSITION:
      return {
        board: action.payload.board,
        fen: action.payload.fen,
        turn: action.payload.turn,
      };
    default:
      return state;
  }
};

export default reducer;
