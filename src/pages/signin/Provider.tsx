import React, { ReactElement } from 'react'
import { SignInPageProps } from '.'
import { User } from '../../types/User'
import { useHistory } from 'react-router-dom'
import Service, { SignInState } from './Service'
import { routesConfig } from '../../lib/routes-config'
import { useStateService } from '../../lib/use-state-service'
import { useDefaultSnackbar } from '../../lib/use-default-snackbar'
import sessionService from '../../components/SessionManager/Service'

interface SignInProviderProps {
  children: (props: SignInPageProps) => ReactElement
}

export const Provider: React.FC<SignInProviderProps> = ({ children }) => {

  const { push } = useHistory();
  const enqueueSnackbar = useDefaultSnackbar()
  
  const state = useStateService<SignInState>(Service)
  
  const handleResult = (result: string | User) => {
    if(!result){
      return
    }
    if(typeof result === 'string' ){
      enqueueSnackbar.error(result);
    }else{
      sessionService.setUser(result)
      push(routesConfig.home())
    }
  }

  return (
    <React.Fragment>{children({
      state,
      onSignIn: async () => handleResult(await Service.onSignIn()),
      onChangeUsername: (value: string) => Service.onChangeUsername(value),
      onChangePassword: (value: string) => Service.onChangePassword(value),
    })}</React.Fragment>
  )
}