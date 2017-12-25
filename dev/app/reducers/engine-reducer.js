import ACTIONS from '../consts';

const initialState = {
  status: 'ready',
  play: {
    1: false,
    2: false,
  },
};

const engine = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ENGINE_MOVE_REQUEST: {
      return {
        ...state,
        status: 'waiting',
      };
    }
    case ACTIONS.GET_ENGINE_MOVE_SUCCESS: {
      return {
        ...state,
        status: 'ready',
      };
    }
    case ACTIONS.GET_ENGINE_MOVE_FAILURE: {
      return {
        ...state,
        status: 'error',
      };
    }
    case ACTIONS.TOGGLE_WHITE: {
      return {
        ...state,
        status: 'ready',
        play: {
          ...state.play,
          1: !state.play[1],
        },
      };
    }
    case ACTIONS.TOGGLE_BLACK: {
      return {
        ...state,
        status: 'ready',
        play: {
          ...state.play,
          2: !state.play[2],
        },
      };
    }
    case ACTIONS.STOP_BOTH: {
      return {
        ...state,
        status: 'ready',
        play: {
          1: false,
          2: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default engine;
