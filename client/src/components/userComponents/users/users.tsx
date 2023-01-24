import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './users.scss';
import LoadingSpinner from '../../ui/loadingSpinner/loadingSpinner';

interface UserTypes {
  id: number;
  username: string;
  userType: string;
  userToken: number;
  userPIN: number;
}

const Users = (): JSX.Element => {
  const [listOfUsers, setListOfUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/users').then((response) => {
      setListOfUsers(response.data);
    });
    setLoading(false);
  }, []);

  const deleteUser = (id: number) => {
    axios
      .delete(`http://localhost:3001/users/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then(() => {
        setListOfUsers(
          listOfUsers.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <article className="users">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {listOfUsers.map((user) => {
            return (
              <ul key={user.id}>
                <li>
                  <div className="users-list">
                    <div>
                      <p className="users-list__title">Numer ID: </p> {user.id}
                    </div>
                    <div>
                      <p className="users-list__title">Imię i nazwisko: </p>
                      {user.username}
                    </div>
                    <div>
                      <p className="users-list__title">Typ użytkownika: </p>
                      {user.userType}
                    </div>
                    <div>
                      <p className="users-list__title">Numer Token: </p>
                      {user.userToken}
                    </div>
                  </div>
                </li>
                <div className="users__buttons">
                  <button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                    className="users__button"
                  >
                    Usuń
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/user/${user.id}`);
                    }}
                    className="users__button users__button--edit"
                  >
                    Edytuj
                  </button>
                </div>
              </ul>
            );
          })}
        </>
      )}
    </article>
  );
};

export default Users;
