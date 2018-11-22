import {createStore, applyMiddleware} from 'redux';
import storeManager from './../../reducers/allreducer.js';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
  storeManager,
  composeEnhancer(applyMiddleware(thunk, promise)),
);
export default store;
