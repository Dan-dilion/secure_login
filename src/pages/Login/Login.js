import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
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

const Login = props => {

  // Deconstruct page logic
  const {
    classes,
    setLoginOrRegister,
    dispatch,
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit
  } = LoginLogic(props);

  return (
    <>
      <Container className={classes.root}>
        <div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Paper
              variant="elevation"
              elevation={0}
            >
              <Container className={classes.inputBoxes}>
                <Typography className={classes.heading} variant="h3">User Login</Typography>
                <TextField
                  id="outlined-basic"
                  className={classes.inputBox}
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

              <FormControl className={classes.inputBox} variant="outlined">
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
              </Container>

              <Container className={classes.options}>
                <Container className={classes.loginButtonRow}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onSubmit={handleSubmit}
                  >Login</Button>

                <Typography className={classes.links} component={Link} to="/LoginPrompt">Forgot Password?</Typography>
                </Container>
                <Typography className={classes.links} onClick={() => dispatch(setLoginOrRegister(false))}>Sign up here</Typography>
              </Container>
            </Paper>
          </form>
        </div>

        <div className={classes.infoPanel}>
          <Typography variant='h5'>User name: test</Typography>
          <Typography variant='h5'>password: test</Typography>
        </div>
      </Container>
    < />
  );
};

export default Login;
