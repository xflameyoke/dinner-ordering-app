import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import './addUser.scss';

interface UserTypes {
  username: string;
  userType: string;
  userToken: number | string;
  userPIN: number | string;
}

const AddUser = () => {
  const navigate = useNavigate();
  const initialValues: UserTypes = {
    username: '',
    userType: '',
    userToken: '',
    userPIN: '',
  };

  const onSubmit = (data: UserTypes) => {
    axios
      .post('http://localhost:3001/users', data, {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate('/users');
        }
      });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Imię i nazwisko jest wymagane!'),
    userType: Yup.string().required('Typ użytkownika jest wymagany!'),
    userToken: Yup.number()
      .min(9, 'Numer token musi zawierać 9 cyfr!')
      .required('Numer token musi zawierać 9 cyfr!'),
    userPIN: Yup.number()
      .min(4, 'Kod PIN musi zawierać 4 cyfry!')
      .required('Kod PIN musi zawierać 4 cyfry!'),
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
              autoComplete="off"
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
            <ErrorMessage name="userToken" component="span" />
            <Field
              autoComplete="off"
              id="userToken"
              name="userToken"
              placeholder="Numer token"
              className="addUser-form__input"
              maxLength={9}
            />
            <label>Kod PIN: </label>
            <ErrorMessage name="userPIN" component="span" />
            <Field
              autoComplete="off"
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
