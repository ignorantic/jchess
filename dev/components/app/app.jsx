import React from 'react';
import { Provider } from 'react-redux';
import store from '../../modules/stores/store';
import Board from '../board/board';
import Sidebar from '../sidebar/sidebar';
import FEN from '../fen/fen';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
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
