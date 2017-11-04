import React from 'react';
import PropTypes from 'prop-types';
import Move from '../move/move';
import './lines.scss';

export default class Lines extends React.Component {
  constructor(props) {
    super(props);
    Lines.propTypes = {
      halfCount: PropTypes.number.isRequired,
      currentLine: PropTypes.number.isRequired,
      lines: PropTypes.arrayOf(PropTypes.array).isRequired,
      onGoTo: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      halfCount, currentLine, lines,
      onGoTo,
    } = this.props;
    const content = () => {
      const result = lines[currentLine].map((item, index) => {
        if (index === 0) return null;
        const active = index === halfCount;
        return (
          <Move
            key={`move.${currentLine}.${index - 1}.${item.move}`}
            index={index}
            item={item}
            currentLine={currentLine}
            active={active}
            onGoTo={onGoTo}
          />
        );
      });
      return result.length > 1 ? result : <p className="move move_white">...</p>;
    };
    return (
      <div
        className="lines"
      >
        <div
          className="lines__moves"
        >
          {content()}
        </div>
      </div>
    );
  }
}
