import React from 'react';
import { Container } from '@mui/material';
import { NavBar } from '../NavBar';
import Provider from './Provider';

export interface LayoutProps {
  logout: () => void;
  children: React.ReactElement;
}

export const LayoutWrapper: React.FC<LayoutProps> = function LayoutComponent({
  logout,
  children,
}) {
  return (
    <>
      <NavBar logout={logout} />
      <Container maxWidth="lg" sx={{ marginTop: '4rem' }} fixed>
        {children}
      </Container>
    </>
  );
};

export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <Provider content={children}>
      {(props: LayoutProps) => <LayoutWrapper {...props} />}
    </Provider>
  );
}
