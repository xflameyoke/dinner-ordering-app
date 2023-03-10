import React from 'react';
import './App.css';
import { Nav } from './components';
import { Route, Routes } from 'react-router-dom';
import User from './components/userComponents/user/user';
import Order from './components/orderComponents/order/order';
import AddOrder from './components/orderComponents/addOrder/addOrder';
import Menu from './components/menuComponents/menu/menu';
import { ShiftPage, LogInPage, MenuPage, OrdersPage, UsersPage } from './pages';
import { AuthContextProvider } from './helpers/authContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/usersPage" element={<UsersPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:menuId" element={<Menu />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/addOrder" element={<AddOrder />} />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/admin" element={<ShiftPage />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
