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


export function reset(value) {
  for (const storageName in mediators) {
    const { reset } = useStorage(storageName)
    if (!value) {
      reset()
    } else if (storageName in value) {
      reset(value?.[storageName])
    }
  }
}


export const setFromCache = createAction(async (name?: string) => {
  const stack = []
  if (name) {
    stack.push(set(name))
  } else {
    for (const key in mediators) {
      stack.push(set(key))
    }
  }

  return Promise.all(stack)

  async function set(storage) {
    const { patch } = useStorage(storage)
    const cached = await getCached(storage)
    cached && patch(cached, false)
  }
})