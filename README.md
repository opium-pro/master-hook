# Easy redux hooks with advanced option
With zero loss in functionality

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
import { useStorage } from 'master-hook'

export const myAction = () => (dispatch, getState) => {
  // No need to use dispatch on actions from useStorage
  const { setValue } = useStorage('hook-n1')

  setValue('new value')
}
```

## Using Selectors

hooks.js:
```js
import MasterHook from 'master-hook'
import { mySelector } from './selectors'
import { myAction } from './actions'

export const useMyHook = MasterHook({
  storage: 'hook-n1',
  selectors: { mySelector },
  actions: { myAction },
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