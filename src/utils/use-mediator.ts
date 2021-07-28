import {useSelector, useDispatch} from 'react-redux'

interface IGettersAndSetters {
  get: any;
  set: any;
  actions?: any;
  selectors?: any
}

export const useMediator = ({get = {}, set = {}, actions = {}, selectors = {}}: IGettersAndSetters) => {
  const handlers: any = {};

  const dispatch = useDispatch();

  Object.keys(get).forEach(key => {
    handlers[key] = useSelector(state => get[key](state))
  })

  Object.keys(selectors).forEach(key => {
    handlers[key] = useSelector(state => selectors[key](state))
  })

  Object.keys(set).forEach(key => {
    const name = `set${key.charAt(0).toUpperCase() + key.slice(1)}`;
    handlers[name] = (...args: any) => dispatch(set[key](...args))
  })

  Object.keys(actions).forEach(key => {
    handlers[key] = (...args: any) => dispatch(actions[key](...args))
  })

  return handlers;
};
