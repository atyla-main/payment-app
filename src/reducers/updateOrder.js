import { orderConstants } from '../actions/order'

export function updateOrder(state = {}, action) {
  switch (action.type) {
    case orderConstants.UPDATE_ORDER_REQUEST:
      return {...state, orderUpdating: true }
    case orderConstants.UPDATE_ORDER_SUCCESS:
      return {...state, orderUpdated: true }
    case orderConstants.UPDATE_ORDER_FAILURE:
      return state
    default:
      return state
  }
}

export function storedOrderPrice(state = {}, action) {
  switch (action.type) {
    case orderConstants.STORE_ORDER_PRICE:
      return {...state, orderedPrice: action.price }
    default:
      return state
  }
}
