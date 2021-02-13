import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-light bg-light">
    <Link className="navbar-brand" to={`${process.env.PUBLIC_URL}/`}>
      OMDB React
    </Link>

    <ul className="nav justify-content-end">
      <li className="align-self-center mr-3">rajib.das.shuva@gmail.com</li>
      <li>
        <Link to={`${process.env.PUBLIC_URL}/`}>
          <button type="button" className="btn btn-primary">
            Sign Out
          </button>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
