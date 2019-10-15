//import { exampleReducer } from './example-reducer';
import { adminListReducer } from './admin-list-reducer'
import { adminSearchReducer } from './admin-search-reducer'
import { teacherListReducer } from './teacher-list-reducer'
import { teacherSearchReducer } from './teacher-search-reducer'
import { combineReducers } from "redux";

export const reducers = {
    adminListReducer,
    adminSearchReducer,
    teacherListReducer,
    teacherSearchReducer
    //exampleReducer
};

export const rootReducer = combineReducers(reducers);