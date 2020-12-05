import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <div className="loading-wrapper d-flex align-items-center justify-content-center mt-4">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }
  return children;
};

export default Loading;
