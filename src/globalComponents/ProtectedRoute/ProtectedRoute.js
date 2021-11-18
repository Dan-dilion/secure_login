import React, { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setVerifiedToken, setLoggedInButWaitingToVerify } from '../../pages/Login/loginSlice.js';
import { verifyUser } from '../../server_requests/securityRequests.js';

import LoadingSpinner from '../LoadingSpinner';

const ProtectedRoute = ({ children, path = '/Home' }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.login.loggedIn);

  // Had to use useLayoutEffect because useEffect wasn't fast enough to hide the
  // private route upon a route change with no valid jwt
  useLayoutEffect(() => {
    dispatch(setLoggedInButWaitingToVerify(true));

    verifyUser(loggedIn.jwt, (newStatus) => {
      dispatch(setVerifiedToken(newStatus));
      dispatch(setLoggedInButWaitingToVerify(false));
    });
  }, []);

  const verifiedElement = loggedIn.verified
    ? children
    : <Navigate to="/LoginPrompt" state={{ path }} />;

  return loggedIn.loggedInButWaitingToVerify ? <LoadingSpinner /> : verifiedElement;
};

ProtectedRoute.propTypes = {
  children: PropTypes.object,
  path: PropTypes.string
};

export default ProtectedRoute;
