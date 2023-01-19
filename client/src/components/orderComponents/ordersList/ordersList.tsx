import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ordersList.scss';

interface OrderTypes {
  id: number;
  username: string;
  dinner: string;
  ammount: number;
  shift: string;
}

const OrdersList = () => {
  const [listOfOrders, setListOfOrders] = useState<OrderTypes[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/orders').then((response) => {
      setListOfOrders(response.data);
    });
  }, []);

  return (
    <div className="ordersList">
      {listOfOrders.map((order) => {
        return (
          <ul
            key={order.id}
            onClick={() => {
              navigate(`/order/${order.id}`);
            }}
          >
            <li>Nazwa użytkownika: {order.username}</li>
            <li>Danie: {order.dinner}</li>
            <li>Ilość: {order.ammount}</li>
            <li>Zmiana: {order.shift}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default OrdersList;
