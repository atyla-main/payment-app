import { GET_CALCULATOR_INFOS } from '../actions/compute'

export const calculatorInfos = (state = {}, action) => {
  switch (action.type) {
    case GET_CALCULATOR_INFOS.SUCCESS:
      return {...state, data: action.payload.data}
    case GET_CALCULATOR_INFOS.PENDING:
      return state
    case GET_CALCULATOR_INFOS.FAILURE:
      return state
    default:
      return state
  }
}
