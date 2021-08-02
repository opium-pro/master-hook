import { mediators } from './values'
import { Mediator } from './utils/create-mediator'


export function getSelector(storage: string) {
  if (!mediators[storage]) {
    console.error(`You are trying to get a selector of as unexisting storage: '${storage}'`)
  }
  const mediator: Mediator = mediators[storage]
  return mediator?.get
}


export { createSelector } from 'reselect'