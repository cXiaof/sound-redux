import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'

import './stylesheets/main.scss'

import RootContainer from './containers/RootContainer'
import reducerSet from './reducerSet'

const store = window.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
          combineReducers(reducerSet),
          compose(
              applyMiddleware(thunk),
              window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
          )
      )
    : createStore(combineReducers(reducerSet), applyMiddleware(thunk))

render(
    <Provider store={store}>
        <RootContainer />
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
