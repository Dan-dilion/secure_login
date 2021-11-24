import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
  },
  inputBoxes: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between'
  },
  heading: {
    margin: '1.5rem 0'
  },
  userNameIcon: {
    color: 'black',
    opacity: 0.54
  },
  inputBox: {
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  options: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  loginButtonRow: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark
    }
  },
  infoPanel: {
    marginTop: '3em',
    textAlign: 'center'
  }
}));

export default useStyles;
