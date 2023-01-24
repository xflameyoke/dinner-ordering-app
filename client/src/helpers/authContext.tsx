import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  children: React.ReactNode;
}

export interface AuthUser {
  username: string;
  id: number;
  userType: string;
  userToken: string;
  status: boolean;
}
export type AuthContextType = {
  authState: AuthUser;
  setAuthState: (user: AuthUser) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: {
    username: '',
    id: 0,
    userType: '',
    userToken: '',
    status: false,
  },
  setAuthState: (user: AuthUser) => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthUser>({
    username: '',
    id: 0,
    userType: '',
    userToken: '',
    status: false,
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/users/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            userType: response.data.userType,
            userToken: response.data.userToken,
            status: true,
          });
        }
      });
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
