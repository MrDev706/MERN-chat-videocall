import { createStore } from "redux";
//import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import reducer from './reducer.js';

//const loggerMiddleware = createLogger();

export const store = createStore(
    reducer,
);


