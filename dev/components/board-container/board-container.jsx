import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from '../board/board';
import { touch, changeFocus, releasePiece } from '../../modules/actions/actions';
import Position from '../position/position';
import { rect, convCoord } from '../../lib/utils';

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drag: [0, 0] };
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

  handleKeyDown(event) {
    const {
      focus, flip, onTouch, onFocus,
    } = this.props;
    let [file, rank] = focus;
    const code = event.keyCode;

    function handleArrowKey() {
      const fc = flip ? -1 : 1;
      if (code % 2) file += (fc * (code - 38));
      else rank -= (fc * (code - 39));
      if (file <= 7 && file >= 0 && rank <= 7 && rank >= 0) onFocus(file, rank);
    }

    function handleEnter() {
      onTouch(file, rank, false);
    }

    if (code > 36 && code < 41) handleArrowKey();
    else if (code === 13 || code === 32) handleEnter();
  }

  handleMouseMove(event) {
    const { id } = this.props;
    const { left, top } = rect(id);
    const dl = event.pageX - left;
    const dt = event.pageY - top;
    this.setState({ drag: [dl, dt] });
  }

  handleMouseDown(event) {
    const {
      id, flip,
      onTouch, onFocus,
    } = this.props;
    const { file, rank } = convCoord(id, flip, event.pageX, event.pageY);
    onTouch(file, rank, true);
    onFocus(file, rank);
  }

  handleMouseUp(event) {
    const {
      id, flip,
      onRelease,
    } = this.props;
    const { file, rank } = convCoord(id, flip, event.pageX, event.pageY);
    onRelease(file, rank);
  }

  render() {
    const {
      id, board, turn, check, checkmate, flip, focus, drag,
    } = this.props;
    const [dragFile, dragRank] = drag;
    const [dragLeft, dragTop] = this.state.drag;
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
          focus={focus}
        />
        <Position
          board={board}
          turn={turn}
          flip={flip}
          dragFile={dragFile}
          dragRank={dragRank}
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
