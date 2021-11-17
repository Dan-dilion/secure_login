import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner = () => {

  return (
    <ClipLoader color="red" loading={true} size={400} />
  );
};

export default LoadingSpinner;
