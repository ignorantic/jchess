import React from 'react';
import { connect } from 'react-redux';
import Button from '../button/button';
import { resetPosition } from '../../modules/actions/actions';

class Sidebar extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.props.dispatch(resetPosition());
  }

  render() {
    return (
      <aside className='sidebar'>
        <Button
          label='Reset'
          onClick={this.handleReset}
        />
      </aside>
    );
  }

}

export default connect()(Sidebar);
