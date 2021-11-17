import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  sqlResults: [],
  headerSelection: 0,
  loginModal: {
    visible: false,
    returnPath: '/Home'
  }
};

const appSlice = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers: {
    setSqlResults(state, action) {
      // console.log('appReducer setSqlResults here: ', action);
      state.sqlResults = action.payload;
    },


    setHeaderUnderline(state, action) {
      // console.log('appReducer setHeaderUnderline here: ', action);
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
      state.loginModal = {
        visible: action.payload.visible,
        returnPath: action.payload.returnPath ? action.returnPath : '/Home'
      };
    }
  }
});

export const { setSqlResults, setHeaderUnderline, setLoginModalVisible } = appSlice.actions;
export default appSlice.reducer;
