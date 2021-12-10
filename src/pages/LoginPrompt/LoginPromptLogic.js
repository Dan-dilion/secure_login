import { useDispatch } from 'react-redux';
import { setLoginModalVisible, setLoginOrRegister } from '../../App/AppSlice.js';

import useStyles from './LoginPromptStyle.js';

const LoginPromptLogic = () => {
  const classes = useStyles();
  const dispatch = useDispatch();


  return {
    classes,
    dispatch,
    setLoginModalVisible,
    setLoginOrRegister
  };
};

export default LoginPromptLogic;
