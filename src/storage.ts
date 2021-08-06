import { localStorage } from './local-storage'
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

  return subscribe ? useSubscribedMediator(mediator, name) : useMediator(mediator, name)
}


export function createStorage(name: string, initialState = {}, cache?: { [key: string]: number }) {
  !name && (name = 'masterhook-' + storageIndex++)

  if (storages[name]) {
    return storages[name]
  }

  // if (cache) {
  //   for (const key in cache) {
  //     localStorage.getWithHeaders(`masterhook__${name}__${key}`).then((value) => {
  //       const now = new Date().getTime()
  //       const then = new Date(value?.timestamp).getTime()
  //       if (!cache[key] || (then + cache[key] > now)) {
  //         state[key] = value?.body
  //       }
  //     })
  //   }
  // }

  const mediator = getMediator(name, initialState)
  storages[name] = mediator
  return mediator
}