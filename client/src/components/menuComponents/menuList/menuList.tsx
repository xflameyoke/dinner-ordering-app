import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menuList.scss';

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
    <div className="menuList">
      {menuList.map((menu) => {
        return (
          <ul key={menu.id}>
            <li className="menuList-list">
              <p>
                <p className="menuList-list__title">Nazwa: </p>
                {menu.name}
              </p>
              <p>
                <p className="menuList-list__title">Cena: </p>
                {menu.price}
              </p>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default MenuList;
