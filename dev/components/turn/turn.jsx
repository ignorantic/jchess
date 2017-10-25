import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Turn extends React.Component {
  constructor(props) {
    super(props);
    Turn.propTypes = {
      turn: PropTypes.string.isRequired,
    };
  }

  render() {
    const { turn } = this.props;
    return (
      <div className="turn-container">
        <div className={`turn turn_${turn}`} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  turn: state.turn,
});

export default connect(mapStateToProps, {})(Turn);
