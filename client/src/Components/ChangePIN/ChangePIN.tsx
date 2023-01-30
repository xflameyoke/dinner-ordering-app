import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { url } from '../../Helpers/Urls';

interface PINTypes {
  oldPIN: string;
  newPIN: string;
}

const ChangePIN = (): JSX.Element => {
  const initialValues: PINTypes = {
    oldPIN: '',
    newPIN: ''
  };

  const validationSchema = Yup.object().shape({
    oldPIN: Yup.string()
      .required('Kod PIN jest wymagany!')
      .test(
        'len',
        'Stary PIN musi zawierać 4 znaki!',
        (val) => val?.length === 4
      ),
    newPIN: Yup.string()
      .required('Kod PIN jest wymagany!')
      .test(
        'len',
        'Nowy PIN musi zawierać 4 znaki!',
        (val) => val?.length === 4
      )
  });

  const onSubmit = async (data: PINTypes): Promise<void> => {
    await axios
      .put(
        url.changePIN,
        {
          oldPIN: data.oldPIN,
          newPIN: data.newPIN
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
        }
      )
      .then((response) => {
        if (response.data.error === true) {
          alert(response.data.error);
        }
      });
  };

  return (
    <article>
      <div className="changePIN">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Stary PIN: </label>
            <ErrorMessage name="oldPIN" component="span" />
            <Field
              autoComplete="off"
              id="oldPIN"
              name="oldPIN"
              maxLength={4}
              type="password"
            />
            <label>Nowy PIN: </label>
            <ErrorMessage name="newPIN" component="span" />
            <Field
              autoComplete="off"
              id="newPIN"
              name="newPIN"
              maxLength={4}
              type="password"
            />
            <button type="submit">Zmień PIN</button>
          </Form>
        </Formik>
      </div>
    </article>
  );
};

export default ChangePIN;
