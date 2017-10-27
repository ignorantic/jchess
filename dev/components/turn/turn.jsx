import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Turn extends React.Component {
  constructor(props) {
    super(props);
    Turn.propTypes = {
      turn: PropTypes.string.isRequired,
      flip: PropTypes.bool.isRequired,
    };
  }

  render() {
    const { turn, flip } = this.props;
    let fc = '';
    if (flip) fc = ' turn_flipped';
    const className = `turn turn_${turn}${fc}`;
    return (
      <div className={className} />
    );
  }
}

const mapStateToProps = state => ({
  turn: state.turn,
  flip: state.flip,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Turn);
