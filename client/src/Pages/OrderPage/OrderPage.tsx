import React from 'react';
import './OrderPage.scss';
import { MenuList } from '../../Components/MenuComponents';
import { AddOrder } from '../../Components/OrderComponents';

const OrderPage = (): JSX.Element => (
  <article className="orderPage">
    <AddOrder />
    <div className="orderPage-right">
      <h2>Lista Zestawów</h2>
      <MenuList />
    </div>
  </article>
);

export default OrderPage;
