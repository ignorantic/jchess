import ACTIONS from '../consts';
import boardModel from '../board-model';

export function goto(line, move) {
  return (dispatch) => {
    boardModel.goto(line, move);
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoPrev() {
  return (dispatch) => {
    boardModel.gotoPrev();
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoNext() {
  return (dispatch) => {
    boardModel.gotoNext();
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoStart() {
  return (dispatch) => {
    boardModel.gotoStart();
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoEnd() {
  return (dispatch) => {
    boardModel.gotoEnd();
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function setUpPosition() {
  return (dispatch) => {
    boardModel.setUp();
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.SETUP_POSITION,
      payload,
    });
  };
}

export function resetPosition() {
  return (dispatch) => {
    boardModel.resetPosition();
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.CLEAR_POSITION,
      payload,
    });
  };
}

export function changeFEN(newFEN) {
  return (dispatch) => {
    boardModel.setPositionByFEN(newFEN);
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.CHANGE_FEN,
      payload,
    });
  };
}
