import React, { useContext } from 'react';
import { AuthContext } from '../../Helpers/AuthContext';

const Shift = (): JSX.Element => {
  const { authState } = useContext(AuthContext);

  return (
    <article>
      <div>Hello</div>
      <h1>{authState.username}</h1>
    </article>
  );
};

export default Shift;
