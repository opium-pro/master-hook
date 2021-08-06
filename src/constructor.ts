import { makeHook } from './utils/make-hook'
import { getMediator } from './storage'
import { combineMediators } from './utils/combine-mediators'

export interface MasterHookArgs {
  storage?: string | string[],
  actions?: {[key: string]: any},
  selectors?: {[key: string]: any},
  initialState?: {[key: string]: any},
  cache?: {[key: string]: number},
}


export function constructor({
  storage,
  initialState,
  actions,
  selectors,
  cache,
}: MasterHookArgs) {

  const mediator = Array.isArray(storage)
    ? combineMediators(storage.map((storageName) => getMediator(storageName, initialState, cache)))
    : getMediator(storage, initialState, cache)

  return () => makeHook({
    ...mediator,
    actions,
    selectors,
  })
}