import React from 'react';
import PropTypes from 'prop-types';

export default class Square extends React.PureComponent {
  constructor(props) {
    super(props);
    Square.propTypes = {
      file: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
      color: PropTypes.number.isRequired,
      pieceColor: PropTypes.number.isRequired,
      pieceType: PropTypes.number.isRequired,
      marked: PropTypes.bool.isRequired,
      selected: PropTypes.bool.isRequired,
      tabindex: PropTypes.number.isRequired,
      onPick: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      file, rank, color, pieceColor, pieceType, marked, selected, tabindex, onPick,
    } = this.props;
    const squareColor = color === 1 ? 'white' : 'black';
    const pclr = pieceColor === 1 ? 'white' : 'black';
    const pieces = {
      0: 'pawn', 1: 'rook', 2: 'knight', 3: 'bishop', 4: 'queen', 5: 'king',
    };
    const ptp = pieces[pieceType];
    let className = `square square_${squareColor}`;
    if (pieceType !== null) className += ` square_${ptp}_${pclr}`;
    if (marked) className += ` square_marked_${squareColor}`;
    if (selected) className += ' square_selected';

    return (
      <button
        tabIndex={tabindex}
        className={className}
        data-file={file}
        data-rank={rank}
        onMouseDown={() => onPick(file, rank)}
      />
    );
  }
}
