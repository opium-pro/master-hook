import { getStore } from './store'
import { useMediator } from './mediators'


export function createAction(action) {
  return function __masterHookAction__(...args: any) {
    const store = getStore()
    const dispatch = store?.dispatch
    return dispatch(() => action(...args))
  }
}


export function useAction(action) {
  if (action.name === '__masterHookAction__') {
    // If this action was made by 'createAction',
    // then it already has dispatch inside
    // so we don't need to dispatch it
    return action
  } else {
    return useMediator({actions: {action}})[action]
  }
}