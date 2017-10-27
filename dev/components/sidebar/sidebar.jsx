import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../button/button';
import { setUpPosition, resetPosition, flipBoard } from '../../modules/actions/actions';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    Sidebar.propTypes = {
      onNewClick: PropTypes.func.isRequired,
      onClearClick: PropTypes.func.isRequired,
      onFlipClick: PropTypes.func.isRequired,
    };
  }

  render() {
    return (
      <aside className="sidebar">
        <Button
          key="new"
          label="New game"
          onClick={this.props.onNewClick}
        />
        <Button
          key="clear"
          label="Clear board"
          onClick={this.props.onClearClick}
        />
        <Button
          key="flip"
          label="Flip board"
          onClick={this.props.onFlipClick}
        />
      </aside>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onNewClick: () => dispatch(setUpPosition()),
  onClearClick: () => dispatch(resetPosition()),
  onFlipClick: () => dispatch(flipBoard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
