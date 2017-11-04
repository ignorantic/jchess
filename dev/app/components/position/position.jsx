import React from 'react';
import PropTypes from 'prop-types';
import Piece from '../piece/piece';
import './position.scss';

export default class Position extends React.Component {
  constructor(props) {
    super(props);
    Position.propTypes = {
      board: PropTypes.arrayOf(PropTypes.array).isRequired,
      flip: PropTypes.bool.isRequired,
      dragFile: PropTypes.number.isRequired,
      dragRank: PropTypes.number.isRequired,
      dragLeft: PropTypes.number.isRequired,
      dragTop: PropTypes.number.isRequired,
    };
  }

  render() {
    const {
      board, flip,
      dragFile, dragRank,
      dragLeft, dragTop,
    } = this.props;
    let className = 'position';
    if (flip) className += ' position_flipped';
    return (
      <div
        className={className}
      >
        {
          board.map((fItem, file) => (
            fItem.map((rItem, rank) => {
              const pieceColor = rItem.piece.color === 1 ? 'white' : 'black';
              const pieces = {
                0: 'pawn', 1: 'rook', 2: 'knight', 3: 'bishop', 4: 'queen', 5: 'king',
              };
              const pieceType = pieces[rItem.piece.type] || null;
              const style = (file === dragFile && rank === dragRank)
                ? ({
                  left: flip ? `calc(100% - ${dragLeft}px - 6.25%)`
                    : `calc(${dragLeft}px - 6.25%)`,
                  top: flip ? `calc(100% - ${dragTop}px - 6.25%)`
                    : `calc(${dragTop}px - 6.25%)`,
                  cursor: 'move',
                  transitionProperty: 'none',
                  zIndex: 100,
                })
                : { left: `${12.5 * file}%`, top: `${100 - (12.5 * (rank + 1))}%` };
              const key = `piece.${file}.${rank}`;
              return (
                <Piece
                  color={pieceColor}
                  type={pieceType}
                  key={key}
                  style={style}
                />
              );
            })
          ))
        }
      </div>
    );
  }
}
