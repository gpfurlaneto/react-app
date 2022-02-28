import React, { ReactElement, ReactNode, useEffect } from 'react';
import { Route, RouteProps, useHistory, useParams } from 'react-router-dom';
import routesConfig from '../lib/routes-config';
import useStateService from '../lib/use-state-service';
import SessionService, { SessionState } from './SessionManager/Service';

function PrivateRoute({ children, ...rest }: RouteProps) {
  const params = useParams();
  const { push } = useHistory(); // eslint-disable-line @typescript-eslint/unbound-method
  const sessionState = useStateService<SessionState>(SessionService);

  useEffect(() => {
    if (!sessionState.isLoadingUser && !sessionState.user) {
      SessionService.logout();
      push(routesConfig.session.signIn());
    }
  }, [push, sessionState]);

  function cloneElement() {
    const newChildren = React.Children.map(
      children,
      function fn(child: ReactNode) {
        return React.cloneElement(child as ReactElement, params);
      },
    );

    return newChildren;
  }

  return <Route {...rest}>{cloneElement()}</Route>;
}

export default PrivateRoute;
