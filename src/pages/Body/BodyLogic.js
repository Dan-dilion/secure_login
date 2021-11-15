import { queryDatabase } from '../../server_requests/queryDatabase.js';

const BodyLogic = ({query, sqlResults, loggedIn, setVerify, setSqlResults}) => {

  const pressMeCallBack = results => {
    if (results.verified) {
      setSqlResults(results.results);
    } else {
      console.log(results.msg);
      // history.push('/login');
      // props.setLoggedIn({
      //   ...props.loggedIn,
      //   verified: results.verified
      // });
      setVerify(results.verified);
    }
  };

  const pressMeButton = results => {
    queryDatabase(query, loggedIn.jwt, results => pressMeCallBack(results));
  };

  return {
    sqlResults,
    pressMeButton
  };
};

export default BodyLogic;
