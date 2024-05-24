import React, { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner: FC = () => {
  return (
    <div>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default LoadingSpinner;