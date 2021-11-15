import React from 'react';
import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  Tabs,
  Tab
} from '@material-ui/core';
import { Info as InfoIcon, Lock as LockIcon, LockOpen as LockOpenIcon, Home as HomeIcon } from '@material-ui/icons';
import HeaderLogic from './HeaderLogic.js';

const Header = (props) => {
  // Destructure logic
  const {
    classes,
    handleChange,
    verifiedLogin,
    headerSelection
  } = HeaderLogic(props);

  return (
    <Container className={classes.root}>
      <AppBar position='static' className={classes.barStyle}>
        <Toolbar className={classes.toolbarStyle}>

          <div className={classes.titleStyle}>
            <Typography variant='h4'>JWT</Typography>
            <Typography variant='h4'>&nbsp;S</Typography>
            <Typography variant='h6'>mart</Typography>
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
              <Tab className={classes.tab} icon={<HomeIcon />} onClick={() => handleChange('Home')} label='Home' />
              <Tab className={classes.tab} icon={<InfoIcon />} onClick={() => handleChange('About')} label='About' />
              <Tab className={classes.tab} icon={(verifiedLogin ? <LockOpenIcon /> : <LockIcon />)} onClick={() => handleChange('Private')} label='Private' />
            </Tabs>
          </div>

        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
