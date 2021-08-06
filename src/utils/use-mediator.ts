
export interface IGettersAndSetters {
  get: { [key: string]: any }
  set: { [key: string]: any }
  action: { [key: string]: any }
  actions?: { [key: string]: any }
  selectors?: { [key: string]: any }
}

export interface IMediatorOptions {
  dispatch?: false | ((...a: any) => any),
  getState?: false | ((...a: any) => any),
  useSelector?: false | ((...a: any) => any),
  setLocal?: (item: string, value: any) => any,
}

export const useMediator = (
  {
    get = {},
    set = {},
    action = {},
    actions = {},
    selectors = {},
  }: IGettersAndSetters,
  {
    dispatch,
    getState,
    useSelector,
    setLocal,
  }: IMediatorOptions
) => {
  const handlers: { [key: string]: any } = {}

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
    const name = `set${key.charAt(0).toUpperCase() + key.slice(1)}`
    handlers[name] = (...args: any) => {
      getState && setLocal?.(key, get[key](getState()))
      return dispatch(set[key](...args))
    }
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
