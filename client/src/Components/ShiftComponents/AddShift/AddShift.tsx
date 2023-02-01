import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import './AddShift.scss';
import { url } from '../../../Helpers/Urls';

interface IAddShift {
  shiftName: string;
  hours: string;
}

const AddShift = (): JSX.Element => {
  const initialValues: IAddShift = {
    shiftName: '',
    hours: ''
  };

  const validationSchema = Yup.object().shape({
    shiftName: Yup.string(),
    hours: Yup.string()
  });

  const onSubmit = async (data: IAddShift): Promise<void> => {
    await axios
      .post(url.shift, data, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(({ data }) => {
        if (data.error === true) {
          alert(data.error);
        } else {
          alert('Dodano nową zmianę');
        }
      });
    window.location.reload();
  };

  return (
    <article className="addShift">
      <div className="addShift-form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Nazwa: </label>
            <ErrorMessage name="shiftName" component="span" />
            <Field
              autoComplete="off"
              id="shiftName"
              name="shiftName"
              className="addShift-form__input"
            />
            <label>Godziny: </label>
            <ErrorMessage name="hours" component="span" />
            <Field
              autoComplete="off"
              id="hours"
              name="hours"
              className="addShift-form__input"
            ></Field>
            <button type="submit" className="addShift-form__button">
              Dodaj zmianę
            </button>
          </Form>
        </Formik>
      </div>
    </article>
  );
};

export default AddShift;
