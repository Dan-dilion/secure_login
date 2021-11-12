import { queryDatabase } from '../../server_requests/queryDatabase.js';

const BodyLogic = (props) => {

  const pressMeCallBack = results => {
    if (results.verified) {
      props.setSqlResults(results.results);
    } else {
      console.log(results.msg);
      // history.push('/login');
      // props.setLoggedIn({
      //   ...props.loggedIn,
      //   verified: results.verified
      // });
      props.setVerify(results.verified);
    }
  };

  const pressMeButton = results => {
    queryDatabase(props.query, props.loggedIn.jwt, results => pressMeCallBack(results));
  };

  return { pressMeButton };
};

export default BodyLogic;
