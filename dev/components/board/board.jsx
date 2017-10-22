import React from 'react';
import { connect } from 'react-redux';
import TalSquare from '../square/square';
import { pickOnSquare } from '../../modules/actions/actions';

class Board extends React.PureComponent {
  render() {
    return (
      <div className="board">
        {
          this.props.board.map((fItem, file) => {
            return fItem.map((rItem, rank) => {
              return (
                <TalSquare
                  file = { file }
                  rank = { rank }
                  square = { rItem }
                  key = { file + '.' + rank }
                  pick = { this.props.pick }
                />
              );
            });
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.board,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pick: (file, rank) => dispatch(pickOnSquare(file, rank)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
