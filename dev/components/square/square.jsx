import keyMirror from '../../modules/constants/keys';
import React from 'react';

export default class Square extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch({
      type: keyMirror.PICK_ON_SQUARE,
      file: this.props.file,
      rank: this.props.rank,
    });
  }

  render() {
    let markedClass = '',
      selectedClass = '';
    if (this.props.square.marked) {
      (markedClass = ' square_marked_' + this.props.square.color);
    }
    if (this.props.square.selected) {
      (selectedClass = ' square_selected');
    }
    let squareClass = 'square square_' + this.props.square.color +
      ' square_' + this.props.square.piece.type +
      '_' + this.props.square.piece.color + markedClass + selectedClass;
    return (
      <div
        className={squareClass}
        onClick={this.handleClick}
      />
    );
  }

}
