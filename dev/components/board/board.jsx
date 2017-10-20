import React from 'react';
import TalSquare from '../square/square.jsx';
import { connect } from 'react-redux';

class Board extends React.PureComponent {
  render() {
    return (
      <div className="board">
        {
          this.props.board.map((fItem, file) => {
            return fItem.map((rItem, rank) => {
              return (
                <TalSquare
                  file={file}
                  rank={rank}
                  square={rItem}
                  key={file + '.' + rank}
                  dispatch={this.props.dispatch}
                />
              );
            });
          })
        }
      </div>
    );
  }
}

export default connect(state => {
  return {
    board: state.board,
  }
})(Board);
