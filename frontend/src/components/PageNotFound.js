import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <p>404 | Page not found</p>
      <p>
        <Link to={`${process.env.PUBLIC_URL}/`}>Back to Home</Link>
      </p>
    </>
  );
};

export default PageNotFound;
