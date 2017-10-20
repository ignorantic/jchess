import keyMirror from '../constants/keys';
import talChessModel from '../models/chess-model';

const initialState = {
  board: talChessModel.getBoard(),
  fen: talChessModel.getFEN(),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case keyMirror.PICK_ON_SQUARE:
      talChessModel.pickSquare(action.file, action.rank);
      return {
        board: talChessModel.getBoard(),
        fen: talChessModel.getFEN(),
      };
    case keyMirror.RESET_POSITION:
      talChessModel.setUpInitial();
      return {
        board: talChessModel.getBoard(),
        fen: talChessModel.getFEN(),
      };
    case keyMirror.CHANGE_FEN:
      talChessModel.setPositionByFEN(action.fen);
      return {
        board: talChessModel.getBoard(),
        fen: talChessModel.getFEN(),
      };
    default:
      return state;
  }
}

export default reducer;