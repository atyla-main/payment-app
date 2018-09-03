import fetch from 'cross-fetch'

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

  return fetch('http://localhost:3300/login', requestOptions)
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
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        // window.location.reload(true);
      }

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
  return fetch('http://localhost:3300/register-payment', requestOptions)
    .then(handleResponse)
}
