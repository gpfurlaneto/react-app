import React from 'react';
import Provider from './Provider';

export const SessionManagerWrapper: React.FC =
  function SessionManagerComponent() {
    return <div>Loading...</div>;
  };

export function SessionManager(props: any) {
  return (
    <Provider {...props} loadingCompoent={() => <SessionManagerWrapper />} />
  );
}
