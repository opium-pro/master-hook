export interface IGettersAndSetters {
  get: any;
  set: any;
  actions?: any;
  selectors?: any
}

export const useMediator = (
  {get = {}, set = {}, actions = {}, selectors = {}}: IGettersAndSetters,
  dispatch?: any,
  getState?: any,
  useSelector?: any,
) => {
  const handlers: any = {}

  getState && Object.keys(get).forEach(key => {
    handlers[key] = get[key](getState())
  })

  getState && Object.keys(selectors).forEach(key => {
    handlers[key] = selectors[key](getState())
  })

  useSelector && Object.keys(get).forEach(key => {
    handlers[key] = useSelector(state => get[key](state))
  })

  useSelector && Object.keys(selectors).forEach(key => {
    handlers[key] = useSelector(state => selectors[key](state))
  })

  dispatch && Object.keys(set).forEach(key => {
    const name = `set${key.charAt(0).toUpperCase() + key.slice(1)}`;
    handlers[name] = (...args: any) => dispatch(set[key](...args))
  })

  dispatch && Object.keys(actions).forEach(key => {
    handlers[key] = (...args: any) => dispatch(actions[key](...args))
  })

  return handlers
}
