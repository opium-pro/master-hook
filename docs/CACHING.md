[<<< go back](https://github.com/opium-pro/master-hook)

# Caching

Just pass `cache` to MasterHook and specify how long values have to be stored in milliseconds. `0` means forever.

hooks.js:

```js
import MasterHook from 'master-hook'

export const useMyHook = MasterHook({
  initialState: {value: 'hoooook'},
  cache: {value: 0}
})
```
> Cache is being updated every time you update the stogare. So it's always fresh!

Done! That's all. Now your value in saved and being regulary updated in localStorage


## Change caching storage

By default we use `window.localStorage` to cache values. But if you want to use some different storage, it's not a problem.

You may need this for React Navive. Just pass `MasterHook.setLocalStorage`

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

> Take a note. Your custom localStorage has to use the same getters and setters pattern, like `window.localStorage`: `getItem`, `setItem`, `removeItem`. And also we support `clear` method, to clear all localStorage

## See more:

* [Fast Start](https://github.com/opium-pro/master-hook/blob/master/docs/FAST_START.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Autoset 'isLoading'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_LOADING.md)
---
[Playground](https://github.com/opium-pro/master-hook-playground)