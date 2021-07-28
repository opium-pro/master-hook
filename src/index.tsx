import React, { FC } from 'react'
import { getMediator } from './utils/get-mediator'
import { useMediator } from './utils/use-mediator'
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'


export interface MasterHookParams {
  name?: string,
  actions?: any,
  makeActions?: any,
  makeSelectors?: any,
  selectors?: any,
  initialState?: any,
}

export type Func = (params: MasterHookParams) => any

export interface IMasterHook extends Func {
  getStore: () => any
  getReducer: () => any
  getMediator: (name: string) => any
  createMediator: (name: string, state: any) => any
  reducers: object
  mediators: object
  store?: any
  Provider: FC
}

let storeIndex = 0

function Master({
  name,
  initialState,
  actions,
  makeActions,
  selectors,
  makeSelectors,
}: MasterHookParams) {

  !name && (name = 'master-hook-' + storeIndex++)

  const mediator = Master.getMediator(name) || Master.createMediator(name, initialState || {})

  !actions && makeActions && (actions = makeActions(mediator))
  !selectors && makeSelectors && (selectors = makeSelectors(mediator))

  return () => useMediator({
    ...mediator,
    actions,
    selectors,
  })
}

Master.reducers = {}
Master.mediators = {}
Master.store = undefined

Master.createMediator = (name, initialState) => {
  const mediator = getMediator(name, initialState)
  Master.reducers[name] = mediator.reducer
  Master.mediators[name] = mediator
  return mediator
}

Master.getReducer = () => combineReducers(Master.reducers)

Master.getStore = () => {
  if (Master.store) { return Master.store }

  const reducer = Master.getReducer()
  const devTools = (window as any).devToolsExtension

  return createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      devTools ? devTools?.() : f => f
    )
  )
}

Master.Provider = ({ children }) => (
  <Provider store={Master.getStore()}>
    {children}
  </Provider>
)

Master.getMediator = (name) => {
  return Master.mediators[name]
}

export const MasterHook = Master as IMasterHook