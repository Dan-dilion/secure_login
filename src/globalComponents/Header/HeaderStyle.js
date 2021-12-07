import { makeStyles } from '@material-ui/core';
// import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    display: 'flex'
  },
  barStyle: {
    borderRadius: '10px 10px 0 0',
    background: theme.palette.primary
  },
  toolbarStyle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  titleStyle: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    margin: 0
  },
  tab: {
    minWidth: '10rem'
  },
  buttonContainer: {
    maxWidth: '16em',
    margin: 0,
    padding: 0
  },
  loginButton: {
    margin: '.5em',
    width: '7em'
  },
  signupButton: {
    margin: '.5em',
    width: '7em',
    color: 'white'
  },
  iconButton: {
    // color: 'white'
  },
  userIcon: {
    color: 'white',
    fontSize: '1.5em'
  },
  userMenu: {
    top: '100%'
  },
  menuItems: {
    // maxHeight: 48 * 4.5,
    // width: '20ch'
  }
}));

export default useStyles;
