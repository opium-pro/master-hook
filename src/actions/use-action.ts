import { useMediator } from '../mediators/use-mediator'


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