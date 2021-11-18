import React from 'react';
import {
  Container,
  Grid,
  Button,
  TextField,
  Paper,
  Typography,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControl,
  IconButton
} from '@material-ui/core';
import {
  AccountCircle,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';

import LoginLogic from './LoginLogic.js';   // Page logic

export const Login = props => {

  // Deconstruct page logic
  const {
    classes,
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    hash,
    handleSubmit
  } = LoginLogic(props);

  return (
    <>
      <Container className={classes.root}>
        <div className='login-form'>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Paper
              className={classes.containerStyle}
              variant="elevation"
               elevation={0}
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
                          label={'Username'}
                          type="text"
                          value={values.userName}
                          name="userName"
                          onChange={handleChange('userName')}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                  <AccountCircle className={classes.userNameIcon} />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>

                        <FormControl className={classes.pwdBox} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            labelWidth={70}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>

{/*
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
*/}

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
          <Typography variant='h5'>User name: {values.userName}</Typography>
          <Typography variant='h5'>password: {values.password}</Typography>
          <Typography variant='h5'>Hash: {hash}</Typography>
        </div>
      </Container>
    < />
  );
};

export default Login;
