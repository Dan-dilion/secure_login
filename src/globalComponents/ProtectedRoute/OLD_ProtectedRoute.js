import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { verifyUser } from '../../server_requests/securityRequests.js';

const ProtectedRoute = ({ element: element, user, setVerified, ...rest }) => {

  // The if statement in the varifyUser callback prevents re-render if token validity has not changed
  useEffect(() => {
    verifyUser(user.jwt, (newStatus) => { if (user.verified !== newStatus) { setVerified(newStatus); } });
  });

  return (
    <>
      <Route {...rest} render = {

        props => {
          if (user.verified) {
            return (<element {...rest} {...props} />);
          } else {
            return (
              <Link to={{
                pathname: '/LogIn',
                state: {
                  from: props.location
                }
              }} />
            );
          }
        }

      } />
    < />

  );
};

ProtectedRoute.propTypes = {
  element: propTypes.func,
  user: propTypes.object,
  setVerified: propTypes.func,
  location: propTypes.object
};

export default ProtectedRoute;
