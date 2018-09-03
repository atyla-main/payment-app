import fetch from 'cross-fetch'
import { authHeader } from '../helpers/authHeader'

export const postService = {
  post
}

function post(path, body) {
  console.log("IN UPDATE");
  console.log("MODEL:", path);
  console.log("BODY:", body);
  console.log("BODY STRING:", JSON.stringify(body));
  console.log("HEADER:", authHeader());
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(body)
  }


  console.log("REQUEST OPTSION:", requestOptions);
  return fetch(`http://localhost:3300/api/${path}`, requestOptions)
    .then(handleResponse)
    .then(payload => {
      return payload
    })
}

function handleResponse(response) {
  if (response.status === 401) {
    logout();
    //window.location.reload(true);
  }

  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log("REPONSE:", response);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        window.location.reload(true);
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
