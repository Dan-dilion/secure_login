import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
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
    <TableContainer className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.head}>
          <TableRow>
            {
              headerItems.map((header, i) => (
                <TableCell className={`${classes.headerCells} ${tableClasses[header] ? tableClasses[header] : ''}`} key={JSON.stringify(i + data.length)}>
                  <div className={classes.internalScrollBox}>
                    {header}
                  </div>
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
                      <div className={classes.internalScrollBox}>
                        {row[header]}
                      </div>
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
