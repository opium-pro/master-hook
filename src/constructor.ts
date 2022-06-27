import { useStorage } from './storage/use-storage'
import { createStorage } from './storage/create-storage'
import { useAction } from './actions/use-action'
import { useSelector } from './selectors'
import type { MasterHook } from './index'

export function constructor<
  initialState = Record<string, any>,
  actions = Record<string, any>,
  selectors = Record<string, any>,
  >({
    storage,
    initialState,
    actions,
    selectors,
    cache,
  }: {
    storage?: string | string[] | Record<string, any>,
    actions?: actions,
    selectors?: selectors,
    initialState: initialState,
    cache?: Record<string, any>,
  }): MasterHook<initialState, actions, selectors> {

  Array.isArray(storage)
    ? storage.forEach(name => createStorage(name, initialState, cache))
    : typeof storage === 'object'
      ? Object.keys(storage).forEach(name => createStorage(name, initialState, cache, storage[name]))
      : createStorage(storage, initialState, cache)


  const useStorages = (subscribe) => {
    let result = {}
    if (Array.isArray(storage)) {
      storage.forEach(name => {
        result[name] = useStorage(name, subscribe)
      })
    } else if (typeof storage === 'object') {
      Object.keys(storage).forEach(name => {
        result[name] = useStorage(name, subscribe)
      })
    } else {
      result = useStorage(storage, subscribe)
    }
    return result
  }

  const useActions = () => {
    const result = {}
    actions && Object.keys(actions).forEach(key => {
      result[key] = useAction(actions[key])
    })
    return result
  }

  const useSelectors = (subscribe) => {
    const result = {}
    selectors && Object.keys(selectors).forEach(key => {
      if (subscribe === true || (Array.isArray(subscribe) && subscribe.includes(key))) {
        result[key] = useSelector(selectors[key])
      } else {
        result[key] = selectors[key]()
      }
    })

    return result
  }

  return (subscribe = true): any => ({
    ...useStorages(subscribe),
    ...useActions(),
    ...useSelectors(subscribe),
  })
}