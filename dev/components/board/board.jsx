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
      focus: PropTypes.arrayOf(PropTypes.number).isRequired,
    };
  }

  render() {
    const {
      board, turn, check, checkmate, focus,
    } = this.props;
    const color = turn === 1 ? 'white' : 'black';
    const className = `board board_${color}`;
    return (
      <div
        className={className}
        role="toolbar"
      >
        {
          board.map((fItem, file) => (
            fItem.map((rItem, rank) => {
              let tabindex = -1;
              let checkProp;
              let checkmateProp;

              const clr = rItem.color === 1 ? 'white' : 'black';
              if (file === focus[0] && rank === focus[1]) tabindex = 0;

              if (
                board[file][rank].piece.type === 5
                && board[file][rank].piece.color === turn
              ) {
                if (checkmate) checkmateProp = true;
                else if (check) checkProp = true;
              }

              const position = { left: `${12.5 * file}%`, top: `${100 - (12.5 * (rank + 1))}%` };
              const key = `square.${file}.${rank}`;
              return (
                <Square
                  file={file}
                  rank={rank}
                  color={clr}
                  marked={rItem.marked}
                  selected={rItem.selected}
                  key={key}
                  tabindex={tabindex}
                  check={checkProp}
                  checkmate={checkmateProp}
                  position={position}
                />
              );
            })
          ))
        }
      </div>
    );
  }
}
