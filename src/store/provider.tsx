import React, { useEffect, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { setFromCache } from '../actions/default-actions.js'
import { getStore } from './get-store.js'


export function Provider({ children, ...props }: any) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setFromCache().then(() => setReady(true))
  }, [])

  if (!ready) { return null }
  return (
    <ReduxProvider {...props} store={getStore()}>
      {children}
    </ReduxProvider>
  )
}