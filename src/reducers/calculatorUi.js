import { GET_CALCULATOR_INFOS } from '../actions/compute'

export const ui = (state = { calculatorInfosPending: false }, action) => {
  switch (action.type) {
  case GET_CALCULATOR_INFOS.PENDING:
    return {...state, calculatorInfosPending: true}
  case GET_CALCULATOR_INFOS.SUCESS:
    return {...state, calculatorInfosPending: false}
  default:
     return state
  }
}
