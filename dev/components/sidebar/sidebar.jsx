import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../button/button';
import { resetPosition } from '../../modules/actions/actions';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    Sidebar.propTypes = {
      onClick: PropTypes.func.isRequired,
    };
  }

  render() {
    return (
      <aside className="sidebar">
        <Button
          label="Reset"
          onClick={this.props.onClick}
        />
      </aside>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(resetPosition()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
