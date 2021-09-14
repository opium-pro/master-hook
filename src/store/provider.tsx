import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { getStore } from './get-store'


export function Provider({ children, ...props }: any) {
  const storage = getStore()
  if (!storage) { return null }
  return (
    <ReduxProvider {...props} store={storage}>
      {children}
    </ReduxProvider>
  )
}