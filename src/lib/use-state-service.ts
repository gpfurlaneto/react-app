import { BaseService } from "./base-service";
import { useEffect, useState } from 'react'

export const useStateService = <T> (service: BaseService<T>) => {

  const [state, setState] = useState(service.currentState)
  
  useEffect(() => {
    service.registerEvent(service.getEventIdentifier(), setState)
    return () => {
      service.reset()
    }
    
  }, [service])

  return state

}