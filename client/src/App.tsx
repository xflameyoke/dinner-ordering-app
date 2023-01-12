import React, { useState } from 'react';
import './App.css';
import { Nav } from './components';
import { Route, Routes } from 'react-router-dom';
import User from './components/userComponents/user/user';
import Order from './components/orderComponents/order/order';
import { ShiftPage, LogInPage, MenuPage, OrdersPage, UsersPage } from './pages';
import { AuthContext } from './helpers/authContext';

const App = () => {
  const [authState, setAuthState] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Nav />
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/usersPage" element={<UsersPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/admin" element={<ShiftPage />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
