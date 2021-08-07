import { useStorage, storages } from '../storage'
import { localStorage } from '../local-storage'


export function setIsPending(value, storeNames) {
  for (const storageName of storeNames) {
    const { setIsPending } = useStorage(storageName)
    setIsPending(value)
  }
}


export async function unstash() {
  for (const key in storages) {
    const { stash, name } = storages[key]
    const { patch } = useStorage(name)

    if (stash) {
      const cachedState = {}
      for (const key in stash) {
        const value = await localStorage.getWithHeaders(`${name}__${key}`)
        const now = new Date().getTime()
        const then = new Date(value?.timestamp).getTime()
        if (stash[key] === 0 || (then + stash[key] > now)) {
          cachedState[key] = value?.body
        }
      }
      patch(cachedState)
    }
  }
}