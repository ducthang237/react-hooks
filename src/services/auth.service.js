import axios from 'axios';
import authHeader from "./auth-header";

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}`;

function login(params) {
    return axios.post(`${baseUrl}/login`, params);
}

function logout() {
    return axios.post(`${baseUrl}/logout`, {}, { headers: authHeader() });
}

export const authService = {
    login,
    logout
};