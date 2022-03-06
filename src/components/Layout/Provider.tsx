import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { LayoutProps } from '.';
import Service from '../SessionManager/Service';
import routesConfig from '../../lib/routes-config';

export interface LayoutProviderProps {
  content: React.ReactElement;
  children: (props: LayoutProps) => ReactElement;
}

const Provider: React.FC<LayoutProviderProps> = function LayoutProvider({
  children,
  content,
}) {
  const { push } = useHistory(); // eslint-disable-line @typescript-eslint/unbound-method

  const doLogout = () => {
    Service.logout();
    push(routesConfig.session.signIn());
  };

  return (
    <>
      {children({
        children: content,
        logout: () => doLogout(),
      })}
    </>
  );
};

export default Provider;
