//import { exampleReducer } from './example-reducer';
import { adminListReducer } from './admin-list-reducer'
import { combineReducers } from "redux";

export const reducers = {
    adminListReducer
    //exampleReducer
};

export const rootReducer = combineReducers(reducers);