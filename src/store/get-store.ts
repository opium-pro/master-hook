import { mediators } from "../collector"
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { getReducer } from './get-reducer'
import { withDevTools, externalMiddleware} from './settings'
import { getCached } from '../local-storage/cached'
import { createReducer } from '../mediators/create-reducer'


export let store = undefined


export function prepare() {
  if (store && Object.keys(mediators).length) {
    return store
  }

  const reducer = getReducer()
  const devTools = withDevTools && (window as any)?.__REDUX_DEVTOOLS_EXTENSION__
  const middleware = [
    applyMiddleware(thunk, ...externalMiddleware),
    devTools ? devTools?.() : f => f,
  ]

  return {reducer, middleware: compose(...middleware)}
}


export function getIntermediateStore() {
  const prepared = prepare()
  store = createStore(prepared.reducer, prepared.middleware)
  return store
}


export async function getStore() {
  const prepared = prepare()

  for (const key in mediators) {
    if (mediators[key].cache) {
      const cachedState = await getCached(key)
      const initialState = { ...mediators[key].initialState, ...cachedState}
      prepared.reducer[key] = createReducer(mediators[key].handlers, initialState)
    }
  }

  store = createStore(prepared.reducer, prepared.middleware)
  return store
}