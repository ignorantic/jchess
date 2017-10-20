import React from 'react';
import keyMirror from '../../modules/constants/keys';
import TalButton from '../button/button.jsx';
import { connect } from 'react-redux';

class Sidebar extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.props.dispatch({
      type: keyMirror.RESET_POSITION,
    });
  }

  render() {
    return (
      <aside className='sidebar'>
        <TalButton
          label='Reset'
          onClick={this.handleReset}
        />
      </aside>
    );
  }

}

export default connect()(Sidebar);
