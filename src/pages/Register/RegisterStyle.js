import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1.5rem'
  },
  form: {
    padding: 0
  },
  headingContainer: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  heading: {
  },
  backIcon: {
    padding: 0,
    width: '32px'
  },
  headingDiscription: {
  },
  inputsContainer: {
    display: 'flex',
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  leftPanel: {
    padding: 0,
    paddingRight: theme.spacing(1)
  },
  rightPanel: {
    padding: 0,
    paddingLeft: theme.spacing(1)
  },
  inputBoxs: {
    width: '100%'
    // width: '25ch',
  },
  inputIcon: {
    color: 'black',
    opacity: 0.54
  }
}));

export default useStyles;
