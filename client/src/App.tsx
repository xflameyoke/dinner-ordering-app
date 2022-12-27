import React from 'react';
import './App.css';
import Nav from './components/nav/nav';
import { Route, Routes } from 'react-router-dom';
import LogIn from './pages/logIn/logIn';
import UsersList from './pages/usersList/usersList';
import User from './components/user/user';
import UserManage from './pages/userManage/userManage';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/userManage" element={<UserManage />} />
      </Routes>
    </>
  );
};

export default App;
