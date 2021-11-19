import React from 'react';
import { Container } from '@material-ui/core';

import UserDetailsTableLogic from './UserDetailsTableLogic.js';
import DynamicTable from '../../../../globalComponents/DynamicTable/DynamicTable.js';

const UserDetailsTable = () => {
  // De-structure logic
  const {
    classes,
    sqlResults
  } = UserDetailsTableLogic();

  return (
    <Container className={classes.tableContainer}>
      <DynamicTable data={sqlResults} tableClasses={classes} />
    </Container>
  );
};

export default UserDetailsTable;
