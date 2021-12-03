import { useSelector, useDispatch } from 'react-redux';

import useStyles from './BodyStyle.js';
import { setVerifiedToken } from '../Login/loginSlice.js';
import { setSqlResults } from '../../App/AppSlice.js';

const BodyLogic = ({ query }) => {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.login.loggedIn);
  const dispatch = useDispatch();

  const pressMeCallBack = results => {
    results.verified
      ? results.error
        ? dispatch(setSqlResults([{ Error: results.message }]))
        : dispatch(setSqlResults(results.results))
      : dispatch(setVerifiedToken(results.verified));
  };

  return {
    classes,
    loggedIn,
    pressMeCallBack
  };
};

export default BodyLogic;
