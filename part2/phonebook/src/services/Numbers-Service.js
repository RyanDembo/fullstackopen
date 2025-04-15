import axios from "axios";

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const update = (id, updatedNumber) => {
    const putURL = baseURL + '/' + id;
    return axios.put(putURL, updatedNumber).then(response => response.data);
}

const create = (newNumber) => {
    return axios.post(baseURL).then(response => response.data);
}

const del = (id) => {
    const deleteURL = baseURL + '/' + id;
    return axios.delete(deleteURL).then(response => response.data);
}


export default {getAll, update, create, del};