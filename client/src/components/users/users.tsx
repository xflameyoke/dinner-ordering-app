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
            <li>Numer ID: {user.id}</li>
            <li>Imię i nazwisko: {user.username}</li>
            <li>Typ użytkownika: {user.userType}</li>
            <li>Numer telefonu: {user.userToken}</li>
            <li>PIN: {user.userPIN}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default Users;
