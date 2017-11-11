import ACTIONS from '../consts';
import getMoveFromServer from '../lib/api';
import { UCIToSquare, UCIToSAN, UCIToFAN, squareToUCI } from '../lib/jboard/notation';
import { parseFEN } from '../lib/jboard/fen';
import { isFriend } from '../lib/jboard/utils';
import select from '../lib/jboard/select';
import move from '../lib/jboard/move';

export function setUpPosition() {
  return (dispatch, getState) => {
    dispatch({ type: ACTIONS.GET_ENGINE_MOVE_SUCCESS });
    const { game: { initialFEN } } = getState();
    const newPosition = parseFEN(initialFEN);
    const payload = {
      ...newPosition,
      prevFEN: initialFEN,
      FEN: initialFEN,
      lastMove: '',
      halfCount: 0,
      lines: [[{ FEN: initialFEN }]],
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
    const emptyFEN = '8/8/8/8/8/8/8/8 w - - 0 1';
    const newPosition = parseFEN(emptyFEN);
    const payload = {
      ...newPosition,
      prevFEN: emptyFEN,
      lastMove: '',
      halfCount: 0,
      lines: [[{ FEN: emptyFEN }]],
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
    const { FEN } = lines[line][moveNum];
    const newPosition = parseFEN(FEN);
    const payload = {
      ...newPosition,
      FEN,
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
    const { FEN } = lines[currentLine][halfCount - 1];
    const newPosition = parseFEN(FEN);
    const payload = {
      ...newPosition,
      FEN,
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
    const { FEN } = lines[currentLine][halfCount + 1];
    const newPosition = parseFEN(FEN);
    const payload = {
      ...newPosition,
      FEN,
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
    const { FEN } = lines[currentLine][0];
    const newPosition = parseFEN(FEN);
    const payload = {
      ...newPosition,
      FEN,
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
    const { FEN } = lines[currentLine][length - 1];
    const newPosition = parseFEN(FEN);
    const payload = {
      ...newPosition,
      FEN,
      halfCount: length - 1,
    };
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function changeFEN(newFEN) {
  const newPosition = parseFEN(newFEN);
  const payload = {
    ...newPosition,
    prevFEN: newFEN,
    FEN: newFEN,
    lastMove: '',
    halfCount: 0,
    lines: [[{ FEN: newFEN }]],
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

export function selectSquare(file, rank, mouse) {
  return (dispatch, getState) => {
    let uiPayload = null;
    const { game: { FEN, turn } } = getState();
    const newPosition = select(FEN, file, rank);
    const { board } = newPosition;
    if (
      mouse
      // && boardModel.getMoves(file, rank).length > 0
      && isFriend(board, turn, file, rank)
    ) uiPayload = [file, rank];
    const gamePayload = newPosition;
    dispatch({
      type: ACTIONS.SELECT,
      uiPayload,
      gamePayload,
    });
  };
}

export function flipBoard() {
  return { type: ACTIONS.FLIP_BOARD };
}

export function moveToSquare(file, rank) {
  function writeMove(lines, currentLine, halfCount, lastMove, FEN) {
    const prevFEN = lines[currentLine][halfCount].FEN;
    const newLines = [].concat(lines);
    newLines[currentLine][halfCount + 1] = {
      move: lastMove,
      SAN: UCIToSAN(prevFEN, lastMove),
      FAN: UCIToFAN(prevFEN, lastMove),
      FEN,
    };
    return newLines;
  }

  return (dispatch, getState) => {
    const stop = squareToUCI(file, rank);
    if (stop !== null) {
      const {
        game: {
          halfCount, FEN, lines, currentLine, selected,
        },
      } = getState();
      const start = squareToUCI(selected.file, selected.rank);
      const UCIMove = `${start}${stop}`;
      const newPosition = move(FEN, UCIMove);
      const { lastMove, FEN: newFEN } = newPosition;
      const newLines = writeMove(lines, currentLine, halfCount, lastMove, newFEN);
      const payload = {
        ...newPosition,
        prevFEN: FEN,
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

export function getEngineMove(FEN, lastMove) {
  return (dispatch, getState) => {
    dispatch({ type: ACTIONS.GET_ENGINE_MOVE_REQUEST });
    return getMoveFromServer(FEN, lastMove)
      .then((bestMove) => {
        if (getState().engine.status === 'waiting') {
          dispatch({ type: ACTIONS.GET_ENGINE_MOVE_SUCCESS });
          const start = UCIToSquare(bestMove.slice(0, 2));
          const stop = UCIToSquare(bestMove.slice(2, 4));
          dispatch(selectSquare(start.file, start.rank));
          dispatch(moveToSquare(stop.file, stop.rank, false));
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
      dispatch(moveToSquare(file, rank));
      dispatch(changeFocus(file, rank));
    }
    dispatch({
      type: ACTIONS.RELEASE,
    });
  };
}

export function switchTurn() {
  return (dispatch, getState) => {
    const { game: { prevFEN, lastMove, turn }, engine: { status, play } } = getState();
    if (play[turn] === true && status !== 'waiting') {
      dispatch(getEngineMove(prevFEN, lastMove));
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
