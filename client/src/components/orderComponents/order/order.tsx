import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface OrderTypes {
  id: number;
  username: string;
  dinner: string;
  ammount: number;
}

const Order = (): JSX.Element => {
  let { orderId } = useParams();
  const [orderData, setOrderData] = useState<OrderTypes>({
    id: 1,
    username: '',
    dinner: '',
    ammount: 1,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/orders/byId/${orderId}`)
      .then((response) => {
        setOrderData(response.data);
      });
  }, [orderId]);

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
