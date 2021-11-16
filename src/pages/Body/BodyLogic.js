import { useSelector, useDispatch } from 'react-redux';

import { setVerifiedToken } from '../Login/loginSlice.js';
import { setSqlResults } from '../../App/AppSlice.js';
import { queryDatabase } from '../../server_requests/queryDatabase.js';

const BodyLogic = ({ query }) => {
  const sqlResults = useSelector(state => state.app.sqlResults);
  const loggedIn = useSelector(state => state.login.loggedIn);
  const dispatch = useDispatch();

  const pressMeCallBack = results => {
    if (results.verified) {
      // console.log('BodyLogic PressMeCallback Here: ', results);
      dispatch(setSqlResults(results.results));
    } else {
      console.log(results.msg);
      // history.push('/login');
      // props.setLoggedIn({
      //   ...props.loggedIn,
      //   verified: results.verified
      // });
      dispatch(setVerifiedToken(results.verified));
    }
  };

  const pressMeButton = results => {
    queryDatabase(query, loggedIn.jwt, results => pressMeCallBack(results));
  };

  return {
    sqlResults,
    loggedIn,
    pressMeButton
  };
};

export default BodyLogic;
