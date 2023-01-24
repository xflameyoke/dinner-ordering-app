import React from 'react';
import './App.css';
import { Auth, Nav } from './components';
import { Route, Routes } from 'react-router-dom';
import User from './components/userComponents/user/user';
import Order from './components/orderComponents/order/order';
import AddOrder from './components/orderComponents/addOrder/addOrder';
import Menu from './components/menuComponents/menu/menu';
import { ShiftPage, MenuPage, UsersPage } from './pages';
import { AuthContextProvider } from './helpers/authContext';
import OrdersList from './components/orderComponents/ordersList/ordersList';
import ChangePIN from './components/changePIN/ChangePIN';

const App = () => {
  return (
    <AuthContextProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/usersPage" element={<UsersPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:menuId" element={<Menu />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/addOrder" element={<AddOrder />} />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/admin" element={<ShiftPage />} />
        <Route path="/changePIN" element={<ChangePIN />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
