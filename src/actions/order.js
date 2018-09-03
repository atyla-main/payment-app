import { updateService } from '../services/update'
import { postService } from '../services/post'
import { alertActions } from './alert'
import { createBrowserHistory } from 'history';

export const orderConstants = {
  UPDATE_ORDER_REQUEST: 'UPDATE_ORDER_REQUEST',
  UPDATE_ORDER_SUCCESS: 'UPDATE_ORDER_SUCCESS',
  UPDATE_ORDER_FAILURE: 'UPDATE_ORDER_FAILURE',

  STORE_ORDER_PRICE: 'STORE_ORDER_PRICE',

  POST_ORDER_REQUEST: 'POST_ORDER_REQUEST',
  POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS',
  POST_ORDER_FAILURE: 'POST_ORDER_FAILURE'
}

export const history = createBrowserHistory();

export const orderActions = {
  update,
  storedOrderPrice,
  postOrder
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

    postService.post('order-payment' ,body)
      .then(
        orderPayload => {
          dispatch(successPostOrder(orderPayload))
        },
        error => {
          dispatch(failurePostOrder(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
}
