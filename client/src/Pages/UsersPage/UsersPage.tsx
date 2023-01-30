import React from 'react';
import { AddUser, UsersList } from '../../Components/UserComponents';

const UsersPage = (): JSX.Element => (
  <>
    <AddUser />
    <UsersList />
  </>
);

export default UsersPage;
