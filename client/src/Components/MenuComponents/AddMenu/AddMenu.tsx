import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './AddMenu.scss';
import { url } from '../../../Helpers/Urls';

interface IAddMenu {
  name: string;
  price: number;
}

const AddMenu = (): JSX.Element => {
  const initialValues: IAddMenu = {
    name: '',
    price: 0
  };

  const onSubmit = async (data: IAddMenu): Promise<void> => {
    await axios
      .post(url.menu, data, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(({ data }) => {
        if (data.error === true) {
          alert(data.error);
        } else {
          window.location.reload();
        }
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nazwa dania jest wymagana!'),
    price: Yup.number()
      .min(1, 'Minimalna cena wynosi 1 zł!')
      .required('Cena jest wymagana!')
  });

  return (
    <article className="addMenu">
      <div className="addMenu-form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Nazwa dania: </label>
            <ErrorMessage name="name" component="span" />
            <Field
              autoComplete="off"
              id="name"
              name="name"
              placeholder="Rosół"
              className="addMenu-form__input"
            />
            <label>Cena: </label>
            <ErrorMessage name="price" component="span" />
            <Field
              autoComplete="off"
              id="price"
              name="price"
              type="number"
              step="0.5"
              min={1}
              className="addMenu-form__input"
            />
            <button type="submit" className="addMenu-form__button">
              Dodaj danie
            </button>
          </Form>
        </Formik>
      </div>
    </article>
  );
};

export default AddMenu;
