import React, { FC } from 'react'
import { createMediator } from './utils/create-mediator'
import { useMediator } from './utils/use-mediator'
import thunk from 'redux-thunk'
import { combineReducers, createStore as reduxCreateStore, applyMiddleware, compose } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { createSelector } from 'reselect'


export interface MasterHookParams {
  storage?: string | string[],
  actions?: any,
  selectors?: any,
  initialState?: any,
}

export type Func = (params: MasterHookParams) => any

export interface IMasterHook extends Func {
  getStorage: (storage: string) => any
  getSelector: (storage: string, value?: string) => any
  createAction: any
  createStore: () => any
  getReducer: () => any
  getMediator: (name: string, initialState?: any) => any
  createStorage: (name: string, initialState: any) => any
  createSelector: typeof createSelector,
  reducers: object
  mediators: object
  Provider: FC
}

let storageIndex = 0

function MasterHook({
  storage,
  initialState,
  actions,
  selectors,
}: MasterHookParams) {

  let mediator: any = {}
  if (Array.isArray(storage)) {
    for (const storageItem of storage) {
      const newMediator = MasterHook.getMediator(storageItem, initialState)
      mediator = {...mediator, ...newMediator}
    }
  } else {
    mediator = MasterHook.getMediator(storage, initialState)
  }

  return () => useMediator({
    ...mediator,
    actions,
    selectors,
  })
}


MasterHook.reducers = {}
MasterHook.mediators = {}


export const createStorage: IMasterHook['createStorage'] = (name, initialState) => {
  const mediator = createMediator(name, initialState)
  MasterHook.reducers[name] = mediator.reducer
  MasterHook.mediators[name] = mediator
  return mediator
}
MasterHook.createStorage = createStorage


export const getReducer = () => combineReducers(MasterHook.reducers)
MasterHook.getReducer = getReducer


export const createStore: IMasterHook['createStore'] = () => {
  const reducer = MasterHook.getReducer()
  const devTools = (window as any)?.devToolsExtension

  return reduxCreateStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      devTools ? devTools?.() : f => f
    )
  )
}
MasterHook.createStore = createStore


export const Provider: IMasterHook['Provider'] = (props) => (
  <ReduxProvider {...props} store={MasterHook.createStore()} />
)
MasterHook.Provider = Provider


export const getMediator: IMasterHook['getMediator'] = (storage, initialState = {}) => {
  !storage && (storage = 'master-hook-' + storageIndex++)
  const mediator = MasterHook.mediators[storage] || MasterHook.createStorage(storage, initialState)
  return mediator
}
MasterHook.getMediator = getMediator


export const getSelector: IMasterHook['getSelector'] = (storage, value) => {
  return (state) => value ? state[storage]?.[value] : state[storage]
}
MasterHook.getSelector = getSelector


export const getStorage: IMasterHook['getStorage'] = (storage) => {
  return useMediator(MasterHook.getMediator(storage))
}
MasterHook.getStorage = getStorage

export const createAction: IMasterHook['createAction'] = (action) => (...params) => (dispatch) => {
  action?.(...params)
}
MasterHook.createAction = createAction


MasterHook.createSelector = createSelector
export {createSelector}


export default MasterHook as IMasterHook