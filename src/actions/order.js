import { updateService } from '../services/update'
import { postService } from '../services/post'
import { alertActions } from './alert'
import { createBrowserHistory } from 'history';
import { userActions } from './user'

export const orderConstants = {
  UPDATE_ORDER_REQUEST: 'UPDATE_ORDER_REQUEST',
  UPDATE_ORDER_SUCCESS: 'UPDATE_ORDER_SUCCESS',
  UPDATE_ORDER_FAILURE: 'UPDATE_ORDER_FAILURE',

  STORE_ORDER_PRICE: 'STORE_ORDER_PRICE',

  POST_ORDER_REQUEST: 'POST_ORDER_REQUEST',
  POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS',
  POST_ORDER_FAILURE: 'POST_ORDER_FAILURE',

  VALIDATE_ORDER_REQUEST: 'VALIDATE_ORDER_REQUEST',
  VALIDATE_ORDER_SUCCESS: 'VALIDATE_ORDER_SUCCESS',
  VALIDATE_ORDER_FAILURE: 'VALIDATE_ORDER_FAILURE'
}

export const history = createBrowserHistory();

export const orderActions = {
  update,
  storedOrderPrice,
  postOrder,
  validateOrder
}

function storedOrderPrice(price) {
  return { type: orderConstants.STORE_ORDER_PRICE, price }
}

function request(order) {
  return { type: orderConstants.UPDATE_ORDER_REQUEST, order }
}

function success(order) {
  return { type: orderConstants.UPDATE_ORDER_SUCCESS, order }
}

function failure(error) {
  return { type: orderConstants.UPDATE_ORDER_FAILURE, error }
}

function update(order, body) {
  return dispatch => {
    dispatch(request({ order }))

    updateService.update('orders', order, body)
      .then(
        order => {
          dispatch(success(order))
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
}

function requestPostOrder() {
  return { type: orderConstants.POST_ORDER_REQUEST }
}

function successPostOrder(orderPayload) {
  return { type: orderConstants.POST_ORDER_SUCCESS, orderPayload }
}

function failurePostOrder(error) {
  return { type: orderConstants.POST_ORDER_FAILURE, error }
}

function postOrder(body) {
  return dispatch => {
    dispatch(requestPostOrder())

    postService.post('order-payment', body)
      .then(
        orderPayload => {
          dispatch(successPostOrder(orderPayload))
        },
        error => {
          dispatch(userActions.logout())
          dispatch(failurePostOrder(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
}

function requestValidateOrder() {
  return { type: orderConstants.VALIDATE_ORDER_REQUEST }
}

function successValidateOrder(orderPayload) {
  return { type: orderConstants.VALIDATE_ORDER_SUCCESS, orderPayload }
}

function failureValidateOrder(error) {
  return { type: orderConstants.VALIDATE_ORDER_FAILURE, error }
}

function validateOrder(body) {
  return dispatch => {
    dispatch(requestValidateOrder())

    postService.post('validate-payment', body)
      .then(
        orderValidatedPayload => {
          dispatch(successValidateOrder(orderValidatedPayload))
        },
        error => {
          dispatch(failureValidateOrder(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
}
