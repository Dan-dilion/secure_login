import { useLocation } from 'react-router-dom';

const LoginPromptLogic = ({ setLoginModalVisible }) => {
  const state = useLocation();

  return {
    setLoginModalVisible,
    state
  };
};

export default LoginPromptLogic;
