import { useMediator } from '../mediators'
import { setIsPending } from './common-actions'


export const actions = {}


export function force(calledAction) {
  if (calledAction.type === '__MASTERHOOK_STOP_EXECUTION__') {
    const { action, args, setIsPendingTo } = calledAction
    return execute(action, args, setIsPendingTo)(true)
  } else {
    return calledAction
  }
}


export type ActionOptions = {
  setIsPendingTo?: string[] | string,
  canRepeatIn?: number,
} | number | string | string[]



export function createAction(action, ...options: ActionOptions[]) {
  let setIsPendingTo: string[]
  let canRepeatIn: number

  options?.forEach(function normalizeOptions(option) {
    typeof option === 'number' && (canRepeatIn = option)
    typeof option === 'string' && (setIsPendingTo = [option])
    Array.isArray(option) && (setIsPendingTo = option)
    if (option instanceof Object) {
      Object.values(option).forEach(normalizeOptions)
    }
  })

  actions[action] = { setIsPendingTo, canRepeatIn, timestamp: undefined }

  return function __masterHookAction__(...args: any) {
    const now = new Date().getTime()
    let canExecute = true
    const { timestamp } = actions[action]

    if (canRepeatIn && timestamp && (canRepeatIn === 0 || timestamp + canRepeatIn > now)) {
      canExecute = false
    }

    return execute(action, args, setIsPendingTo)(canExecute)
  }
}


function execute(action, args, setIsPendingTo) {
  return (canExecute) => {
    if (!canExecute) {
      return {
        type: '__MASTERHOOK_STOP_EXECUTION__',
        action,
        args,
        setIsPendingTo,
      }
    }

    const actionResult = action(...args)

    if (actionResult instanceof Promise && setIsPendingTo) {
      setIsPending(true, setIsPendingTo)
      return actionResult.then((result) => {
        actions[action].timestamp = new Date().getTime()
        return result
      }).finally(() => {
        setIsPending(false, setIsPendingTo)
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