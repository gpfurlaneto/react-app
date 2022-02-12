import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { HomePage, SignInPage, UsersPage, UserFormPage } from "./pages";
import { SnackbarProvider } from "notistack";
import { SessionManager } from "./components/SessionManager";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={4}>
        <SessionManager>
          <Router>
            <Switch>
              <PrivateRoute path="/home">
                <HomePage />
              </PrivateRoute>
              <PrivateRoute path="/users/form/:id">
                <UserFormPage />
              </PrivateRoute>
              <PrivateRoute path="/users/form">
                <UserFormPage />
              </PrivateRoute>
              <PrivateRoute path="/users">
                <UsersPage />
              </PrivateRoute>
              <Route path="/session/signin">
                <SignInPage />
              </Route>
              <PrivateRoute path="/">
                <HomePage />
              </PrivateRoute>
            </Switch>
          </Router>
        </SessionManager>
      </SnackbarProvider>
    </div>
  );
}

export default App;
