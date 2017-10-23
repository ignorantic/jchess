import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Square from '../square/square';
import { pickOnSquare } from '../../modules/actions/actions';

class Board extends React.Component {
  constructor(props) {
    super(props);
    Board.propTypes = {
      board: PropTypes.arrayOf(PropTypes.array).isRequired,
      onPick: PropTypes.func.isRequired,
    };
  }

  render() {
    const { board, onPick } = this.props;
    return (
      <div className="board">
        {
          board.map((fItem, file) => (
            fItem.map((rItem, rank) => (
              <Square
                file={file}
                rank={rank}
                square={rItem}
                key={rItem.id}
                onPick={onPick}
              />
            ))
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board,
});

const mapDispatchToProps = dispatch => ({
  onPick: (file, rank) => dispatch(pickOnSquare(file, rank)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
