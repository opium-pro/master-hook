import { localStorage } from './local-storage'
import { mediators } from '../collector'


export async function getCached(name: string, withMeta = false, cache = mediators[name]?.cache || {}) {
  const cachedState = {}

  for (const key in cache) {
    const valueName = `${name}__${key}`
    const value = await localStorage.getWithHeaders(valueName)
    const now = new Date().getTime()
    const then = new Date(value?.timestamp).getTime()

    if (cache[key] === 0 || (then + cache[key] > now)) {
      if (value) {
        cachedState[key] = withMeta ? value : value.body
      }
    } else {
      localStorage.removeItem(valueName)
    }
  }

  return cachedState
}


export async function clearCache(name: string, value?: string) {
  if (!name) {
    for (const storageName in mediators) {
      clear(storageName)
    }
  } else {
    clear(name)
  }

  function clear(storageName) {
    const cache = mediators[storageName]?.cache || {}

    if (typeof value === 'string') {
      const valueName = `${storageName}__${value}`
      localStorage.removeItem(valueName)
    } else for (const key in cache) {
      const valueName = `${storageName}__${key}`
      localStorage.removeItem(valueName)
    }
  }
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