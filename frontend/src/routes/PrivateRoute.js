import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const authData = localStorage.getItem('authDdfdata');
  console.log({ authData });

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authData ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
