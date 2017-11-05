import ACTIONS from '../consts';

const initialState = {
  status: 'ready',
};

const engine = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ENGINE_MOVE_REQUEST: {
      return {
        status: 'waiting',
      };
    }
    case ACTIONS.GET_ENGINE_MOVE_SUCCESS: {
      return {
        status: 'ready',
      };
    }
    case ACTIONS.GET_ENGINE_MOVE_FAILURE: {
      return {
        status: 'error',
      };
    }
    default: {
      return state;
    }
  }
};

export default engine;
