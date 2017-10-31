import React from 'react';
import PropTypes from 'prop-types';
import Piece from '../piece/piece';

export default class Position extends React.Component {
  constructor(props) {
    super(props);
    Position.propTypes = {
      board: PropTypes.arrayOf(PropTypes.array).isRequired,
      flip: PropTypes.bool.isRequired,
      drag: PropTypes.arrayOf(PropTypes.number).isRequired,
    };
  }

  render() {
    const {
      board, flip, drag,
    } = this.props;
    const [dragFile, dragRank] = drag;
    const dragHidden = dragFile === undefined;
    let className = 'position';
    if (flip) className += ' position_flipped';
    if (!dragHidden) className += ' position_drag';
    return (
      <div
        className={className}
      >
        {
          board.map((fItem, file) => (
            fItem.map((rItem, rank) => {
              let pieceColor = null;
              let pieceType = null;
              if (!(file === dragFile && rank === dragRank)) {
                pieceColor = rItem.piece.color;
                pieceType = rItem.piece.type;
              }
              return (
                <Piece
                  color={pieceColor}
                  type={pieceType}
                  key={`piece.${rItem.id}`}
                />
              );
            })
          ))
        }
      </div>
    );
  }
}
