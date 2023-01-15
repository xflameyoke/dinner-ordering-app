import { createContext } from 'react';
export type AuthContextType = {
  authState: boolean;
  setAuthState: (c: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: false,
  setAuthState: () => {},
});
