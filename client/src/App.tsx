import React from 'react';
import './App.css';
import { Auth, Nav } from './Components';
import { Route, Routes } from 'react-router-dom';
import { User } from './Components/UserComponents';
import { AddOrder, Order, OrdersList } from './Components/OrderComponents';
import { Menu } from './Components/MenuComponents';
import { MenuPage, ShiftPage, UsersPage } from './pages';
import { AuthContextProvider } from './Helpers/AuthContext';
import { ChangePIN } from './Components/ChangePIN';

const App = (): JSX.Element => {
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
