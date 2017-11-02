import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../button/button';
import Lines from '../lines/lines';
import { setUpPosition, resetPosition, flipBoard,
  goto, gotoPrev, gotoNext, gotoStart, gotoEnd } from '../../modules/actions/actions';

class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    Sidebar.propTypes = {
      halfCount: PropTypes.number.isRequired,
      currentLine: PropTypes.number.isRequired,
      lines: PropTypes.arrayOf(PropTypes.array).isRequired,
      onNewClick: PropTypes.func.isRequired,
      onClearClick: PropTypes.func.isRequired,
      onFlipClick: PropTypes.func.isRequired,
      onGoTo: PropTypes.func.isRequired,
      onGoToPrev: PropTypes.func.isRequired,
      onGoToNext: PropTypes.func.isRequired,
      onGoToStart: PropTypes.func.isRequired,
      onGoToEnd: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      halfCount, currentLine, lines,
      onNewClick, onClearClick, onFlipClick,
      onGoTo, onGoToPrev, onGoToNext, onGoToStart, onGoToEnd,
    } = this.props;

    return (
      <aside className="sidebar">
        <Button
          key="new"
          label="New game"
          onClick={onNewClick}
        />
        <Button
          key="clear"
          label="Clear board"
          onClick={onClearClick}
        />
        <Button
          key="flip"
          label="Flip board"
          onClick={onFlipClick}
        />
        <Lines
          halfCount={halfCount}
          currentLine={currentLine}
          lines={lines}
          onGoTo={onGoTo}
          onGoToPrev={onGoToPrev}
          onGoToNext={onGoToNext}
          onGoToStart={onGoToStart}
          onGoToEnd={onGoToEnd}
        />
        <div
          className="sidebar__controls"
        >
          <Button
            label="<<"
            onClick={onGoToStart}
          />
          <Button
            label="<"
            onClick={onGoToPrev}
          />
          <Button
            label=">"
            onClick={onGoToNext}
          />
          <Button
            label=">>"
            onClick={onGoToEnd}
          />
        </div>
      </aside>
    );
  }
}

const mapStateToProps = state => ({
  halfCount: state.halfCount,
  currentLine: state.currentLine,
  lines: state.lines,
});

const mapDispatchToProps = dispatch => ({
  onNewClick: () => dispatch(setUpPosition()),
  onClearClick: () => dispatch(resetPosition()),
  onFlipClick: () => dispatch(flipBoard()),
  onGoTo: (line, move) => dispatch(goto(line, move)),
  onGoToPrev: () => dispatch(gotoPrev()),
  onGoToNext: () => dispatch(gotoNext()),
  onGoToStart: () => dispatch(gotoStart()),
  onGoToEnd: () => dispatch(gotoEnd()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
