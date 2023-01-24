import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface UserTypes {
  id: number;
  username: string;
  userType: string;
  userToken: number | string;
  userPIN: number | string;
}

const User = (): JSX.Element => {
  let { userId } = useParams();
  const [userData, setUserData] = useState<UserTypes>({
    id: 1,
    username: '',
    userType: '',
    userToken: '',
    userPIN: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/users/byId/${userId}`).then((response) => {
      setUserData(response.data);
    });
  }, [userId]);

  const editUser = (option: string) => {
    if (option === 'username') {
      let newUsername = prompt('Wpisz nową nazwę użytkownika: ');
      axios.put(
        'http://localhost:3001/users/username',
        {
          newUsername: newUsername,
          id: userId,
        },
        {
          headers: { accessToken: localStorage.getItem('accessToken') },
        }
      );
    } else if (option === 'userToken') {
      let newUserToken = prompt('Wpis nowy numer token: ');
      axios.put(
        'http://localhost:3001/users/userToken',
        {
          newUserToken: newUserToken,
          id: userId,
        },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    }
    window.location.reload();
  };

  return (
    <article>
      <ul>
        <li>ID: {userData.id}</li>
        <li
          onClick={() => {
            editUser('username');
          }}
        >
          Nazwa: {userData.username}
        </li>
        <li>Typ: {userData.userType}</li>
        <li
          onClick={() => {
            editUser('userToken');
          }}
        >
          Token: {userData.userToken}
        </li>
      </ul>
    </article>
  );
};

export default User;
