[<<< to the main page](https://github.com/opium-pro/master-hook)

# Autoset 'isLoading'

You can make a stoge automatically set `isLoading: true` when the action is in process.

When the Promise is resolved or rejected, state of the storage becomes `isLoading: false`

Just pass a list of storage names as second argument to `createAction`

actions.js
```js
import { createAction } from 'master-hook'
import { fetchSomeUrl } from './my-fetch-functions'

export const myAction = createAction(async () => {
  await fetchSomeUrl()
}, ['storage-n1', 'storage-n2'])
```
> It works only for async actions

That's all. Now storages 'storage-n1' and 'storage-n2' will have `isLoading: true` when `myAction` is in process


## See more:

* [Fast Start](https://github.com/opium-pro/master-hook/blob/master/docs/FAST_START.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
---
[Playground](https://github.com/opium-pro/master-hook-playground)