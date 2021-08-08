[<<< to the main page](https://github.com/opium-pro/master-hook)

# Using Selectors

## 1. Create selectors
selectors.js
```js
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
hooks.js:
```js
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

* [Fast Start](https://github.com/opium-pro/master-hook/blob/master/docs/FAST_START.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
[Prevent Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
[Playground repo >>>](https://github.com/opium-pro/master-hook-playground)