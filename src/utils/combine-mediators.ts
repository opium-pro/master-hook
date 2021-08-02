import { Mediator } from './create-mediator'

export function combineMediators([firstMediator, ...mediators]: Mediator[]) {
  const newMediator = {
    get: {...firstMediator.get},
    set: {...firstMediator.set},
    action: {...firstMediator.action},
    reducer: [firstMediator.reducer],
    name: [firstMediator.name],
  }

  for (const { name, get, set, reducer, action } of mediators) {
    newMediator.reducer.push(reducer)
    newMediator.name.push(name)

    for (const key in get) {
      const newKey = newMediator.get[key] ? `${name}__${key}` : key
      newMediator.get[newKey] = get[key]
    }

    for (const key in set) {
      const newKey = newMediator.set[key] ? `${name}__${key}` : key
      newMediator.set[newKey] = set[key]
    }

    for (const key in action) {
      const newKey = newMediator.action[key] ? `${name}__${key}` : key
      newMediator.action[newKey] = action[key]
    }
  }

  return newMediator
}