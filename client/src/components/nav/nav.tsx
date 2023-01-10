import React from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="nav">
    <ul>
      <li>
        <Link to="/">Logowanie</Link>
      </li>
      {sessionStorage.getItem('accessToken') && (
        <>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/usersPage">Użytkownicy</Link>
          </li>
          <li>
            <Link to="/orders">Zamówienia</Link>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default Nav;
