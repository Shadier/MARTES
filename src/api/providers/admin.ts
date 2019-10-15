import axios from 'axios';
import ENV from 'react-native-config';

const getAllAdmins = () => {
    console.log('API')
    //return axios.get(`${ENV.API_URL}/admin`)
    return axios.get('http://10.16.0.63:3000/api/admins') // //Ruta de admins
        .then(response => {
            console.log('----------'+response)
            return response;           
        })
        .catch(err => {
            if (err.response) {
                throw err.response;
            }
            throw err;
        })
}

export const getAdmins = {
    getAllAdmins
}

const searchAdmins = (search: string) => {
    console.log('API')
    //return axios.get(`${ENV.API_URL}/admin-search/:search`)
    return axios.get('http://10.16.0.63:3000/api/admins/filter/'+search) // //Ruta de admins
        .then(response => {
            console.log('00000000000000'+response)
            return response;           
        })
        .catch(err => {
            console.log(err)
            if (err.response) {
                throw err.response;
            }
            throw err;
        })
}

export const searchAdmin = {
    searchAdmins
}