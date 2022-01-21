export default function authHeader() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    return { 'Authorization': 'Bearer ' + token };
  }