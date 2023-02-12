import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './MenuList.scss';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import { url } from '../../../Helpers/Urls';
import AuthContext from '../../../Helpers/AuthContext';

export interface IMenu {
  name: string;
  desc: string;
  id: number;
}

const MenuList = (): JSX.Element => {
  const { authState } = useContext(AuthContext);
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    await axios.get(url.menu).then(({ data }) => {
      setMenuList(data);
    });
    setLoading(false);
  };

  const deleteMenu = async (id: number): Promise<void> => {
    await axios
      .delete(`${url.menu}/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
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
    <article className="menuList">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {menuList.map((menu) => {
            return (
              <ul key={menu.id}>
                <li className="menuList-list">
                  <div>
                    <div>
                      <p className="menuList-list__title">Nazwa zestawu: </p>
                      {menu.name}
                    </div>
                    <div>
                      <p className="menuList-list__title">Opis zestawu: </p>
                      {menu.desc}
                    </div>
                  </div>
                </li>
                {authState.userType === 'user' ? (
                  ''
                ) : (
                  <div className="menuList__buttons">
                    <button
                      onClick={() => {
                        void deleteMenu(menu.id);
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
                )}
              </ul>
            );
          })}
        </>
      )}
    </article>
  );
};

export default MenuList;
