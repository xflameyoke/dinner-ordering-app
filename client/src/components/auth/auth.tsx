import React, { useContext } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './auth.scss';
import AuthContext from '../../helpers/authContext';

interface UserLogin {
  userToken: number;
  userPIN: string;
}

const Auth = (): JSX.Element => {
  const { setAuthState } = useContext(AuthContext);

  const initialValues: UserLogin = {
    userToken: 0,
    userPIN: '',
  };

  const validationSchema = Yup.object().shape({
    userToken: Yup.number()
      .required('Numer użytkownika jest wymagany!')
      .test(
        'len',
        'Numer użytkownika musi wynosić 9 cyfr!',
        (val) => val?.toString().length === 9
      ),
    userPIN: Yup.string()
      .required('Kod PIN jest wymagany!')
      .test('len', 'Kod PIN musi wynosić 4 cyfry!', (val) => val?.length === 4),
  });

  const onSubmit = (data: UserLogin) => {
    axios.post('http://localhost:3001/users/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem('accessToken', response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          userType: response.data.userType,
          userToken: response.data.userToken,
          status: true,
        });
        window.location.reload();
      }
    });
  };

  return (
    <article className="auth">
      <div className="auth-form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Nazwa użytkownika</label>
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
    </article>
  );
};

export default Auth;
