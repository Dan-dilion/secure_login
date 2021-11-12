import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem
} from '@material-ui/core';
import { MoreVert, AccountCircle, Home } from '@material-ui/icons';
import useStyles from './HeaderStyle.js';
import './Header.css';

export const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const dropdownClickHandeler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dropdownCloseHandeler = (event) => {
    setAnchorEl(false);
  };

  return (
    <header className={classes.root}>
      <AppBar position='static' className={classes.barStyle}>
        <Toolbar className={classes.toolbarStyle}>

          <div className={classes.titleStyle}>
            <Typography variant='h4'>S</Typography>
            <Typography variant='h6'>mart</Typography>
            <Typography variant='h4'>&nbsp;I</Typography>
            <Typography variant='h6'>nventory</Typography>
            <Typography variant='h4'>&nbsp;M</Typography>
            <Typography variant='h6'>anagement</Typography>
            <Typography variant='h4'>&nbsp;S</Typography>
            <Typography variant='h6'>ystem</Typography>
          </div>

          <div className={classes.dropdownStyle}>
            <IconButton
              className={classes.menuButtonStyle}
              color='inherit'
              aria-controls={'header-dropdown-menu'}
              aria-haspopup='true'
              onClick={dropdownClickHandeler}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id='header-dropdown-menu'
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={dropdownCloseHandeler}
            >
              <MenuItem
                component={Link}
                to='/Home'
                onClick={dropdownCloseHandeler}><Home />Home</MenuItem>
              <MenuItem onClick={dropdownCloseHandeler}>Item 2</MenuItem>
              <MenuItem
                component={Link}
                to="/Users"
                onClick={dropdownCloseHandeler}
              ><AccountCircle />Users</MenuItem>
            </Menu>
          </div>

        </Toolbar>
      </AppBar>
    </header>
  );
};
