[<- to the main page](https://github.com/opium-pro/master-hook)

# Preventing unwanted renders

You can make the hook update the component only when specific fields have been changed. Just pass an array of the fields or an empty array if you want it to fire only once.

```jsx
// component.jsx

import React from 'react'
import { useMyHook1, useMyHook2 } from './hooks.js'

export const Component = () => {
  // Component will be updated only when 'value' has changed regardles of changing any other fields inside 'useMyHook1'
  const hookData1 = useMyHook1(['value'])

  // Component will not be updated when any field is changed in 'useMyHook2'
  const hookData2 = useMyHook2([])

  return (
    <div>
      {hookData1.value}
    </div>
  )
}
```


## See more:

* [Getting Started](https://github.com/opium-pro/master-hook/blob/master/docs/GETTING_STARTED.md)
---
* [Using Storages](https://github.com/opium-pro/master-hook/blob/master/docs/STORAGES.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Preventing Rerendering](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_RERENDER.md) [you are here]
* [Preventing Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Typescript](https://github.com/opium-pro/master-hook/blob/master/docs/TYPESCRIPT.md)
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/MIDDLEWARE.md)
---
* [Playground Repo](https://github.com/opium-pro/master-hook-playground)
* [Npm Package](https://www.npmjs.com/package/master-hook)