import React, { useEffect } from 'react';
import { Container, Card, Typography, Button } from '@material-ui/core';

import LoginPromptLogic from './LoginPromptLogic.js';

const LoginPrompt = (props) => {
  // De-construct logic
  const {
    classes,
    state,
    dispatch,
    setLoginModalVisible
  } = LoginPromptLogic(props);

  useEffect(() => {
    dispatch(setLoginModalVisible({ visible: true, returnPath: state.path }));
  }, []);

  return (
    <Container className={classes.root} maxWidth={false}>
      <Card className={classes.messageCard} elevation={0}>
        <Typography variant="h5">
          Please log in to see the contents of this page
        </Typography>
        <Button className={classes.loginButton} variant="outlined" color="primary" onClick={() => dispatch(setLoginModalVisible({ visible: true, returnPath: state.path }))}>
          Login
        </Button>
      </Card>
    </Container>
  );
};

export default LoginPrompt;
