import { makeStyles } from '@material-ui/core';
// import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    display: 'flex'
  },
  barStyle: {
    borderRadius: '10px 10px 0 0',
    padding: '5px',
    background: theme.palette.primary
  },
  toolbarStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  titleStyle: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    margin: 0
  },
  tab: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '.8rem',
      minWidth: '6rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
      minWidth: '10rem'
    }
  },
  buttonContainer: {
    maxWidth: '16em',
    display: 'flex',
    flexWrap: 'nowrap',
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
  userIconDisabled: {
    color: 'white',
    opacity: 0.2,
    fontSize: '1.5em'
  },
  userMenu: {
    top: '100%'
  },
  menuItems: {
    padding: '8px',
    margin: '0 8px 0 8px',
    borderRadius: '7px'
    // maxHeight: 48 * 4.5,
    // width: '20ch'
  },
  usernameMenuItem: {
    backgroundColor: theme.palette.grey[100],
    padding: '8px',
    margin: '0 8px 8px 8px',
    borderRadius: '7px',
    width: 'calc(100% - 16px)'
  },
  menuItemIcon: {
    fontSize: '2.5rem'
  },
  menuDevider: {
    backgroundColor: theme.palette.primary.light,
    height: '4px',
    marginBottom: '8px'
  }
}));

export default useStyles;
