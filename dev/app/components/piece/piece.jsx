import React from 'react';
import PropTypes from 'prop-types';
import './piece.scss';

export default class Piece extends React.PureComponent {
  constructor(props) {
    super(props);
    Piece.propTypes = {
      color: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      style: PropTypes.shape({
        left: PropTypes.string,
        top: PropTypes.string,
        cursor: PropTypes.string,
        transitionProperty: PropTypes.string,
        zIndex: PropTypes.number,
      }).isRequired,
    };
  }

  render() {
    const {
      style, color, type,
    } = this.props;
    let className = 'piece';
    if (type !== null) className += ` piece_${color} piece_${type}_${color}`;

    return (
      <div
        className={className}
        style={style}
      />
    );
  }
}
