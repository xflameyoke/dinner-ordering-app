import React, { useContext } from 'react';
import AddDish from '../../components/menuComponents/addMenu/addMenu';
import MenuList from '../../components/menuComponents/menuList/menuList';
import AuthContext from '../../helpers/authContext';

const MenuPage = () => {
  const { authState } = useContext(AuthContext);
  return (
    <>
      {authState.userType === 'user' ? (
        <MenuList />
      ) : (
        <>
          <AddDish />
          <MenuList />
        </>
      )}
    </>
  );
};

export default MenuPage;
