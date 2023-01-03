import React from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="nav">
    <ul>
      <li>
        <Link to="/">Logowanie</Link>
      </li>
      <li>
        <Link to="/users">Użytkownicy</Link>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/userManage">Dodaj użytkownika</Link>
      </li>
    </ul>
  </div>
);

export default Nav;
