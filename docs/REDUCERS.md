[<- to the main page](https://github.com/opium-pro/master-hook)

# Adding reducers

You can add any custom reducers in order to connect some other stuff to Redux.

Just pass your reducers to `addReducers`, they will be added to the store.

```jsx
// app.jsx

import React from 'react'
import MasterHook from 'master-hook'

MasterHook.addReducers({
  reducerName: 'insert your reducer here',
})

export const App = () => (
  <MasterHook.Provider>
    // Your app code is here
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
* [Prevent Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/REDUCERS.md) [you are here]
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/MIDDLEWARE.md)
---
* [Playground Repo](https://github.com/opium-pro/master-hook-playground)
* [Npm Package](https://www.npmjs.com/package/master-hook)