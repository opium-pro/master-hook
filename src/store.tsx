import React, { useEffect } from 'react'
import { storages } from "./storage"
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { setFromCache } from './actions'

let store = undefined


export function getReducer() {
  const reducers = {}
  Object.keys(storages).forEach(key => {
    reducers[key] = storages[key]?.reducer
  })
  return combineReducers(reducers)
}


export function getStore() {
  if (store && Object.keys(storages).length) {
    return store
  }
  const reducer = getReducer()
  const devTools = (window as any)?.__REDUX_DEVTOOLS_EXTENSION__
  store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      devTools ? devTools?.() : f => f
    )
  )

  return store
}


export function Provider({ children, ...props }: any) {
  useEffect(() => {
    setFromCache()
  }, [])

  return (
    <ReduxProvider {...props} store={getStore()}>
      {children}
    </ReduxProvider>
  )
}