import { makeDefaultActions } from './default-actions.js'
import { actionCreator } from './action-creator.js'
import { createReducer } from './create-reducer.js'
import { mediators } from '../collector.js'
// import { getCached } from '../local-storage.js'


export interface Mediator {
  set: { [key: string]: any }
  get: { [key: string]: any }
  reducer?: { [key: string]: any }
  defaultActions: { [key: string]: any }
  initialState?: { [key: string]: any }
  cache?: { [key: string]: any }
  name: string
  handlers?: any
}


export function getMediator (
  name: string,
  initialState?: { [key: string]: any },
  cache?: { [key: string]: any }
): Mediator {
  if (mediators[name]) {
    return mediators[name]
  }

  const keys = Object.keys(initialState)

  const set: any = keys.reduce(
    (result, key: string) => {
      const actionName = `${name.toUpperCase()}_${key.toUpperCase()}`
      return {
        ...result,
        [key]: actionCreator(actionName, (value: any) => ({ value }))
      }
    },
    {},
  )

  const get: any = (state: { [key: string]: [value: any] }) => {
    if (!state[name]) {
      throw new Error(`MasterHook. State '${name}' not found.`);
    }

    return state[name]
  }

  keys.forEach((key: string) =>
    Object.defineProperty(get, key, {
      enumerable: true,
      value: (state: Object) => {
        const storeData = get(state);

        return storeData ? storeData[key] : undefined;
      }
    }))


  const defaultActionCreators = {}
  const defaultActionHandlers = {}
  const defaultActions = makeDefaultActions(name, initialState, cache)

  Object.keys(defaultActions).forEach(key => {
    const createdAction = actionCreator(`${name.toUpperCase()}_${key.toUpperCase()}`)
    defaultActionCreators[key] = createdAction
    defaultActionHandlers[createdAction] = defaultActions[key]
  })

  const handlers = keys.reduce(
    (result: Object, key) => ({
      ...result,
      [set[key]]: (state: Object, { payload: { value } }: any) => ({ ...state, [key]: value })
    }),
    defaultActionHandlers,
  )

  // const cached = await getCached(name, false, cache)

  return {
    set,
    get,
    defaultActions: defaultActionCreators,
    reducer: createReducer(handlers, initialState),
    initialState,
    cache,
    name,
    handlers,
  }
}
