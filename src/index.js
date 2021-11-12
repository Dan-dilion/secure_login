import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';
import rootReducer from './reducers';
import App from './App';


import * as serviceWorker from './serviceWorker';

const store = configureStore({
  reducer: rootReducer
});

// removed React.StrictMode from empty diamond brackets to prevent MUI from
// tripping errors in the console. Should be fixed when MUI gets updated
ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
