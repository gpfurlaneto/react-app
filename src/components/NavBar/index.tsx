import { Box, useTheme } from '@mui/material';
import { useHistory } from 'react-router-dom';
import * as H from 'history';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu } from '../Menu';

interface NavBarProps {
  logout: () => void;
}

export function NavBar({ logout }: NavBarProps) {
  const theme = useTheme();
  const history = useHistory() as H.History;

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Menu
            buttonContent={<MenuIcon />}
            buttonProps={{
              edge: 'start',
              sx: {
                marginRight: theme.spacing(2),
              },
              // className: classes.menuButton,
              color: 'inherit',
              'aria-label': 'menu',
            }}
            items={[
              {
                id: 'home',
                label: 'Home',
                action: () => history.push('/home'),
              },
              {
                id: 'users',
                label: 'Users',
                action: () => history.push('/users'),
              },
            ]}
          />
          <Typography>React App</Typography>
        </Box>
        <Menu
          buttonContent={<AccountCircleIcon />}
          items={[{ id: 'logout', label: 'Logout', action: logout }]}
        />
      </Toolbar>
    </AppBar>
  );
}
