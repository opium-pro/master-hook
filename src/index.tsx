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

function MasterHook({
  name,
  initialState,
  actions,
  makeActions,
  selectors,
  makeSelectors,
}: MasterHookParams) {

  !name && (name = 'master-hook-' + storeIndex++)

  const mediator = MasterHook.getMediator(name) || MasterHook.createMediator(name, initialState || {})

  !actions && makeActions && (actions = makeActions(mediator))
  !selectors && makeSelectors && (selectors = makeSelectors(mediator))

  return () => useMediator({
    ...mediator,
    actions,
    selectors,
  })
}

MasterHook.reducers = {}
MasterHook.mediators = {}
MasterHook.store = undefined

MasterHook.createMediator = (name, initialState) => {
  const mediator = getMediator(name, initialState)
  MasterHook.reducers[name] = mediator.reducer
  MasterHook.mediators[name] = mediator
  return mediator
}

MasterHook.getReducer = () => combineReducers(MasterHook.reducers)

MasterHook.getStore = () => {
  if (MasterHook.store) { return MasterHook.store }

  const reducer = MasterHook.getReducer()
  const devTools = (window as any)?.devToolsExtension

  return createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      devTools ? devTools?.() : f => f
    )
  )
}

MasterHook.Provider = ({ children }) => (
  <Provider store={MasterHook.getStore()}>
    {children}
  </Provider>
)

MasterHook.getMediator = (name) => {
  return MasterHook.mediators[name]
}

export default MasterHook as IMasterHook