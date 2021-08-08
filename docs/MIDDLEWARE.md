[<- to the main page](https://github.com/opium-pro/master-hook)

# Adding middleware and DevTools

`thunk` is already included, no need to add it.

`Redux DevTools` is also included, but you can turn it off by calling `useDevTools`.

```jsx
// app.jsx

import React from 'react'
import MasterHook from 'master-hook'

MasterHook.useDevTools(false)

export const App = () => (
  <MasterHook.Provider>
    // Your app code is here
  </MasterHook.Provider>
)
```
> Make sure to do it BEFORE calling 'Provider'


To add more middleware, use `addMiddleware`.

```jsx
// app.jsx

import React from 'react'
import MasterHook from 'master-hook'

MasterHook.addMiddleware(['list of your middlewares'])

export const App = ({children}) => (
  <MasterHook.Provider>
    {children}
  </MasterHook.Provider>
)
```
> Make sure to do it BEFORE calling 'Provider'


## See more:

* [Getting Started](https://github.com/opium-pro/master-hook/blob/master/docs/GETTING_STARTED.md)
---
* [Using Storages](https://github.com/opium-pro/master-hook/blob/master/docs/STORAGES.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Preventing Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/MIDDLEWARE.md) [you are here]
---
* [Playground Repo](https://github.com/opium-pro/master-hook-playground)
* [Npm Package](https://www.npmjs.com/package/master-hook)