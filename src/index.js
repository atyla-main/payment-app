import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import { Provider } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Calculator from './containers/Calculator'
import { calculatorMiddleware } from './containers/CalculatorInfos'
import Register from './containers/Register'
import Login from './containers/Login'
import Order from './containers/Order'
import { history } from './helpers/history'

const loggerMiddleware = createLogger()

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware, calculatorMiddleware))

render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/payment'
          render={() => {
            let state = store.getState()

            console.log("state.authentication.loggedIn :", state.authentication.loggedIn);
            if (state.authentication.loggedIn) {
              return <Order />
            }
            return <Redirect to='/register' />
          }
        }/>
        <Route path='/calculator' component={Calculator} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
