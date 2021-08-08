[<- to the main page](https://github.com/opium-pro/master-hook)

# Using Actions


## 1. Create actions

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

## 2. Pass actions to the hook
You can also pass one action to multiple hooks

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
> You also need to specify the name of the storage


## 3. Get you actions from the hook
Actually, you can also use your actions directly.
But hooks are fun)

```jsx
import React from 'react'
import { useMyHook } from './hooks.js'

export const Component = () => {
  const {value, myAction} = useMyHook()

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

## See more:

[Getting Started](https://github.com/opium-pro/master-hook/blob/master/docs/GETTING_STARTED.md)

---

⚬ [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
[Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
[Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
[Prevent Actions](https://github.com/opium-pro/master-hook/blob/master/docs/PREVENT_ACTIONS.md)
[Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)

---

[Adding Reducers](https://github.com/opium-pro/master-hook/blob/master/docs/ADDING_REDUCERS.md)
[Adding Middleware and DevTools](https://github.com/opium-pro/master-hook/blob/master/docs/ADDING_MIDDLEWARE.md)

---

[Playground repo](https://github.com/opium-pro/master-hook-playground)