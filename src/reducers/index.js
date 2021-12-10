import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../pages/Login/loginSlice.js';
import appReducer from '../App/AppSlice.js';
import registerReducer from '../pages/Register/registerSlice.js';

/*
this is the rootReducer. It will combine the state of all of my features in to one object.
Each reducer is referred to as a slice and the reducer function for the slice. Slice is called
a slice reducer.
*/
const rootReducer = combineReducers({
  login: loginReducer,
  app: appReducer,
  register: registerReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
