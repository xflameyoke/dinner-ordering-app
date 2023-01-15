import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface MenuTypes {
  name: string;
  price: number;
  id: number;
}

const MenuList: React.FC = () => {
  const [menuList, setMenuList] = useState<MenuTypes[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/menu').then((response) => {
      setMenuList(response.data);
    });
  }, []);

  return (
    <div>
      {menuList.map((menu) => {
        return (
          <ul key={menu.id}>
            <li>{menu.name}</li>
            <li>{menu.price} zł</li>
          </ul>
        );
      })}
    </div>
  );
};

export default MenuList;
