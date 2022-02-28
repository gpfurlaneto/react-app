import React from 'react'
import { Provider } from './Provider'

export const Wrapper: React.FC = function WrapperComponent() {
  return <div>Loading...</div>
}

const A = (props: any) => <Provider {...props} loadingCompoent={() => <Wrapper />} />

 // eslint-disable-next-line react/no-unstable-nested-components
export const SessionManager = (props: any) => (<A {...props} />);