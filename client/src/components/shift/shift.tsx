import React, { useContext } from 'react';
import { AuthContext } from '../../helpers/authContext';

const Shift = () => {
  const { authState } = useContext(AuthContext);

  return (
    <article>
      <div>Hello</div>
      <h1>{authState.username}</h1>
    </article>
  );
};

export default Shift;
