/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import React, { useContext, useEffect } from 'react';
import './Nav.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../Helpers/AuthContext';
import { url } from '../../Helpers/Urls';

const Nav = (): JSX.Element => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    void AuthResponse();
  }, []);

  const AuthResponse = async (): Promise<void> => {
    await axios
      .get(url.auth, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(({ data }) => {
        if (data.error === true) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: data.username,
            id: data.id,
            userGroup: data.userGroup,
            userType: data.userType,
            userToken: data.userToken,
            userPIN: data.userPIN,
            status: true
          });
        }
      });
  };

  const logout = (): void => {
    localStorage.removeItem('accessToken');
    navigate('/');
    setAuthState({
      username: '',
      id: 0,
      userGroup: '',
      userType: '',
      userToken: '',
      userPIN: '',
      status: false
    });
    window.location.reload();
  };

  return (
    <nav className="nav">
      <ul>
        {authState.userType === undefined ? (
          <li>
            <Link to="/">Logowanie</Link>
          </li>
        ) : (
          <>
            {authState.userType === 'user' ? (
              <>
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
                  <Link to="/groupPage">Grupy użytkowników</Link>
                </li>
                <li>
                  <Link to="/shifts">Edytuj zmiany</Link>
                </li>
                <li>
                  <Link to="/usersPage">Użytkownicy</Link>
                </li>
                <li>
                  <Link to="/orders">Lista zamówień</Link>
                </li>
              </>
            )}
          </>
        )}
        <li className="nav__logout">
          {authState.username}
          <button className="nav__button" onClick={logout}>
            Wyloguj
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
