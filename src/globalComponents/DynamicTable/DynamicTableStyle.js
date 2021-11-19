import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  table: {
    width: '100%'
  },
  head: {
    background: 'linear-gradient(15deg, #000000 10%, #3a1f7a 30%, #000000 70%, #3a1f7a 100%)'
  },
  headerCells: {
    color: theme.palette.common.white,
    padding: '3px'
  },
  bodyCells: {
    padding: '3px'
  }
}));

export default useStyles;
