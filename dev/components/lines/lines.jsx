import React from 'react';
import PropTypes from 'prop-types';
import Move from '../move/move';

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
    return (
      <div
        className="lines"
      >
        <div
          className="lines__moves"
        >
          {
            lines[currentLine].map((item, index) => {
              if (index === 0) return false;
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
            })
          }
        </div>
      </div>
    );
  }
}

