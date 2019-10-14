import { getAdmins } from '../api/providers/admin';
import { Dispatch } from 'redux';
import AdminModel from '../models/admin-model';
import * as types from '../types/admin-list-types';
import { adminListConstants } from '../constants/admin-list-constants';

const getAdminsBegin = (): types.IActionAdminListBegin => {
    return {
        type: adminListConstants.ADMIN_LIST_BEGIN
    }
}

const getAdminsSuccess = (adminData: AdminModel): types.IActionAdminListlSuccess => {
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