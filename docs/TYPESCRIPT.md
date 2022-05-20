[<- to the main page](https://github.com/opium-pro/master-hook)

# Using Typescript

You can specify types of your hook if you use Typescript

```ts
// hooks.ts

import { MasterHook } from 'master-hook'

// Here you import your hook data
import * as myHook from './my-hook'

// Fot typesctipt, pass the types of your initialState, actions and selectors into MasterHook
export const useMyHook = MasterHook(myHook) as MasterHook<typeof myHook.initialState, typeof myHook.actions, typeof myHook.selectors>
```

## See more:

* [Getting Started](https://github.com/opium-pro/master-hook/blob/master/docs/GETTING_STARTED.md)
---
* [Using Storages](https://github.com/opium-pro/master-hook/blob/master/docs/STORAGES.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Preventing Rerendering](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_RERENDER.md)
* [Preventing Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Typescript](https://github.com/opium-pro/master-hook/blob/master/docs/TYPESCRIPT.md) [you are here]
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/MIDDLEWARE.md)
---
* [Playground Repo](https://github.com/opium-pro/master-hook-playground)
* [Npm Package](https://www.npmjs.com/package/master-hook)