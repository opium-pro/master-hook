import { constructor } from './constructor'

// !!! Don't change import order
import * as selectors from './selectors'
import * as storage from './storage'
import * as store from './store'
import * as localStorage from './local-storage'
import * as mediators from './mediators'
import * as actions from './actions'


export type MasterHook<
  initialState = { [storageName: string]: any },
  actions = { [actionName: string]: any },
  selectors = { [selectorName: string]: any },
  > =
  (subscribe?: (keyof initialState)[]) => {
    [actionKey in keyof actions]: actions[actionKey]
  } & {
      [selectorKey in keyof selectors]: selectors[selectorKey]
    } & {
      [initialKey in keyof initialState]: initialState[initialKey]
    } & {
      [initialKey in `set${Capitalize<string & keyof initialState>}`]: any
    }

export const MasterHook = constructor

Object.keys(selectors).forEach((key) => MasterHook[key] = selectors[key])
Object.keys(storage).forEach((key) => MasterHook[key] = storage[key])
Object.keys(store).forEach((key) => MasterHook[key] = store[key])
Object.keys(actions).forEach((key) => MasterHook[key] = actions[key])
Object.keys(localStorage).forEach((key) => MasterHook[key] = localStorage[key])
Object.keys(mediators).forEach((key) => MasterHook[key] = mediators[key])


export default MasterHook as typeof constructor
  & typeof selectors
  & typeof storage
  & typeof store
  & typeof actions
  & typeof localStorage
  & typeof mediators

export * from './selectors'
export * from './storage'
export * from './store'
export * from './local-storage'
export * from './mediators'
export * from './actions'