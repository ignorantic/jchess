import consts from '../consts';
import boardModel from '../board-model';

function getGame() {
  return {
    board: boardModel.getBoard(),
    fen: boardModel.getFEN(),
    prevFen: boardModel.getPrevFEN(),
    turn: boardModel.getTurn(),
    check: boardModel.isInCheck(),
    checkmate: boardModel.isCheckmate(),
    halfCount: boardModel.getHalfCount(),
    currentLine: boardModel.getCurrentLine(),
    lines: boardModel.getLines(),
    lastMove: boardModel.getLastMove(),
  };
}

function setFocus(file, rank) {
  const selector = `.square[data-file="${file}"][data-rank="${rank}"]`;
  const elemNext = document.querySelector(selector);
  if (elemNext) {
    setTimeout(() => elemNext.focus(), 0);
  }
}

export function touch(file, rank, mouse) {
  return (dispatch) => {
    let drag = null;
    boardModel.touch(file, rank);
    if (
      mouse
      && boardModel.getMoves(file, rank).length > 0
      && boardModel.isFriend(file, rank)
    ) drag = [file, rank];
    const payload = {
      game: getGame(),
      ui: {
        focus: [file, rank],
        drag,
      },
    };
    dispatch({
      type: consts.UPDATE_POSITION,
      payload,
    });
  };
}

export function changeFocus(file, rank) {
  setFocus(file, rank);
  return (dispatch) => {
    const payload = [file, rank];
    dispatch({
      type: consts.CHANGE_FOCUS,
      payload,
    });
  };
}

export function releasePiece(file, rank) {
  return (dispatch) => {
    if (boardModel.isSquareMarked(file, rank)) {
      boardModel.touch(file, rank);
      setFocus(file, rank);
      const payload = {
        game: getGame(),
        ui: {
          focus: [file, rank],
          drag: null,
        },
      };
      dispatch({
        type: consts.UPDATE_POSITION,
        payload,
      });
    } else {
      const payload = {
        ui: { drag: null },
      };
      dispatch({
        type: consts.RELEASE,
        payload,
      });
    }
  };
}

export function flipBoard() {
  return (dispatch) => {
    dispatch({
      type: consts.FLIP_BOARD,
    });
  };
}
