import { storages, reducers, mediators } from "./values"
import { createMediator } from './utils/create-mediator'
import { useMediator } from './utils/use-mediator'
import { getStore } from './store'
import { Mediator } from './utils/create-mediator'

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


export function getStorage(name: string, initialState = {}) {
  if (storages[name]) {
    return storages[name]
  }

  const mediator = createMediator(name, initialState)
  const storage = (dispatch?: any, getState?: any) => useMediator(mediator, dispatch, getState)

  reducers[name] = mediator.reducer
  mediators[name] = mediator
  storages[name] = storage
  return storage
}


export function getMediator(storage: string, initialState?: any): Mediator {
  !storage && (storage = 'master-hook-' + storageIndex++)

  if (!mediators[storage]) {
    getStorage(storage, initialState)
  }

  return mediators[storage]
}
