import { combineReducers, createStore } from "redux";
import callReducer from "./call_reducer.js";
//import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import reducer from './reducer.js';

//const loggerMiddleware = createLogger();
const rootReducer = combineReducers({
    callReducer: callReducer,
    gReducer: reducer

})

export const store = createStore(
    rootReducer,
);


