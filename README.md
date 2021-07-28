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

To use actions, you need to add a name to your hook and pass actions

hooks.js:
```js
import MasterHook from 'master-hook'
import { myAction } from './actions'

export const useMyHook = MasterHook({
  name: 'hook-n1',
  actions: { myAction },
  initialState: { value: 'hoooook' },
})
```

And then you can address the needed hook by its mediator

actions.js
```js
import MasterHook from 'master-hook'

export function myAction = () => (dispatch) => {
  const mediator = MasterHook.getMediator('hook-n1')

  // You can get values from the mediator
  const value = mediator.get.value

  // You can also set values via dispatch
  dispatch(mediator.set.value('new value'))
}
```

## Using Selectors

hooks.js:
```js
import MasterHook from 'master-hook'
import { mySelector } from './selectors'
import { myAction } from './actions'

export const useMyHook = MasterHook({
  name: 'hook-n1',
  selectors: { mySelector },
  actions: { myAction },
  initialState: { value: 'hoooook' },
})
```

selectors.js
```js
import { createSelector } from 'reselect'
import MasterHook from 'master-hook'

export function mySelector = createSelector(
  MasterHook.getMediator('hook-n1').get.value,

  (value) => {
    const newValue = value + 'opopop'
    return newValue
  }
)
```

## Actions ans Selectors also available from the hook

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