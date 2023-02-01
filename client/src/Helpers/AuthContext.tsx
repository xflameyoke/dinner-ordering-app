import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { url } from './Urls';

interface Props {
  children: React.ReactNode;
}

export interface IUser {
  username?: string;
  id?: number;
  userGroup?: string;
  userType?: string;
  userToken?: string;
  userPIN?: string;
  status?: boolean;
}

interface IAuthContext {
  authState: IUser;
  setAuthState: (user: IUser) => void;
}

export const AuthContext = createContext<IAuthContext>({
  authState: {
    username: '',
    id: 0,
    userGroup: '',
    userType: '',
    userToken: '',
    userPIN: '',
    status: false
  },
  setAuthState: (user: IUser) => {}
});

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const [authState, setAuthState] = useState<IUser>({
    username: '',
    id: 0,
    userGroup: '',
    userType: '',
    userToken: '',
    userPIN: '',
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
            userGroup: data.userGroup,
            userType: data.userType,
            userToken: data.userToken,
            userPIN: data.userPIN,
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
