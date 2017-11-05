import { combineReducers } from 'redux';
import game from './game-reducer';
import ui from './ui-reducer';
import engine from './engine-reducer';

export default combineReducers({
  game,
  ui,
  engine,
});
