import { getStore } from './store'

export function createAction(action) {
  return function __masterHookAction__(...args: any) {
    const { dispatch } = getStore()
    return dispatch(() => action(...args))
  }
}