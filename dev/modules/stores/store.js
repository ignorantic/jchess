import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers/reducer';
import boardModel from '../models/board-model';

const initialState = {
  board: boardModel.getBoard(),
  fen: boardModel.getFEN(),
  prevFen: boardModel.getPrevFEN(),
  turn: boardModel.getTurn(),
  check: boardModel.isInCheck(),
  checkmate: boardModel.isCheckmate(),
  lines: boardModel.getLines(),
  halfCount: boardModel.getHalfCount(),
  currentLine: boardModel.getCurrentLine(),
  lastMove: boardModel.getLastMove(),
  flip: false,
  focus: [0, 0],
  drag: [],
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
