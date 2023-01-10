import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './auth.scss';

interface UserLogin {
  userToken: number;
  userPIN: number;
}

const Auth = () => {
  const initialValues: UserLogin = {
    userToken: 1,
    userPIN: 1,
  };

  const validationSchema = Yup.object().shape({
    userToken: Yup.number()
      .required('Numer użytkownika jest wymagany!')
      .test(
        'len',
        'Numer użytkownika musi wynosić 9 cyfr!',
        (val) => val?.toString().length === 9
      ),
    userPIN: Yup.number()
      .required('Kod PIN jest wymagany!')
      .test(
        'len',
        'Kod PIN musi wynosić 4 cyfry!',
        (val) => val?.toString().length === 4
      ),
  });

  const onSubmit = (data: UserLogin) => {
    axios.post('http://localhost:3001/users/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem('accessToken', response.data);
        window.location.reload();
      }
    });
  };

  return (
    <div className="auth">
      <div className="auth-form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Numer użytkownika</label>
            <ErrorMessage name="userToken" component="span" />
            <Field
              autoComplete="off"
              id="userToken"
              name="userToken"
              maxLength={9}
              className="auth-form__input"
            />
            <label>Kod PIN</label>
            <ErrorMessage name="userPIN" component="span" />
            <Field
              autoComplete="off"
              id="userPIN"
              name="userPIN"
              maxLength={4}
              className="auth-form__input"
            />
            <button type="submit">Zaloguj</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Auth;
