import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../Helpers/Urls';

interface IOrder {
  id: number;
  username: string;
  dinner: string;
  ammount: number;
}

const Order = (): JSX.Element => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState<IOrder>({
    id: 1,
    username: '',
    dinner: '',
    ammount: 1
  });

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    await axios
      .get(`${url.orders}/byId/${orderId as string}`)
      .then((response) => {
        setOrderData(response.data);
      });
  };

  return (
    <article>
      <ul>
        <li>ID: {orderData.id}</li>
        <li>Nazwa użytkownika: {orderData.username}</li>
        <li>Obiad: {orderData.dinner}</li>
        <li>Ilość: {orderData.ammount}</li>
      </ul>
    </article>
  );
};

export default Order;
