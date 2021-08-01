import { useDispatch, useSelector } from 'react-redux'
import { useMediator, IGettersAndSetters } from './use-mediator'


export function makeHook(mediator: IGettersAndSetters) {
  const dispatch = useDispatch()

  return useMediator(mediator, dispatch, false, useSelector)
}