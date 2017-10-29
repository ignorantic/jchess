import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
    Button.propTypes = {
      label: PropTypes.string.isRequired,
      className: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    };
    Button.defaultProps = {
      className: 'button',
    };
  }

  render() {
    const { className, onClick, label } = this.props;
    let btnClass = 'button';
    if (this.props.className) {
      btnClass = `${btnClass} ${className}`;
    }
    return (
      <button
        className={btnClass}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}

export default Button;
