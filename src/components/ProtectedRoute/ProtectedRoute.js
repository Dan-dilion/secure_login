import { useEffect } from 'react';
import { Navigate } from 'react-router-dom'

import { verifyUser } from '../../server_requests/securityRequests.js';

const ProtectedRoute = ({ user, setVerified, children, path = '/Home' }) => {

  useEffect(() => {
    verifyUser(user.jwt, (newStatus) => {
      if (user.verified !== newStatus) { setVerified(newStatus); }
    });
  });

  console.log('Protected Route: ', user);

  const verifiedElement = user.verified
    ? children
    : <Navigate to="/Login" state={{ path }} />

  // return <Route path={path} element={<Navigate to="/Login" replace />} />
  return verifiedElement

}

export default ProtectedRoute
