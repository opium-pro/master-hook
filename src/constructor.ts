import { useStorage } from './storage/use-storage'
import { createStorage } from './storage/create-storage'
import { useAction } from './actions/use-action'
import { useSelector } from './selectors'

export type MasterHookArgs = {
  storage?: string | string[],
  actions?: { [key: string]: any },
  selectors?: { [key: string]: any },
  initialState: { [key: string]: any },
  cache?: { [key: string]: number },
}


export function constructor({
  storage,
  initialState,
  actions,
  selectors,
  cache,
}: MasterHookArgs) {

  Array.isArray(storage)
    ? storage.forEach(name => createStorage(name, initialState, cache))
    : createStorage(storage, initialState, cache)


  const useStorages = (subscribe) => {
    let result = {}
    if (Array.isArray(storage)) {
      storage.forEach(name => {
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

  return (subscribe = true as string[] | boolean): any => ({
    ...useStorages(subscribe),
    ...useActions(),
    ...useSelectors(subscribe),
  })
}