import React from 'react'
import { Provider } from './Provider'

export const Wrapper: React.FC = () => {
  return <div>Loading...</div>
}

export const SessionManager = (props: any) => (<Provider {...props} loadingCompoent={() => <Wrapper />} />)