import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../Helpers/Urls';

interface UserTypes {
  id: number;
  username: string;
  userType: string;
  userToken: number | string;
  userPIN: number | string;
}

const User = (): JSX.Element => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserTypes>({
    id: 1,
    username: '',
    userType: '',
    userToken: '',
    userPIN: ''
  });

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    await axios
      .get(`${url.users}/byId/${userId as string}`)
      .then((response) => {
        setUserData(response.data);
      });
  };

  const editUser = async (option: string): Promise<void> => {
    if (option === 'username') {
      const newUsername = prompt('Wpisz nową nazwę użytkownika: ');
      await axios.put(
        `${url.users}/username`,
        {
          newUsername,
          id: userId
        },
        {
          headers: { accessToken: localStorage.getItem('accessToken') }
        }
      );
    } else if (option === 'userToken') {
      const newUserToken = prompt('Wpis nowy numer token: ');
      await axios.put(
        `${url.users}/userToken`,
        {
          newUserToken,
          id: userId
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
            void editUser('username');
          }}
        >
          Nazwa: {userData.username}
        </li>
        <li>Typ: {userData.userType}</li>
        <li
          onClick={() => {
            void editUser('userToken');
          }}
        >
          Token: {userData.userToken}
        </li>
      </ul>
    </article>
  );
};

export default User;
