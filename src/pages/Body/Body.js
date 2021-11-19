import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  Card
} from '@material-ui/core';

import BodyLogic from './BodyLogic.js';
import UserDetailsTable from './Components/UserDetailsTable/';
import { queryDatabase } from '../../server_requests/queryDatabase.js';

export const Body = props => {
  // De-structure logic
  const {
    classes,
    loggedIn,
    pressMeCallBack
  } = BodyLogic(props);

  useEffect(() => {
    queryDatabase('get_user_details', loggedIn.jwt, results => pressMeCallBack(results));
  }, []);

  return (
    <Container className={classes.root}>
      <Container>
        <Typography className={classes.message} variant="h4">
          This page is secure.
        </Typography>
        <Typography className={classes.message}>
          While a hacker could access the style and layout of this page fairly
          easily the information on it is retrieved from a database and is only
          available if the current session has a valid Json Web Token (JWT).
        </Typography>
      </Container>
      <Card className={classes.infoCard} variant="outlined">
        <Typography variant="h5">
          Here is the current JWT:
        </Typography>


        <Card
          className={classes.jwtCard}
          variant="outlined"
        >
          <Typography className={classes.jwtTextBox} variant="h6">
            {loggedIn.jwt}
          </Typography>
        </Card>

        <UserDetailsTable />

      </Card>
    </Container>
  );
};

Body.propTypes = {
  sqlResults: PropTypes.array,
  jwt: PropTypes.string
};
