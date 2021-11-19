import { makeStyles } from '@material-ui/core';
// import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    padding: 0,
    display: 'flex'
  },
  barStyle: {
    borderRadius: '10px 10px 0 0',
    background: 'linear-gradient(15deg, #000000 10%, #3a1f7a 30%, #000000 70%, #3a1f7a 100%)'
  },
  toolbarStyle: {
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
  dropdownStyle: {
  }
});

export default useStyles;
