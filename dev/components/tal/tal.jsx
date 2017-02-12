
/**
 *     tal.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import React from 'react';
import TalBoard from '../tal-board/tal-board.jsx';
import TalSidebar from '../tal-sidebar/tal-sidebar.jsx';
import TalFEN from '../tal-fen/tal-fen.jsx';
import talStore from '../../modules/stores/tal-store';
import talChessModel from '../../modules/models/tal-chess-model';

export default class Tal extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        talStore.addChangeListener(this.handleChange);
    }

    componentWillUnount() {
        talStore.removeChangeListener(this.handleChange);
    }

    handleChange() {
        this.forceUpdate();
    }

    render() {
        let currentBoard = talChessModel.getBoard(),
            currentFEN = talChessModel.getFEN();
        return (
            <div className="container">
                <div className="content">
                    <TalBoard
                        board = {currentBoard}
                    />
                    <TalFEN fen = {currentFEN}/>
                </div>
                <TalSidebar />
            </div>
        );
    }

}
