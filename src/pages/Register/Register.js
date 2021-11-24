import React from 'react';
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  FormHelperText,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  AccountCircle,
  Email,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import { ReactComponent as BackArrow } from './assets/back-arrow.svg';

import RegisterLogic from './RegisterLogic.js';

const Register = (props) => {
  // De-structure logic
  const {
    classes,
    dispatch,
    setLoginOrRegister,
    values,
    setValues,
    validateEmailInput,
    handleClickShowPassword,
    preventDefaultEvent
  } = RegisterLogic(props);

  return (
    <Container className={classes.root}>
      <form
        className={classes.form}
        onSubmit={preventDefaultEvent}
      >
        <Container className={classes.headingContainer}>
          <Typography className={classes.heading} variant="h3">Sign Up</Typography>
          <IconButton
            onClick={ () => dispatch(setLoginOrRegister(true)) }
          ><BackArrow className={classes.backIcon}/></IconButton>
        </Container>
        <Typography className={classes.headingDiscription} variant="p">
          Enter your details here to create an account
        </Typography>
        <Container className={classes.inputsContainer}>
          <Container className={classes.leftPanel}>
            <TextField
              className={classes.inputBoxs}
              name="username"
              label="Username"
              type="text"
              value={values.username}
              onChange={event => setValues({ ...values, username: event.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <AccountCircle className={classes.inputIcon} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              className={classes.inputBoxs}
              name="email"
              label="Email"
              type="email"
              error={values.emailError}
              helperText={values.emailMessage}
              value={values.email}
              onChange={event => {
                validateEmailInput(event.target.value);
                setValues({ ...values, email: event.target.value });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <Email className={classes.inputIcon} />
                  </InputAdornment>
                )
              }}
            />

            <FormControl className={classes.inputBoxs}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password1}
                onChange={event => setValues({ ...values, password1: event.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={preventDefaultEvent}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl
              className={classes.inputBoxs}
              error={values.password1 !== values.password2}
            >
              <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password2}
                onChange={event => setValues({ ...values, password2: event.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={preventDefaultEvent}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            <FormHelperText
              style={{
                opacity: values.password1 !== values.password2 ? 1 : 0,
                position: 'absolute',
                top: '100%'
              }}
            >Passwords do not match!</FormHelperText>
            </FormControl>

          </Container>

          <Container className={classes.rightPanel}>
            <TextField
              className={classes.inputBoxs}
              name="phone"
              label="Phone Number"
              type="phone"
              value={values.phone}
              onChange={event => setValues({ ...values, phone: event.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <Email className={classes.inputIcon} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              className={classes.inputBoxs}
              name="address"
              label="Address"
              type="address"
              value={values.address}
              onChange={event => setValues({ ...values, address: event.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <Email className={classes.inputIcon} />
                  </InputAdornment>
                )
              }}
            />

            <KeyboardDatePicker
              className={classes.inputBoxs}
              variant="inline"
              disableFuture={true}
              maxDate={new Date()}
              minDate={new Date('1900')}
              minDateMessage={"C'mon! No one is that old!!!"}
              maxDateMessage={'DOB cannot exceed todays date!'}
              invalidDateMessage={'Invalid date format! Please enter DD/MM/YYYY'}
              autoOk={true}
              value={values.dob}
              label="Date Of Birth"
              onChange={date => setValues({ ...values, dob: date })}
              format="dd/MM/yyyy"
              KeyboardButtonProps={{ edge: 'end' }}
            />

            <FormControl
              className={classes.inputBoxs}
            >
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.gender}
                onChange={event => setValues({ ...values, gender: event.target.value })}
              >
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
                <MenuItem value={30}>Prefer not to say</MenuItem>
              </Select>
            </FormControl>


          </Container>
        </Container>

        <Button color="primary" variant="contained">Sign Up</Button>
      </form>
    </Container>
  );
};

export default Register;
