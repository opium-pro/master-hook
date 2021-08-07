# Easy connect to Redux by hooks with smart caching
* Connect Redux in 1 minute and use it like a pro
* Actions, selectors, caching from the box
* Works with regular React and React Native

```
npm i master-hook
```

### [Check out the playground](https://github.com/opium-pro/master-hook-playground)


## Simple example

app.jsx:
```jsx
import React from 'react'
import MasterHook from 'master-hook'

export const App = ({children}) => (
  <MasterHook.Provider>
    {children}
  </MasterHook.Provider>
)
```

hooks.js:

> Take a note — you need to specify all first-level keys in your initial state, even if its value is undefined
```js
import MasterHook from 'master-hook'

export const useMyHook = MasterHook({initialState: {value: 'hoooook'}})
```

and then you can use this hook
```jsx
import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  // all the setters are being created automatically
  const {value, setValue} = useMyHook()

  function handleClick() {
    setValue('updated')
  }

  return (
    <div onClick={handleClick}>
      {value}
    </div>
  )
}
```


## Using Actions

To use actions, you need to add a storage name to your hook and pass the actions

hooks.js:
```js
import MasterHook from 'master-hook'
import { myAction } from './actions'

export const useMyHook = MasterHook({
  storage: 'hook-n1',
  actions: { myAction },
  initialState: { value: 'hoooook' },
})
```

Then you can address a needed storage by its hook and dispatch an action.

actions.js
```js
import { useStorage, createAction } from 'master-hook'

export const myAction = createAction(() => {
  // No need to dispatch actions from 'useStorage'
  // and actions, created by 'createAction'
  // dispatch is already included
  const { setValue } = useStorage('hook-n1')

  setValue('new value')
})
```

## Using Selectors

hooks.js:
```js
import MasterHook from 'master-hook'
import { mySelector } from './selectors'

export const useMyHook = MasterHook({
  storage: 'hook-n1',
  selectors: { mySelector },
  initialState: { value: 'hoooook' },
})
```

selectors.js
```js
import { createSelector, useStorage } from 'master-hook'

export const mySelector = createSelector(
  () => useStorage('hook-n1').value,

  (value) => {
    const newValue = value + 'opopop'
    return newValue
  }
)
```

## Actions ans Selectors are also available from your hook

```jsx
import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  // all the setters are being created automatically
  const {value, setValue, myAction, mySelector} = useMyHook()

  function handleClick() {
    myAction('updated')
  }

  return (
    <div onClick={handleClick}>
      {mySelector}
    </div>
  )
}
```

## Caching

Just pass `cache` to MasterHook and specify how long values have to be stored in milliseconds. `0` means forever.

> Cache is being updated every time you update the stogare. So it's always fresh!

hooks.js:

```js
import MasterHook from 'master-hook'

export const useMyHook = MasterHook({
  initialState: {value: 'hoooook'},
  cache: {value: 0}
})
```

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


## Autoset `isLoading`

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