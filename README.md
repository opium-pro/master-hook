# Easy connect to Redux by hooks with smart caching
* Connect Redux in 1 minute and use it like a pro
* Actions, selectors, caching from the box
* Works with regular React and React Native

```
npm i master-hook
```

## [Check out the playground](https://github.com/opium-pro/master-hook-playground)


## Simple example

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

hooks.js:

> Take a note — you need to specify all first-level keys in your initial state, even if its value is undefined
```js
import MasterHook from 'master-hook'

export const useMyHook = MasterHook({initialState: {value: 'hoooook'}})
```

and then you can use this hook
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


## [Using Actions](https://github.com/opium-pro/master-hook/docs/ACTIONS.md)
## [Using Selectors](https://github.com/opium-pro/master-hook/docs/SELECTORS.md)
## [Caching](https://github.com/opium-pro/master-hook/docs/CACHING.md)
## [Autoset `isLoading`](https://github.com/opium-pro/master-hook/docs/IS_LOADING.md)