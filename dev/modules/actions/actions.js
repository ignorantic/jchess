import consts from '../constants/consts';
import boardModel from '../models/board-model';

function setFocus(file, rank) {
  const selector = `.square[data-file="${file}"][data-rank="${rank}"]`;
  const elemNext = document.querySelector(selector);
  if (elemNext) {
    setTimeout(() => elemNext.focus(), 0);
  }
}

export function touch(file, rank, mouse) {
  return (dispatch) => {
    let drag = [];
    boardModel.touch(file, rank);
    if (
      mouse
      && boardModel.getMoves(file, rank).length > 0
      && boardModel.isFriend(boardModel.getTurn(), file, rank)
    ) drag = [file, rank];
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      halfCount: boardModel.getHalfCount(),
      currentLine: boardModel.getCurrentLine(),
      lines: boardModel.getLines(),
      focus: [file, rank],
      drag,
    };
    dispatch({
      type: consts.UPDATE_POSITION,
      payload,
    });
  };
}

export function goto(line, move) {
  return (dispatch) => {
    boardModel.goto(line, move);
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      halfCount: boardModel.getHalfCount(),
      currentLine: boardModel.getCurrentLine(),
      lines: boardModel.getLines(),
    };
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function gotoPrev() {
  return (dispatch) => {
    boardModel.gotoPrev();
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      halfCount: boardModel.getHalfCount(),
      currentLine: boardModel.getCurrentLine(),
      lines: boardModel.getLines(),
    };
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function gotoNext() {
  return (dispatch) => {
    boardModel.gotoNext();
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      halfCount: boardModel.getHalfCount(),
      currentLine: boardModel.getCurrentLine(),
      lines: boardModel.getLines(),
    };
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function gotoStart() {
  return (dispatch) => {
    boardModel.gotoStart();
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      halfCount: boardModel.getHalfCount(),
      currentLine: boardModel.getCurrentLine(),
      lines: boardModel.getLines(),
    };
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function gotoEnd() {
  return (dispatch) => {
    boardModel.gotoEnd();
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      halfCount: boardModel.getHalfCount(),
      currentLine: boardModel.getCurrentLine(),
      lines: boardModel.getLines(),
    };
    dispatch({
      type: consts.GOTO,
      payload,
    });
  };
}

export function changeFocus(file, rank) {
  setFocus(file, rank);
  return (dispatch) => {
    const payload = {
      focus: [file, rank],
    };
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
        board: boardModel.getBoard(),
        fen: boardModel.getFEN(),
        turn: boardModel.getTurn(),
        check: boardModel.isCheck(),
        checkmate: boardModel.isCheckmate(),
        halfCount: boardModel.getHalfCount(),
        currentLine: boardModel.getCurrentLine(),
        lines: boardModel.getLines(),
        focus: [file, rank],
        drag: [],
      };
      dispatch({
        type: consts.UPDATE_POSITION,
        payload,
      });
    } else {
      const payload = {
        drag: [],
      };
      dispatch({
        type: consts.RELEASE,
        payload,
      });
    }
  };
}

export function setUpPosition() {
  return (dispatch) => {
    boardModel.setUp();
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      halfCount: boardModel.getHalfCount(),
      currentLine: boardModel.getCurrentLine(),
      lines: boardModel.getLines(),
    };
    dispatch({
      type: consts.SETUP_POSITION,
      payload,
    });
  };
}

export function resetPosition() {
  return (dispatch) => {
    boardModel.resetPosition();
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      halfCount: boardModel.getHalfCount(),
      currentLine: boardModel.getCurrentLine(),
      lines: boardModel.getLines(),
    };
    dispatch({
      type: consts.CLEAR_POSITION,
      payload,
    });
  };
}

export function changeFEN(newFEN) {
  return (dispatch) => {
    boardModel.setPositionByFEN(newFEN);
    const payload = {
      board: boardModel.getBoard(),
      fen: boardModel.getFEN(),
      turn: boardModel.getTurn(),
      check: boardModel.isCheck(),
      checkmate: boardModel.isCheckmate(),
      halfCount: boardModel.getHalfCount(),
      currentLine: boardModel.getCurrentLine(),
      lines: boardModel.getLines(),
    };
    dispatch({
      type: consts.CHANGE_FEN,
      payload,
    });
  };
}

export function flipBoard() {
  return (dispatch) => {
    dispatch({
      type: consts.FLIP_BOARD,
    });
  };
}
