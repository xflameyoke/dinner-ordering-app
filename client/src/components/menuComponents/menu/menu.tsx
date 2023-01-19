import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface MenuTypes {
  id: number;
  name: string;
  price: string;
}

const Menu = (): JSX.Element => {
  let { menuId } = useParams();
  const [menuData, setMenuData] = useState<MenuTypes>({
    id: 1,
    name: '',
    price: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/menu/byId/${menuId}`).then((response) => {
      setMenuData(response.data);
    });
  }, [menuId]);

  const editMenu = (option: string) => {
    if (option === 'name') {
      let newName = prompt('Wpisz nową nazwę dania');
      axios.put(
        'http://localhost:3001/menu/name',
        {
          newName,
          id: menuId,
        },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    } else if (option === 'price') {
      let newPrice = prompt('Wpisz nową cenę');
      axios.put(
        'http://localhost:3001/menu/price',
        {
          newPrice,
          id: menuId,
        },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    }
    window.location.reload();
  };

  return (
    <>
      <div
        onClick={() => {
          editMenu('name');
        }}
      >
        {menuData.name}
      </div>
      <div
        onClick={() => {
          editMenu('price');
        }}
      >
        {menuData.price}
      </div>
    </>
  );
};

export default Menu;
