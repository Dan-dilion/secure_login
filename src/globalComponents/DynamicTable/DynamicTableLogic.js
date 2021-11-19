import { TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import useStyles from './DynamicTableStyle.js';

const DynamicTableLogic = ({ data, tableClasses }) => {
  const classes = useStyles();
  const headerItems = data.length ? Object.keys(data[0]) : [];


  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);

  return {
    classes,
    tableClasses,
    headerItems,
    StyledTableRow,
    data
  };
};

export default DynamicTableLogic;
