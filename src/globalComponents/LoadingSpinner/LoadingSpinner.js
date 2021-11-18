import React from 'react';
import { Container } from '@material-ui/core';
import { RingLoader } from 'react-spinners/';

import useStyles, { spinnerCss } from './LoadingSpinnerStyle.js';

const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <RingLoader css={spinnerCss} color="#3a1f7a" size={'150'} loading={true} />
    </Container>
  );
};

export default LoadingSpinner;
