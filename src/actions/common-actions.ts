import { createAction } from './actions'
import { useStorage, storages } from '../storage'
import { localStorage } from '../local-storage'


export const setFromCache = createAction(async () => {
  for (const key in storages) {
    const { cache, name } = storages[key]
    const { patch } = useStorage(name)

    if (cache) {
      const cachedState = {}
      for (const key in cache) {
        const value = await localStorage.getWithHeaders(`${name}__${key}`)
        const now = new Date().getTime()
        const then = new Date(value?.timestamp).getTime()
        if (cache[key] === 0 || (then + cache[key] > now)) {
          cachedState[key] = value?.body
        }
      }
      patch(cachedState)
    }
  }

})