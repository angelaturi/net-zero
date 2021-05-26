import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import pledges from './pledges_reducer';

const RootReducer = combineReducers({
  pledges,
  session,
  errors
});

export default RootReducer;