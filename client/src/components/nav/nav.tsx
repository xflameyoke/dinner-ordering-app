import React, { useEffect, useState } from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
  const [authState, setAuthState] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/users/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/">Logowanie</Link>
        </li>
        {authState ? (
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
        ) : (
          ''
        )}
      </ul>
    </div>
  );
};

export default Nav;
