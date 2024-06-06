'use client'

import { AppProvider } from './app.provider'
import { ReactQueryProvider } from './react-query.provider'

export function Providers(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppProvider>
      <ReactQueryProvider>{props.children}</ReactQueryProvider>
    </AppProvider>
  )
}
