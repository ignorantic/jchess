import ACTIONS from '../consts';
import boardModel from '../board-model';

function setFocus(file, rank) {
  const selector = `.square[data-file="${file}"][data-rank="${rank}"]`;
  const elemNext = document.querySelector(selector);
  if (elemNext) {
    setTimeout(() => elemNext.focus(), 0);
  }
}

/* TODO: separate ui and game ACTIONS */
export function touch(file, rank, mouse) {
  return (dispatch) => {
    let drag = null;
    boardModel.touch(file, rank);
    if (
      mouse
      && boardModel.getMoves(file, rank).length > 0
      && boardModel.isFriend(file, rank)
    ) drag = [file, rank];
    const gamePayload = boardModel.getGame();
    const uiPayload = {
      focus: [file, rank],
      drag,
    };
    dispatch({
      type: ACTIONS.UPDATE_POSITION,
      payload: gamePayload,
    });
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
      boardModel.touch(file, rank);
      setFocus(file, rank);
      const payload = boardModel.getGame();
      dispatch({
        type: ACTIONS.UPDATE_POSITION,
        payload,
      });
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
