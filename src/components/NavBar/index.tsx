import React from "react";
import { Menu } from "../Menu";
import { useStyle } from "./styles";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";

interface NavBarProps {
  logout: () => void;
}

export const NavBar = ({ logout }: NavBarProps) => {
  const classes = useStyle();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Menu
            buttonContent={<MenuIcon />}
            buttonProps={{
              edge: "start",
              className: classes.menuButton,
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
          buttonContent={<AccountCircle />}
          items={[{ id: "logout", label: "Logout", action: logout }]}
        />
      </Toolbar>
    </AppBar>
  );
};
