import { makeHook } from './utils/make-hook'
import { getMediator } from './storage'

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

  let mediator: any = {}

  if (Array.isArray(storage)) {
    for (const storageName of storage) {
      const newMediator = getMediator(storageName, initialState)
      mediator.get = {...mediator.get, ...newMediator.get}
      mediator.set = {...mediator.set, ...newMediator.set}
      mediator.actions = {...mediator.actions, ...newMediator.actions}
      mediator.selectors = {...mediator.selectors, ...newMediator.selectors}
    }
  } else {
    mediator = getMediator(storage, initialState)
  }

  return () => makeHook({
    ...mediator,
    actions,
    selectors,
  })
}