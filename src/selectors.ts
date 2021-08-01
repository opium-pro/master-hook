import { mediators } from './state'


export function getSelector(storage: string) {
  if (!mediators[storage]) {
    console.error(`You are trying to get a selector of as unexisting storage: '${storage}'`)
  }
  const mediator: any = mediators[storage]
  return mediator?.get
}


export function createAction(action: any) {
  return (...params) => () => {
    return action?.(...params)
  }
}


export { createSelector } from 'reselect'