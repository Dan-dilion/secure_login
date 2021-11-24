import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2rem'
  },
  message: {
    marginBottom: '2rem'
  },
  jwtCard: {
    width: '100%',
    margin: '1rem auto',
    padding: '0 .5rem'
  },
  jwtTextBox: {
    padding: '0',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  tableContainer: {
    margin: '1rem -24px'
  }
}));

export default useStyles;
