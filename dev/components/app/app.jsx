import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import BoardContainer from '../board-container/board-container';
import Sidebar from '../sidebar/sidebar';
import FEN from '../fen/fen';
import Turn from '../turn/turn';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    App.propTypes = {
      store: PropTypes.shape({
        board: PropTypes.array,
        fen: PropTypes.string,
        turn: PropTypes.number,
        check: PropTypes.bool,
        checkmate: PropTypes.bool,
        flip: PropTypes.bool,
        focus: PropTypes.array,
        drag: PropTypes.array,
      }).isRequired,
    };
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <div className="container">
          <Turn />
          <div className="content">
            <BoardContainer id="board" />
            <FEN />
          </div>
          <Sidebar />
        </div>
      </Provider>
    );
  }
}
