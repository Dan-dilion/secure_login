import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
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
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setVerifiedToken(state, action) {
      state.loggedIn.verified = action.payload;
    },
    setLoggedInButWaitingToVerify(state, action) {
      state.loggedIn.loggedInButWaitingToVerify = action.payload;
    }
  }
});

export const {
  setLoggedIn,
  setVerifiedToken,
  setLoggedInButWaitingToVerify
} = loginSlice.actions;

export default loginSlice.reducer;
