import React from 'react';
import PropTypes from 'prop-types';

export default class Move extends React.Component {
  constructor(props) {
    super(props);
    Move.propTypes = {
      index: PropTypes.number.isRequired,
      currentLine: PropTypes.number.isRequired,
      item: PropTypes.shape({
        move: PropTypes.string.isRequired,
        fen: PropTypes.string.isRequired,
      }).isRequired,
      active: PropTypes.bool.isRequired,
      onGoTo: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      index, currentLine, item, active, onGoTo,
    } = this.props;
    const color = index % 2 ? 'white' : 'black';
    let className = `move move_${color}`;
    if (active) className += ' move_active';
    return (
      <button
        className={className}
        data-index={index}
        onClick={() => onGoTo(currentLine, index)}
      >
        <span>
          {item.move}
        </span>
      </button>
    );
  }
}

