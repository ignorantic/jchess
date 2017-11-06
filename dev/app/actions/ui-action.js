import ACTIONS from '../consts';
import { move, updatePosition } from './game-actions';
import boardModel from '../board-model';

function setFocus(file, rank) {
  const selector = `.square[data-file="${file}"][data-rank="${rank}"]`;
  const elemNext = document.querySelector(selector);
  if (elemNext) {
    setTimeout(() => elemNext.focus(), 0);
  }
}

export function select(file, rank, mouse) {
  return (dispatch) => {
    let drag = null;
    boardModel.select(file, rank);
    if (
      mouse
      && boardModel.getMoves(file, rank).length > 0
      && boardModel.isFriend(file, rank)
    ) drag = [file, rank];
    const uiPayload = {
      focus: [file, rank],
      drag,
    };
    dispatch(updatePosition());
    dispatch({
      type: ACTIONS.DRAG,
      payload: uiPayload,
    });
  };
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

export function releasePiece(file, rank) {
  return (dispatch) => {
    if (boardModel.isSquareMarked(file, rank)) {
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
