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
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (event.keyCode > 36 && event.keyCode < 41) {
      const { file, rank } = this.props;
      let nf = file;
      let nr = rank;
      switch (event.keyCode) {
        case 37:
          nf = file - 1;
          break;
        case 38:
          nr = rank + 1;
          break;
        case 39:
          nf = file + 1;
          break;
        case 40:
          nr = rank - 1;
          break;
        default:
          break;
      }
      if (nf > 7) nf = 0;
      if (nf < 0) nf = 7;
      if (nr > 7) nr = 0;
      if (nr < 0) nr = 7;
      const selector = `.square[data-file="${nf}"][data-rank="${nr}"]`;
      const elemNext = document.querySelector(selector);
      if (elemNext.focus) elemNext.focus();
    }
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
    let pc = '';
    const cc = `square square_${square.color}`;
    if (square.piece.type) {
      pc = ` square_${square.piece.type}_${square.piece.color}`;
    }
    if (square.marked) {
      mc = ` square_marked_${square.color}`;
    }
    if (square.selected) {
      (sc = ' square_selected');
    }
    const classes = `${cc}${pc}${mc}${sc}`;
    return (
      <button
        className={classes}
        data-file={file}
        data-rank={rank}
        onMouseDown={() => onPick(file, rank)}
        onClick={() => onPick(file, rank)}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
