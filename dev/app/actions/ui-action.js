import ACTIONS from '../consts';
import { move } from './game-actions';

function setFocus(file, rank) {
  const selector = `.square[data-file="${file}"][data-rank="${rank}"]`;
  const elemNext = document.querySelector(selector);
  if (elemNext) {
    setTimeout(() => elemNext.focus(), 0);
  }
}

export function changeFocus(file, rank) {
  setFocus(file, rank);
  return (dispatch) => {
    const payload = [file, rank];
    dispatch({
      type: ACTIONS.CHANGE_FOCUS,
      payload,
    });
  };
}

export function drag(payload) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.DRAG,
      payload,
    });
  };
}

export function releasePiece(file, rank) {
  return (dispatch, getState) => {
    if (getState().game.board[file][rank].marked) {
      dispatch(move(file, rank));
      dispatch(changeFocus(file, rank));
    }
    dispatch({
      type: ACTIONS.RELEASE,
    });
  };
}

export function flipBoard() {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.FLIP_BOARD,
    });
  };
}
