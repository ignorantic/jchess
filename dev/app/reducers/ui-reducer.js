import consts from '../consts';

const initialState = {
  flip: false,
  focus: [0, 0],
  drag: null,
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case consts.UPDATE_POSITION: {
      return {
        ...state,
        ...action.payload.ui,
      };
    }
    case consts.RELEASE: {
      return {
        ...state,
        drag: null,
      };
    }
    case consts.CHANGE_FOCUS: {
      return {
        ...state,
        focus: action.payload,
      };
    }
    case consts.FLIP_BOARD: {
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
