import fetch from 'cross-fetch'
import { history } from '../helpers/history'

export const userService = {
  login,
  logout,
  register
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      data: {
        attributes: {
          email: `${username}`,
          password: `${password}`
        }
      }
    })
  }

  return fetch(`${process.env.REACT_APP_EXTERNAL_URL}login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.data && user.data.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user
    })
}

function logout() {
  localStorage.removeItem('user');
  history.push('/register');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) { logout(); }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      firstName: `${user.firstName}`,
      lastName: `${user.lastName}`,
      country: `${user.country}`,
      email: `${user.email}`,
      password: `${user.password}`
    })
  }
  return fetch(`${process.env.REACT_APP_EXTERNAL_URL}register-payment`, requestOptions)
    .then(handleResponse)
}
