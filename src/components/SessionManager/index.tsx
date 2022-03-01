import React from 'react';
import { Provider } from './Provider';

export const Wrapper: React.FC = function WrapperComponent() {
  return <div>Loading...</div>;
};

export function SessionManager(props: any) {
  return <Provider {...props} loadingCompoent={() => <Wrapper />} />;
}
