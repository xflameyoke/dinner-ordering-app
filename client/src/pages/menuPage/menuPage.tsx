import React, { useContext } from 'react';
import AddDish from '../../components/menuComponents/addMenu/addMenu';
import MenuList from '../../components/menuComponents/menuList/menuList';
import AuthContext from '../../helpers/authContext';

const MenuPage = (): JSX.Element => {
  const { authState } = useContext(AuthContext);
  return (
    <article>
      {authState.userType === 'user' ? (
        <MenuList />
      ) : (
        <>
          <AddDish />
          <MenuList />
        </>
      )}
    </article>
  );
};

export default MenuPage;
