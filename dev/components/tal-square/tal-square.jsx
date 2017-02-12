
/**
 *     tal-square.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import React from 'react';
import talAction from '../../modules/actions/tal-action';

export default class TalSquare extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        talAction.pick(this.props.file, this.props.rank);
    }

    render() {
        let markedClass = '',
            selectedClass = '';
        if (this.props.square.marked) {
            (markedClass = ' square_marked_' + this.props.square.color);
        }
        if (this.props.square.selected) {
            (selectedClass = ' square_selected');
        }
        let squareClass = 'square square_' + this.props.square.color +
            ' square_' + this.props.square.piece.type +
            '_' + this.props.square.piece.color + markedClass + selectedClass;
        return (
            <div
                className={squareClass}
                onClick={this.handleClick}
            />
        );
    }

}
