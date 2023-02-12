import React, { useContext } from 'react';
import './MenuPage.scss';
import { AddMenu, MenuList } from '../../Components/MenuComponents';
import AuthContext from '../../Helpers/AuthContext';

const MenuPage = (): JSX.Element => {
  const { authState } = useContext(AuthContext);
  return (
    <article>
      {authState.userType === 'user' ? (
        <MenuList />
      ) : (
        <div className="menuPage">
          <AddMenu />
          <MenuList />
        </div>
      )}
    </article>
  );
};

export default MenuPage;
