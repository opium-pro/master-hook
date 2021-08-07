[<<< go back](https://github.com/opium-pro/master-hook)

## Fast start

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