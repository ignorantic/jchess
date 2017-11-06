import ACTIONS from '../consts';
import boardModel from '../board-model';
import { getEngineMove } from './engine-actions';
import { drag } from './ui-action';

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

export function updatePosition() {
  return (dispatch) => {
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.UPDATE_POSITION,
      payload,
    });
  };
}

export function select(file, rank, mouse) {
  return (dispatch) => {
    let dragPayload = null;
    boardModel.select(file, rank);
    if (
      mouse
      && boardModel.getMoves(file, rank).length > 0
      && boardModel.isFriend(file, rank)
    ) dragPayload = [file, rank];
    dispatch(drag(dragPayload));
    dispatch(updatePosition());
  };
}

export function move(file, rank) {
  return (dispatch, getState) => {
    const lastMove = boardModel.move(file, rank);
    if (lastMove !== null) {
      const { game: { fen }, engine: { status, play } } = getState();
      if (play[boardModel.turn] === true && status !== 'waiting') {
        dispatch(getEngineMove(fen, lastMove));
      }
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
    const payload = boardModel.getGame();
    dispatch({
      type: ACTIONS.CHANGE_FEN,
      payload,
    });
  };
}
