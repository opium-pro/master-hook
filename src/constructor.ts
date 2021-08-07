import { useStorage, createStorage } from './storage'
import { useAction } from './actions'
import { useSelector } from './selectors'

export interface MasterHookArgs {
  storage?: string | string[],
  actions?: { [key: string]: any },
  selectors?: { [key: string]: any },
  initialState?: { [key: string]: any },
  stash?: { [key: string]: number },
}


export function constructor({
  storage,
  initialState,
  actions,
  selectors,
  stash,
}: MasterHookArgs) {

  Array.isArray(storage)
    ? storage.forEach(name => createStorage(name, initialState, stash))
    : createStorage(storage, initialState, stash)


  const useStorages = () => {
    let result = {}
    if (Array.isArray(storage)) {
      storage.forEach(name => {
        result[name] = useStorage(name, true)
      })
    } else {
      result = useStorage(storage, true)
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

  const useSelectors = () => {
    const result = {}
    selectors && Object.keys(selectors).forEach(key => {
      result[key] = useSelector(selectors[key])
    })
    
    return result
  }

  return (): any => ({
    ...useStorages(),
    ...useActions(),
    ...useSelectors(),
  })
}