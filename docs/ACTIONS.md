[<<< go back](https://github.com/opium-pro/master-hook)

# Using Actions

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
  // And no need to dispatch actions, created by 'createAction'
  // Dispatch is already included
  const { setValue } = useStorage('hook-n1')

  setValue('new value')
})
```


## Actions ans Selectors are also available from your hook

```jsx
import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  // all the setters are being created automatically
  const {value, setValue, myAction} = useMyHook()

  function handleClick() {
    myAction('updated')
  }

  return (
    <div onClick={handleClick}>
      {value}
    </div>
  )
}
```
