import { useMediator, useSubscribedMediator } from '../mediators/use-mediator'
import { mediators } from '../collector'


export function useStorage(name: string, subscribe?: boolean) {
  const mediator = mediators[name]

  if (!mediator) {
    console.error(`You address an unexisting storage: '${name}'`)
    return undefined
  }

  return subscribe
    ? useSubscribedMediator(mediator, name)
    : useMediator(mediator, name)
}