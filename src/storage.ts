import { getMediator, useMediator } from './mediators'
import { useSubscribedMediator } from './mediators'

let storageIndex = 0
export const storages = {}


export function useStorage(name: string, subscribe?: boolean) {
  const mediator = storages[name]

  if (!mediator) {
    console.error(`You address an unexisting storage: '${name}'`)
    return undefined
  }

  return subscribe
    ? useSubscribedMediator(mediator, name)
    : useMediator(mediator, name)
}


export function getStorage(name) {
  if (!storages[name]) {
    console.error(`MasterHook. Storage you ask does not exist: ${name}`)
  }

  return storages[name]
}


export function createStorage(name: string, initialState, cache?: { [key: string]: number }) {
  !name && (name = 'masterhook-' + storageIndex++)
  const defaultState = {
    isLoading: false,
  }

  if (storages[name]) {
    return storages[name]
  }

  const mediator = getMediator(name, {...defaultState, ...initialState}, cache)
  storages[name] = mediator

  return mediator
}