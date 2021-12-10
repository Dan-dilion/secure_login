import React from 'react';
import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  Tabs,
  Tab,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import {
  Info as InfoIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Home as HomeIcon,
  AccountCircle as UserIcon
} from '@material-ui/icons';

import { setLoginModalVisible, setLoginOrRegister } from '../../App/AppSlice.js';
import HeaderLogic from './HeaderLogic.js';

const Header = (props) => {
  // De-structure logic
  const {
    classes,
    dispatch,
    anchorEl,
    setAnchorEl,
    handleChange,
    verifiedLogin,
    headerSelection,
    userMenuOptions,
    handleUserMenuSelect
  } = HeaderLogic(props);

  return (
    <Container className={classes.root} maxWidth={false}>
      <AppBar position='static' className={classes.barStyle} variant="elevation" elevation={0}>
        <Toolbar className={classes.toolbarStyle}>

          <div className={classes.titleStyle}>
            <Typography variant='h4'>JWT</Typography>
            <Typography variant='h4'>&nbsp;S</Typography>
            <Typography variant='h6'>ecure</Typography>
            <Typography variant='h4'>&nbsp;L</Typography>
            <Typography variant='h6'>ogin</Typography>
            <Typography variant='h4'>&nbsp;S</Typography>
            <Typography variant='h6'>ystem</Typography>
          </div>

          <div>
            <Tabs
              value={headerSelection}
              indicatorColor="secondary"
            >
              <Tab
                className={classes.tab}
                icon={<HomeIcon />}
                onClick={() => handleChange('Home')}
                label='Home'
                wrapped
              />
              <Tab
                className={classes.tab}
                icon={<InfoIcon />}
                onClick={() => handleChange('About')}
                label='About'
                wrapped
              />
              <Tab
                className={classes.tab}
                icon={(verifiedLogin ? <LockOpenIcon /> : <LockIcon />)}
                onClick={() => handleChange('Private')}
                label='Private'
                wrapped
              />
            </Tabs>
          </div>

          <Container className={classes.buttonContainer} maxWidth={false}>
            <Button
              className={classes.loginButton}
              onClick={() => {
                dispatch(setLoginOrRegister('login'));
                dispatch(setLoginModalVisible(true));
              }}
              variant="outlined" color="secondary">Login</Button>
            <Button
              className={classes.signupButton}
              onClick={() => {
                dispatch(setLoginOrRegister('register'));
                dispatch(setLoginModalVisible(true));
              }}
              variant="contained"
              color="secondary"
              disableElevation={true}>Sign-Up</Button>
          </Container>

          <IconButton
            className={classes.iconButton}
            aria-label="more"
            aria-controls="user-menu"
            aria-haspopup="true"
            disabled={!verifiedLogin}
            onClick={ event => setAnchorEl(event.currentTarget) }
          >{
            verifiedLogin
              ? <UserIcon className={classes.userIcon} />
              : <UserIcon className={classes.userIconDisabled} />
          }</IconButton>
        <Menu
          id="user-menu"
          className={classes.userMenu}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ className: classes.menuItems }}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
        {userMenuOptions.map(option => (
          <MenuItem
            key={option}
            selected={option === 'logOut'}
            onClick={() => handleUserMenuSelect(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
