import React from 'react';

export default class Square extends React.Component {
  render() {
    let mc = '';
    let sc = '';
    let cc = `square square_${this.props.square.color}`;
    let pc = `square_${this.props.square.piece.type}_${this.props.square.piece.color}`;
    if (this.props.square.marked) {
      mc = ` square_marked_${this.props.square.color}`;
    }
    if (this.props.square.selected) {
      (sc = ' square_selected');
    }
    let classes = `${cc} ${pc}${mc}${sc}`;
    return (
      <div
        className = { classes }
        onClick = { () => this.props.pick(this.props.file, this.props.rank) }
      />
    );
  }

}
