import React from 'react';
import './App.css';
import Nav from './components/nav/nav';
import { Route, Routes } from 'react-router-dom';
import LogIn from './pages/logIn/logIn';
import UsersList from './pages/usersList/usersList';
import User from './components/userComponents/user/user';
import UserManage from './pages/userManage/userManage';
import Menu from './pages/menu/menu';
import Orders from './pages/orders/orders';
import Order from './components/orderComponents/order/order';
import AddOrder from './components/orderComponents/addOrder/addOrder';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/userManage" element={<UserManage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/addOrder" element={<AddOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:orderId" element={<Order />} />
      </Routes>
    </>
  );
};

export default App;
