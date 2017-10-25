import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers/reducer';
import boardModel from '../models/board-model';

const initialState = {
  board: boardModel.getBoard(),
  fen: boardModel.getFEN(),
  turn: boardModel.getTurn(),
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
