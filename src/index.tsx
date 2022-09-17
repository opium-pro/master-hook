// !!! Don't change import order
import { constructor } from './constructor.js'
import * as collector from './collector.js'
import * as selectors from './selectors/index.js'
import * as storage from './storage/index.js'
import * as store from './store/index.js'
import * as localStorage from './local-storage/index.js'
import * as mediators from './mediators/index.js'
import * as actions from './actions/index.js'

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

export * from './collector.js'
export * from './selectors/index.js'
export * from './storage/index.js'
export * from './store/index.js'
export * from './local-storage/index.js'
export * from './mediators/index.js'
export * from './actions/index.js'