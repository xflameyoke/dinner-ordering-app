import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './addUser.scss';

interface User {
  username: string;
  userType: string;
  userNumber: number | string;
  userPIN: number | string;
}

const AddUser = () => {
  const initialValues: User = {
    username: '',
    userType: '',
    userNumber: 0,
    userPIN: 0,
  };

  const onSubmit = (data: User) => {
    axios.post('http://localhost:3001/users', data).then((response) => {
      console.log('It Worked');
    });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Imię i nazwisko jest wymagane!'),
    userType: Yup.string().required('Typ użytkownika jest wymagany!'),
    userNumber: Yup.number()
      .min(9, 'Token musi być zawierać 9 cyfr!')
      .required('Token musi być zawierać 9 cyfr!'),
    userPIN: Yup.number()
      .min(4, 'Podaj minimum 4 cyfrowy kod!')
      .required('Podaj minimum 4 cyfrowy kod!'),
  });

  return (
    <div className="addUser">
      <div className="addUser-form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Imię i nazwisko: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autocomplete="off"
              id="username"
              name="username"
              placeholder="Jan Kowalski"
              className="addUser-form__input"
            />
            <label>Typ Użytkownika: </label>
            <ErrorMessage name="userType" component="span" />
            <Field
              as="select"
              id="userType"
              name="userType"
              placeholder="Admin"
              className="addUser-form__input"
            >
              <option value="admin">Admin</option>
              <option value="user">Użytkownik</option>
              <option value="hr">HR</option>
              <option value="directorAssistant">Asystentka Dyrektora</option>
            </Field>
            <label>Numer token: </label>
            <ErrorMessage name="userNumber" component="span" />
            <Field
              autocomplete="off"
              id="userNumber"
              name="userNumber"
              placeholder="123456789"
              className="addUser-form__input"
              maxLength={9}
            />
            <label>Kod PIN: </label>
            <ErrorMessage name="userPIN" component="span" />
            <Field
              autocomplete="off"
              id="userPIN"
              name="userPIN"
              placeholder="1234"
              className="addUser-form__input"
              maxLength={4}
            />
            <button type="submit">Dodaj użytkownika</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
