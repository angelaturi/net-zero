import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import pledges from './pledge_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  pledges
});

export default RootReducer;