import React from 'react';
import PropTypes from 'prop-types';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    Square.propTypes = {
      file: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
      square: PropTypes.shape({
        color: PropTypes.string,
        piece: PropTypes.shape({
          color: PropTypes.string,
          type: PropTypes.string,
        }),
      }).isRequired,
      tabindex: PropTypes.number.isRequired,
      onPick: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      file, rank, square, tabindex, onPick,
    } = this.props;
    const color = square.color === 1 ? 'white' : 'black';
    const pieceColor = square.piece.color === 1 ? 'white' : 'black';
    let mc = '';
    let sc = '';
    let pc = '';
    const cc = `square square_${color}`;
    if (square.piece.type) pc = ` square_${square.piece.type}_${pieceColor}`;
    if (square.marked) mc = ` square_marked_${color}`;
    if (square.selected) sc = ' square_selected';
    const classes = `${cc}${pc}${mc}${sc}`;

    return (
      <button
        tabIndex={tabindex}
        className={classes}
        data-file={file}
        data-rank={rank}
        onMouseDown={() => onPick(file, rank)}
      />
    );
  }
}
