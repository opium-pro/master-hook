import React, { FC } from 'react'
import { createMediator } from './utils/create-mediator'
import { useMediator } from './utils/use-mediator'
import thunk from 'redux-thunk'
import { combineReducers, createStore as reduxCreateStore, applyMiddleware, compose } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { createSelector as newSelector } from 'reselect'


export interface MasterHookParams {
  storage?: string | string[],
  actions?: any,
  selectors?: any,
  initialState?: any,
}

export type Func = (params: MasterHookParams) => any

export interface IMasterHook extends Func {
  useStorage: (storageName: string) => any
  getStore: any
  getSelector: (storage: string, value?: string) => any
  createAction: any
  createStore: () => any
  getReducer: () => any
  getMediator: (name: string, initialState?: any) => any
  createStorage: (name: string, initialState: any) => any
  createSelector: any
  reducers: object
  store: any
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
MasterHook.store = undefined as any


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
  if (MasterHook.store) {
    return MasterHook.store
  }

  const reducer = MasterHook.getReducer()
  const devTools = (window as any)?.devToolsExtension

  const store = reduxCreateStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      devTools ? devTools?.() : f => f
    )
  )

  MasterHook.store = store

  return store
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


export const useStorage: IMasterHook['useStorage'] = (storage) => {
  const mediator = MasterHook.getMediator(storage)

  const {dispatch, getState} = MasterHook?.store

  const result = {...mediator.get(getState?.())}

  Object.keys(mediator.set).forEach((key) => {
    const name = `set${key.charAt(0).toUpperCase() + key.slice(1)}`
    result[name] = (...opts) => dispatch?.(mediator.set[key](...opts))
  })
  Object.keys(mediator.actions).forEach((key) => {
    result[key] = (...opts) => dispatch?.(mediator.actions[key](...opts))
  })

  return result
}
MasterHook.useStorage = useStorage

export const createAction: IMasterHook['createAction'] = (action) => (...params) => () => {
  return action?.(...params)
}
MasterHook.createAction = createAction


export const getStore = () => {
  return MasterHook.store
}
MasterHook.getStore = getStore


export const createSelector: IMasterHook['createSelector'] = newSelector
MasterHook.createSelector = createSelector


export default MasterHook as IMasterHook