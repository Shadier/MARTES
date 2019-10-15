import { Reducer } from 'redux';
import AdminModel from '../models/admin-model';
import { TeacherListType } from '../types/teacher-list-types';
import { teacherListConstants } from '../constants/teacher-list-constants';

export interface TeacherListState {
    tloading: boolean;
    //teachers: AdminModel;
    teachers: Array<any>
    terror: any;
}

const initialState: TeacherListState = {
    tloading: false,
    //teachers: {} as AdminModel,
    teachers: {} as Array<any>,
    terror: undefined
}

export const teacherSearchReducer: Reducer<TeacherListState, TeacherListType> = (state = initialState, action: TeacherListType) => {
    switch (action.type) {
        case teacherListConstants.TEACHER_SEARCH_BEGIN:
            return {
                ...state,
                tloading: true,
                terror: undefined
            }
        case teacherListConstants.TEACHER_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                teachers: action.data
            }
        case teacherListConstants.TEACHER_SEARCH_ERROR:
            return {
                ...state,
                tloading: false,
                terror: action.error
            }
        default: 
            return initialState;
    }
}