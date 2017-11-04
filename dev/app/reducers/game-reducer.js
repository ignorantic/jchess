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

const initialState = {
  ...getGame(),
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case consts.UPDATE_POSITION: {
      return {
        ...state,
        ...action.payload.game,
      };
    }
    case consts.ENGINE_MOVE:
    case consts.CLEAR_POSITION:
    case consts.SETUP_POSITION:
    case consts.GOTO:
    case consts.CHANGE_FEN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default game;
