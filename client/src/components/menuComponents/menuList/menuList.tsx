import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menuList.scss';
import { useNavigate } from 'react-router-dom';
interface MenuTypes {
  name: string;
  price: number;
  id: number;
}

const MenuList = (): JSX.Element => {
  const [menuList, setMenuList] = useState<MenuTypes[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/menu').then((response) => {
      setMenuList(response.data);
    });
  }, []);

  const deleteMenu = (id: number) => {
    axios
      .delete(`http://localhost:3001/menu/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then(() => {
        setMenuList(
          menuList.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <div className="menuList">
      {menuList.map((menu) => {
        return (
          <ul key={menu.id}>
            <li className="menuList--list">
              <div>
                <div>
                  <p className="menuList--list__title">Nazwa: </p>
                  {menu.name}
                </div>
                <div>
                  <p className="menuList--list__title">Cena: </p>
                  {menu.price}
                </div>
              </div>
            </li>
            <div className="menuList__buttons">
              <button
                onClick={() => {
                  deleteMenu(menu.id);
                }}
                className="menuList__button"
              >
                Usuń
              </button>
              <button
                onClick={() => {
                  navigate(`/menu/${menu.id}`);
                }}
                className="menuList__button menuList__button--edit"
              >
                Edytuj
              </button>
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default MenuList;
