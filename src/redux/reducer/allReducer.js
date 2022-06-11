import {combineReducers} from 'redux';
import {loginReducer} from '../../screens/login/redux/action';

export const allReducers = combineReducers({
  login: loginReducer,
});
