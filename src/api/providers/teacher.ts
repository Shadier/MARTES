import axios from 'axios';
import ENV from 'react-native-config';

const getAllTeacher = () => {
    console.log('API')
    //return axios.get(`${ENV.API_URL}/admin`)   
    return axios.get('http://api.tvmaze.com/shows/1') //Ruta de teachers
        .then(response => {
            console.log(response)
            return response;           
        })
        .catch(err => {
            if (err.response) {
                throw err.response;
            }
            throw err;
        })
}

export const getTeacher = {
    getAllTeacher
}

const searchTeachers = (search: string) => {
    console.log('API')
    //return axios.get(`${ENV.API_URL}/admin-search/:search`)
    return axios.get('http://api.tvmaze.com/shows/1') // //Ruta de admins
        .then(response => {
            console.log(response)
            return response;           
        })
        .catch(err => {
            if (err.response) {
                throw err.response;
            }
            throw err;
        })
}

export const searchTeacher = {
    searchTeachers
}