[<- to the main page](https://github.com/opium-pro/master-hook)

# Caching

Just pass `cache` to MasterHook and specify how long the values have to be stored in milliseconds. `0` means forever.

hooks.js:

```js
import MasterHook from 'master-hook'

export const useMyHook = MasterHook({
  initialState: {value: 'hoooook'},
  cache: {value: 0}
})
```

## Keep cached data fresh

Cache is being updated every time you update the storage. So it's always fresh!
Cached data are being used only when the app is launching to display the data immediately with no need to wait server responce.

Use [Prevent Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md) if you want to prevent some actions from firing (for example from sendind requests to the server too often).

> If server did't response and you want your user to continue using cached data, just don't clear values in your MasterHook storage and they will be there even after page reload


## Cange caching storage

By default we use `window.localStorage` to cache values. But if you want to use some different storage, it's not a problem.

You may need this for `React Native`. Just pass `MasterHook.setLocalStorage`

hooks.js:

```js
import MasterHook from 'master-hook'

// For example, we want to use this storage
import AsyncStorage from '@react-native-async-storage/async-storage'

MasterHook.setLocalStorage(AsyncStorage)
// Done. Now `AsyncStorage` is being used by default

export const useMyHook = MasterHook({
  initialState: {value: 'hoooook'},
  cache: {value: 0}
})
```

> Take a note. Your custom localStorage has to use the same getters and setters pattern, like `window.localStorage`: `getItem`, `setItem`, `removeItem`, `clear`

## See more:

* [Getting Started](https://github.com/opium-pro/master-hook/blob/master/docs/GETTING_STARTED.md)
---
* [Using Storages](https://github.com/opium-pro/master-hook/blob/master/docs/STORAGES.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md) [you are here]
* [Prevent Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/MIDDLEWARE.md)
---
* [Playground Repo](https://github.com/opium-pro/master-hook-playground)
* [Npm Package](https://www.npmjs.com/package/master-hook)