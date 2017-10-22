import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/reducer';
import chessModel from '../models/board-model';

const initialState = {
  board: chessModel.getBoard(),
  fen: chessModel.getFEN(),
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk));

export default store;
