import React, { ReactElement, useEffect, useState } from 'react';
import Service from './Service';
import useStateService from '../../lib/use-state-service';

export interface ProviderProps {
  children: () => ReactElement;
  loadingCompoent: () => ReactElement;
}

const Provider: React.FC<ProviderProps> = function SessionManagerProvider({
  children,
  loadingCompoent,
}) {
  const state = useStateService(Service);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const doLoadUser = async () => {
      await Service.loadUser();
      setFinished(true);
    };

    doLoadUser();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{state.isLoadingUser || !finished ? loadingCompoent() : children}</>
  );
};

export default Provider;
