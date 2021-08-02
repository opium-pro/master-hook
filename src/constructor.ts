import { makeHook } from './utils/make-hook'
import { getMediator } from './storage'
import { combineMediators } from './utils/combine-mediators'

export interface MasterHookArgs {
  storage?: string | string[],
  actions?: any,
  selectors?: any,
  initialState?: any,
}


export function constructor({
  storage,
  initialState,
  actions,
  selectors,
}: MasterHookArgs) {

  const mediator = Array.isArray(storage)
    ? combineMediators(storage.map((storageName) => getMediator(storageName, initialState)))
    : getMediator(storage, initialState)

  return () => makeHook({
    ...mediator,
    actions,
    selectors,
  })
}