import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 0
  },
  messageCard: {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: '2rem'
  },
  loginButton: {
    margin: '5rem 0 0 0',
    width: '20%'
  }
});

export default useStyles;
