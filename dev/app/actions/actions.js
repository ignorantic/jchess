import ACTIONS from '../consts';
import boardModel from '../board-model';
import getMoveFromServer from '../lib/api';
import { UCIToSquare } from '../lib/jboard/notation';

export function setUpPosition() {
  return (dispatch) => {
    dispatch({ type: ACTIONS.GET_ENGINE_MOVE_SUCCESS });
    boardModel.setUp();
    const payload = {
      ...boardModel.getGame(),
      prevFen: boardModel.initialFEN,
      lastMove: '',
    };
    dispatch({
      type: ACTIONS.UPDATE_POSITION,
      payload,
    });
  };
}

export function resetPosition() {
  return (dispatch) => {
    dispatch({ type: ACTIONS.GET_ENGINE_MOVE_SUCCESS });
    boardModel.resetPosition();
    const payload = {
      ...boardModel.getGame(),
      prevFen: boardModel.initialFEN,
      lastMove: '',
    };
    dispatch({
      type: ACTIONS.UPDATE_POSITION,
      payload,
    });
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

export function changeFEN(newFEN) {
  return (dispatch) => {
    boardModel.setPositionByFEN(newFEN);
    const payload = {
      ...boardModel.getGame(),
      prevFen: newFEN,
      lastMove: '',
    };
    dispatch({
      type: ACTIONS.CHANGE_FEN,
      payload,
    });
  };
}

export function changeFocus(file, rank) {
  return (dispatch) => {
    const payload = [file, rank];
    dispatch({
      type: ACTIONS.CHANGE_FOCUS,
      payload,
    });
  };
}

export function select(file, rank, mouse) {
  return (dispatch) => {
    let uiPayload = null;
    boardModel.select(file, rank);
    if (
      mouse
      && boardModel.getMoves(file, rank).length > 0
      && boardModel.isFriend(file, rank)
    ) uiPayload = [file, rank];
    const gamePayload = boardModel.getGame();
    dispatch({
      type: ACTIONS.SELECT,
      uiPayload,
      gamePayload,
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

export function selectAndMove(start, stop) {
  return (dispatch, getState) => {
    boardModel.select(start.file, start.rank);
    const lastMove = boardModel.move(stop.file, stop.rank);
    if (lastMove !== null) {
      const { game: { fen } } = getState();
      const payload = {
        ...boardModel.getGame(),
        lastMove,
        prevFen: fen,
      };
      dispatch({
        type: ACTIONS.MOVE,
        payload,
      });
    }
  };
}

export function getEngineMove(fen, lastMove) {
  return (dispatch, getState) => {
    dispatch({ type: ACTIONS.GET_ENGINE_MOVE_REQUEST });
    return getMoveFromServer(fen, lastMove)
      .then((bestMove) => {
        if (getState().engine.status === 'waiting') {
          dispatch({ type: ACTIONS.GET_ENGINE_MOVE_SUCCESS });
          const start = UCIToSquare(bestMove.slice(0, 2));
          const stop = UCIToSquare(bestMove.slice(2, 4));
          dispatch(selectAndMove(start, stop, false));
        }
      })
      .catch(() => {
        dispatch({ type: ACTIONS.GET_ENGINE_MOVE_FAILURE });
      });
  };
}

export function move(file, rank) {
  return (dispatch, getState) => {
    const lastMove = boardModel.move(file, rank);
    if (lastMove !== null) {
      const { game: { fen } } = getState();
      const payload = {
        ...boardModel.getGame(),
        lastMove,
        prevFen: fen,
      };
      dispatch({
        type: ACTIONS.MOVE,
        payload,
      });
    }
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

export function switchTurn() {
  return (dispatch, getState) => {
    const { game: { prevFen, lastMove, turn }, engine: { status, play } } = getState();
    if (play[turn] === true && status !== 'waiting') {
      dispatch(getEngineMove(prevFen, lastMove));
    }
  };
}

export function toggleWhite() {
  return (dispatch) => {
    dispatch({ type: ACTIONS.TOGGLE_WHITE });
    dispatch(switchTurn());
  };
}

export function toggleBlack() {
  return (dispatch) => {
    dispatch({ type: ACTIONS.TOGGLE_BLACK });
    dispatch(switchTurn());
  };
}
