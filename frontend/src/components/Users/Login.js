import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import httpClient from '../../shared/httpClient';
import routes from '../../routes/index';
import { populateUser } from '../../actions/user';

const Login = ({ populateUser }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await httpClient.post(routes.users.login(), formData);
      populateUser(response.data);
      history.push(location?.state?.form || '/');
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="w-50 mx-auto">
        <div className="alert alert-secondary" role="alert">
          Please Login
        </div>
        <div className="form-group text-left">
          <h2>Login</h2>
        </div>
        <form onSubmit={event => handleSubmit(event)}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onClick={event => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onClick={event => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  populateUser: data => dispatch(populateUser(data)),
});

export default connect(null, mapDispatchToProps)(Login);
