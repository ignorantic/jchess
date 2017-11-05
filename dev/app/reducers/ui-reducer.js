import ACTIONS from '../consts';

const initialState = {
  flip: false,
  focus: [0, 0],
  drag: null,
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.DRAG: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTIONS.RELEASE: {
      return {
        ...state,
        drag: null,
      };
    }
    case ACTIONS.CHANGE_FOCUS: {
      return {
        ...state,
        focus: action.payload,
      };
    }
    case ACTIONS.FLIP_BOARD: {
      return {
        ...state,
        flip: !state.flip,
      };
    }
    default: {
      return state;
    }
  }
};

export default ui;
