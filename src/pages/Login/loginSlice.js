import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  loginForm: {
    emailAddress: '',
    password: ''
  },
  loggedIn: {
    msg: '',
    verified: false,
    loggedInButWaitingToVerify: false,
    jwt: '',
    user: {
      datecreated: '',
      datelastlogin: '',
      email: '',
      id: null,
      password: '',
      username: ''
    }
  }
};

const loginSlice = createSlice({
  name: 'login',
  initialState: defaultState,
  reducers: {
    setLoginForm(state, action) {
      state.loginForm = action.payload;
    },
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setVerifiedToken(state, action) {
      state.loggedIn.verified = action.payload;
    },
    setLoggedInButWaitingToVerify(state, action) {
      state.loggedIn.loggedInButWaitingToVerify = action.payload;
    },
    setLogout(state, action) {
      state.loggedIn = defaultState.loggedIn;
      state.loginForm = defaultState.loginForm;
    }
  }
});

export const {
  setLoginForm,
  setLoggedIn,
  setVerifiedToken,
  setLoggedInButWaitingToVerify,
  setLogout
} = loginSlice.actions;

export default loginSlice.reducer;
