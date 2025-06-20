import axios from "axios";

const baseURL = '/api/persons';

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const update = (updatedNumber) => {
    const putURL = baseURL + '/' + updatedNumber.id;
    return axios.put(putURL, updatedNumber).then(response => response.data);
}

const create = (newNumber) => {
    return axios.post(baseURL, newNumber).then(response => response.data);
}

const del = (id) => {
    const deleteURL = baseURL + '/' + id;
    return axios.delete(deleteURL).then(response => {
        return response.status === 204 ? id : ""
});
}


export default {getAll, update, create, del};