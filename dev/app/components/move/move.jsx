import React from 'react';
import PropTypes from 'prop-types';
import './move.scss';

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

  componentDidMount() {
    this.node.scrollIntoView(false);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.active === true) {
      const {
        top: thisTop,
        bottom: thisBottom,
      } = this.node.getBoundingClientRect();
      const {
        top: containerTop,
        bottom: containerBottom,
      } = this.node.parentElement.parentElement.getBoundingClientRect();
      if (thisTop < containerTop) this.node.scrollIntoView(true);
      if (thisBottom > containerBottom) this.node.scrollIntoView(false);
    }
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
        ref={(node) => { this.node = node; }}
        onClick={() => onGoTo(currentLine, index)}
      >
        <span>
          {item.fan}
        </span>
      </button>
    );
  }
}

