import { localStorage } from './local-storage'
import { mediators } from '../collector'


export async function getCached(name) {
  const cache = mediators[name]?.cache || {}

  const cachedState = {}
  for (const key in cache) {
    const value = await localStorage.getWithHeaders(`${name}__${key}`)
    const now = new Date().getTime()
    const then = new Date(value?.timestamp).getTime()
    if (cache[key] === 0 || (then + cache[key] > now)) {
      cachedState[key] = value?.body
    } else {
      localStorage.removeItem(`${name}__${key}`)
    }
  }
  console.log('>>>>', cachedState)
  return cachedState
}


export async function setCachedIfAllowed(name: string, keyOrValues: string | object, value?: any) {
  const cache = mediators[name]?.cache
  if (!cache) { return }

  if (typeof keyOrValues === 'string') {
    set(keyOrValues)
  } else {
    for (const key in keyOrValues) {
      set(key, keyOrValues[key])
    }
  }

  function set(key, newValue = value) {
    if (typeof cache[key] === 'number') {
      localStorage?.setItem?.(`${name}__${key}`, newValue)
    }
  }
}