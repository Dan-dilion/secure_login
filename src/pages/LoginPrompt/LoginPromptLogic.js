import { useLocation } from 'react-router-dom';

const LoginPromptLogic = () => {
  const state = useLocation();

  return {
    state
  };
};

export default LoginPromptLogic;
