import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Square from '../square/square';
import { pickOnSquare, changeFocus } from '../../modules/actions/actions';

class Board extends React.Component {
  constructor(props) {
    super(props);
    Board.propTypes = {
      board: PropTypes.arrayOf(PropTypes.array).isRequired,
      turn: PropTypes.string.isRequired,
      check: PropTypes.bool.isRequired,
      mate: PropTypes.bool.isRequired,
      focus: PropTypes.shape({
        file: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
      }).isRequired,
      onPick: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    const { focus, onPick, onFocus } = this.props;
    if (event.keyCode > 36 && event.keyCode < 41) {
      let nf = focus.file;
      let nr = focus.rank;
      switch (event.keyCode) {
        case 37:
          nf = focus.file - 1;
          break;
        case 38:
          nr = focus.rank + 1;
          break;
        case 39:
          nf = focus.file + 1;
          break;
        case 40:
          nr = focus.rank - 1;
          break;
        default:
          break;
      }
      if (nf > 7) nf = 7;
      if (nf < 0) nf = 0;
      if (nr > 7) nr = 7;
      if (nr < 0) nr = 0;
      const selector = `.square[data-file="${nf}"][data-rank="${nr}"]`;
      const elemNext = document.querySelector(selector);
      if (elemNext) {
        elemNext.focus();
        onFocus(nf, nr);
      }
    }
    if (event.keyCode === 13 || event.keyCode === 32) {
      onPick(focus.file, focus.rank);
    }
  }

  render() {
    const {
      board, turn, check, mate, focus, onPick,
    } = this.props;
    let cc = '';
    const tc = ` board_${turn}`;
    if (mate) cc = ' board_mate';
    else if (check) cc = ' board_check';
    const className = `board${tc}${cc}`;
    return (
      <div
        className={className}
        onKeyDown={this.handleKeyDown}
        role="toolbar"
      >
        {
          board.map((fItem, file) => (
            fItem.map((rItem, rank) => {
              let tabindex = -1;
              if (file === focus.file && rank === focus.rank) tabindex = 0;
              return (
                <Square
                  file={file}
                  rank={rank}
                  square={rItem}
                  key={rItem.id}
                  tabindex={tabindex}
                  onPick={onPick}
                />
              );
            })
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board,
  focus: state.focus,
  turn: state.turn,
  check: state.check,
  mate: state.mate,
});

const mapDispatchToProps = dispatch => ({
  onPick: (file, rank) => dispatch(pickOnSquare(file, rank)),
  onFocus: (file, rank) => dispatch(changeFocus(file, rank)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
