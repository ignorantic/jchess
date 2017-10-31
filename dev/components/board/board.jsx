import React from 'react';
import PropTypes from 'prop-types';
import Square from '../square/square';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    Board.propTypes = {
      board: PropTypes.arrayOf(PropTypes.array).isRequired,
      turn: PropTypes.number.isRequired,
      check: PropTypes.bool.isRequired,
      checkmate: PropTypes.bool.isRequired,
      flip: PropTypes.bool.isRequired,
      focusSquare: PropTypes.arrayOf(PropTypes.number).isRequired,
      onTouch: PropTypes.func.isRequired,
      onRelease: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
      onMouseUp: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      board, turn, check, checkmate, flip, focusSquare,
      onTouch, onRelease, onFocus, onMouseUp,
    } = this.props;
    const color = turn === 1 ? 'white' : 'black';
    let className = `board board_${color}`;
    if (flip) className += ' board_flipped';
    return (
      <div
        className={className}
        onKeyDown={this.handleKeyDown}
        role="toolbar"
        onMouseMove={this.handleMouseMove}

      >
        {
          board.map((fItem, file) => (
            fItem.map((rItem, rank) => {
              let tabindex = -1;
              let checkProp;
              let checkmateProp;
              if (file === focusSquare[0] && rank === focusSquare[1]) tabindex = 0;
              if (
                board[file][rank].piece.type === 5
                && board[file][rank].piece.color === turn
              ) {
                if (checkmate) checkmateProp = true;
                else if (check) checkProp = true;
              }
              return (
                <Square
                  file={file}
                  rank={rank}
                  color={rItem.color}
                  marked={rItem.marked}
                  selected={rItem.selected}
                  key={`square.${rItem.id}`}
                  tabindex={tabindex}
                  check={checkProp}
                  checkmate={checkmateProp}
                  onTouch={onTouch}
                  onRelease={onRelease}
                  onFocus={onFocus}
                  onMouseUp={onMouseUp}
                />
              );
            })
          ))
        }
      </div>
    );
  }
}
