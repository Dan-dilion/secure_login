import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    width: '100%'
  },
  table: {
    padding: 0,
    width: '100%'
  },
  head: {
    background: 'linear-gradient(15deg, #000000 10%, #3a1f7a 30%, #000000 70%, #3a1f7a 100%)'
  },
  headerCells: {
    color: theme.palette.common.white,
    padding: '7px'
  },
  bodyCells: {
    padding: '7px'
  }
}));

export default useStyles;
