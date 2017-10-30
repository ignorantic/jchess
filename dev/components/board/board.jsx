import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Piece from '../piece/piece';
import Square from '../square/square';
import { touch, changeFocus, releasePiece, dragPiece } from '../../modules/actions/actions';

class Board extends React.Component {
  constructor(props) {
    super(props);
    Board.propTypes = {
      board: PropTypes.arrayOf(PropTypes.array).isRequired,
      turn: PropTypes.number.isRequired,
      check: PropTypes.bool.isRequired,
      checkmate: PropTypes.bool.isRequired,
      flip: PropTypes.bool.isRequired,
      focus: PropTypes.arrayOf(PropTypes.number).isRequired,
      drag: PropTypes.arrayOf(PropTypes.number).isRequired,
      onTouch: PropTypes.func.isRequired,
      onRelease: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
      onDrag: PropTypes.func.isRequired,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleKeyDown(event) {
    const { focus, onTouch, onFocus } = this.props;
    if (event.keyCode > 36 && event.keyCode < 41) {
      let nf = focus[0];
      let nr = focus[1];
      switch (event.keyCode) {
        case 37:
          nf = focus[0] - 1;
          break;
        case 38:
          nr = focus[1] + 1;
          break;
        case 39:
          nf = focus[0] + 1;
          break;
        case 40:
          nr = focus[1] - 1;
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
      onTouch(focus[0], focus[1], false);
    }
  }

  handleMouseMove(event) {
    const { onDrag } = this.props;
    onDrag(
      event.clientX - event.target.parentElement.getBoundingClientRect().left,
      event.clientY - event.target.parentElement.getBoundingClientRect().top,
    );
  }

  render() {
    const {
      board, turn, check, checkmate, flip, focus, drag,
      onTouch, onRelease, onFocus,
    } = this.props;
    const [dragFile, dragRank, dragLeft, dragTop] = drag;
    const dragHidden = dragFile === undefined;
    const dragColor = !dragHidden ? board[dragFile][dragRank].piece.color : null;
    const dragType = !dragHidden ? board[dragFile][dragRank].piece.type : null;
    const color = turn === 1 ? 'white' : 'black';
    let className = `board board_${color}`;
    if (checkmate) className += ' board_checkmate';
    else if (check) className += ' board_check';
    if (flip) className += ' board_flipped';
    if (!dragHidden) className += ' board_drag';
    return (
      <div
        className={className}
        onKeyDown={this.handleKeyDown}
        role="toolbar"
        onMouseMove={this.handleMouseMove}
      >
        <Piece
          left={dragLeft}
          top={dragTop}
          hidden={dragHidden}
          color={dragColor}
          type={dragType}
        />
        {
          board.map((fItem, file) => (
            fItem.map((rItem, rank) => {
              let tabindex = -1;
              let pieceColor = null;
              let pieceType = null;
              if (file === focus[0] && rank === focus[1]) tabindex = 0;
              if (!(file === drag[0] && rank === drag[1])) {
                pieceColor = rItem.piece.color;
                pieceType = rItem.piece.type;
              }
              return (
                <Square
                  file={file}
                  rank={rank}
                  color={rItem.color}
                  pieceColor={pieceColor}
                  pieceType={pieceType}
                  marked={rItem.marked}
                  selected={rItem.selected}
                  key={rItem.id}
                  tabindex={tabindex}
                  onTouch={onTouch}
                  onRelease={onRelease}
                  onFocus={onFocus}
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
  drag: state.drag,
  turn: state.turn,
  check: state.check,
  checkmate: state.checkmate,
  flip: state.flip,
});

const mapDispatchToProps = dispatch => ({
  onTouch: (file, rank, mouse) => dispatch(touch(file, rank, mouse)),
  onRelease: (file, rank) => dispatch(releasePiece(file, rank)),
  onFocus: (file, rank) => dispatch(changeFocus(file, rank)),
  onDrag: (left, top) => dispatch(dragPiece(left, top)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
