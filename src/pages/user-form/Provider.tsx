import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserFormPageProps } from '.';
import Service, { UserFormState } from './Service';
import useStateService from '../../lib/use-state-service';
import useDefaultSnackbar from '../../lib/use-default-snackbar';
import routesConfig from '../../lib/routes-config';

interface UserFormPageProviderProps {
  userId?: string;
  children: (props: UserFormPageProps) => ReactElement;
}

export const Provider: React.FC<UserFormPageProviderProps> =
  function WrapperComponent({ userId, children }) {
    const history = useHistory();
    const state = useStateService<UserFormState>(Service);
    const { error, success } = useDefaultSnackbar();

    useEffect(() => {
      async function doLoadUser(id: string) {
        const result = await Service.loadUser(id);
        if (!result.isOk) {
          error(result.error as string);
        }
      }
      if (userId && !state.id && !state.isLoading) {
        doLoadUser(userId);
      }
    }, [userId, error, state.id, state.isLoading]);

    const doCancel = () => {
      history.push(routesConfig.users.list());
    };

    const doSave = async () => {
      const result = await Service.save();
      if (result?.isOk) {
        success('User saved with success');
        doCancel();
      }

      if (result?.error) {
        error(result?.error);
      }
    };
    return (
      <>
        {children({
          state,
          onSave: () => doSave(),
          onCancel: () => doCancel(),
          onChangeUsername: (value: string) => Service.onChangeUsername(value),
          onChangeEmail: (value: string) => Service.onChangeEmail(value),
          onChangePasword: (value: string) => Service.onChangePasword(value),
        })}
      </>
    );
  };
