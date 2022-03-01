import React, { ReactElement } from 'react';
import { Provider } from './Provider';

export const Wrapper: React.FC = function WrapperComponent() {
  return <div>Loading...</div>;
};

export function SessionManager({ children }: { children: ReactElement }) {
  return <Provider loadingCompoent={() => <Wrapper />}>{children}</Provider>;
}
