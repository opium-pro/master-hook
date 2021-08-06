
export function makeDefaultActions(name, initialState, cache) {
  const actions: any = {}

  actions.reset = (state: Object, { payload }: any) => {
    let newState
    if (typeof payload === 'string') {
      newState = { ...state, [payload]: initialState[payload] }
    } else if (payload instanceof Object) {
      newState = payload
    } else {
      newState = initialState
    }
    return newState
  }


  actions.patch = (state: Object, { payload }: any) => {
    const newState = { ...state, ...payload }
    return newState
  }

  return actions
}