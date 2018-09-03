export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.data.token) {
        return {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': 'JWT ' + user.data.token
        };
    } else {
        return {};
    }
}
