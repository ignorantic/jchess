
/**
 *     tal-store.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import {EventEmitter} from 'events';
import talDispatcher from '../dispatcher/tal-dispatcher';
import keyMirror from '../constants/keys';
import talChessModel from '../models/tal-chess-model';

class TalStore extends EventEmitter {

    construct() {
        this.CHANGE_EVENT = 'CHANGE_EVENT';
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
    }
}

const talStore = new TalStore();

talDispatcher.register(action => {

    switch (action.type) {
        case keyMirror.PICK_ON_SQUARE:
            talChessModel.pickSquare(action.file, action.rank);
            talStore.emitChange();
            break;
        default:
            break;
    }

});

talDispatcher.register(action => {

    switch (action.type) {
        case keyMirror.RESET_POSITION:
            talChessModel.setUpInitial();
            talStore.emitChange();
            break;
        default:
            break;
    }

});

talDispatcher.register(action => {

    switch (action.type) {
        case keyMirror.CHANGE_FEN:
            talChessModel.setPositionByFEN(action.fen);
            talStore.emitChange();
            break;
        default:
            break;
    }

});

export default talStore;
