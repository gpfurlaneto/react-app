import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid, Link, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
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
              <Link component="button" onClick={() => redirectToEdit(row.id)}>
                <EditIcon fontSize="inherit" />
              </Link>
            </Tooltip>
            &nbsp; &nbsp;
            <Tooltip title="Delete post">
              <Link component="button" onClick={() => selectUserToDelete(row)}>
                <DeleteIcon fontSize="inherit" />
              </Link>
            </Tooltip>
          </>
        );
      },
    },
  ];
};

export const Wrapper: React.FC<UsersPageProps> = function WapperComponent({
  state,
  selectUserToDelete,
  clearDeleteUser,
  deleteSelectedUser,
}) {
  const history = useHistory();

  const redirectToEdit = (id: number) => {
    history.push(routesConfig.users.form(id));
  };

  return (
    <Layout>
      <>
        <Grid container>
          <Link
            onClick={() => history.push(routesConfig.users.form())}
            sx={{ marginLeft: 'auto', marginBottom: 1, cursor: 'pointer' }}
          >
            New user
          </Link>
        </Grid>

        <DataGrid
          autoHeight
          autoPageSize
          rows={state.users}
          columns={getColumns(redirectToEdit, selectUserToDelete)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
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
    <Provider>{(props: UsersPageProps) => <Wrapper {...props} />}</Provider>
  );
}
