import { setCachedIfAllowed, getCached } from '../local-storage/cached'


export function makeDefaultActions(name, initialState, cache) {
  const actions: any = {}


  actions.reset = (state: Object, { payload }: any) => {
    let newState
    if (typeof payload === 'string') {
      newState = { ...state, [payload]: initialState[payload] }
    } else if (payload instanceof Object && !Array.isArray(payload)) {
      newState = payload
    } else {
      newState = initialState
    }
    setCachedIfAllowed(name, newState)
    return newState
  }


  actions.patch = (state: Object, { payload }: any) => {
    const newState = { ...state, ...payload }
    setCachedIfAllowed(name, newState)
    return newState
  }


  return actions
}