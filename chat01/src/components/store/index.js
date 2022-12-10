
import { createStore } from "redux";
//import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import counterReducer from './reducer.js';

//const loggerMiddleware = createLogger();

export const store = createStore(
    counterReducer,
);







