import { LayoutProps } from '.'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import Service from '../SessionManager/Service'
import { routesConfig } from '../../lib/routes-config'

export interface LayoutProviderProps {
  content: React.ReactElement
  children: (props: LayoutProps) => ReactElement
}

export const Provider: React.FC<LayoutProviderProps> = ({ children, content }) => {

  const { push } = useHistory()

  const doLogout = () => {
    Service.logout()
    push(routesConfig.session.signIn())
  }

  return (
    <React.Fragment>{children({
      children: content,
      logout: () => doLogout()
    })}</React.Fragment>
  )
}
