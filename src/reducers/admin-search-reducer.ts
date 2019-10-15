import { Reducer } from 'redux';
import AdminModel from '../models/admin-model';
import { AdminListType } from '../types/admin-list-types';
import { adminListConstants } from '../constants/admin-list-constants';

export interface AdminListState {
    aloading: boolean;
    //admins: AdminModel;
    admins: Array<any>
    aerror: any;
}

const initialState: AdminListState = {
    aloading: false,
    //admins: {} as AdminModel,
    admins: {} as Array<any>,
    aerror: undefined
}

export const adminSearchReducer: Reducer<AdminListState, AdminListType> = (state = initialState, action: AdminListType) => {
    switch (action.type) {
        case adminListConstants.ADMIN_SEARCH_BEGIN:
            return {
                ...state,
                aloading: true,
                aerror: undefined
            }
        case adminListConstants.ADMIN_SEARCH_SUCCESS:
            return {
                ...state,
                aloading: false,
                admins: action.data
            }
        case adminListConstants.ADMIN_SEARCH_ERROR:
            return {
                ...state,
                aloading: false,
                aerror: action.error
            }
        default: 
            return initialState;
    }
}