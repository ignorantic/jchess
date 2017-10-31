import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from '../board/board';
import DragPiece from '../drag-piece/drag-piece';
import { touch, changeFocus, releasePiece } from '../../modules/actions/actions';
import Position from '../position/position';

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragLeft: 0,
      dragTop: 0,
    };
    BoardContainer.propTypes = {
      board: PropTypes.arrayOf(PropTypes.array).isRequired,
      turn: PropTypes.number.isRequired,
      check: PropTypes.bool.isRequired,
      checkmate: PropTypes.bool.isRequired,
      flip: PropTypes.bool.isRequired,
      focusSquare: PropTypes.arrayOf(PropTypes.number).isRequired,
      drag: PropTypes.arrayOf(PropTypes.number).isRequired,
      onTouch: PropTypes.func.isRequired,
      onRelease: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleKeyDown(event) {
    const {
      focusSquare, onTouch, onFocus, flip,
    } = this.props;
    if (event.keyCode > 36 && event.keyCode < 41) {
      const fc = flip ? -1 : 1;
      let nf = focusSquare[0];
      let nr = focusSquare[1];
      switch (event.keyCode) {
        case 37:
          nf = focusSquare[0] - fc;
          break;
        case 38:
          nr = focusSquare[1] + fc;
          break;
        case 39:
          nf = focusSquare[0] + fc;
          break;
        case 40:
          nr = focusSquare[1] - fc;
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
      const [file, rank] = focusSquare;
      onTouch(file, rank, false);
    }
  }

  handleMouseMove(event) {
    const boardRect = event.target.parentElement.getBoundingClientRect();
    const dragLeft = event.pageX - boardRect.left;
    const dragTop = event.pageY - boardRect.top;
    this.setState(state => ({
      ...state,
      dragLeft,
      dragTop,
    }));
  }

  handleMouseUp(file, rank) {
    const {
      onFocus, onRelease,
    } = this.props;
    onRelease(file, rank);
    const selector = `.square[data-file="${file}"][data-rank="${rank}"]`;
    const elemNext = document.querySelector(selector);
    if (elemNext) {
      elemNext.focus();
    }
    onFocus(file, rank);
  }

  render() {
    const {
      board, turn, check, checkmate, flip, focusSquare, drag,
      onTouch, onRelease, onFocus,
    } = this.props;
    const { dragLeft, dragTop } = this.state;
    const [dragFile, dragRank] = drag;
    const dragHidden = dragFile === undefined;
    const dragColor = !dragHidden ? board[dragFile][dragRank].piece.color : null;
    const dragType = !dragHidden ? board[dragFile][dragRank].piece.type : null;
    let className = 'board-container';
    if (flip) className += ' board-container_flipped';
    return (
      <div
        className={className}
        onKeyDown={this.handleKeyDown}
        role="toolbar"
        onMouseMove={this.handleMouseMove}
      >
        <Board
          board={board}
          turn={turn}
          check={check}
          checkmate={checkmate}
          flip={flip}
          focusSquare={focusSquare}
          onTouch={onTouch}
          onRelease={onRelease}
          onFocus={onFocus}
          onMouseUp={(file, rank) => this.handleMouseUp(file, rank)}
        />
        <Position
          board={board}
          turn={turn}
          flip={flip}
          drag={drag}
        />
        <DragPiece
          left={dragLeft}
          top={dragTop}
          hidden={dragHidden}
          color={dragColor}
          type={dragType}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board,
  focusSquare: state.focusSquare,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
