import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ordersList.scss';
import LoadingSpinner from '../../ui/loadingSpinner/loadingSpinner';

interface OrderTypes {
  id: number;
  username: string;
  dinner: string;
  ammount: number;
  shift: string;
}

const OrdersList = () => {
  const [listOfOrders, setListOfOrders] = useState<OrderTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/orders').then((response) => {
      setListOfOrders(response.data);
    });
    setLoading(false);
  }, []);

  return (
    <div className="ordersList">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {listOfOrders.map((order) => {
            return (
              <ul
                key={order.id}
                onClick={() => {
                  navigate(`/order/${order.id}`);
                }}
              >
                <li className="ordersList-list">
                  <div>
                    <div>
                      <p className="ordersList-list__title">
                        Nazwa użytkownika:{' '}
                      </p>
                      {order.username}
                    </div>
                    <div>
                      <p className="ordersList-list__title">Zestaw menu: </p>
                      {order.dinner}
                    </div>
                    <div>
                      <p className="ordersList-list__title">Ilość: </p>
                      {order.ammount}
                    </div>
                    <div>
                      <p className="ordersList-list__title">Zmiana: </p>
                      {order.shift}
                    </div>
                  </div>
                </li>
                <div className="ordersList__buttons">
                  <button className="ordersList__button">Usuń</button>
                  <button className="ordersList__button ordersList__button--edit">
                    Edytuj
                  </button>
                </div>
              </ul>
            );
          })}
        </>
      )}
    </div>
  );
};

export default OrdersList;
