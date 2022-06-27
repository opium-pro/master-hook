// !!! Don't change import order
import { constructor } from './constructor'
import * as collector from './collector'
import * as selectors from './selectors'
import * as storage from './storage'
import * as store from './store'
import * as localStorage from './local-storage'
import * as mediators from './mediators'
import * as actions from './actions'

export const MasterHook = constructor

export type MasterHook<
  initialState = Record<string, any>,
  actions = Record<string, any>,
  selectors = Record<string, any>,
  > =
  (subscribe?: Array<keyof initialState | keyof selectors | 'isPending'> | boolean) => {
    [actionKey in keyof actions]: actions[actionKey]
  } & {
      [selectorKey in keyof selectors]: selectors[selectorKey]
    } & {
      [initialKey in keyof initialState]: initialState[initialKey]
    } & {
      [initialKey in `set${Capitalize<string & keyof initialState>}`]: any
    } & {
      isPending?: boolean,
      setIsPending?: (value?: boolean) => void,
      patch?: (state: Partial<initialState>) => void,
      reset?: (state?: Partial<initialState>) => void,
    }

Object.assign(MasterHook, selectors, storage, store, actions, localStorage, mediators, collector)

export default MasterHook as typeof constructor
  & typeof selectors
  & typeof storage
  & typeof store
  & typeof actions
  & typeof localStorage
  & typeof mediators
  & typeof collector

export * from './collector'
export * from './selectors'
export * from './storage'
export * from './store'
export * from './local-storage'
export * from './mediators'
export * from './actions'