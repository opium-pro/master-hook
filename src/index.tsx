import { constructor } from "./constructor"

import * as selectors from './selectors'
import * as storage from './storage'
import * as store from './store'
import * as actions from './actions'

export type MasterHook = typeof constructor
  & typeof selectors
  & typeof storage
  & typeof store
  & typeof actions


const MasterHook: MasterHook = (constructor as MasterHook)

MasterHook.getSelector = selectors.getSelector
MasterHook.createSelector = selectors.createSelector
MasterHook.useStorage = storage.useStorage
MasterHook.getStorage = storage.getStorage
MasterHook.getMediator = storage.getMediator
MasterHook.getReducer = store.getReducer
MasterHook.getStore = store.getStore
MasterHook.Provider = store.Provider
MasterHook.createAction = actions.createAction

export default MasterHook

export * from './selectors'
export * from './storage'
export * from './store'
export * from './actions'