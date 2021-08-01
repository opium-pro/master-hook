import React from 'react'
import { reducers, mediators } from "./state"
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'

let store = undefined


export function getReducer () {
  return combineReducers(reducers)
}


export function getStore() {
  if (store && Object.keys(mediators).length) {
    return store
  }
  const reducer = getReducer()
  const devTools = (window as any)?.devToolsExtension
  store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      devTools ? devTools?.() : f => f
    )
  )
  return store
}


export function Provider (props: any) {
  return <ReduxProvider {...props} store={getStore()} />
}