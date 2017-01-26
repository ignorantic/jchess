import JChess from '../lib/jchess';
import initBoard from '../components/board/board';

document.addEventListener('DOMContentLoaded', () => {
    let jchess = new JChess;
    initBoard(jchess);
})