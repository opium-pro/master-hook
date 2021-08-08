[<- to the main page](https://github.com/opium-pro/master-hook)

# Using Selectors

## 1. Create selectors

```js
// selectors.js

import { createSelector, useStorage } from 'master-hook'

export const mySelector = createSelector(
  () => useStorage('hook-n1').value,

  (value) => {
    const newValue = value + 'opopop'
    return newValue
  }
)
```

## 2. Pass selectors to hooks

```js
// hooks.js

import MasterHook from 'master-hook'
import { mySelector } from './selectors'

export const useMyHook = MasterHook({
  storage: 'hook-n1',
  selectors: { mySelector },
  initialState: { value: 'hoooook' },
})
```

## 3. Get selectors from the hooks

```jsx
// component.jsx

import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  const { mySelector } = useMyHook()

  return (
    <div onClick={handleClick}>
      {mySelector}
    </div>
  )
}
```

## See more:

* [Getting Started](https://github.com/opium-pro/master-hook/blob/master/docs/GETTING_STARTED.md)
---
* [Using Storages](https://github.com/opium-pro/master-hook/blob/master/docs/STORAGES.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md) [you are here]
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Preventing Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/MIDDLEWARE.md)
---
* [Playground Repo](https://github.com/opium-pro/master-hook-playground)
* [Npm Package](https://www.npmjs.com/package/master-hook)