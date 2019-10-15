import { Action } from 'redux';
import AdminModel from '../models/admin-model';
import { teacherListConstants } from '../constants/teacher-list-constants';

export interface IActionTeacherListBegin extends Action {
    type: teacherListConstants.TEACHER_LIST_BEGIN
}

export interface IActionTeacherListlSuccess extends Action {
    type: teacherListConstants.TEACHER_LIST_SUCCESS,
    //data: AdminModel
    data: Array<any>
}

export interface IActionTeacherListError extends Action {
    type: teacherListConstants.TEACHER_LIST_ERROR,
    error: any
}

export interface IActionTeacherSearchBegin extends Action {
    type: teacherListConstants.TEACHER_SEARCH_BEGIN
}

export interface IActionTeacherSearchSuccess extends Action {
    type: teacherListConstants.TEACHER_SEARCH_SUCCESS,
    //data: AdminModel
    data: Array<any>
}

export interface IActionTeacherSearchError extends Action {
    type: teacherListConstants.TEACHER_SEARCH_ERROR,
    error: any
}

export type TeacherListType = IActionTeacherListBegin | IActionTeacherListlSuccess | IActionTeacherListError | IActionTeacherSearchBegin | IActionTeacherSearchSuccess | IActionTeacherSearchError;