import React, { useEffect } from 'react'
import { routesConfig } from '../lib/routes-config'
import { useStateService } from '../lib/use-state-service'
import { Route, RouteProps, useHistory } from 'react-router'
import SessionService, { SessionState } from './SessionManager/Service'

export const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const Test = () => {
    const { push } = useHistory()
    const sessionState = useStateService<SessionState>(SessionService)
  
    useEffect(() => {
    
      if(!sessionState.isLoadingUser && !Boolean(sessionState.user)){
        SessionService.logout()
        push(routesConfig.session.signIn())
      }
    }, [push, sessionState])

    return <>{children}</>

  }
  return <Route {...rest}><Test /></Route>
}