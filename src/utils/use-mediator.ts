export interface IGettersAndSetters {
  get: {[key: string]: (...a: any) => any}
  set: {[key: string]: (...a: any) => any}
  action: {[key: string]: (...a: any) => any}
  actions?: {[key: string]: (...a: any) => any}
  selectors?: {[key: string]: (...a: any) => any}
}

export const useMediator = (
  {
    get = {},
    set = {},
    action = {},
    actions = {},
    selectors = {},
  }: IGettersAndSetters,
  dispatch?: false | ((...a: any) => any),
  getState?: false | ((...a: any) => any),
  useSelector?: false | ((...a: any) => any),
) => {
  const handlers: {[key: string]: (...a: any) => any} = {}

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

  dispatch && Object.keys(action).forEach(key => {
    handlers[key] = (...args: any) => dispatch(action[key](...args))
  })

  Object.keys(actions).forEach(key => {
    if (actions[key].name === '__masterHookAction__') {
      // If this action was made by 'createAction',
      // then it already has dispatch inside
      // so we don't need to dispatch it
      handlers[key] = actions[key]
    } else if (dispatch) {
      handlers[key] = (...args: any) => dispatch(actions[key](...args))
    }
  })

  return handlers
}
