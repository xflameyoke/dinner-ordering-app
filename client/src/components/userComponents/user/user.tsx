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

const User = () => {
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

  return (
    <ul>
      <li>ID: {userData.id}</li>
      <li>Nazwa: {userData.username}</li>
      <li>Typ: {userData.userType}</li>
      <li>Token: {userData.userToken}</li>
      <li>PIN: {userData.userPIN}</li>
    </ul>
  );
};

export default User;
