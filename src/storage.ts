import { getMediator, useMediator } from './mediators'
import { useSubscribedMediator } from './mediators'

let storageIndex = 0
export const mediators = {}


export function useStorage(name: string, subscribe?: boolean) {
  const mediator = mediators[name]

  if (!mediator) {
    console.error(`You address an unexisting storage: '${name}'`)
    return undefined
  }

  return subscribe
    ? useSubscribedMediator(mediator, name)
    : useMediator(mediator, name)
}


export function getStorage(name) {
  if (!mediators[name]) {
    console.error(`MasterHook. Storage you ask does not exist: ${name}`)
  }

  return mediators[name]
}


export function createStorage(name: string, initialState, cache?: { [key: string]: number }) {
  !name && (name = 'masterhook-' + storageIndex++)

  if (mediators[name]) {
    return mediators[name]
  }

  const defaultState = {
    isPending: false,
  }

  const mediator = getMediator(name, {...defaultState, ...initialState}, cache)
  mediators[name] = mediator

  return () => useStorage(name, true)
}