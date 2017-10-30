import React from 'react';
import PropTypes from 'prop-types';

export default class Piece extends React.PureComponent {
  constructor(props) {
    super(props);
    Piece.propTypes = {
      left: PropTypes.number,
      top: PropTypes.number,
      hidden: PropTypes.bool.isRequired,
      color: PropTypes.number.isRequired,
      type: PropTypes.number.isRequired,
    };
    Piece.defaultProps = {
      left: 0,
      top: 0,
    };
  }

  render() {
    const {
      color, type, top, left, hidden,
    } = this.props;
    const pclr = color === 1 ? 'white' : 'black';
    const pieces = {
      0: 'pawn', 1: 'rook', 2: 'knight', 3: 'bishop', 4: 'queen', 5: 'king',
    };
    const ptp = pieces[type];
    let className = 'piece';
    if (type !== null) className += ` piece_${ptp}_${pclr}`;

    return (
      <div
        hidden={hidden ? 'hidden' : null}
        className={className}
        style={{ top: `${top}px`, left: `${left}px` }}
      />
    );
  }
}
