import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { verifyUser } from '../../server_requests/securityRequests.js';

export const ProtectedRoute = ({ component: Component, user, setVerified, ...rest }) => {

  // The if statement in the varifyUser callback prevents re-render if token validity has not changed
  useEffect(() => {
    verifyUser(user.jwt, (newStatus) => { if (user.verified !== newStatus) { setVerified(newStatus); } });
  });

  return (
    <Route {...rest} render = {
      props => {
        if (user.verified) {
          return (<Component {...rest} {...props} />);
        } else {
          return (
            <Redirect to={{
              pathname: '/LogIn',
              state: {
                from: props.location
              }
            }} />
          );
        }
      }
    } />
  );
};

ProtectedRoute.propTypes = {
  component: propTypes.func,
  user: propTypes.object,
  setVerified: propTypes.func,
  location: propTypes.object
};

// export default ProtectedRoute;
