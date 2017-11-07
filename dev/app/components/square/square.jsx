import React from 'react';
import PropTypes from 'prop-types';
import './square.scss';

export default class Square extends React.PureComponent {
  constructor(props) {
    super(props);
    Square.propTypes = {
      file: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      style: PropTypes.shape({
        left: PropTypes.string,
        top: PropTypes.string,
      }).isRequired,
      marked: PropTypes.bool.isRequired,
      selected: PropTypes.bool.isRequired,
      focused: PropTypes.bool.isRequired,
      check: PropTypes.bool,
      checkmate: PropTypes.bool,
    };
    Square.defaultProps = {
      check: false,
      checkmate: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focused === true) {
      this.node.focus();
    }
  }

  render() {
    const {
      file, rank, color, style, marked, selected, check, checkmate, focused,
    } = this.props;
    const tabindex = focused ? 0 : -1;
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
        style={style}
        ref={(node) => { this.node = node; }}
      />
    );
  }
}
