import { mediators } from '../collector.js'


export function getStorage(name) {
  if (!mediators[name]) {
    console.error(`MasterHook. Storage you ask does not exist: ${name}`)
  }
  return mediators[name]
}
