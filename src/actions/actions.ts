import { useMediator } from '../mediators'
import { setIsLoading } from './common-actions'


export function createAction(action, setIsLoadingTo?: string[]) {
  return function __masterHookAction__(...args: any) {
      const actionResult = action(...args)

      if (actionResult instanceof Promise && setIsLoadingTo) {
        setIsLoading(true, setIsLoadingTo)
        return actionResult.then((result) => {
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