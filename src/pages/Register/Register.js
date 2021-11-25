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
    handleClickShowPassword,
    handleSubmit,
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

        <Typography className={classes.headingDiscription}>
          Enter your details here to create an account
        </Typography>

        <Container className={classes.inputsContainer}>
          <Container className={classes.leftPanel}>
            <FormControl
              className={classes.inputBoxs}
              error={values.username.error}
            >
              <InputLabel htmlFor="custom-username-TextField">Username</InputLabel>
              <Input
                id="custom-username-TextField"
                type="text"
                value={values.username.value}
                onChange={event => setValues({
                  ...values,
                  username: {
                    ...values.username,
                    value: event.target.value,
                    error: false,
                    message: ''
                  }
                })}
                endAdornment = {
                  <InputAdornment position="end">
                      <AccountCircle className={classes.inputIcon} />
                  </InputAdornment>
                }
              />
              <FormHelperText
                style={{
                  opacity: values.username.error ? 1 : 0,
                  position: 'absolute',
                  top: '100%'
                }}
              >{values.username.message}</FormHelperText>
            </FormControl>

            <FormControl
              className={classes.inputBoxs}
              error={values.email.error}
            >
              <InputLabel htmlFor="custom-email-TextField">Email</InputLabel>
              <Input
                id="custom-email-TextField"
                type="email"
                value={values.email.value}
                onChange={event => {
                  setValues({
                    ...values,
                    email: {
                      ...values.email,
                      value: event.target.value,
                      error: false,
                      message: ''
                    }
                  });
                }}
                endAdornment= {
                  <InputAdornment position="end">
                      <Email className={classes.inputIcon} />
                  </InputAdornment>
                }
              />
            <FormHelperText
              style={{
                opacity: values.email.error ? 1 : 0,
                position: 'absolute',
                top: '100%'
              }}
            >{values.email.message}</FormHelperText>
            </FormControl>

            <FormControl className={classes.inputBoxs} error={values.password1.error}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.password1.showPasswords ? 'text' : 'password'}
                value={values.password1.value}
                onChange={event => setValues({
                  ...values,
                  password1: {
                    ...values.password1,
                    value: event.target.value,
                    error: false,
                    message: ''
                  }
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={preventDefaultEvent}
                      edge="end"
                    >
                      {values.password1.showPasswords ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                style={{
                  opacity: values.password1.error ? 1 : 0,
                  position: 'absolute',
                  top: '100%'
                }}
              >{values.password1.message}</FormHelperText>
            </FormControl>

            <FormControl
              className={classes.inputBoxs}
              error={values.password2.error}
            >
              <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.password1.showPasswords ? 'text' : 'password'}
                value={values.password2.value}
                onChange={event => setValues({
                  ...values,
                  password2: {
                    ...values.password2,
                    value: event.target.value,
                    error: false,
                    message: ''
                  }
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={preventDefaultEvent}
                      edge="end"
                    >
                      {values.password1.showPasswords ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                style={{
                  opacity: values.password2.error ? 1 : 0,
                  position: 'absolute',
                  top: '100%'
                }}
              >{values.password2.message}</FormHelperText>
            </FormControl>

          </Container>

          <Container className={classes.rightPanel}>
            <TextField
              className={classes.inputBoxs}
              name="phone"
              label="Phone Number"
              type="phone"
              error={values.phone.error}
              helperText={values.phone.message}
              value={values.phone.value}
              onChange={event => setValues({
                ...values,
                phone: {
                  ...values.phone,
                  value: event.target.value,
                  error: false,
                  message: ''
                }
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <Email className={classes.inputIcon} />
                  </InputAdornment>
                )
              }}
              FormHelperTextProps={{
                style: {
                  opacity: values.phone.error ? 1 : 0,
                  position: 'absolute',
                  top: '100%'
                }
              }}
            />

            <TextField
              className={classes.inputBoxs}
              name="address"
              label="Address"
              type="address"
              error={values.address.error}
              helperText={values.address.message}
              value={values.address.value}
              onChange={event => setValues({
                ...values,
                address: {
                  ...values.address,
                  value: event.target.value,
                  error: false,
                  message: ''
                }
              })}
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
              animateYearScrolling={true}
              error={values.dob.error}
              helperText={values.dob.message}
              value={values.dob.value}
              label="Date Of Birth"
              onChange={date => setValues({
                ...values,
                dob: {
                  ...values.dob,
                  value: date,
                  error: false,
                  message: ''
                }
              })}
              format="dd/MM/yyyy"
              KeyboardButtonProps={{ edge: 'end' }}
            />

            <FormControl
              className={classes.inputBoxs}
              error={values.gender.error}
            >
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.gender.value}
                onChange={event => setValues({
                  ...values,
                  gender: {
                    ...values.gender,
                    value: event.target.value,
                    error: false,
                    message: ''
                  }
                })}
              >
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
                <MenuItem value={30}>Prefer not to say</MenuItem>
              </Select>
              <FormHelperText
                style={{
                  opacity: values.gender.error ? 1 : 0,
                  position: 'absolute',
                  top: '100%'
                }}
              >{values.gender.message}</FormHelperText>

            </FormControl>


          </Container>
        </Container>

        <Button onClick={handleSubmit} color="primary" variant="contained">Sign Up</Button>
      </form>
    </Container>
  );
};

export default Register;
