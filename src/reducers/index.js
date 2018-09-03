import { combineReducers } from 'redux'
import { ui } from './calculatorUi'
import { calculatorInfos } from './calculatorInfos'
import { alert } from './alert'
import { authentication } from './authentication'
import { registration } from './registration'
import { updateOrder, storedOrderPrice } from './updateOrder'
import { postOrder } from './postOrder'

export default combineReducers({
  calculatorInfos,
  ui,
  alert,
  authentication,
  registration,
  updateOrder,
  storedOrderPrice,
  postOrder
})
