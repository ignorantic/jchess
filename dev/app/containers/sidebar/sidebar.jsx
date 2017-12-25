import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/button/button';
import Movelist from '../../components/movelist/movelist';
import { flipBoard, toggleWhite, toggleBlack, setUpPosition, resetPosition, goto,
  gotoPrev, gotoNext, gotoStart, gotoEnd } from '../../actions/actions';
import './sidebar.scss';

class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    Sidebar.propTypes = {
      game: PropTypes.shape({
        halfCount: PropTypes.number,
        currentLine: PropTypes.number,
        prevFen: PropTypes.string,
        lastMove: PropTypes.string,
        lines: PropTypes.arrayOf(PropTypes.array),
      }).isRequired,
      whitePlayer: PropTypes.bool.isRequired,
      blackPlayer: PropTypes.bool.isRequired,
      engineStatus: PropTypes.string.isRequired,
      onNewClick: PropTypes.func.isRequired,
      onClearClick: PropTypes.func.isRequired,
      onFlipClick: PropTypes.func.isRequired,
      onGoTo: PropTypes.func.isRequired,
      onGoToPrev: PropTypes.func.isRequired,
      onGoToNext: PropTypes.func.isRequired,
      onGoToStart: PropTypes.func.isRequired,
      onGoToEnd: PropTypes.func.isRequired,
      onToggleWhite: PropTypes.func.isRequired,
      onToggleBlack: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      game, whitePlayer, blackPlayer, engineStatus,
      onNewClick, onClearClick, onFlipClick,
      onGoTo, onGoToPrev, onGoToNext, onGoToStart, onGoToEnd,
      onToggleWhite, onToggleBlack,
    } = this.props;
    const {
      halfCount, currentLine, lines, turn,
    } = game;
    const color = turn === 1 ? 'white' : 'black';
    const classNameSidebar = `sidebar sidebar_${engineStatus} sidebar_${color}`;
    const whiteToggle = whitePlayer ? 'engine' : 'human';
    const blackToggle = blackPlayer ? 'engine' : 'human';
    const classNameWhite = `sidebar__players_white sidebar__players_${whiteToggle}`;
    const classNameBlack = `sidebar__players_black sidebar__players_${blackToggle}`;

    return (
      <aside className={classNameSidebar}>
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
        <div className="sidebar__players">
          <Button
            className={classNameWhite}
            key="white"
            label={whiteToggle}
            onClick={onToggleWhite}
          />
          <Button
            className={classNameBlack}
            key="black"
            label={blackToggle}
            onClick={onToggleBlack}
          />
        </div>
        <Movelist
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
  game: state.game,
  whitePlayer: state.engine.play[1],
  blackPlayer: state.engine.play[2],
  engineStatus: state.engine.status,
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
  onToggleWhite: () => dispatch(toggleWhite()),
  onToggleBlack: () => dispatch(toggleBlack()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
