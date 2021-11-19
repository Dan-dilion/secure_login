import { useSelector } from 'react-redux';
import useStyles from './UserDetailsTableStyle.js';

const UserDetailsTableLogic = () => {
  const classes = useStyles();
  const sqlResults = useSelector(state => state.app.sqlResults);

  return {
    classes,
    sqlResults
  };
};

export default UserDetailsTableLogic;
