import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  TableContainer: {
    margin: '0 auto'
  },
  id: {
    width: '5%',
    marginLeft: '1%',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  },
  username: {
    width: '15%',
    marginLeft: '1em',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  },
  password: {
    width: '20%',
    marginLeft: '1em',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  },
  email: {
    width: '60%',
    marginLeft: '1em',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  },
  cellContainer: {
    id: {
      width: '5em'
    },
    username: {
      width: '15em'
    },
    password: {
      width: '20em'
    },
    email: {
      width: '60em'
    }
  }
}));

export default useStyles;
