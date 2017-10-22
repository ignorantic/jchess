import consts from '../constants/consts';
import boardModel from '../models/board-model';

export function pickOnSquare(file, rank) {
  return (dispatch) => {
    boardModel.pickSquare(file, rank);
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
    }
    dispatch({
      type: consts.UPDATE_POSITION,
      payload,
    });
  };
}

export function resetPosition() {
  return (dispatch) => {
    boardModel.setUpInitial();
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
    }
    dispatch({
      type: consts.UPDATE_POSITION,
      payload,
    });
  };
}

export function changeFEN(newFEN) {
  return (dispatch) => {
    boardModel.setPositionByFEN(newFEN);
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
    }
    dispatch({
      type: consts.UPDATE_POSITION,
      payload,
    });
  };
}