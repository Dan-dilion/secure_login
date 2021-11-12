import { combineReducers } from 'redux';
import loginReducer from '../pages/Login/loginSlice.js';

/*
this is the rootReducer. It will combine the state of all of my features in to one object.
Each reducer is referred to as a slice and the reducer function for the slice. Slice is called
a slice reducer.
*/
export default combineReducers({
  login: loginReducer
});
