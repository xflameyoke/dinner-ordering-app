import React, { useContext } from 'react';
import { AuthContext } from '../../helpers/authContext';

const Shift = () => {
  const { authState } = useContext(AuthContext);

  return (
    <>
      <div>Hello</div>
      <h1>{authState.username}</h1>
    </>
  );
};

export default Shift;
