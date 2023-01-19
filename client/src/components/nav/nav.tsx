import React, { useContext, useEffect } from 'react';
import './nav.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../helpers/authContext';

const Nav = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get('http://localhost:3001/users/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            userType: response.data.userType,
            status: true,
          });
        }
      });
  }, [authState, setAuthState]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
    setAuthState({ username: '', id: 0, userType: '', status: false });
    window.location.reload();
  };

  return (
    <div className="nav">
      <ul>
        {authState.status === false ? (
          <li>
            <Link to="/">Logowanie</Link>
          </li>
        ) : (
          ''
        )}
        {authState.status ? (
          <>
            {authState.userType === 'admin' ? (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            ) : (
              ''
            )}
            {authState.userType === 'user' ? (
              <>
                <li>
                  <Link to="/menu">Menu</Link>
                </li>
                <li>
                  <Link to="/addOrder">Złóż zamówienie</Link>
                </li>
                <li>
                  <Link to="/changePIN">Zmień PIN</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/menu">Menu</Link>
                </li>
                <li>
                  <Link to="/addOrder">Złóż zamówienie</Link>
                </li>
                <li>
                  <Link to="/usersPage">Użytkownicy</Link>
                </li>
                <li>
                  <Link to="/orders">Lista zamówień</Link>
                </li>
              </>
            )}

            <li className="nav__logout">
              <button className="nav__button" onClick={logout}>
                Wyloguj
              </button>
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
