import { Reducer } from 'redux';
import AdminModel from '../models/admin-model';
import { TeacherListType } from '../types/teacher-list-types';
import { teacherListConstants } from '../constants/teacher-list-constants';

export interface TeacherListState {
    tloading: boolean;
    teachers: Array<any>
    terror: any;
}

const initialState: TeacherListState = {
    tloading: false,
    teachers: {} as Array<any>,
    terror: undefined
}

export const teacherListReducer: Reducer<TeacherListState, TeacherListType> = (state = initialState, action: TeacherListType) => {
    switch (action.type) {
        case teacherListConstants.TEACHER_LIST_BEGIN:
            return {
                ...state,
                tloading: true,
                terror: undefined
            }
        case teacherListConstants.TEACHER_LIST_SUCCESS:
            return {
                ...state,
                tloading: false,
                teachers: action.data
            }
        case teacherListConstants.TEACHER_LIST_ERROR:
            return {
                ...state,
                tloading: false,
                terror: action.error
            }
        default: 
            return initialState;
    }
}