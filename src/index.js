import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'

import './stylesheets/normalize.scss'
import './stylesheets/main.scss'

import RootContainer from './containers/RootContainer'
import reducerSet from './reducerSet'

const reducer = combineReducers(reducerSet)
const middleware = applyMiddleware(thunk)
const store =
    !global.debug || !window.__REDUX_DEVTOOLS_EXTENSION__
        ? createStore(reducer, middleware)
        : createStore(
              reducer,
              compose(
                  middleware,
                  window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
              )
          )

render(
    <Provider store={store}>
        <RootContainer />
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
