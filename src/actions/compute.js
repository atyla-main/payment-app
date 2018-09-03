const asyncActionType = (type) => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
})

export const API = 'API'
export const GET_CALCULATOR_INFOS = asyncActionType('GET_CALCULATOR_INFOS')

export const getCalculatorInfos = (params) => ({
  type: API,
  payload: { url: 'calculator', ...GET_CALCULATOR_INFOS },
  params
})
