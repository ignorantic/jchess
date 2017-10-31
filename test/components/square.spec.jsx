import React from 'react';
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Square from '../../dev/components/square/square';

Enzyme.configure({ adapter: new Adapter() });

describe('<Square />', () => {
  describe('white rook on white square', () => {
    let wrapper;
    const onTouch = sinon.spy();
    const onFocus = sinon.spy();
    const onRelease = sinon.spy();
    const onMouseUp = sinon.spy();

    before(() => {
      const file = 4;
      const rank = 3;
      const color = 1;
      const clr = color === 1 ? 'white' : 'black';
      const key = `square.${file}.${rank}`;
      const position = { left: `${12.5 * file}%`, top: `${100 - (12.5 * (rank + 1))}%` };
      wrapper = shallow(<Square
        file={4}
        rank={3}
        color={clr}
        marked={false}
        selected={false}
        key={key}
        tabindex={0}
        check={false}
        checkmate={false}
        position={position}
        onTouch={onTouch}
        onFocus={onFocus}
        onRelease={onRelease}
        onMouseUp={onMouseUp}
      />);
    });

    it('renders an ".square"', () => {
      expect(wrapper.find('.square')).to.have.length(1);
    });

    it('renders an ".square_white"', () => {
      expect(wrapper.find('.square_white')).to.have.length(1);
    });

    it('don\'t renders an ".square_black"', () => {
      expect(wrapper.find('.square_black')).to.have.length(0);
    });

    it('simulates click events', () => {
      wrapper.find('.square').simulate('mousedown');
      expect(onTouch).to.have.property('callCount', 1);
    });
  });

  describe('black queen on black square', () => {
    let wrapper;
    const onTouch = sinon.spy();
    const onFocus = sinon.spy();
    const onRelease = sinon.spy();
    const onMouseUp = sinon.spy();

    before(() => {
      const file = 4;
      const rank = 3;
      const color = 2;
      const clr = color === 1 ? 'white' : 'black';
      const key = `square.${file}.${rank}`;
      const position = { left: `${12.5 * file}%`, top: `${100 - (12.5 * (rank + 1))}%` };
      wrapper = shallow(<Square
        file={4}
        rank={3}
        color={clr}
        marked={false}
        selected={false}
        key={key}
        tabindex={0}
        check={false}
        checkmate={false}
        position={position}
        onTouch={onTouch}
        onFocus={onFocus}
        onRelease={onRelease}
        onMouseUp={onMouseUp}
      />);
    });

    it('renders an ".square"', () => {
      expect(wrapper.find('.square')).to.have.length(1);
    });

    it('renders an ".square_black"', () => {
      expect(wrapper.find('.square_black')).to.have.length(1);
    });

    it('don\'t renders an ".square_white"', () => {
      expect(wrapper.find('.square_white')).to.have.length(0);
    });

    it('simulates click events', () => {
      wrapper.find('.square').simulate('mousedown');
      expect(onTouch).to.have.property('callCount', 1);
    });
  });
});
