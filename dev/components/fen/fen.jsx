import React from 'react';
import TalButton from '../button/button.jsx';
import keyMirror from '../../modules/constants/keys';
import { connect } from 'react-redux';

class FEN extends React.PureComponent {
  constructor(props) {
    super(props);
    this.label = 'FEN';
    this.state = {
      value: this.props.fen,
      caretPos: 0,
    };
    this.handleClickOnButton = this.handleClickOnButton.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fen !== this.state.value) {
      this.setState({
        value: nextProps.fen
      });
    }
  }

  componentDidUpdate() {
    this.setCaretPosition(this.state.caretPos);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      caretPos: this.getCaretPosition()
    });
  }

  handleClickOnButton() {
    this.props.dispatch({
      type: keyMirror.CHANGE_FEN,
      fen: this.state.value,
    });
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.props.dispatch({
        type: keyMirror.CHANGE_FEN,
        fen: this.state.value,
      });
    }
  }

  getCaretPosition() {
    let elemFEN = document.querySelector('#fen');
    if (elemFEN) {
      if (elemFEN.createRange) {
        let range = document.selection.createRange.duplicate();
        range.moveStart('character', -elemFEN.value.length);
        return range.text.length;
      }
      return elemFEN.selectionStart;
    }
    return 0;
  }

  setCaretPosition(pos) {
    let elemFEN = document.querySelector('#fen');
    elemFEN.setSelectionRange(pos, pos);
  }

  render() {
    return (
      <div
        className='fen'>
        <label
          className='fen__label'
          htmlFor='fen'>
          {this.label}
        </label>
        <input
          className='fen__input'
          id='fen'
          type='text'
          spellCheck='false'
          value={this.state.value}
          autoComplete='off'
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
        />
        <TalButton
          className='button_fen'
          label='>>'
          onClick={this.handleClickOnButton}
        />
      </div>
    );
  }
}

export default connect(state => {
  return {
    fen: state.fen,
  }
})(FEN);
