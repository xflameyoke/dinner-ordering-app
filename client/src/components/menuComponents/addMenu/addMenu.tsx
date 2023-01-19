import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './addMenu.scss';

interface MenuTypes {
  name: string;
  price: number;
}

const AddMenu = (): JSX.Element => {
  const initialValues: MenuTypes = {
    name: '',
    price: 0,
  };

  const onSubmit = (data: MenuTypes) => {
    axios
      .post('http://localhost:3001/menu', data, {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          window.location.reload();
        }
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nazwa dania jest wymagana!'),
    price: Yup.number()
      .min(1, 'Minimalna cena wynosi 1 zł!')
      .required('Cena jest wymagana!'),
  });

  return (
    <div className="addDish">
      <div className="addDish-form">
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
              className="addDish-form__input"
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
              className="addDish-form__input"
            />
            <button type="submit">Dodaj danie</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddMenu;
