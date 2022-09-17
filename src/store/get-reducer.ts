import { mediators } from '../collector.js'
import { combineReducers } from 'redux'
import { externalReducers } from './settings.js'


export function getReducer() {
  const reducers = {...externalReducers}
  Object.keys(mediators).forEach(key => {
    reducers[key] = mediators[key]?.reducer
  })
  return combineReducers(reducers)
}