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
    desc: ''
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
      const newName = prompt('Wpisz nową nazwę zestawu: ');
      await axios.put(
        `${url.menu}/name`,
        {
          newName,
          id: menuId
        },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    } else if (option === 'desc') {
      const newDesc = prompt('Wpisz nowy opis zestawu:');
      await axios.put(
        `${url.menu}/desc`,
        {
          newDesc,
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
          void editMenu('desc');
        }}
      >
        {menuData.desc}
      </div>
    </article>
  );
};

export default Menu;
