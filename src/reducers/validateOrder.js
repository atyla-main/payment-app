import { orderConstants } from '../actions/order'

export function validateOrder(state = {}, action) {
  switch (action.type) {
    case orderConstants.VALIDATE_ORDER_REQUEST:
      return {...state, orderValidating: true }
    case orderConstants.VALIDATE_ORDER_SUCCESS:
      return {...state, orderValidated: true, orderValidating: false, orderPayload: action.orderValidatePayload }
    case orderConstants.VALIDATE_ORDER_FAILURE:
      return state
    default:
      return state
  }
}
