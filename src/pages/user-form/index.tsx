import { Button, Container, Grid, Paper, TextField } from '@mui/material';
import { SyntheticEvent } from 'react';
import { Layout } from '../../components/Layout';
import { Provider } from './Provider';
import { UserFormState } from './Service';

export interface UserFormPageProps {
  state: UserFormState;
  onChangeUsername: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePasword: (value: string) => void;
  onSave: () => Proise<void>;
  onCancel: () => void;
}

export const UserFormPageWrapper: React.FC<UserFormPageProps> =
  function UserFormPageComponent({
    state,
    onChangeUsername,
    onChangeEmail,
    onChangePasword,
    onSave,
    onCancel,
  }) {
    const onSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
      onSave();
    };

    const cancel = () => {
      onCancel();
    };

    return (
      <Layout>
        <form onSubmit={onSubmit}>
          <Paper
            variant="outlined"
            sx={{
              paddingY: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Container maxWidth="sm">
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                error={state.errorUsername}
                value={state.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChangeUsername(e.target.value)
                }
              />
              <br />
              <br />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                error={state.errorEmail}
                value={state.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChangeEmail(e.target.value)
                }
              />
              {!state.id && (
                <>
                  <br />
                  <br />
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                    error={state.errorPassword}
                    value={state.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChangePasword(e.target.value)
                    }
                  />
                </>
              )}
              <br />
              <br />
              <Grid container direction="row" justifyContent="flex-end">
                <Button variant="outlined" onClick={cancel}>
                  Cancel
                </Button>
                &nbsp;
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Container>
          </Paper>
        </form>
      </Layout>
    );
  };

export function UserFormPage({ id }: { id?: string }) {
  return (
    <Provider userId={id}>
      {(props: UserFormPageProps) => <UserFormPageWrapper {...props} />}
    </Provider>
  );
}
