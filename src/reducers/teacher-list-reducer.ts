import { Reducer } from 'redux';
import AdminModel from '../models/admin-model';
import { TeacherListType } from '../types/teacher-list-types';
import { teacherListConstants } from '../constants/teacher-list-constants';

export interface TeacherListState {
    loading: boolean;
    //example: AdminModel;
    example: Array<any>
    error: any;
}

const initialState: TeacherListState = {
    loading: false,
    //example: {} as AdminModel,
    example: {} as Array<any>,
    error: undefined
}

export const teacherListReducer: Reducer<TeacherListState, TeacherListType> = (state = initialState, action: TeacherListType) => {
    switch (action.type) {
        case teacherListConstants.TEACHER_LIST_BEGIN:
            return {
                ...state,
                loading: true,
                error: undefined
            }
        case teacherListConstants.TEACHER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                example: action.data
            }
        case teacherListConstants.TEACHER_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default: 
            return initialState;
    }
}