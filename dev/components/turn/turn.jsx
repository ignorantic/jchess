import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Turn extends React.PureComponent {
  constructor(props) {
    super(props);
    Turn.propTypes = {
      turn: PropTypes.string.isRequired,
      flip: PropTypes.bool.isRequired,
    };
  }

  render() {
    const { turn, flip } = this.props;
    const color = turn === 1 ? 'white' : 'black';
    let className = `turn turn_${color}`;
    if (flip) className += ' turn_flipped';
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
