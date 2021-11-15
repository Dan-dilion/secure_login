import React from 'react';
import {
  Container,
  Grid,
  Button,
  TextField,
  Paper,
  Typography
} from '@material-ui/core';
// import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

import LoginLogic from './LoginLogic.js';   // Page logic
import useStyles from './LoginStyle.js';    // Page MUI style

export const Login = props => {

  // Deconstruct page logic
  const {
    userName,
    password,
    hash,
    handleSubmit,
    onChangeUsername,
    onChangePassword
  } = LoginLogic(props);

  // Establish classes from the imported MUI style
  const classes = useStyles();

  return (
    <>
      <Container>
        <div className='login-form'>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Paper
              className={classes.containerStyle}
              variant="elevation"
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <h1>JWT Login System</h1>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          color="primary"
                          label="Username"
                          type="text"
                          name="userName"
                          onChange={onChangeUsername}
                          fullWidth
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          color="primary"
                          label="Password"
                          type="password"
                          name="password"
                          onChange={onChangePassword}
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onSubmit={handleSubmit}
                  >Login</Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </div>

        <div className={classes.infoPanel}>
          <Typography variant='h5'>User name: {userName}</Typography>
          <Typography variant='h5'>password: {password}</Typography>
          <Typography variant='h5'>Hash: {hash}</Typography>
        </div>
      </Container>
    < />
  );
};

export default Login;
