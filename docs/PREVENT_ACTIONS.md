[<<< to the main page](https://github.com/opium-pro/master-hook)

# Prevent actions

You can prevent actions from firing too often. For example, from sending requests to the server every time, if it was successfully sent once.

Just pass `{ canRepeatIn: 1000 }` to `createAction`, where number is the time in ms, after which function is allowed to fire again. `0` means, that in can be fired only once.

actions.js
```js
import { createAction } from 'master-hook'

export const myAction = createAction(() => {
  // Do your stuff here
}, {canRepeatIn: 1000})
```
You can just pass a number as second (or third) argument to `createAction`, it will also work
> createAction(() => {}, 1000)


## Force an action to fire
Sometimes you need to force an action to fire. Wrap your action in `force` function then and it wont pay attention to `canRepeatIn`.

component.js
```jsx
import React from 'react'
import { useMyHook } from './hooks.js'
import { force } from 'master-hook'

export const Component = () => {
  const {value, myAction} = useMyHook()

  function handleClick() {
    force(myAction())
  }

  return (
    <div onClick={handleClick}>
      {value}
    </div>
  )
}
```


## See more:

* [Fast Start](https://github.com/opium-pro/master-hook/blob/master/docs/FAST_START.md)
* [Using Actions](https://github.com/opium-pro/master-hook/blob/master/docs/ACTIONS.md)
* [Using Selectors](https://github.com/opium-pro/master-hook/blob/master/docs/SELECTORS.md)
* [Caching](https://github.com/opium-pro/master-hook/blob/master/docs/CACHING.md)
* [Autoset 'isPending'](https://github.com/opium-pro/master-hook/blob/master/docs/IS_PENDING.md)
---
[Playground repo >>>](https://github.com/opium-pro/master-hook-playground)