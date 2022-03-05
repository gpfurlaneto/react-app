import React from 'react';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { Provider } from './Provider';
import { SignInState } from './Service';

export interface SignInPageProps {
  state: SignInState;
  onSignIn: () => Promise<void>;
  onChangeUsername: (value: string) => void;
  onChangePassword: (value: string) => void;
}

export const SignInPageWrapper: React.FC<SignInPageProps> =
  function SignInPageComponent({
    state = {},
    onSignIn,
    onChangeUsername,
    onChangePassword,
  }) {
    const doSignIn = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onSignIn();
    };

    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ height: '100vh' }}
      >
        <Paper
          elevation={3}
          style={{
            padding: 40,
            maxWidth: 350,
            width: '100%',
          }}
        >
          React App
          <br />
          <br />
          <form noValidate autoComplete="off" onSubmit={doSignIn}>
            <Grid container direction="column">
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                defaultValue={state.username}
                error={!state.isValidUsername}
                helperText={!state.isValidUsername ? 'Invalid e-mail.' : ''}
                onChange={(event: { target: { value: string } }) =>
                  onChangeUsername(event.target.value)
                }
              />
              <br />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                defaultValue={state.password}
                error={!state.isValidPassword}
                helperText={!state.isValidPassword ? 'Invalid password.' : ''}
                onChange={(event: { target: { value: string } }) =>
                  onChangePassword(event.target.value)
                }
              />
              <br />
              <Button variant="contained" color="primary" type="submit">
                Sign in
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  };

export function SignInPage() {
  return (
    <Provider>
      {(props: SignInPageProps) => <SignInPageWrapper {...props} />}
    </Provider>
  );
}
