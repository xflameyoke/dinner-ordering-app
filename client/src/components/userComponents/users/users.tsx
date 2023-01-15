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

const Users = () => {
  const [listOfUsers, setListOfUsers] = useState<UserTypes[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/users').then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  return (
    <div className="users">
      {listOfUsers.map((user) => {
        return (
          <ul
            key={user.id}
            onClick={() => {
              navigate(`/user/${user.id}`);
            }}
          >
            <li>
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
          </ul>
        );
      })}
    </div>
  );
};

export default Users;
