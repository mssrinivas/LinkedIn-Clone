import {createStore, applyMiddleware} from 'redux';
import storeManager from './../../reducers/allreducer.js';
import thunk from 'redux-thunk';
import promise from 'redux-promise';


const store = createStore(
    storeManager,
    applyMiddleware(thunk, promise)
);

export default store;
