import fetch from 'cross-fetch'
import { authHeader } from '../helpers/authHeader'
import { history } from '../helpers/history'

export const updateService = {
  update
}

function update(model, id, body) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(body)
  }

  return fetch(`${process.env.REACT_APP_EXTERNAL_URL}api/${model}/${id}`, requestOptions)
    .then(handleResponse)
    .then(payload => {
      return payload
    })
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) { logout() }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

function logout() {
  localStorage.removeItem('user')
  history.push('/register')
}
