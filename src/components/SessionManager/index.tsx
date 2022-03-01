import React, { ReactElement } from 'react';
import { Provider } from './Provider';

export function SessionManager({ children }: { children: ReactElement }) {
  return (
    <Provider loadingCompoent={<div>Loading...</div>}>{children}</Provider>
  );
}
