import React, { useContext } from 'react';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import './Auth.scss';
import AuthContext from '../../Helpers/AuthContext';
import { url } from '../../Helpers/Urls';

interface IUserData {
  userToken: number;
  userPIN: string;
}

const Auth = (): JSX.Element => {
  const { setAuthState } = useContext(AuthContext);

  const initialValues: IUserData = {
    userToken: 0,
    userPIN: ''
  };

  const validationSchema = Yup.object().shape({
    userToken: Yup.number()
      .required('Numer użytkownika jest wymagany!')
      .test(
        'len',
        'Numer użytkownika musi wynosić 5 cyfr!',
        (val) => val?.toString().length === 9
      ),
    userPIN: Yup.string()
      .required('Kod PIN jest wymagany!')
      .test('len', 'Kod PIN musi wynosić 4 cyfry!', (val) => val?.length === 4)
  });

  const onSubmit = async (data: IUserData): Promise<void> => {
    await axios.post(url.login, data).then(({ data }) => {
      if (data.error === true) {
        alert(data.error);
      } else {
        localStorage.setItem('accessToken', data.token);
        setAuthState({
          username: data.username,
          id: data.id,
          userType: data.userType,
          userToken: data.userToken,
          status: true
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
              type="password"
            />
            <button type="submit">Zaloguj</button>
          </Form>
        </Formik>
      </div>
    </article>
  );
};

export default Auth;
