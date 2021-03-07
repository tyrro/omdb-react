import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../actions/user';

const Navbar = ({ user, removeUser }) => (
  <nav className="navbar navbar-light bg-light">
    <Link className="navbar-brand" to="/">
      OMDB App
    </Link>
    {user?.name ? (
      <ul className="nav justify-content-end">
        <li className="align-self-center mr-3">{user.name}</li>
        <li>
          <Link to="/favorites">
            <button type="button" className="btn btn-primary mr-3">
              Favorites
            </button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button type="button" className="btn btn-warning" onClick={() => removeUser()}>
              Sign Out
            </button>
          </Link>
        </li>
      </ul>
    ) : (
      <ul className="nav justify-content-end">
        <Link to="/login">
          <button type="button" className="btn btn-primary mr-3">
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button type="button" className="btn btn-primary">
            Sign Up
          </button>
        </Link>
      </ul>
    )}
  </nav>
);

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  removeUser: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
