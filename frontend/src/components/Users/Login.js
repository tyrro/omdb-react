import React from 'react';

const Login = () => (
  <div className="row">
    <div className="w-50 mx-auto">
      <div className="form-group text-left">
        <h2>Login</h2>
      </div>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword">Password</label>
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>
);

export default Login;
