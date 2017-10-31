import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from '../board/board';
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
      id: PropTypes.string.isRequired,
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
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  convertCoordinates(pageX, pageY) {
    const {
      id, flip,
    } = this.props;
    const { left, top, width } = document.getElementById(id).getBoundingClientRect();
    const file = flip
      ? Math.floor((width - (pageX - left)) / (width / 8))
      : Math.floor((pageX - left) / (width / 8));
    const rank = flip
      ? Math.floor((pageY - top) / (width / 8))
      : Math.floor((width - (pageY - top)) / (width / 8));
    return { file, rank };
  }

  handleKeyDown(event) {
    const {
      focus, flip, onTouch, onFocus,
    } = this.props;
    if (event.keyCode > 36 && event.keyCode < 41) {
      const fc = flip ? -1 : 1;
      let nf = focus[0];
      let nr = focus[1];
      switch (event.keyCode) {
        case 37:
          nf = focus[0] - fc;
          break;
        case 38:
          nr = focus[1] + fc;
          break;
        case 39:
          nf = focus[0] + fc;
          break;
        case 40:
          nr = focus[1] - fc;
          break;
        default:
          break;
      }
      if (nf > 7) nf = 7;
      if (nf < 0) nf = 0;
      if (nr > 7) nr = 7;
      if (nr < 0) nr = 0;
      onFocus(nf, nr);
    }
    if (event.keyCode === 13 || event.keyCode === 32) {
      const [file, rank] = focus;
      onTouch(file, rank, false);
    }
  }

  handleMouseMove(event) {
    const { left, top } = document.getElementById(this.props.id).getBoundingClientRect();
    const dragLeft = event.pageX - left;
    const dragTop = event.pageY - top;
    this.setState(state => ({
      ...state,
      dragLeft,
      dragTop,
    }));
  }

  handleMouseDown(event) {
    const {
      onTouch, onFocus,
    } = this.props;
    const { file, rank } = this.convertCoordinates(event.pageX, event.pageY);
    onTouch(file, rank, true);
    onFocus(file, rank);
  }

  handleMouseUp(event) {
    const {
      onRelease,
    } = this.props;
    const { file, rank } = this.convertCoordinates(event.pageX, event.pageY);
    onRelease(file, rank);
  }

  render() {
    const {
      id, board, turn, check, checkmate, flip, focus, drag,
    } = this.props;
    const { dragLeft, dragTop } = this.state;
    let className = 'board-container';
    if (flip) className += ' board-container_flipped';
    return (
      <div
        id={id}
        className={className}
        onKeyDown={this.handleKeyDown}
        role="toolbar"
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <Board
          board={board}
          turn={turn}
          check={check}
          checkmate={checkmate}
          flip={flip}
          focus={focus}
          drad={drag}
        />
        <Position
          board={board}
          turn={turn}
          flip={flip}
          drag={drag}
          dragLeft={dragLeft}
          dragTop={dragTop}
        />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
