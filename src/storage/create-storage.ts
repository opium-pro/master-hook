import { getMediator } from '../mediators/get-mediator'
import { mediators } from '../collector'
import { useStorage } from './use-storage'

let storageIndex = 0

export async function createStorage(
  name: string,
  initialState,
  cache?: { [key: string]: number }
) {
  !name && (name = 'masterhook-' + storageIndex++)

  if (mediators[name]) {
    return mediators[name]
  }

  const defaultState = { isPending: false }

  const mediator = getMediator( name, { ...defaultState, ...initialState }, cache)
  mediators[name] = mediator

  return () => useStorage(name, true)
}