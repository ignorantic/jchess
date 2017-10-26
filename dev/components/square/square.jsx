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
      ti: PropTypes.number.isRequired,
      onPick: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      file,
      rank,
      square,
      ti,
      onPick,
    } = this.props;

    let mc = '';
    let sc = '';
    let pc = '';
    const cc = `square square_${square.color}`;
    if (square.piece.type) pc = ` square_${square.piece.type}_${square.piece.color}`;
    if (square.marked) mc = ` square_marked_${square.color}`;
    if (square.selected) sc = ' square_selected';
    const classes = `${cc}${pc}${mc}${sc}`;

    return (
      <button
        tabIndex={ti}
        className={classes}
        data-file={file}
        data-rank={rank}
        onMouseDown={() => onPick(file, rank)}
      />
    );
  }
}
