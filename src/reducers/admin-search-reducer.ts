import { Reducer } from 'redux';
import AdminModel from '../models/admin-model';
import { AdminListType } from '../types/admin-list-types';
import { adminListConstants } from '../constants/admin-list-constants';

export interface AdminListState {
    loading: boolean;
    //example: AdminModel;
    example: Array<any>
    error: any;
}

const initialState: AdminListState = {
    loading: false,
    //example: {} as AdminModel,
    example: {} as Array<any>,
    error: undefined
}

export const adminSearchReducer: Reducer<AdminListState, AdminListType> = (state = initialState, action: AdminListType) => {
    switch (action.type) {
        case adminListConstants.ADMIN_SEARCH_BEGIN:
            return {
                ...state,
                loading: true,
                error: undefined
            }
        case adminListConstants.ADMIN_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                example: action.data
            }
        case adminListConstants.ADMIN_SEARCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default: 
            return initialState;
    }
}