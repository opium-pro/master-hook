import { getMediator } from '../mediators/get-mediator.js'
import { mediators } from '../collector.js'
import { useStorage } from './use-storage.js'

let storageIndex = 0

export async function createStorage(
  name: string,
  initialState,
  cache?: { [key: string]: number },
  defaultState = {},
) {
  !name && (name = 'masterhook-' + storageIndex++)

  if (mediators[name]) {
    return mediators[name]
  }

  Object.assign(defaultState, initialState, {
    isPending: false 
  })

  const mediator = getMediator( name, defaultState, cache)
  mediators[name] = mediator

  return () => useStorage(name, true)
}