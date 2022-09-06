import {combineReducers} from 'redux';
import userInfoReducers from './userInfo'

const allReducers = combineReducers({
    userInfoReducers
});

const returnReducers = (state, action) => {
  if (action.type === 'CLEAR_APP_CACHE') {
    state = undefined;
  }
  return allReducers(state, action);
};

export default returnReducers;
