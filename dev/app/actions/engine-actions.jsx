import ACTIONS from '../consts';
import boardModel from '../board-model';
import getMoveFromServer from '../lib/api';

/* TODO
 * Write action "moveComplete"
 */
export default function getEngineMove(fen, lastMove) {
  return (dispatch) => {
    /* TODO
     * maybe must handle API request here
     */
    // if (getState().engine.status !== 'ready') return;
    dispatch({
      type: ACTIONS.GET_ENGINE_MOVE_REQUEST,
    });
    return getMoveFromServer(fen, lastMove)
      .then((bestMove) => {
        boardModel.move(bestMove);
        const gamePayload = boardModel.getGame();
        dispatch({
          type: ACTIONS.GET_ENGINE_MOVE_SUCCESS,
        });
        dispatch({
          type: ACTIONS.UPDATE_POSITION,
          payload: gamePayload,
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.GET_ENGINE_MOVE_FAILURE,
        });
      });
  };
}
