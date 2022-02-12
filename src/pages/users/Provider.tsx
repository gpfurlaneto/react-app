import React, { ReactElement, useEffect } from "react";
import { UsersPageProps } from ".";
import { User } from "../../types/User";
import Service, { UsersState } from "./Service";
import { useStateService } from "../../lib/use-state-service";
import { useDefaultSnackbar } from "../../lib/use-default-snackbar";

interface UsersPageProviderProps {
  children: (props: UsersPageProps) => ReactElement;
}

export const Provider: React.FC<UsersPageProviderProps> = ({ children }) => {
  const state = useStateService<UsersState>(Service);
  const { error } = useDefaultSnackbar();
  useEffect(() => {
    if (!state.users && !state.isLoading) {
      Service.loadUsers();
    }
  }, [error, state.users, state.isLoading]);

  const doDelete = async () => {
    const result = await Service.deleteSelectedUser();
    if (!result.isOk) {
      error(result.error as string);
    }
  };

  return (
    <React.Fragment>
      {children({
        state,
        deleteSelectedUser: () => doDelete(),
        clearDeleteUser: () => Service.clearSelectUserToDelete(),
        selectUserToDelete: (user: User) => Service.selectUserToDelete(user),
      })}
    </React.Fragment>
  );
};
