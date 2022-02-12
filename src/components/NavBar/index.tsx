import { Menu } from "../Menu";
import { Box, useTheme } from "@mui/material";
import { useHistory } from "react-router";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface NavBarProps {
  logout: () => void;
}

export const NavBar = ({ logout }: NavBarProps) => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Menu
            buttonContent={<MenuIcon />}
            buttonProps={{
              edge: "start",
              sx: {
                marginRight: theme.spacing(2),
              },
              // className: classes.menuButton,
              color: "inherit",
              "aria-label": "menu",
            }}
            items={[
              {
                id: "home",
                label: "Home",
                action: () => history.push("/home"),
              },
              {
                id: "users",
                label: "Users",
                action: () => history.push("/users"),
              },
            ]}
          />
          <Typography>React App</Typography>
        </Box>
        <Menu
          buttonContent={<AccountCircleIcon />}
          items={[{ id: "logout", label: "Logout", action: logout }]}
        />
      </Toolbar>
    </AppBar>
  );
};
