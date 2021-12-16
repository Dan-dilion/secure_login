import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '1rem'
  },
  textArea: {
  },
  paragraphs: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem'
    },
    marginBottom: '.75em'
  },
  listBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  listBoxes: {
    width: '50%',
    minWidth: '20rem'
  },
  lists: {
    borderRadius: '10px',
    paddingBottom: '1rem',
    fontSize: '1.5rem',
    width: '80%'
  },
  listItem: {
    padding: 0
  }
}));

export default useStyles;
