import React from 'react';

export default class Button extends React.Component {

    render() {
        let btnClass = 'button';
        this.props.className && (btnClass += ' ' + this.props.className);
        return (
            <button
                className = { btnClass }
                onClick = { this.props.onClick }>
                {this.props.label}
            </button>
        );
    }

}
