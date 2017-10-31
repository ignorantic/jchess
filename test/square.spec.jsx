import React from 'react';
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Square from '../dev/components/square/square';

Enzyme.configure({ adapter: new Adapter() });

describe('<Square />', () => {
  describe('white rook on white square', () => {
    let wrapper;
    const onTouch = sinon.spy();
    const onFocus = sinon.spy();
    const onRelease = sinon.spy();

    before(() => {
      const color = 1;
      const pieceColor = 1;
      const pieceType = 1;
      wrapper = shallow(<Square
        file={4}
        rank={3}
        color={color}
        pieceColor={pieceColor}
        pieceType={pieceType}
        marked={false}
        selected={false}
        key="0.1"
        tabindex={0}
        onTouch={onTouch}
        onFocus={onFocus}
        onRelease={onRelease}
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

    it('renders an ".square_rook_white"', () => {
      expect(wrapper.find('.square_rook_white')).to.have.length(1);
    });

    it('don\'t renders an ".square_rook"', () => {
      expect(wrapper.find('.square_rook')).to.have.length(0);
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

    before(() => {
      const color = 2;
      const pieceColor = 2;
      const pieceType = 4;
      wrapper = shallow(<Square
        file={4}
        rank={3}
        color={color}
        pieceColor={pieceColor}
        pieceType={pieceType}
        marked={false}
        selected={false}
        key="4.3"
        tabindex={0}
        onTouch={onTouch}
        onFocus={onFocus}
        onRelease={onRelease}
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

    it('renders an ".square_queen_black"', () => {
      expect(wrapper.find('.square_queen_black')).to.have.length(1);
    });

    it('don\'t renders an ".square_queen_white"', () => {
      expect(wrapper.find('.square_queen_white')).to.have.length(0);
    });

    it('simulates click events', () => {
      wrapper.find('.square').simulate('mousedown');
      expect(onTouch).to.have.property('callCount', 1);
    });
  });
});
