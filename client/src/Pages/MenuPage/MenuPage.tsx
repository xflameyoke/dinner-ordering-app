import React, { useContext } from 'react';
import { AddMenu, MenuList } from '../../Components/MenuComponents';
import AuthContext from '../../Helpers/AuthContext';

const MenuPage = (): JSX.Element => {
  const { authState } = useContext(AuthContext);
  return (
    <article>
      {authState.userType === 'user' ? (
        <MenuList />
      ) : (
        <>
          <AddMenu />
          <MenuList />
        </>
      )}
    </article>
  );
};

export default MenuPage;
