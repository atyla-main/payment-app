import { orderConstants } from '../actions/order'

export function postOrder(state = {}, action) {
  switch (action.type) {
    case orderConstants.POST_ORDER_REQUEST:
      return {...state, orderUpdating: true }
    case orderConstants.POST_ORDER_SUCCESS:
      return {...state, orderUpdated: true, orderUpdating: false, orderPayload: action.orderPayload }
    case orderConstants.POST_ORDER_FAILURE:
      return state
    default:
      return state
  }
}
