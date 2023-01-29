import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UsersList.scss';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import { url } from '../../../Helpers/Urls';

interface IUser {
  id: number;
  username: string;
  userType: string;
  userToken: number;
  userPIN: number;
}

const UsersList = (): JSX.Element => {
  const [listOfUsers, setListOfUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    await axios.get(url.users).then(({ data }) => {
      setListOfUsers(data);
    });
    setLoading(false);
  };

  const deleteUser = async (id: number): Promise<void> => {
    await axios
      .delete(`${url.users}/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
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
                      void deleteUser(user.id);
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

export default UsersList;
