import axios from 'axios';
import ENV from 'react-native-config';

const getAllTeachers = () => {
    console.log('API')
    //return axios.get(`${ENV.API_URL}/admin`)   
    return axios.get('http://10.16.0.63:3000/api/teachers') //Ruta de teachers
        .then(response => {
            console.log(response)
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

export const getTeachers = {
    getAllTeachers
}

const searchTeachers = (search: string) => {
    console.log('API')
    //return axios.get(`${ENV.API_URL}/admin-search/:search`)
    return axios.get('http://10.16.0.63:3000/api/teachers/filter/'+search) // //Ruta de admins
        .then(response => {
            console.log(response)
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

export const searchTeacher = {
    searchTeachers
}