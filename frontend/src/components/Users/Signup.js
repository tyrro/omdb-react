import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import httpClient from '../../shared/httpClient';
import routes from '../../routes/index';

const Signup = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPasword] = useState(null);
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await httpClient.post(routes.users.create(), { name, email, password });
      history.push('/login');
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="w-50 mx-auto">
        <div className="form-group text-left">
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={event => handleSubmit(event)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter name"
              onClick={event => setName(event.target.value)}
            />
          </div>
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
              onClick={event => setPasword(event.target.value)}
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

export default Signup;
