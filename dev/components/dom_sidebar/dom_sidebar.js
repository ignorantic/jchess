
/**
 *     dom_sidebar.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

export default class DOMSidebar {

    /**
     *   CONSTRUCTOR
     */

    constructor(dispatcher) {
        let reset = document.querySelector('#btn_reset');
        reset.addEventListener('click', dispatcher.resetClick());
    }

}