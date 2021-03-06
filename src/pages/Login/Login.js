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
  AlternateEmail,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';


import LoginLogic from './LoginLogic.js';   // Page logic
import { switchLoginOrRegister } from '../../utils/appUtils.js';

const Login = props => {

  // Deconstruct page logic
  const {
    classes,
    values,
    showPassword,
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
                  label={'Email'}
                  type="email"
                  value={values.emailAddress}
                  name="emailAddress"
                  onChange={handleChange('emailAddress')}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          <AlternateEmail className={classes.emailAddressIcon} />
                      </InputAdornment>
                    )
                  }}
                />

              <FormControl className={classes.inputBox} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
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
                <Typography className={classes.links} onClick={() => switchLoginOrRegister('register')}>Sign up here</Typography>
              </Container>
            </Paper>
          </form>
        </div>

      </Container>
    < />
  );
};

export default Login;
