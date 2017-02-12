
/**
 *     tal-button.jsx for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import React from 'react';

export default class TalButton extends React.Component {

    render() {
        let btnClass = 'button';
        this.props.className && (btnClass += ' ' + this.props.className);
        return (
            <button
                className={btnClass}
                onClick={this.props.onClick}>
                {this.props.label}
            </button>
        );
    }

}
