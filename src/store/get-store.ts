import { mediators } from '../collector.js'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { getReducer } from './get-reducer.js'
import { withDevTools, externalMiddleware} from './settings.js'


export let store = undefined


export function getStore() {
  if (store && Object.keys(mediators).length) {
    return store
  }

  const reducer = getReducer()
  const devTools = withDevTools && (window as any)?.__REDUX_DEVTOOLS_EXTENSION__
  const middleware = [
    applyMiddleware(thunk, ...externalMiddleware),
    devTools ? devTools?.() : f => f,
  ]

  store = createStore(reducer, compose(...middleware))
  return store
}