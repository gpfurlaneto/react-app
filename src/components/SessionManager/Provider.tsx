import React, { ReactElement, useEffect, useState } from 'react'
import Service from './Service'
import { useStateService } from '../../lib/use-state-service'

export interface ProviderProps {
  children: () => ReactElement
  loadingCompoent: () => ReactElement
}

export const Provider: React.FC<ProviderProps> = ({ 
  children,
  loadingCompoent
}) => {

  const state = useStateService(Service)
  const [finished, setFinished] = useState(false)
  
  useEffect(() => {
    const doLoadUser = async () => {
      await Service.loadUser()
      setFinished(true)
    }

    doLoadUser()
  }, [])

  return (
    <React.Fragment>
      {state.isLoadingUser || !finished ? loadingCompoent() : children}
    </React.Fragment>
  )
}