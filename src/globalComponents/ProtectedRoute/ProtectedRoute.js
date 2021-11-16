import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setVerifiedToken } from '../../pages/Login/loginSlice.js';
import { verifyUser } from '../../server_requests/securityRequests.js';

const ProtectedRoute = ({ children, path = '/Home' }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.login.loggedIn);

  useEffect(() => {
    verifyUser(loggedIn.jwt, (newStatus) => {
      if (loggedIn.verified !== newStatus) { dispatch(setVerifiedToken(newStatus)); }
    });
  });

  console.log('Protected Route: ', loggedIn);

  const verifiedElement = loggedIn.verified
    ? children
    : <Navigate to="/LoginPrompt" state={{ path }} />;

  // return <Route path={path} element={<Navigate to="/Login" replace />} />
  return verifiedElement;

};

export default ProtectedRoute;
