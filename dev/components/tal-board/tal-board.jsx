
/**
 *     tal-board.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import React from 'react';
import TalSquare from '../tal-square/tal-square.jsx';

export default class TalBoard extends React.Component {

    render() {
        return (
            <div className="board">
                {
                    this.props.board.map((fItem, file) => {
                        return fItem.map((rItem, rank) => {
                            return (
                                <TalSquare
                                    file={file}
                                    rank={rank}
                                    square={rItem}
                                    key={file + '.' + rank}
                                />
                            );
                        });
                    })
                }
            </div>
        );
    }

}
