import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    width: '100%',
    borderRadius: '8px'
  },
  table: {
    padding: 0,
    width: '100%'
  },
  head: {
    background: theme.palette.primary.main
  },
  headerCells: {
    color: theme.palette.common.white,
    padding: '0.3rem'
  },
  bodyCells: {
    padding: '0.3rem'
    // marginLeft: '.5rem'
  },
  internalScrollBox: {
    // padding: '0.2rem',
    whiteSpace: 'nowrap',
    overflow: 'scroll',
    textOverflow: 'ellipsis',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  }
}));

export default useStyles;
