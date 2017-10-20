import React from 'react';
import { Provider } from 'react-redux';
import store from '../../modules/stores/store';
import TalBoard from '../board/board.jsx';
import TalSidebar from '../sidebar/sidebar.jsx';
import TalFEN from '../fen/fen.jsx';

export default class Tal extends React.PureComponent {
  render() {
    return (
      <Provider store = { store }>
        <div className="container">
          <div className="content">
            <TalBoard />
            <TalFEN />
          </div>
          <TalSidebar />
        </div>
      </Provider>
    );
  }
}
