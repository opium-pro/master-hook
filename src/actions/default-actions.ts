import { useStorage } from '../storage/use-storage'
import { getCached } from '../local-storage/cached'
import { mediators } from '../collector'


export function setIsPending(value, storeNames) {
  for (const storageName of storeNames) {
    const { setIsPending } = useStorage(storageName)
    setIsPending(value)
  }
}


export async function setFromCache(name?: string) {
  if (name) {
    set(name)
  } else {
    for (const key in mediators) {
      set(key)
    }
  }

  function set(storage) {
    const { fetch } = useStorage(storage)
    const cached = getCached(storage)
    cached && fetch(cached)
  }
}