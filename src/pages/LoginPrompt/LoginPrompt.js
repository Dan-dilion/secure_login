import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Typography, Button } from '@material-ui/core';

import { setLoginModalVisible } from '../../App/AppSlice.js';
import LoginPromptLogic from './LoginPromptLogic.js';

const LoginPrompt = (props) => {

  // Deconstruct logic
  const {
    state
  } = LoginPromptLogic(props);

  const dispatch = useDispatch();

  return (
    <Container>
      <Card>
        <Typography>
          You do not have the privileges to access
        </Typography>
        <Button onClick={() => dispatch(setLoginModalVisible({ visible: true, returnPath: state.path }))}>
          Login
        </Button>
      </Card>
    </Container>
  );
};

export default LoginPrompt;
