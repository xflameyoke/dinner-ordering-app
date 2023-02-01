import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GroupList.scss';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import { url } from '../../../Helpers/Urls';

export interface IGroup {
  groupId: number;
  groupDesc: string;
  id: number;
}

const MenuList = (): JSX.Element => {
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    await axios.get(url.group).then(({ data }) => {
      setGroupList(data);
    });
    setLoading(false);
  };

  const deleteGroup = async (id: number): Promise<void> => {
    await axios
      .delete(`${url.group}/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(() => {
        setGroupList(
          groupList.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <article className="groupList">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {groupList.map((group) => {
            return (
              <ul key={group.id}>
                <li className="groupList-list">
                  <div>
                    <div>
                      <p className="groupList-list__title">ID Grupy: </p>
                      {group.groupId}
                    </div>
                    <div>
                      <p className="groupList-list__title">Opis grupy: </p>
                      {group.groupDesc}
                    </div>
                  </div>
                </li>
                <div className="groupList__buttons">
                  <button
                    onClick={() => {
                      void deleteGroup(group.id);
                    }}
                    className="groupList__button"
                  >
                    Usuń
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/group/${group.id}`);
                    }}
                    className="groupList__button groupList__button--edit"
                  >
                    Edytuj
                  </button>
                </div>
              </ul>
            );
          })}
        </>
      )}
    </article>
  );
};

export default MenuList;
