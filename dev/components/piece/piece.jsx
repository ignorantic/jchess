import React from 'react';
import PropTypes from 'prop-types';

export default class Piece extends React.PureComponent {
  constructor(props) {
    super(props);
    Piece.propTypes = {
      color: PropTypes.number.isRequired,
      type: PropTypes.number.isRequired,
    };
  }

  render() {
    const {
      color, type,
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
        className={className}
      />
    );
  }
}
