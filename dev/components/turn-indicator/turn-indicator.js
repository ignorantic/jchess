export default class TurnIndicator {

    constructor(dispatcher) {
        this.turn = dispatcher.chess.getTurn();
        this.update(dispatcher.chess);
    }

    update(chess) {
        if (this.turn !== chess.getTurn()) {
            this.turn = chess.getTurn();
            let elemTurnIndicator = document.querySelector('#turn-indicator');
            if (this.turn === 'white') {
                elemTurnIndicator.classList.remove('turn-indicator_black');
                if (!elemTurnIndicator.classList.contains('turn-indicator_white')) {
                    elemTurnIndicator.classList.add('turn-indicator_white');
                }
            } else {
                elemTurnIndicator.classList.remove('turn-indicator_white');
                if (!elemTurnIndicator.classList.contains('turn-indicator_black')) {
                    elemTurnIndicator.classList.add('turn-indicator_black');
                }
            }
        }
    }

}
