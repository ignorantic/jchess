import React from 'react';
import PropTypes from 'prop-types';

export default class DragPiece extends React.PureComponent {
  constructor(props) {
    super(props);
    DragPiece.propTypes = {
      color: PropTypes.number,
      type: PropTypes.number,
      hidden: PropTypes.bool,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    };
    DragPiece.defaultProps = {
      hidden: false,
      color: null,
      type: null,
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
    let className = 'piece piece_drag';
    if (type !== null) className += ` piece_${ptp}_${pclr}`;
    const style = hidden ? null : { top: `${top}px`, left: `${left}px` };

    return (
      <div
        hidden={hidden ? 'hidden' : null}
        className={className}
        style={style}
      />
    );
  }
}
