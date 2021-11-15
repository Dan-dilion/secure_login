import React from 'react';
import { Container, Card, Typography, Button } from '@material-ui/core';

import LoginPromptLogic from './LoginPromptLogic.js';

const LoginPrompt = (props) => {

  // Deconstruct logic
  const {
    setLoginModalVisible,
    state
  } = LoginPromptLogic(props);

  return (
    <Container>
      <Card>
        <Typography>
          You do not have the privileges to access
        </Typography>
        <Button onClick={() => setLoginModalVisible(true, state.path)}>
          Login
        </Button>
      </Card>
    </Container>
  );
};

export default LoginPrompt;
