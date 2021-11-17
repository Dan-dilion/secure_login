import { createSlice } from '@reduxjs/toolkit';

// const defaultState = (verified) => {
//   if (verified) {
//     console.log('access token exists and passed verification: ', savedUser);
//     return ({
//       loggedIn: {
//         verified: savedUser.loginSuccess,
//         jwt: savedUser.token,
//         user: savedUser.user
//       }
//     });
//   } else {
//     return ({
//       loggedIn: {
//         verified: false,
//         jwt: '',
//         user: {
//           datecreated: '',
//           datelastlogin: '',
//           email: '',
//           id: null,
//           password: '',
//           username: ''
//         }
//       }
//     });
//   }
// };
//
// const savedUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
//
// const initialStateChecker = async () => {
//   if (savedUser) {
//     await verifyUser(savedUser.loginSuccess, defaultState);
//   }
// };

const defaultState = {
  loggedIn: {
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
      console.log('loginSlice - Setting waiting flag: ', action);
      state.loggedIn.loggedInButWaitingToVerify = action.payload;
    }
  }
});

console.log('loginSlice actions: ', loginSlice.actions);
console.log('loginSlice reducer: ', loginSlice.reducer);
console.log('loginSlice: ', loginSlice);

export const {
  setLoggedIn,
  setVerifiedToken,
  setLoggedInButWaitingToVerify
} = loginSlice.actions;

export default loginSlice.reducer;
