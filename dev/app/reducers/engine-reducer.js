import ACTIONS from '../consts';

const initialState = {
  status: 'ready',
  play: {
    1: true,
    2: true,
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
    default: {
      return state;
    }
  }
};

export default engine;
