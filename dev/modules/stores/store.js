import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers/reducer';
import boardModel from '../models/board-model';

const initialState = {
  board: boardModel.Board,
  fen: boardModel.FEN,
  turn: boardModel.Turn,
  check: boardModel.Check,
  mate: boardModel.Checkmate,
  focus: {
    file: 0,
    rank: 0,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
