import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Group.scss';
import { url } from '../../../Helpers/Urls';

interface IGroup {
  id: number;
  groupId: number | string;
  groupDesc: string;
}

const Order = (): JSX.Element => {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState<IGroup>({
    id: 1,
    groupId: '',
    groupDesc: ''
  });

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    await axios
      .get(`${url.group}/byId/${groupId as string}`)
      .then((response) => {
        setGroupData(response.data);
      });
  };

  const editGroup = async (option: string): Promise<void> => {
    if (option === 'gId') {
      const newGroupId = prompt('Wpisz nową nazwę groupy');
      await axios.put(
        `${url.group}/gId`,
        { newGroupId, id: groupId },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    } else if (option === 'gDesc') {
      const newGroupDesc = prompt('Wpisz nowy opis grupy');
      await axios.put(
        `${url.group}/gDesc`,
        { newGroupDesc, id: groupId },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    }
    window.location.reload();
  };

  return (
    <article>
      <ul>
        <li
          onClick={() => {
            void editGroup('gId');
          }}
        >
          ID: {groupData.groupId}
        </li>
        <li
          onClick={() => {
            void editGroup('gDesc');
          }}
        >
          Opis grupy: {groupData.groupDesc}
        </li>
      </ul>
    </article>
  );
};

export default Order;
