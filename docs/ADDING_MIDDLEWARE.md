[<- to the main page](https://github.com/opium-pro/master-hook)

# Adding middleware and DevTools

`thunk` is already included, no need to add it.

`Redux DevTools` is also included, but you can turn it off by calling `useDevTools`.

app.jsx:
```jsx
import React from 'react'
import MasterHook from 'master-hook'

MasterHook.useDevTools(false)

export const App = ({children}) => (
  <MasterHook.Provider>
    {children}
  </MasterHook.Provider>
)
```
> Make sure to do it BEFORE calling 'Provider'


To add more middleware, use `addMiddleware`.

app.jsx:
```jsx
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
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Prevent Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/ADDING_REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/ADDING_MIDDLEWARE.md) [you are here]
---
* [Playground repo](https://github.com/opium-pro/master-hook-playground)