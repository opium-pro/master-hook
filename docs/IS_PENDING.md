[<- to the main page](https://github.com/opium-pro/master-hook)

# Autoset 'isPending'

You can make a stoge automatically set `isPending: true` when the action is in process.

When the Promise is resolved or rejected, state of the storage becomes `isPending: false`

Pass `{ setIsPendingTo: 'storage-name' }` as second argument to `createAction`, where the value is a string or array of strings with storage names.

```js
// actions.js

import { createAction } from 'master-hook'
import { fetchSomeUrl } from './my-fetch-functions'

export const myAction = createAction(async () => {
  await fetchSomeUrl()
}, { setIsPendingTo: ['storage-n1', 'storage-n2'] })
```
> It works only for async actions

If you pass just a list of storage names or a string as second (or third) argument to `createAction`, it will also work
> createAction(() => {}, 'storage')
> createAction(() => {}, ['storage-n1', 'storage-n2'])

That's all. Now your storages will have `isPending: true` when `myAction` is in process


## See more:

* [Getting Started](https://github.com/opium-pro/master-hook/blob/master/docs/GETTING_STARTED.md)
---
* [Using Storages](https://github.com/opium-pro/master-hook/blob/master/docs/STORAGES.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Preventing Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md) [you are here]
---
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/MIDDLEWARE.md)
---
* [Playground Repo](https://github.com/opium-pro/master-hook-playground)
* [Npm Package](https://www.npmjs.com/package/master-hook)