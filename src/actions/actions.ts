import { useMediator } from '../mediators'
import { setIsLoading } from './common-actions'


export const actions = {}


export function force(calledAction) {
  if (calledAction.type === '__MASTERHOOK_STOP_EXECUTION__') {
    const { action, args, setIsLoadingTo } = calledAction
    return execute(action, args, setIsLoadingTo)(true)
  } else {
    return calledAction
  }
}


export type ActionOptions = {
  setIsLoading?: string[] | string,
  cache?: number,
} | number | string | string[]



export function createAction(action, ...options: ActionOptions[]) {
  let setIsLoading: string[]
  let cache: number

  options?.forEach(function normalizeOptions(option) {
    typeof option === 'number' && (cache = option)
    typeof option === 'string' && (setIsLoading = [option])
    Array.isArray(option) && (setIsLoading = option)
    if (option instanceof Object) {
      Object.values(option).forEach(normalizeOptions)
    }
  })

  actions[action] = { setIsLoading, cache, timestamp: undefined }

  return function __masterHookAction__(...args: any) {
    const now = new Date().getTime()
    let canExecute = true
    const { timestamp } = actions[action]

    if (cache && timestamp && (cache === 0 || timestamp + cache > now)) {
      canExecute = false
    }

    return execute(action, args, setIsLoading)(canExecute)
  }
}


function execute(action, args, setIsLoadingTo) {
  return (canExecute) => {
    if (!canExecute) {
      return {
        type: '__MASTERHOOK_STOP_EXECUTION__',
        action,
        args,
        setIsLoadingTo
      }
    }

    const actionResult = action(...args)

    if (actionResult instanceof Promise && setIsLoadingTo) {
      setIsLoading(true, setIsLoadingTo)
      return actionResult.then((result) => {
        actions[action].timestamp = new Date().getTime()
        return result
      }).finally(() => {
        setIsLoading(false, setIsLoadingTo)
      })
    } else {
      return actionResult
    }
  }
}


export function useAction(action) {
  if (action.name === '__masterHookAction__') {
    // If this action was made by 'createAction',
    // then it already has dispatch inside
    // so we don't need to dispatch it
    return action
  } else {
    return useMediator({ actions: { action } }).action
  }
}