import axios from 'axios';
import authHeader from "./auth-header";

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/posts`;

function getAll(pageNumber = 1) {
    return axios.get(`${baseUrl}?page=${pageNumber}`, { headers: authHeader() });
}

function getById(id) {
    return axios.get(`${baseUrl}/${id}`, { headers: authHeader() });
}

function getByKeyword(keyword) {
    return axios.post(`${baseUrl}/search`, {keyword}, { headers: authHeader() });
}

function create(params) {
    return axios.post(baseUrl, params, { headers: authHeader() });
}

function update(id, params) {
    return axios.put(`${baseUrl}/${id}`, params, { headers: authHeader() });
}

function publish(id) {
    return axios.put(`${baseUrl}/publish/${id}`, {}, { headers: authHeader() });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete(`${baseUrl}/${id}`, { headers: authHeader() });
}

export const postService = {
    getAll,
    getById,
    getByKeyword,
    create,
    update,
    publish,
    delete: _delete
};