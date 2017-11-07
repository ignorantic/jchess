import React from 'react';
import PropTypes from 'prop-types';
import Square from '../square/square';
import './board.scss';

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
    const className = 'board';
    return (
      <div
        className={className}
        role="toolbar"
      >
        {
          board.map((fItem, file) => (
            fItem.map((rItem, rank) => {
              let checkProp;
              let checkmateProp;

              const clr = rItem.color === 1 ? 'white' : 'black';
              const isFocused = file === focus[0] && rank === focus[1];

              if (
                board[file][rank].piece.type === 5
                && board[file][rank].piece.color === turn
              ) {
                if (checkmate) checkmateProp = true;
                else if (check) checkProp = true;
              }

              const style = { left: `${12.5 * file}%`, top: `${100 - (12.5 * (rank + 1))}%` };
              const key = `square.${file}.${rank}`;
              return (
                <Square
                  file={file}
                  rank={rank}
                  color={clr}
                  marked={rItem.marked}
                  selected={rItem.selected}
                  key={key}
                  check={checkProp}
                  checkmate={checkmateProp}
                  style={style}
                  focused={isFocused}
                />
              );
            })
          ))
        }
      </div>
    );
  }
}
