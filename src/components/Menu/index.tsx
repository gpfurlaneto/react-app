import React from 'react';
import {
  IconButton,
  Menu as MenuUI,
  MenuItem as MenuItemUI,
} from '@mui/material';

export interface MenuProps {
  items: MenuItem[];
  buttonContent: React.ReactElement;
  buttonProps?: { [key: string]: any };
}

export interface MenuItem {
  id: string;
  label: string;
  action: () => void;
}

export function Menu({ buttonContent, buttonProps, items }: MenuProps) {
  const nodeRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickHandle = (action: () => void) => {
    return () => {
      handleClose();
      action();
    };
  };
  return (
    <div>
      test
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        {...(buttonProps || {})}
      >
        {buttonContent}
      </IconButton>
      <MenuUI
        ref={nodeRef}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {items &&
          items.map((item: MenuItem) => (
            <MenuItemUI key={item.id} onClick={onClickHandle(item.action)}>
              {item.label}
            </MenuItemUI>
          ))}
      </MenuUI>
    </div>
  );
}
