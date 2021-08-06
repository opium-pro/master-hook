import { storages, reducers, mediators, initials } from "./values"
import { createMediator } from './utils/create-mediator'
import { useMediator } from './utils/use-mediator'
import { getStore } from './store'
import { Mediator } from './utils/create-mediator'
import { localStorage } from './local-storage'

let storageIndex = 0


export function useStorage(storage: string, dispatch?: any, getState?: any) {
  if (!storages[storage]) {
    console.error(`You address an unexisting storage: '${storage}'`)
    return
  }
  const store = getStore()

  if (!store) {
    console.error(`There is no store for: '${storage}'`)
    return
  }
  const useDispatch = dispatch === undefined ? store.dispatch : dispatch
  const useGetState = getState === undefined ? store.getState : getState
  return storages[storage]?.(useDispatch, useGetState)
}


export async function getStorage(name: string, initialState = {}, cache?: { [key: string]: number }) {
  if (storages[name]) {
    return storages[name]
  }

  const state = {...initialState}

  if (cache) {
    for (const key in cache) {
      const value = await localStorage.getWithHeaders(`masterhook__${name}__${key}`)
      const now = new Date().getTime()
      const then = new Date(value?.timestamp).getTime()
      if (!cache[key] || (then + cache[key] > now)) {
        state[key] = value?.body
      }
    }
  }

  const mediator = createMediator(name, state, initialState)
  const storage = (dispatch?: any, getState?: any) =>
    useMediator(
      mediator,
      {
        dispatch,
        getState,
        setLocal: (item, value) => localStorage.setItem(`masterhook__${name}__${item}`, value)
      }
    )

  reducers[name] = mediator.reducer
  mediators[name] = mediator
  storages[name] = storage
  initials[name] = {initialState, cache}
  return storage
}


export function getMediator(storage: string, initialState?: any, cache?: { [key: string]: number }): Mediator {
  !storage && (storage = 'master-hook-' + storageIndex++)

  if (!mediators[storage]) {
    getStorage(storage, initialState, cache)
  }

  return mediators[storage]
}
