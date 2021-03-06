import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid, Link, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as H from 'history';
import { Layout } from '../../components/Layout';
import { Provider } from './Provider';
import { UsersState } from './Service';
import { User } from '../../types/User';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import routesConfig from '../../lib/routes-config';

export interface UsersPageProps {
  state: UsersState;
  selectUserToDelete: (user: User) => void;
  clearDeleteUser: () => void;
  deleteSelectedUser: () => void;
}

const getColumns = (
  redirectToEdit: (id: number) => void,
  selectUserToDelete: (row: User) => void,
): GridColDef[] => {
  return [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'action',
      headerName: 'Actions',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: User }) => {
        return (
          <>
            <Tooltip title="Edit post">
              <Link
                data-testid={`edit-${row.id}`}
                component="button"
                onClick={() => redirectToEdit(row.id)}
              >
                <EditIcon fontSize="inherit" />
              </Link>
            </Tooltip>
            &nbsp; &nbsp;
            <Tooltip title="Delete post">
              <Link
                data-testid={`delete-${row.id}`}
                component="button"
                onClick={() => selectUserToDelete(row)}
              >
                <DeleteIcon fontSize="inherit" />
              </Link>
            </Tooltip>
          </>
        );
      },
    },
  ];
};

export const UsersPageWrapper: React.FC<UsersPageProps> =
  function UsersPageComponent({
    state,
    selectUserToDelete,
    clearDeleteUser,
    deleteSelectedUser,
  }) {
    const history = useHistory() as H.History;

    const redirectToEdit = (id: number) => {
      history.push(routesConfig.users.form(id));
    };

    return (
      <Layout>
        <>
          <Grid container>
            <Link
              data-testid="new-user"
              onClick={() => history.push(routesConfig.users.form())}
              sx={{ marginLeft: 'auto', marginBottom: 1, cursor: 'pointer' }}
            >
              New user
            </Link>
          </Grid>

          <DataGrid
            columnBuffer={4}
            autoHeight
            autoPageSize
            rows={state.users}
            columns={getColumns(redirectToEdit, selectUserToDelete)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={state.isLoading}
          >
            <CircularProgress data-testid="loading-backdrop" color="inherit" />
          </Backdrop>
          <ConfirmDialog
            open={Boolean(state.selectedUserToDelete)}
            handleClose={clearDeleteUser}
            handleConfirm={deleteSelectedUser}
            message={`Do you really want to delete the user ${state.selectedUserToDelete?.username}?`}
          />
        </>
      </Layout>
    );
  };

export function UsersPage() {
  return (
    <Provider>
      {(props: UsersPageProps) => <UsersPageWrapper {...props} />}
    </Provider>
  );
}
