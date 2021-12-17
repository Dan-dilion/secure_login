import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1.5rem'
  },
  textAndDiagramContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  textArea: {
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  diagramBox: {
    margin: 'auto 0',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  diagram: {
    width: '100%'
  },
  paragraphs: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem'
    },
    marginBottom: '.75em'
  }
}));

export default useStyles;
