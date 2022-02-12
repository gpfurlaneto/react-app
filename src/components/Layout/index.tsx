import React from "react";
import { Container } from "@mui/material";
import { NavBar } from "../NavBar";
import { Provider } from "./Provider";
export interface LayoutProps {
  logout: () => void;
  children: React.ReactElement;
}

export const Wrapper: React.FC<LayoutProps> = ({ logout, children }) => {
  return (
    <>
      <NavBar logout={logout} />
      <Container maxWidth="lg" sx={{ marginTop: "4rem" }} fixed>
        {children}
      </Container>
    </>
  );
};

export const Layout = ({ children }: { children: React.ReactElement }) => (
  <Provider content={children}>
    {(props: LayoutProps) => <Wrapper {...props} />}
  </Provider>
);
