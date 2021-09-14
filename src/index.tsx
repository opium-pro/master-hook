import { constructor } from './constructor'

import * as selectors from './selectors'
import * as actions from './actions'
import * as storage from './storage'
import * as store from './store'
import * as localStorage from './local-storage'
import * as mediators from './mediators'
import * as globalActions from './global-actions'

export type MasterHook = typeof constructor
  & typeof selectors
  & typeof storage
  & typeof store
  & typeof actions
  & typeof localStorage
  & typeof mediators
  & typeof globalActions

const MasterHook: MasterHook = (constructor as MasterHook)

Object.keys(selectors).forEach((key) => MasterHook[key] = selectors[key])
Object.keys(storage).forEach((key) => MasterHook[key] = storage[key])
Object.keys(store).forEach((key) => MasterHook[key] = store[key])
Object.keys(actions).forEach((key) => MasterHook[key] = actions[key])
Object.keys(localStorage).forEach((key) => MasterHook[key] = localStorage[key])
Object.keys(mediators).forEach((key) => MasterHook[key] = mediators[key])
Object.keys(globalActions).forEach((key) => MasterHook[key] = globalActions[key])


export default MasterHook

export * from './selectors'
export * from './storage'
export * from './store'
export * from './actions'
export * from './local-storage'
export * from './mediators'
export * from './global-actions'