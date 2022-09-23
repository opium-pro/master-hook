import { useMediator, useSubscribedMediator } from '../mediators/use-mediator.js'
import { mediators } from '../collector.js'


export function useStorage(name: string, subscribe?: any[] | boolean) {
  const mediator = mediators[name]

  if (!mediator) {
    console.error(`You address an unexisting storage: '${name}'`)
    return undefined
  }

  return subscribe
    ? useSubscribedMediator(mediator, name, subscribe)
    : useMediator(mediator, name)
}

export const attachStorage = useStorage