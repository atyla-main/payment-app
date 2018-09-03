import fetch from 'cross-fetch'
import { API } from '../actions/compute'

export function calculatorMiddleware({dispatch}) {
  return (function wrapCalculator(next) {
    return (function dispatchAndFetch(action) {
        if (action.type !== API) {
          return next(action)
        }

        const { payload, params } = action

        dispatch({ type: payload.PENDING })

        return fetch(`http://localhost:3300${params}`)
          .then(response => response.json())
          .then(json => {
            dispatch({type: payload.SUCCESS, payload: json})
          })
        })
  })
}
