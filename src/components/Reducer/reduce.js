import {combineReducers} from 'redux';

const date = (state = 0, action) => {
    switch (action.type) {
      case 'NEXT_MONTH': {
        state = state + 1;
        return state
      }
      case 'PREVIOUS_MONTH': {
        state = state - 1;
        return state
      }
      case 'CURRENT_MONTH': {
        state = 0;
        return state
      }
      default:
        return state
    }
  };

const context = (state = [], action) => {
  switch (action.type) {
    case 'OPEN_CONTEXT': {
      state = [true, action.payload.id];
      return state
    }
    case 'CLOSE_CONTEXT': {
      state = [false, null];
      return state;
    }
    default: 
      return state
  }
}

const events = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EVENT': {
      return state = [action.payload, ...state]
    }
    case 'REMOVE_EVENT': {
      return state.filter((ev) => ev.id !== action.payload.id || ev.time !== action.payload.time)
    }
    case 'CHANGE_STATUS': {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].id === action.payload.id && state[i].time === action.payload.time) {
          state[i].done = !state[i].done;
          return state
        }
      }
    }
    default:
      return state
  }
}

  export default combineReducers({
    context,
    date,
    events
  });

