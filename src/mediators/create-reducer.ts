import { TAction } from './action-creator.js'

const identity = (v: any) => v

type THandlersMap = { [key: string]: THandlersAction }
type THandlersAction = { next?: any } & Function

export const createReducer = (actionsHandlerMap: THandlersMap, defaultState: Object) => {
  const handlerKeys = Object.keys(actionsHandlerMap)
  const handlers: any = handlerKeys.reduce((acc, key) => {
    const action: any = actionsHandlerMap[key];
    const isFunction = (typeof action === 'function')
    const handler = {
      next: isFunction ? action : (action.next || identity)
    }

    return Object.assign(acc, { [key]: handler })
  }, {})

  return (state: Object = defaultState, action: TAction): Object => {
    const actionType = action.type;
    const handler = handlers[actionType]

    if (handler) {
      return (handler.next)(state, action)
    }

    return state
  }
}