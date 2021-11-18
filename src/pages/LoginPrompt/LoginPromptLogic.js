import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoginModalVisible } from '../../App/AppSlice.js';

import useStyles from './LoginPromptStyle.js';

const LoginPromptLogic = () => {
  const classes = useStyles();
  const state = useLocation();
  const dispatch = useDispatch();


  return {
    classes,
    state,
    dispatch,
    setLoginModalVisible
  };
};

export default LoginPromptLogic;
