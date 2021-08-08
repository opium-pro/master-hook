[<<< to the main page](https://github.com/opium-pro/master-hook)

# Adding reducers

Just pass your reducers to `addReducers`, they will be added to the store.

app.jsx:
```jsx
import React from 'react'
import MasterHook from 'master-hook'

MasterHook.addReducers({
  reducerName: 'incert your reducer here',
})

export const App = ({children}) => (
  <MasterHook.Provider>
    {children}
  </MasterHook.Provider>
)
```
> Make sure to do it BEFORE calling 'Provider'


## See more:

* [Fast Start](https://github.com/opium-pro/master-hook/blob/master/docs/FAST_START.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Prevent Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/ADDING_REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/ADDING_MIDDLEWARE.md)
---
[Playground repo >](https://github.com/opium-pro/master-hook-playground)