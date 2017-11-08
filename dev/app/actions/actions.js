import ACTIONS from '../consts';
import boardModel from '../board-model';
import getMoveFromServer from '../lib/api';
import { UCIToSquare, UCIToSAN, UCIToFAN } from '../lib/jboard/notation';

export function setUpPosition() {
  return (dispatch) => {
    dispatch({ type: ACTIONS.GET_ENGINE_MOVE_SUCCESS });
    boardModel.setUp();
    const payload = {
      ...boardModel.getGame(),
      prevFen: boardModel.initialFEN,
      lastMove: '',
      halfCount: 0,
      lines: [[{ fen: boardModel.initialFEN }]],
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
      halfCount: 0,
      lines: [[{ fen: boardModel.initialFEN }]],
    };
    dispatch({
      type: ACTIONS.UPDATE_POSITION,
      payload,
    });
  };
}

export function goto(line, moveNum) {
  return (dispatch, getState) => {
    const { game: { lines } } = getState();
    boardModel.setPositionByFEN(lines[line][moveNum].fen);
    const payload = {
      ...boardModel.getGame(),
      currentLine: line,
      halfCount: moveNum,
    };
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoPrev() {
  return (dispatch, getState) => {
    const { game: { halfCount, currentLine, lines } } = getState();
    if (lines[currentLine][halfCount - 1] === undefined) return;
    boardModel.setPositionByFEN(lines[currentLine][halfCount - 1].fen);
    const payload = {
      ...boardModel.getGame(),
      halfCount: halfCount - 1,
    };
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoNext() {
  return (dispatch, getState) => {
    const { game: { halfCount, currentLine, lines } } = getState();
    if (lines[currentLine][halfCount + 1] === undefined) return;
    boardModel.setPositionByFEN(lines[currentLine][halfCount + 1].fen);
    const payload = {
      ...boardModel.getGame(),
      halfCount: halfCount + 1,
    };
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoStart() {
  return (dispatch, getState) => {
    const { game: { currentLine, lines } } = getState();
    boardModel.setPositionByFEN(lines[currentLine][0].fen);
    const payload = {
      ...boardModel.getGame(),
      halfCount: 0,
    };
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoEnd() {
  return (dispatch, getState) => {
    const { game: { currentLine, lines } } = getState();
    const { length } = lines[currentLine];
    boardModel.setPositionByFEN(lines[currentLine][length - 1].fen);
    const payload = {
      ...boardModel.getGame(),
      halfCount: length - 1,
    };
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function changeFEN(newFEN) {
  boardModel.setPositionByFEN(newFEN);
  const payload = {
    ...boardModel.getGame(),
    prevFen: newFEN,
    lastMove: '',
    halfCount: 0,
    lines: [[{ fen: newFEN }]],
  };
  return {
    type: ACTIONS.CHANGE_FEN,
    payload,
  };
}

export function changeFocus(file, rank) {
  const payload = [file, rank];
  return {
    type: ACTIONS.CHANGE_FOCUS,
    payload,
  };
}

export function select(file, rank, mouse) {
  let uiPayload = null;
  boardModel.select(file, rank);
  if (
    mouse
    && boardModel.getMoves(file, rank).length > 0
    && boardModel.isFriend(file, rank)
  ) uiPayload = [file, rank];
  const gamePayload = boardModel.getGame();
  return {
    type: ACTIONS.SELECT,
    uiPayload,
    gamePayload,
  };
}

export function flipBoard() {
  return { type: ACTIONS.FLIP_BOARD };
}

export function move(file, rank) {
  function writeMove(lines, currentLine, halfCount, lastMove, fen) {
    const prevFEN = lines[currentLine][halfCount].fen;
    const newLines = [].concat(lines);
    newLines[currentLine][halfCount + 1] = {
      move: lastMove,
      san: UCIToSAN(prevFEN, lastMove),
      fan: UCIToFAN(prevFEN, lastMove),
      fen,
    };
    return newLines;
  }

  return (dispatch, getState) => {
    const lastMove = boardModel.move(file, rank);
    if (lastMove !== null) {
      const {
        game: {
          halfCount, fen, lines, currentLine,
        },
      } = getState();
      const newLines = writeMove(lines, currentLine, halfCount, lastMove, boardModel.getFEN());
      const payload = {
        ...boardModel.getGame(),
        lastMove,
        prevFen: fen,
        lines: newLines,
        halfCount: halfCount + 1,
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
          dispatch(select(start.file, start.rank));
          dispatch(move(stop.file, stop.rank, false));
        }
      })
      .catch(() => {
        dispatch({ type: ACTIONS.GET_ENGINE_MOVE_FAILURE });
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
