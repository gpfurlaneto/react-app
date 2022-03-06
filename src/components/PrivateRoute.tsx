import React, { ReactElement, ReactNode, useEffect } from 'react';
import * as H from 'history';
import { Route, RouteProps, useHistory, useParams } from 'react-router-dom';
import routesConfig from '../lib/routes-config';
import useStateService from '../lib/use-state-service';
import SessionService, { SessionState } from './SessionManager/Service';

function PrivateRoute({ children, ...rest }: RouteProps) {
  // eslint-disable-next-line react/no-unstable-nested-components
  function Test() {
    const params = useParams();
    const { push } = useHistory() as H.History; // eslint-disable-line @typescript-eslint/unbound-method
    const sessionState = useStateService<SessionState>(SessionService);

    useEffect(() => {
      if (!sessionState.isLoadingUser && !sessionState.user) {
        SessionService.logout();
        push(routesConfig.session.signIn());
      }
    }, [push, sessionState]);
    const newChildren = React.Children.map(
      children,
      function fn(child: ReactNode) {
        return React.cloneElement(child as ReactElement, params);
      },
    );

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{newChildren}</>;
  }

  return (
    <Route {...rest}>
      <Test />
    </Route>
  );
}

export default PrivateRoute;
