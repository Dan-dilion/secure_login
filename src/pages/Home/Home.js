import React from 'react';
import { Container } from '@material-ui/core';

import HomeLogic from './HomeLogic.js';

const Home = (props) => {
  // De-structure logic
  const {
    classes
  } = HomeLogic(props);

  return (
    <>
    <Container>
      <h1>This will be the home screen</h1>
    </Container>
    </>
  );
};

export default Home;
