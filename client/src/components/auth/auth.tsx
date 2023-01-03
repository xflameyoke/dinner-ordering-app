import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [userToken, setUserToken] = useState('');
  const [userPIN, setUserPIN] = useState('');

  const userTokenHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserToken(event.target.value);
  };

  const userPINHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPIN(event.target.value);
  };

  const login = () => {
    const data = { userToken, userPIN };
    axios.post('http://localhost:3001/users/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem('accessToken', response.data);
      }
    });
  };

  return (
    <div className="auth">
      <input type="text" onChange={userTokenHandler}></input>
      <input type="password" onChange={userPINHandler}></input>
      <button onClick={login}>Zaloguj</button>
    </div>
  );
};

export default Auth;
