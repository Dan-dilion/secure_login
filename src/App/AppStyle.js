const AppStyle = theme => ({
  root: {
    // border: '2px solid red',
    padding: 0,
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: 0
    },
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      marginBottom: '2rem'
    }
  },
  pageArea: {
    // border: '2px solid green',
    padding: 0
    // borderRadius: '0 0 10px 10px'
  },
  mainCard: {
    borderRadius: '0 0 10px 10px'
  },
  modal: {
  },
  loginCard: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    },
    minWidth: '20rem',
    margin: '15vh auto',
    borderRadius: '20px',
    overflow: 'auto'
  }
});

export default AppStyle;
