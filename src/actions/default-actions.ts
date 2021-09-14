import { useStorage } from '../storage/use-storage'
import { getCached } from '../local-storage/cached'
import { mediators } from '../collector'
import { createAction } from './create-action'


export function setIsPending(value, storeNames) {
  for (const storageName of storeNames) {
    const { setIsPending } = useStorage(storageName)
    setIsPending(value)
  }
}


export const setFromCache = createAction(async (name?: string) => {
  if (name) {
    await set(name)
  } else {
    for (const key in mediators) {
      await set(key)
    }
  }

  async function set(storage) {
    const { patch } = useStorage(storage)
    const cached = await getCached(storage)
    cached && patch(cached)
  }
})