import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../button/button';
import { changeFEN } from '../../modules/actions/actions';

class FEN extends React.Component {
  static setCaretPosition(pos) {
    const elemFEN = document.querySelector('#fen');
    elemFEN.setSelectionRange(pos, pos);
  }

  static getCaretPosition() {
    const elemFEN = document.querySelector('#fen');
    if (elemFEN) {
      if (elemFEN.createRange) {
        const range = document.selection.createRange.duplicate();
        range.moveStart('character', -elemFEN.value.length);
        return range.text.length;
      }
      return elemFEN.selectionStart;
    }
    return 0;
  }

  constructor(props) {
    super(props);
    FEN.propTypes = {
      fen: PropTypes.string.isRequired,
      onInput: PropTypes.func.isRequired,
    };
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
    this.setState({
      value: nextProps.fen,
    });
  }

  componentDidUpdate() {
    this.constructor.setCaretPosition(this.state.caretPos);
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.props.onInput(this.state.value);
      this.setState({
        value: this.props.fen,
      });
    }
  }

  handleClickOnButton() {
    this.props.onInput(this.state.value);
    this.setState({
      value: this.props.fen,
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      caretPos: this.constructor.getCaretPosition(),
    });
  }

  render() {
    return (
      <div
        className="fen"
      >
        <label
          className="fen__label"
          htmlFor="fen"
        >
          {this.label}
          <input
            className="fen__input"
            id="fen"
            type="text"
            spellCheck="false"
            value={this.state.value}
            autoComplete="off"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
          />
        </label>
        <Button
          className="button button_fen"
          label=">>"
          onClick={this.handleClickOnButton}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fen: state.fen,
});

const mapDispatchToProps = dispatch => ({
  onInput: fen => dispatch(changeFEN(fen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FEN);
