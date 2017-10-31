import React from 'react';
import PropTypes from 'prop-types';

export default class Square extends React.PureComponent {
  constructor(props) {
    super(props);
    Square.propTypes = {
      file: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      position: PropTypes.shape({
        left: PropTypes.string,
        top: PropTypes.string,
      }).isRequired,
      marked: PropTypes.bool.isRequired,
      selected: PropTypes.bool.isRequired,
      tabindex: PropTypes.number.isRequired,
      check: PropTypes.bool,
      checkmate: PropTypes.bool,
    };
    Square.defaultProps = {
      check: false,
      checkmate: false,
    };
  }

  render() {
    const {
      file, rank, color, position, marked, selected, check, checkmate, tabindex,
    } = this.props;
    let className = `square square_${color}`;
    if (marked) className += ` square_marked_${color}`;
    if (selected) className += ' square_selected';
    if (check) className += ' square_check';
    if (checkmate) className += ' square_checkmate';

    return (
      <button
        tabIndex={tabindex}
        className={className}
        data-file={file}
        data-rank={rank}
        style={position}
      />
    );
  }
}
