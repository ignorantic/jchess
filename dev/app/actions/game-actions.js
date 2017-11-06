import ACTIONS from '../consts';
import getEngineMove from './engine-actions';
import boardModel from '../board-model';

export function move(file, rank) {
  return (dispatch, getState) => {
    if (boardModel.move(file, rank)) {
      const { game: { fen, turn }, engine: { status } } = getState();
      const lastMove = boardModel.getLastMove();
      if (turn === 1 && status === 'ready') {
        dispatch(getEngineMove(fen, lastMove));
      }
      const payload = boardModel.getGame();
      dispatch({
        type: ACTIONS.MOVE,
        payload,
      });
    }
  };
}

export function goto(line, moveNum) {
  return (dispatch) => {
    boardModel.goto(line, moveNum);
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
      type: ACTIONS.UPDATE_POSITION,
      payload,
    });
  };
}

export function resetPosition() {
  return (dispatch) => {
    boardModel.resetPosition();
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.UPDATE_POSITION,
      payload,
    });
  };
}

export function updatePosition() {
  return (dispatch) => {
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.UPDATE_POSITION,
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
