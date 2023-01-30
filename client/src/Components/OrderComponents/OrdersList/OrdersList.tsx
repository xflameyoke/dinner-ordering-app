import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrdersList.scss';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import { url } from '../../../Helpers/Urls';

interface IOrder {
  id: number;
  username: string;
  dinner: string;
  ammount: number;
  shift: string;
}

const OrdersList = (): JSX.Element => {
  const [listOfOrders, setListOfOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    await axios.get(url.orders).then(({ data }) => {
      setListOfOrders(data);
    });
    setLoading(false);
  };

  return (
    <article className="ordersList">
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
    </article>
  );
};

export default OrdersList;
