/* eslint-disable no-unused-expressions */
import React from 'react';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Board from '../dev/components/board/board';
import store from '../dev/modules/stores/store';

Enzyme.configure({ adapter: new Adapter() });

describe('<Board />', () => {
  describe('state', () => {
    it('initial state', () => {
      const mapStateToProps = state => ({
        state,
      });
      const mapDispatchToProps = dispatch => ({
        onPick: () => dispatch(() => {}),
        onFocus: () => dispatch(() => {}),
      });
      const ConnectedBoard = connect(mapStateToProps, mapDispatchToProps)(Board);
      const component = shallowWithStore(<ConnectedBoard />, store);
      expect(component.props().state.board).to.be.an('array');
      expect(component.props().state.flip).to.be.false;
      expect(component.props().state.turn).to.be.equal('white');
      expect(component.props().state.check).to.be.false;
      expect(component.props().state.checkmate).to.be.false;
      expect(component.props().state.focus).to.be.an('object');
      expect(component.props().onPick).to.be.an('function');
      expect(component.props().onFocus).to.be.an('function');
    });
  });
});
