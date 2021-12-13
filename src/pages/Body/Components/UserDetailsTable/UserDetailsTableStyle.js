import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  id: {
    maxWidth: '2rem'
  },
  username: {
    maxWidth: '5rem'
  },
  email: {
    maxWidth: '4rem'
  },
  password: {
    maxWidth: '5rem'
  },
  phone: {
    maxWidth: '4rem'
  },
  address: {
    maxWidth: '5rem'
  },
  dob: {
    maxWidth: '5rem'
  },
  gender: {
    maxWidth: '5rem'
  },
  datecreated: {
    maxWidth: '6rem'
  },
  datelastlogin: {
    maxWidth: '6rem'
  }
}));

export default useStyles;
