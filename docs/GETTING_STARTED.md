[<- to the main page](https://github.com/opium-pro/master-hook)

# Getting Started

## 1. Wrap the app with a Provider

```jsx
// app.jsx

import React from 'react'
import MasterHook from 'master-hook'

export const App = () => (
  <MasterHook.Provider>
    // Your app code is here
  </MasterHook.Provider>
)
```

## 2. Create hooks

```js
// hooks.js

import MasterHook from 'master-hook'

export const useMyHook = MasterHook({initialState: {value: 'hoooook'}})
```
> You have to specify all first-level keys in your initial state, even if its value is undefined

## 3. Use hooks

```jsx
// component.jsx

import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  // all the setters are being created automatically
  const { value, setValue } = useMyHook()

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

* [Getting Started](https://github.com/opium-pro/master-hook/blob/master/docs/GETTING_STARTED.md) [you are here]
---
* [Using Storages](https://github.com/opium-pro/master-hook/blob/master/docs/STORAGES.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Preventing Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/MIDDLEWARE.md)
---
* [Playground Repo](https://github.com/opium-pro/master-hook-playground)
* [Npm Package](https://www.npmjs.com/package/master-hook)