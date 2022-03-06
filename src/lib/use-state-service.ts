import { useEffect, useState } from 'react';
import BaseService from './base-service';

const useStateService = <T>(service: BaseService<T>) => {
  const [state, setState] = useState(service.currentState);

  useEffect(() => {
    service.registerEvent(service.getEventIdentifier(), setState);
    return () => {
      service.reset();
    };
  }, [service]);

  return state;
};

export default useStateService;
