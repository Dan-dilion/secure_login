import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  sqlResults: [],
  headerSelection: 0,
  loginModal: {
    visible: false,
    returnPath: '/Home',
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
        case 'home':
        case 'Home':
        case '': imposeDelay(() => { state.headerSelection = 0; }); break;
        case 'about':
        case 'About': imposeDelay(() => { state.headerSelection = 1; }); break;
        case 'private':
        case 'Private': imposeDelay(() => { state.headerSelection = 2; }); break;
        default: break;
      }
    },


    setLoginModalVisible(state, action) {
      console.log('appReducer setLoginModalVisible here: ', action);
      state.loginModal.visible = action.payload.visible;
      state.loginModal.returnPath = action.payload.returnPath ? action.returnPath : '/Home';
    },


    setLoginOrRegister(state, action) {
      console.log('appReducer setLoginOrRegister here: ', action);
      let newState;
      switch (action.payload) {
        case true:
        case 'true':
        case 'Login':
        case 'login': newState = true; break;
        case false:
        case 'false':
        case 'Register':
        case 'register': newState = false; break;
        default: newState = false;
      }
      state.loginModal.loginOrRegister = newState;  // True = login
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
