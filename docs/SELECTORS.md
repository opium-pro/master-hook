[<<< go back](https://github.com/opium-pro/master-hook)

# Using Selectors

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


## Selectors are available from your hook

```jsx
import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  const {mySelector} = useMyHook()

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
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Autoset 'isLoading'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_LOADING.md)
===
[Playground](https://github.com/opium-pro/master-hook-playground)