import { getStore } from '../store'
import { localStorage } from '../local-storage'
import { useSelector } from 'react-redux'
import { storages } from '../storage'


export function useSubscribedMediator(mediator, storageName?: string) {
  const hook = useMediator(mediator, storageName)
  const { get } = mediator

  Object.keys(get).forEach(key => {
    hook[key] = useSelector(state => get[key]?.(state))
  })

  return hook
}


export function useMediator({
  get,
  set,
  actions
}: {
  get?: { [key: string]: any }
  set?: { [key: string]: any }
  actions?: { [key: string]: any }
}, storageName?: string) {
  const store = getStore()
  const dispatch = store?.dispatch
  const getState = store?.getState

  if (!store) {
    console.error(`MasterHook. Store does not exist yet`)
    return undefined
  }

  const handlers: { [key: string]: any } = {}

  get && Object.keys(get).forEach(key => {
    handlers[key] = get[key](getState())
  })

  set && Object.keys(set).forEach(key => {
    const name = `set${key.charAt(0).toUpperCase() + key.slice(1)}`
    handlers[name] = (value: any) => {
      const cache = storages[storageName]?.cache || {}
      if (typeof cache[key] === 'number') {
        localStorage?.setItem?.(`${storageName}__${key}`, value)
      }
      return dispatch(set[key](value))
    }
  })

  actions && Object.keys(actions).forEach(key => {
    handlers[key] = (...args: any) => dispatch(actions[key](...args))
  })

  return handlers
}
