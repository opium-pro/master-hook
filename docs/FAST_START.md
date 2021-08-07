[<<< go back](https://github.com/opium-pro/master-hook)

# Fast start

## 1. Wrap the app in a Provider
app.jsx:
```jsx
import React from 'react'
import MasterHook from 'master-hook'

export const App = ({children}) => (
  <MasterHook.Provider>
    {children}
  </MasterHook.Provider>
)
```

## 2. Create hooks
hooks.js:
```js
import MasterHook from 'master-hook'

export const useMyHook = MasterHook({initialState: {value: 'hoooook'}})
```
> Take a note — you need to specify all first-level keys in your initial state, even if its value is undefined

## 3. Use hooks
```jsx
import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  // all the setters are being created automatically
  const {value, setValue} = useMyHook()

  function handleClick() {
    setValue('updated')
  }

  return (
    <div onClick={handleClick}>
      {value}
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
---
[Playground](https://github.com/opium-pro/master-hook-playground)