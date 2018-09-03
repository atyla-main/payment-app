import fetch from 'cross-fetch'
import { authHeader } from '../helpers/authHeader'

export const updateService = {
  update
}

function update(model, id, body) {
  console.log("IN UPDATE");
  console.log("MODEL:", model);
  console.log("ID:", id);
  console.log("BODY:", body);
  console.log("BODY STRING:", JSON.stringify(body));
  console.log("HEADER:", authHeader());
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(body)
  }

  return fetch(`http://localhost:3300/api/${model}/${id}`, requestOptions)
    .then(handleResponse)
    .then(payload => {
      return payload
    })
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

function logout() {
  localStorage.removeItem('user');
}
