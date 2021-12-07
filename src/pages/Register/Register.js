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
    theme,
    dispatch,
    setLoginOrRegister,
    values,
    setValues,
    showPasswords,
    handleClickShowPassword,
    onPasswordChange,
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
            <TextField
              className={classes.inputBoxs}
              id="custom-username-TextField"
              label="Username"
              type="text"
              error={values.username.error}
              helperText={values.username.message}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <AccountCircle className={classes.inputIcon} />
                  </InputAdornment>
                )
              }}
              FormHelperTextProps={{
                className: classes.helperMessage,
                style: {
                  opacity: values.username.error ? 1 : 0,
                  position: 'absolute',
                  top: '100%'
                }
              }}
            />

            <TextField
              className={classes.inputBoxs}
              id="custom-email-TextField"
              label="Email"
              type="email"
              error={values.email.error}
              helperText={values.email.message}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <Email className={classes.inputIcon} />
                  </InputAdornment>
                )
              }}
              FormHelperTextProps={{
                className: classes.helperMessage,
                style: {
                  opacity: values.email.error ? 1 : 0,
                  position: 'absolute',
                  top: '100%'
                }
              }}
            />

            <FormControl className={classes.inputBoxs} error={values.password1.error}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPasswords ? 'text' : 'password'}
                value={values.password1.value}
                onChange={event => onPasswordChange(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={preventDefaultEvent}
                      edge="end"
                    >
                      {showPasswords ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                className={classes.helperMessage}
                style={{
                  opacity: values.password1.error ? 1 : 0,
                  color: values.password1.messageColor === 'red'
                    ? theme.palette.error.main
                    : values.password1.messageColor === 'yellow'
                      ? '#dd8f00'
                      : values.password1.messageColor === 'green'
                        ? '#089c00'
                        : theme.palette.error.main
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
                type={showPasswords ? 'text' : 'password'}
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
                      {showPasswords ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                className={classes.helperMessage}
                style={{
                  opacity: values.password2.error ? 1 : 0
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
                className: classes.helperMessage,
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
              invalidDateMessage={'Invalid date!'}
              autoOk={true}
              animateYearScrolling={true}
              error={values.dob.error}
              helperText={values.dob.message}
              value={values.dob.value}
              label="Date Of Birth (dd/mm/yyyy)"
              onError={(error, date) => {
                if (error !== values.dob.pickerErrorMessage) {
                  setValues({
                    ...values,
                    dob: {
                      ...values.dob,
                      value: date,
                      pickerErrorMessage: error
                    }
                  });
                }
              }}
              onChange={(date, isFinish) => isFinish && setValues({
                ...values,
                dob: {
                  ...values.dob,
                  value: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
                  error: false,
                  message: ''
                }
              })}
              format="dd/MM/yyyy"
              KeyboardButtonProps={{ edge: 'end' }}
              FormHelperTextProps={{
                className: classes.helperMessage,
                style: {
                  opacity: values.dob.error ? 1 : 0,
                  position: 'absolute',
                  top: '100%'
                }
              }}
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
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Prefer not to say'}>Prefer not to say</MenuItem>
              </Select>
              <FormHelperText
                className={classes.helperMessage}
                style={{
                  opacity: values.gender.error ? 1 : 0
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
