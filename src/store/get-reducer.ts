import { mediators } from '../collector'
import { combineReducers } from 'redux'
import { externalReducers } from './settings'


export function getReducer() {
  const reducers = {...externalReducers}
  Object.keys(mediators).forEach(key => {
    reducers[key] = mediators[key]?.reducer
  })
  return combineReducers(reducers)
}