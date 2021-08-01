import { storages, reducers, mediators } from "./state"
import { createMediator } from './utils/create-mediator'
import { useMediator } from './utils/use-mediator'

let storageIndex = 0


export function useStorage (storage: string) {
  if (!storages[storage]) {
    console.error(`You address an unexisting storage: '${storage}'`)
  }
  return storages[storage]?.()
}


export function getStorage (name: string, initialState = {}) {
  if (storages[name]) {
    return storages[name]
  }

  const mediator = createMediator(name, initialState)
  const storage = () => useMediator(mediator)

  reducers[name] = mediator.reducer
  mediators[name] = mediator
  storages[name] = storage
  return storage
}


export function getMediator (storage: string, initialState?: any) {
  !storage && (storage = 'master-hook-' + storageIndex++)

  if (!mediators[storage]) {
    getStorage(storage, initialState)
  }

  return mediators[storage]
}