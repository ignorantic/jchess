import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Board from '../board/board';
import Sidebar from '../sidebar/sidebar';
import FEN from '../fen/fen';
import Turn from '../turn/turn';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    App.propTypes = {
      store: PropTypes.shape({
        board: PropTypes.array,
        fen: PropTypes.string,
      }).isRequired,
    };
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <div className="container">
          <Turn />
          <div className="content">
            <Board />
            <FEN />
          </div>
          <Sidebar />
        </div>
      </Provider>
    );
  }
}
