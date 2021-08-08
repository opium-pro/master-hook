[<- to the main page](https://github.com/opium-pro/master-hook)

# Using storages

There are two ways to create a storage:
1. By creating a hook with `MasterHook`
2. By calling `createStorage`

> In any case, you have to pass `initialState` with ALL first-level keys, even if they are `undefined`. We need them to make auto setters.


Create a storage by creating a hook:

```js
import MasterHook from 'master-hook'

export const useMyHook = MasterHook({
  storage: 'hook-n1',
  initialState: { value: 'hoooook' },
})
```

Create a storage by calling `createStorage`:

```js
import { createStorage } from 'master-hook'

const initialState = { value: 'hoooook' }
const cache = { value: 0 }

const useMyStorage = createStorage('my-storage', initialState, cache)
```

> createStorage(name, initialState, \[cache])

If you try to create another storage with the same name, it WILL NOT be created, `initialState` and `cache` will be ignored. Your hook in that case will use already existing storage.


## Setters are being created automatically

For every first-level key in your `initialState` we create setters. You can obtain them from the hook. They have the same name with the keys, but with `set` in front.

```jsx

// With this initial state
const initialState = { value1: 'val1', value2: 'val2' }

// This values and setters will be available
const { value1, setValue1, value2, setValue2 } = useMyHook()

```

## Default actions

You can also obtain `reset` and `patch` actions from the hook.

component.js
```jsx
import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  const { reset, patch } = useMyHook()

  // Resets storage to the initial state
  reset()

  // Resets only this key from the storage to the initial value
  reset('keyName')

  // Set the whole storage to passed value
  reset({ value: 'newValue' })
  // !!! You can not use any other keys then in the 'initialState'

  // Change specific values in the storage without deleting others
  patch({ value: 'newValue' })
  // !!! You can not use any other keys then in the 'initialState'

  return (
    <div>
      // Your component here
    </div>
  )
}
```

## Connecting several storages to one hook

If you pass an array of strings instead of string to `storage` when creating a hook, all this storages will be connected to the hook.

```js
import MasterHook from 'master-hook'

export const useMyHook = MasterHook({
  storage: ['storage1', 'storage2'],
  initialState: { value: 'hoooook' },
})
```

And then you can get this storages from the hook

component.js
```jsx
import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  // all the setters are being created automatically
  const { storage1, storage2 } = useMyHook()

  function handleClick() {
    storage1.setValue('updated')
  }

  return (
    <div onClick={handleClick}>
      {storage1.value}
    </div>
  )
}
```

## See more:

* [Getting Started](https://github.com/opium-pro/master-hook/blob/master/docs/GETTING_STARTED.md)
---
* [Using Storages](https://github.com/opium-pro/master-hook/blob/master/docs/STORAGES.md) [you are here]
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Prevent Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
* [Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/REDUCERS.md)
* [Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/MIDDLEWARE.md)
---
* [Playground Repo](https://github.com/opium-pro/master-hook-playground)
* [Npm Package](https://www.npmjs.com/package/master-hook)