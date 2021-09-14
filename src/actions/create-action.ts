import { setIsPending } from './default-actions'
import { actions } from '../collector'


export type ActionOptions = {
  setIsPendingTo?: string[] | string
  canRepeatIn?: number
} | number | string | string[]


export function createAction(action, ...options: ActionOptions[]) {
  let setIsPendingTo: string[]
  let canRepeatIn: number

  options?.forEach(function normalizeOptions(option) {
    if (option instanceof Object && !Array.isArray(option)) {
      canRepeatIn = option.canRepeatIn
      setIsPendingTo = Array.isArray(option.setIsPendingTo) ? option.setIsPendingTo : [option.setIsPendingTo]
    } else {
      typeof option === 'number' && (canRepeatIn = option)
      typeof option === 'string' && (setIsPendingTo = [option])
      Array.isArray(option) && (setIsPendingTo = option)
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


export function force(calledAction) {
  if (calledAction.type === '__MASTERHOOK_STOP_EXECUTION__') {
    const { action, args, setIsPendingTo } = calledAction
    return execute(action, args, setIsPendingTo)(true)
  } else {
    return calledAction
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
      actions[action].timestamp = new Date().getTime()
      return actionResult
    }
  }
}


