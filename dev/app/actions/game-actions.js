import consts from '../consts';
import boardModel from '../board-model';
import getMoveFromServer from '../lib/api';

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

export function goto(line, move) {
  return (dispatch) => {
    boardModel.goto(line, move);
    const payload = getGame();
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function gotoPrev() {
  return (dispatch) => {
    boardModel.gotoPrev();
    const payload = getGame();
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function gotoNext() {
  return (dispatch) => {
    boardModel.gotoNext();
    const payload = getGame();
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function gotoStart() {
  return (dispatch) => {
    boardModel.gotoStart();
    const payload = getGame();
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function gotoEnd() {
  return (dispatch) => {
    boardModel.gotoEnd();
    const payload = getGame();
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function setUpPosition() {
  return (dispatch) => {
    boardModel.setUp();
    const payload = getGame();
    dispatch({
      type: consts.SETUP_POSITION,
      payload,
    });
  };
}

export function resetPosition() {
  return (dispatch) => {
    boardModel.resetPosition();
    const payload = getGame();
    dispatch({
      type: consts.CLEAR_POSITION,
      payload,
    });
  };
}

export function changeFEN(newFEN) {
  return (dispatch) => {
    boardModel.setPositionByFEN(newFEN);
    const payload = getGame();
    dispatch({
      type: consts.CHANGE_FEN,
      payload,
    });
  };
}

export function getEngineMove(fen, lastMove) {
  return dispatch => (
    getMoveFromServer(fen, lastMove)
      .then((bestMove) => {
        boardModel.move(bestMove);
        const payload = getGame();
        dispatch({
          type: consts.ENGINE_MOVE,
          payload,
        });
      })
  );
}
