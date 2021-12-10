import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  sqlResults: [],
  headerSelection: 0,
  loginModal: {
    visible: false,
    loginOrRegister: true
  }
};

const appSlice = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers: {
    setSqlResults(state, action) {
      state.sqlResults = action.payload;
    },


    setHeaderUnderline(state, action) {
      const imposeDelay = (callback) => {
        // setTimeout(() => {
        callback();
        // }, (action.payload.delay ? 2500 : 1000));
      };

      if (action.payload.delay) state.headerSelection = null;

      switch (action.payload.routeName) {
        case '':
        case 'Home': imposeDelay(() => { state.headerSelection = 0; }); break;
        case 'About': imposeDelay(() => { state.headerSelection = 1; }); break;
        case 'LoginPrompt':
        case 'Private': imposeDelay(() => { state.headerSelection = 2; }); break;
        default: break;
      }
    },


    setLoginModalVisible(state, action) {
      console.log('appReducer setLoginModalVisible here: ', action);
      state.loginModal.visible = action.payload;
    },

    setLoginOrRegister(state, action) {
      switch (action.payload) {
        case true:
        case 'true':
        case 'Login':
        case 'login': state.loginModal.loginOrRegister = true; break;           // True == login
        case false:
        case 'false':
        case 'Register':
        case 'register': state.loginModal.loginOrRegister = false; break;       // False == register
        default: break;
      }
    }
  }
});

export const {
  setSqlResults,
  setHeaderUnderline,
  setLoginModalVisible,
  setLoginOrRegister
} = appSlice.actions;
export default appSlice.reducer;
