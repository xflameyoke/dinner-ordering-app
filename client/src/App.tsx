import React from 'react';
import './App.css';
import { Auth, Nav } from './Components';
import { Route, Routes } from 'react-router-dom';
import { User } from './Components/UserComponents';
import { Order, OrdersList } from './Components/OrderComponents';
import { Menu } from './Components/MenuComponents';
import { GroupPage, MenuPage, OrderPage, ShiftPage, UsersPage } from './Pages';
import { AuthContextProvider } from './Helpers/AuthContext';
import { ChangePIN } from './Components/ChangePIN';
import { Shift } from './Components/ShiftComponents';
import { Group } from './Components/GroupComponents/Group';

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
        <Route path="/addOrder" element={<OrderPage />} />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/shifts" element={<ShiftPage />} />
        <Route path="shift/:shiftId" element={<Shift />} />
        <Route path="/changePIN" element={<ChangePIN />} />
        <Route path="/groupPage" element={<GroupPage />} />
        <Route path="/group/:groupId" element={<Group />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
