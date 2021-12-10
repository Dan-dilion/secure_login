import store from '../reducers/';
import { setLoginModalVisible, setLoginOrRegister } from '../App/AppSlice.js';

export const switchLoginOrRegister = (value) => {
  if (value === 'login') {
    store.dispatch(setLoginModalVisible(false));
    setTimeout(() => {
      store.dispatch(setLoginOrRegister('login'));
      store.dispatch(setLoginModalVisible(true));
    }, 500);
  } else if (value === 'register') {
    store.dispatch(setLoginModalVisible(false));
    setTimeout(() => {
      store.dispatch(setLoginOrRegister('register'));
      store.dispatch(setLoginModalVisible(true));
    }, 500);
  }
};
