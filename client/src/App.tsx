import React from 'react';
import './App.css';
import Nav from './components/nav/nav';
import { Route, Routes } from 'react-router-dom';
import LogIn from './pages/logIn/logIn';
import UsersList from './pages/usersList/usersList';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </>
  );
};

export default App;
