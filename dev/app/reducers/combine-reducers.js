import { combineReducers } from 'redux';
import game from './game-reducer';
import ui from './ui-reducer';

export default combineReducers({
  game,
  ui,
});
