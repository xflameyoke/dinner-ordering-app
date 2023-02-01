import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../Helpers/Urls';
import { type IMenu } from '../MenuList/MenuList';

const Menu = (): JSX.Element => {
  const { menuId } = useParams();
  const [menuData, setMenuData] = useState<IMenu>({
    id: 1,
    name: '',
    price: 0
  });

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    await axios.get(`${url.menu}/byId/${menuId as string}`).then(({ data }) => {
      setMenuData(data);
    });
  };

  const editMenu = async (option: string): Promise<void> => {
    if (option === 'name') {
      const newName = prompt('Wpisz nową nazwę dania');
      await axios.put(
        `${url.menu}/name`,
        {
          newName,
          id: menuId
        },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    } else if (option === 'price') {
      const newPrice = prompt('Wpisz nową cenę');
      await axios.put(
        `${url.menu}/price`,
        {
          newPrice,
          id: menuId
        },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    }
    window.location.reload();
  };

  return (
    <article>
      <div
        onClick={() => {
          void editMenu('name');
        }}
      >
        {menuData.name}
      </div>
      <div
        onClick={() => {
          void editMenu('price');
        }}
      >
        {menuData.price}
      </div>
    </article>
  );
};

export default Menu;
