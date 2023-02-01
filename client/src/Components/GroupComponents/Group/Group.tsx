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

  return (
    <article>
      <ul>
        <li>ID: {groupData.groupId}</li>
        <li>Opis grupy: {groupData.groupDesc}</li>
      </ul>
    </article>
  );
};

export default Order;
