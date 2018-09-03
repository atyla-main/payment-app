import { userService } from '../services/user'
import { alertActions } from './alert'
import { history } from '../helpers/history'

export const userConstants = {
  REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
  REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

  LOGOUT: 'USERS_LOGOUT',

  USER_ALREADY_LOGGEDIN: 'USER_ALREADY_LOGGEDIN'
}

export const userActions = {
  login,
  logout,
  isLoggedIn,
  register
}

function request(user) {
  return { type: userConstants.LOGIN_REQUEST, user }
}

function success(user) {
  return { type: userConstants.LOGIN_SUCCESS, user }
}

function failure(error) {
  return { type: userConstants.LOGIN_FAILURE, error }
}

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }))

    userService.login(username, password)
      .then(
        user => {
          dispatch(success(user))
          history.push('/payment')
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function isLoggedIn() {
  let user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    return {
      type: userConstants.USER_ALREADY_LOGGEDIN
    }
  }

  return {
    type: userConstants.LOGIN_FAILURE
  }
}

function registerRequest(user) {
  return { type: userConstants.REGISTER_REQUEST, user }
}

function registerSuccess(user) {
  return { type: userConstants.REGISTER_SUCCESS, user }
}

function registerFailure(error) {
  return { type: userConstants.REGISTER_FAILURE, error }
}

function register(user) {
  return dispatch => {
    dispatch(registerRequest(user));

    userService.register(user)
      .then(
        user => {
          dispatch(registerSuccess())
          dispatch(alertActions.success('Registration successful'));
        },
        error => {
          dispatch(registerFailure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
}
