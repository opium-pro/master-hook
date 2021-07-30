# Easy redux hooks with advanced option
With zero loss in functionality

```
npm i master-hook
```


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

And then you can address the needed storage by its hook.

> No need to dispatch, it's already inside

actions.js
```js
import { useStogare, createAction } from 'master-hook'

export const myAction = createAction(() => {
  const { setValue } = useStogare('hook-n1')

  setValue('new value')
})
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
import { createSelector, useStogare } from 'master-hook'

export const mySelector = createSelector(() => {
    const { value } = useStogare('hook-n1')
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