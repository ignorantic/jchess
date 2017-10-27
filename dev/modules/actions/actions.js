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
      mate: boardModel.Checkmate,
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

export function setUpPosition() {
  return (dispatch) => {
    boardModel.setUp();
    const payload = {
      board: boardModel.Board,
      fen: boardModel.FEN,
      turn: boardModel.Turn,
      check: boardModel.Check,
      mate: boardModel.Checkmate,
    };
    dispatch({
      type: consts.SETUP_POSITION,
      payload,
    });
  };
}

export function resetPosition() {
  return (dispatch) => {
    boardModel.resetPosition();
    const payload = {
      board: boardModel.Board,
      fen: boardModel.FEN,
      turn: boardModel.Turn,
      check: boardModel.Check,
      mate: boardModel.Checkmate,
    };
    dispatch({
      type: consts.CLEAR_POSITION,
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
      mate: boardModel.Checkmate,
    };
    dispatch({
      type: consts.CHANGE_FEN,
      payload,
    });
  };
}

export function flipBoard() {
  return (dispatch) => {
    dispatch({
      type: consts.FLIP_BOARD,
    });
  };
}
