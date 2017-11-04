import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import BoardContainer from './containers/board-container/board-container';
import Sidebar from './containers/sidebar/sidebar';
import FEN from './containers/fen/fen';
import './app.scss';

const store = configureStore();


const App = () => (
  <Provider store={store}>
    <div className="container">
      <div className="content">
        <BoardContainer id="board" />
        <FEN />
      </div>
      <Sidebar />
    </div>
  </Provider>
);

export default App;
