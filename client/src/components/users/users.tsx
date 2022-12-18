import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './users.scss';

interface User {
  username: string;
  userType: string;
  userNumber: number;
  userPIN: number;
}

const Users = () => {
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users').then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  return (
    <div className="users">
      {listOfUsers.map((user) => {
        return (
          <ul>
            <li>Imię i nazwisko: {user.username}</li>
            <li>Typ użytkownika: {user.userType}</li>
            <li>Numer telefonu: {user.userNumber}</li>
            <li>PIN: {user.userPIN}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default Users;
