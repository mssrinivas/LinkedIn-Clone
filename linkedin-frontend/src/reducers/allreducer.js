import {combineReducers} from 'redux';
import LoginReducer from './login-reducer.js';
const storeManager = combineReducers({
  LoginReducer
});

export default storeManager;
