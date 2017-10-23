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
      onPick: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      file,
      rank,
      square,
      onPick,
    } = this.props;
    let mc = '';
    let sc = '';
    const cc = `square square_${square.color}`;
    const pc = `square_${square.piece.type}_${square.piece.color}`;
    if (square.marked) {
      mc = ` square_marked_${square.color}`;
    }
    if (square.selected) {
      (sc = ' square_selected');
    }
    const classes = `${cc} ${pc}${mc}${sc}`;
    return (
      <button
        className={classes}
        onMouseDown={() => onPick(file, rank)}
        onKeyPress={() => onPick(file, rank)}
      />
    );
  }
}
