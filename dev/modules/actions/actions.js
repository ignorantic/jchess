import consts from '../constants/consts';
import boardModel from '../models/board-model';

export function touch(file, rank, mouse) {
  return (dispatch) => {
    let drag = [];
    boardModel.touch(file, rank);
    if (mouse && boardModel.isFriend(boardModel.getTurn(), file, rank)) drag = [file, rank];
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      focusSquare: [file, rank],
      drag,
    };
    dispatch({
      type: consts.UPDATE_POSITION,
      payload,
    });
  };
}

export function releasePiece(file, rank) {
  return (dispatch) => {
    if (boardModel.touch(file, rank)) {
      const payload = {
        board: boardModel.getBoard(),
        fen: boardModel.getFEN(),
        turn: boardModel.getTurn(),
        check: boardModel.isCheck(),
        checkmate: boardModel.isCheckmate(),
        focusSquare: [file, rank],
        drag: [],
      };
      dispatch({
        type: consts.UPDATE_POSITION,
        payload,
      });
    } else {
      const payload = {
        drag: [],
      };
      dispatch({
        type: consts.RELEASE,
        payload,
      });
    }
  };
}

export function changeFocus(file, rank) {
  return (dispatch) => {
    const payload = {
      focusSquare: [file, rank],
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
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
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
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
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
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
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
