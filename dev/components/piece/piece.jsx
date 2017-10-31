import React from 'react';
import PropTypes from 'prop-types';

export default class Piece extends React.PureComponent {
  constructor(props) {
    super(props);
    Piece.propTypes = {
      color: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      position: PropTypes.shape({
        left: PropTypes.string,
        top: PropTypes.string,
      }).isRequired,
    };
  }

  render() {
    const {
      position, color, type,
    } = this.props;
    let className = 'piece';
    if (type !== null) className += ` piece_${type}_${color}`;

    return (
      <div
        className={className}
        style={position}
      />
    );
  }
}
