import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { url } from './Urls';

interface Props {
  children: React.ReactNode;
}

interface IUser {
  username: string;
  id: number;
  userType: string;
  userToken: string;
  status: boolean;
}

interface IAuthContext {
  authState: IUser;
  setAuthState: (user: IUser) => void;
}

export const AuthContext = createContext<IAuthContext>({
  authState: {
    username: '',
    id: 0,
    userType: '',
    userToken: '',
    status: false
  },
  setAuthState: (user: IUser) => {}
});

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const [authState, setAuthState] = useState<IUser>({
    username: '',
    id: 0,
    userType: '',
    userToken: '',
    status: false
  });

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    await axios
      .get(url.auth, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(({ data }) => {
        if (data.error === true) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: data.username,
            id: data.id,
            userType: data.userType,
            userToken: data.userToken,
            status: true
          });
        }
      });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
