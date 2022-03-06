import React, { ReactElement } from 'react';
import Provider from './Provider';

export const SessionManagerWrapper: React.FC =
  function SessionManagerComponent() {
    return <div>Loading...</div>;
  };

export function SessionManager({ children }: { children: ReactElement }) {
  return (
    <Provider loadingCompoent={<SessionManagerWrapper />}>
      {() => children}
    </Provider>
  );
}
