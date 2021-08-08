import React, { useEffect } from 'react'
import { storages } from "./storage"
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { setFromCache } from './actions'

let store = undefined
let externalReducers = {}
let externalMiddleware: any[] = []
let withDevTools = true


export function getReducer() {
  const reducers = {...externalReducers}
  Object.keys(storages).forEach(key => {
    reducers[key] = storages[key]?.reducer
  })
  return combineReducers(reducers)
}


export function useDevTools(value: boolean) {
  withDevTools = value
}


export function addReducers(reducers: {[key: string]: any}) {
  externalReducers = reducers
}

export function addMiddleware(middleware: any) {
  if (!Array.isArray(middleware)) {
    middleware = [middleware]
  }
  externalMiddleware = middleware
}


export function getStore() {
  if (store && Object.keys(storages).length) {
    return store
  }

  const reducer = getReducer()
  const devTools = withDevTools && (window as any)?.__REDUX_DEVTOOLS_EXTENSION__
  const middleware = [,
    applyMiddleware(thunk, ...externalMiddleware),
    devTools ? devTools?.() : f => f,
  ]

  store = createStore(
    reducer,
    compose(...middleware)
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