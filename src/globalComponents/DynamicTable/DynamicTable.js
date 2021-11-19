import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';

import DynamicTableLogic from './DynamicTableLogic.js';

const DynamicTable = (props) => {
  // De-structure logic
  const {
    classes,
    tableClasses,
    headerItems,
    StyledTableRow,
    data
  } = DynamicTableLogic(props);

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.head}>
          <TableRow>
            {
              headerItems.map((header, i) => (
                <TableCell className={`${classes.headerCells} ${tableClasses[header] ? tableClasses[header] : ''}`} key={JSON.stringify(i + data.length)}>
                  {header}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row, i) => (
              <StyledTableRow key={JSON.stringify(i)}>
                {
                  headerItems.map((header, j) => (
                    <TableCell className={`${classes.bodyCells} ${tableClasses[header] ? tableClasses[header] : ''}`} key={JSON.stringify(i) + JSON.stringify(j)}>
                      {row[header]}
                    </TableCell>
                  ))
                }
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DynamicTable.propTypes = {
  data: PropTypes.array,
  tableClasses: PropTypes.object
};

export default DynamicTable;
