import { getAdmins, searchAdmin } from '../api/providers/admin';
import { Dispatch } from 'redux';
import * as types from '../types/admin-list-types';
import { adminListConstants } from '../constants/admin-list-constants';

const getAdminsBegin = (): types.IActionAdminListBegin => {
    return {
        type: adminListConstants.ADMIN_LIST_BEGIN
    }
}

const getAdminsSuccess = (adminData: Array<any>): types.IActionAdminListlSuccess => {
    return {
        type: adminListConstants.ADMIN_LIST_SUCCESS,
        data: adminData
    }
}

const getAdminsError = (error: any): types.IActionAdminListError => {
    return {
        type: adminListConstants.ADMIN_LIST_ERROR,
        error: error
    }
}

export const admins = () => 
    (dispatch: Dispatch) => {
        dispatch(getAdminsBegin());
        getAdmins.getAllAdmins()
            .then(response => {
                dispatch(getAdminsSuccess(response.data));
            })
            .catch((err) => {
                dispatch(getAdminsError(err));
            });
    }

// search

const searchAdminsBegin = (): types.IActionAdminSearchBegin => {
    return {
        type: adminListConstants.ADMIN_SEARCH_BEGIN
    }
}

const searchAdminsSuccess = (adminData: Array<any>): types.IActionAdminSearchSuccess => {
    return {
        type: adminListConstants.ADMIN_SEARCH_SUCCESS,
        data: adminData
    }
}

const searchAdminsError = (error: any): types.IActionAdminSearchError => {
    return {
        type: adminListConstants.ADMIN_SEARCH_ERROR,
        error: error
    }
}

export const searchAdmins = (search: string) => 
    (dispatch: Dispatch) => {
        dispatch(searchAdminsBegin());
        searchAdmin.searchAdmins(search)
            .then(response => {
                dispatch(searchAdminsSuccess(response.data));
            })
            .catch((err) => {
                dispatch(searchAdminsError(err));
            });
    }