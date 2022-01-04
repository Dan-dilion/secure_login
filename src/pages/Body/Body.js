import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  Card
} from '@material-ui/core';

import BodyLogic from './BodyLogic.js';
import UserDetailsTable from './Components/UserDetailsTable/';
import { getUserDetails } from '../../server_requests/queryDatabase.js';

const Body = props => {
  // De-structure logic
  const {
    classes,
    loggedIn,
    pressMeCallBack
  } = BodyLogic(props);

  useEffect(() => {
    getUserDetails(loggedIn.jwt).then(results => pressMeCallBack(results));
  }, []);

  return (
    <Container className={classes.root}>
        <Typography variant="h4">
          This is your current JWT:
        </Typography>

        <Card
          className={classes.jwtCard}
          variant="outlined"
        >
          <Typography className={classes.jwtTextBox} variant="h6">
            {loggedIn.jwt}
          </Typography>
        </Card>

      <Typography variant="h6">
        Here is a list of user details from the database:
      </Typography>
      <div className={classes.tableContainer}>
        <UserDetailsTable className={classes.tableContainer} maxWidth={false} />
      </div>
    </Container>
  );
};

Body.propTypes = {
  sqlResults: PropTypes.array,
  jwt: PropTypes.string
};

export default Body;
