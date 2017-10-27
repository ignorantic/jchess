import consts from '../constants/consts';
import boardModel from '../models/board-model';

export function pickOnSquare(file, rank) {
  return (dispatch) => {
    boardModel.pickSquare(file, rank);
    const payload = {
      board: boardModel.Board,
      fen: boardModel.FEN,
      turn: boardModel.Turn,
      check: boardModel.Check,
      mate: boardModel.Mate,
      focus: {
        file,
        rank,
      },
    };
    dispatch({
      type: consts.UPDATE_POSITION,
      payload,
    });
  };
}

export function changeFocus(file, rank) {
  return (dispatch) => {
    const payload = {
      file,
      rank,
    };
    dispatch({
      type: consts.CHANGE_FOCUS,
      payload,
    });
  };
}

export function resetPosition() {
  return (dispatch) => {
    boardModel.setUpInitial();
    const payload = {
      board: boardModel.Board,
      fen: boardModel.FEN,
      turn: boardModel.Turn,
      check: boardModel.Check,
      mate: boardModel.Mate,
    };
    dispatch({
      type: consts.RESET_POSITION,
      payload,
    });
  };
}

export function changeFEN(newFEN) {
  return (dispatch) => {
    boardModel.setPositionByFEN(newFEN);
    const payload = {
      board: boardModel.Board,
      fen: boardModel.FEN,
      turn: boardModel.Turn,
      check: boardModel.Check,
      mate: boardModel.Mate,
    };
    dispatch({
      type: consts.CHANGE_FEN,
      payload,
    });
  };
}
