import { constructor } from './constructor'

// !!! Don't change import order
import * as selectors from './selectors'
import * as storage from './storage'
import * as store from './store'
import * as localStorage from './local-storage'
import * as mediators from './mediators'
import * as actions from './actions'


export type MasterHook = typeof constructor
  & typeof selectors
  & typeof storage
  & typeof store
  & typeof actions
  & typeof localStorage
  & typeof mediators

const MasterHook: MasterHook = (constructor as MasterHook)

Object.keys(selectors).forEach((key) => MasterHook[key] = selectors[key])
Object.keys(storage).forEach((key) => MasterHook[key] = storage[key])
Object.keys(store).forEach((key) => MasterHook[key] = store[key])
Object.keys(actions).forEach((key) => MasterHook[key] = actions[key])
Object.keys(localStorage).forEach((key) => MasterHook[key] = localStorage[key])
Object.keys(mediators).forEach((key) => MasterHook[key] = mediators[key])


export default MasterHook

export * from './selectors'
export * from './storage'
export * from './store'
export * from './local-storage'
export * from './mediators'
export * from './actions'