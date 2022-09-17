import { useStorage } from '../storage/use-storage.js'
import { getCached } from '../local-storage/cached.js'
import { mediators } from '../collector.js'
import { createAction } from './create-action.js'


export function setIsPending(value, storeNames = Object.keys(mediators)) {
  for (const storageName of storeNames) {
    const { setIsPending } = useStorage(storageName)
    setIsPending(value)
  }
}


export function reset(value = undefined) {
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