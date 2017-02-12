
/**
 *     pick-action.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import talDispatcher from '../dispatcher/tal-dispatcher';
import keyMirror from '../constants/keys';

const talAction = {
    pick(file, rank) {
        talDispatcher.dispatch({
            type: keyMirror.PICK_ON_SQUARE,
            file: file,
            rank: rank
        });
    },

    reset() {
        talDispatcher.dispatch({
            type: keyMirror.RESET_POSITION
        });
    },

    changeFEN(newFEN) {
        talDispatcher.dispatch({
            type: keyMirror.CHANGE_FEN,
            fen: newFEN
        });
    }
};

export default talAction;
