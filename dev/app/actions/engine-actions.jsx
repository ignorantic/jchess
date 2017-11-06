import ACTIONS from '../consts';
import getMoveFromServer from '../lib/api';
import { select, move } from './game-actions';
import { ANToSquare } from '../lib/jboard/an';

export default function getEngineMove(fen, lastMove) {
  return (dispatch, getState) => {
    dispatch({ type: ACTIONS.GET_ENGINE_MOVE_REQUEST });
    return getMoveFromServer(fen, lastMove)
      .then((bestMove) => {
        if (getState().engine.status === 'waiting') {
          dispatch({ type: ACTIONS.GET_ENGINE_MOVE_SUCCESS });
          const start = ANToSquare(bestMove.slice(0, 2));
          const stop = ANToSquare(bestMove.slice(2, 4));
          dispatch(select(start.file, start.rank));
          dispatch(move(stop.file, stop.rank));
        }
      })
      .catch(() => {
        dispatch({ type: ACTIONS.GET_ENGINE_MOVE_FAILURE });
      });
  };
}
