import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './users.scss';

interface UserTypes {
  id: number;
  username: string;
  userType: string;
  userToken: number;
  userPIN: number;
}

const Users: React.FC = () => {
  const [listOfUsers, setListOfUsers] = useState<UserTypes[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/users').then((response) => {
      setListOfUsers(response.data);
    });
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
    <div className="users">
      {listOfUsers.map((user) => {
        return (
          <ul key={user.id}>
            <li
              onClick={() => {
                navigate(`/user/${user.id}`);
              }}
            >
              <div className="users-list">
                <p>
                  <p className="users-list__title">Numer ID: </p> {user.id}
                </p>
                <p>
                  <p className="users-list__title">Imię i nazwisko: </p>
                  {user.username}
                </p>
                <p>
                  <p className="users-list__title">Typ użytkownika: </p>
                  {user.userType}
                </p>
                <p>
                  <p className="users-list__title">Numer telefonu: </p>
                  {user.userToken}
                </p>
              </div>
            </li>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Usuń
            </button>
          </ul>
        );
      })}
    </div>
  );
};

export default Users;
