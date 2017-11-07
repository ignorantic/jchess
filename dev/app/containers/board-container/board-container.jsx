import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from '../../components/board/board';
import Turn from '../../components/turn/turn';
import Position from '../../components/position/position';
import { select, move, releasePiece, changeFocus, switchTurn } from '../../actions/actions';
import { rect, convCoord } from '../../lib/helpers';
import './board-container.scss';

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drag: [0, 0] };
    BoardContainer.propTypes = {
      id: PropTypes.string.isRequired,
      game: PropTypes.shape({
        board: PropTypes.arrayOf(PropTypes.array),
        halfCount: PropTypes.number,
        turn: PropTypes.number,
        check: PropTypes.bool,
        checkmate: PropTypes.bool,
      }).isRequired,
      ui: PropTypes.shape({
        flip: PropTypes.bool,
        focus: PropTypes.arrayOf(PropTypes.number),
        focused: PropTypes.bool,
        drag: PropTypes.arrayOf(PropTypes.number),
      }).isRequired,
      engine: PropTypes.shape({
        status: PropTypes.string,
      }).isRequired,
      onMove: PropTypes.func.isRequired,
      onSelect: PropTypes.func.isRequired,
      onRelease: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
      onSwitchTurn: PropTypes.func.isRequired,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game.turn !== this.props.game.turn) this.props.onSwitchTurn();
  }

  handleArrowKey(code) {
    const {
      ui: {
        focus, flip,
      }, onFocus,
    } = this.props;
    let [file, rank] = focus;
    const fc = flip ? -1 : 1;
    if (code % 2) file += (fc * (code - 38));
    else rank -= (fc * (code - 39));
    if (file <= 7 && file >= 0 && rank <= 7 && rank >= 0) onFocus(file, rank);
  }

  handleKeyDown(event) {
    const {
      game: { board }, ui: { focus: [file, rank] }, onSelect, onMove, onFocus,
    } = this.props;
    const code = event.keyCode;

    if (code > 36 && code < 41) this.handleArrowKey(code);
    else if (code === 13 || code === 32) {
      if (board[file][rank].marked === true) {
        onMove(file, rank);
        onFocus(file, rank);
      } else {
        onSelect(file, rank, false);
      }
    }
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
      id,
      game: { board },
      ui: { flip },
      onMove, onSelect, onFocus,
    } = this.props;
    const { file, rank } = convCoord(id, flip, event.pageX, event.pageY);
    if (board[file][rank].marked === true) {
      onMove(file, rank);
      onFocus(file, rank);
    } else {
      onSelect(file, rank, true);
    }
    onFocus(file, rank);
  }

  handleMouseUp(event) {
    const {
      id, ui: { flip },
      onRelease,
    } = this.props;
    const { file, rank } = convCoord(id, flip, event.pageX, event.pageY);
    onRelease(file, rank);
  }

  handleMouseLeave(event) {
    const {
      id, ui: { flip, drag },
      onRelease,
    } = this.props;
    if (drag !== null) {
      const { file, rank } = convCoord(id, flip, event.pageX, event.pageY);
      onRelease(file, rank);
    }
  }

  render() {
    const {
      id,
      game: {
        board, halfCount, turn, check, checkmate,
      },
      ui: {
        flip, focus, focused, drag,
      },
      engine: { status },
    } = this.props;
    let dragFile;
    let dragRank;
    if (drag) [dragFile, dragRank] = drag;
    const [dragLeft, dragTop] = this.state.drag;
    let className = 'board-container';
    if (flip) className += ' board-container_flipped';
    const color = turn === 1 ? 'white' : 'black';
    className += ` board-container_${color}`;
    return (
      <div
        id={id}
        className={className}
        onKeyDown={this.handleKeyDown}
        role="toolbar"
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
      >
        <Turn
          turn={turn}
          flip={flip}
        />
        <Board
          board={board}
          turn={turn}
          check={check}
          checkmate={checkmate}
          focus={focus}
          focused={focused}
        />
        <Position
          status={status}
          board={board}
          turn={turn}
          flip={flip}
          dragFile={dragFile}
          dragRank={dragRank}
          dragLeft={dragLeft}
          dragTop={dragTop}
          halfCount={halfCount}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
  ui: state.ui,
  engine: state.engine,
});

const mapDispatchToProps = dispatch => ({
  onMove: (file, rank) => dispatch(move(file, rank)),
  onSelect: (file, rank, mouse) => dispatch(select(file, rank, mouse)),
  onRelease: (file, rank) => dispatch(releasePiece(file, rank)),
  onFocus: (file, rank) => dispatch(changeFocus(file, rank)),
  onSwitchTurn: () => dispatch(switchTurn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
