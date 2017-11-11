import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/button/button';
import { changeFEN } from '../../actions/actions';
import './fen.scss';

class FEN extends React.PureComponent {
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
      FEN: PropTypes.string.isRequired,
      onInput: PropTypes.func.isRequired,
    };
    this.state = {
      value: this.props.FEN,
      caretPos: 0,
    };
    this.handleClickOnButton = this.handleClickOnButton.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.FEN,
    });
  }

  componentDidUpdate() {
    this.constructor.setCaretPosition(this.state.caretPos);
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.props.onInput(this.state.value);
      this.setState({
        value: this.props.FEN,
      });
    }
  }

  handleClickOnButton() {
    this.props.onInput(this.state.value);
    this.setState({
      value: this.props.FEN,
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
  FEN: state.game.FEN,
});

const mapDispatchToProps = dispatch => ({
  onInput: fen => dispatch(changeFEN(fen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FEN);
