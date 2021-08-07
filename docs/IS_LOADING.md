[<<< go back](https://github.com/opium-pro/master-hook)

# Autoset `isLoading`

You can make a stoge automatically set `isLoading: true` when the action is in process.

When the Promice is resolved or rejected, state of the storage becomes `isLoading: false`

Just pass a list of storage names as second argument to `createAction`

> It works only for async actions

actions.js
```js
import { createAction } from 'master-hook'
import { fetchSomeUrl } from 'fetch'

export const myAction = createAction(async () => {
  await fetchSomeUrl()
}, ['storage-n1', 'storage-n2'])
```

That's all. Now storages 'storage-n1' and 'storage-n2' will have `isLoading: true` when `myAction` is in process