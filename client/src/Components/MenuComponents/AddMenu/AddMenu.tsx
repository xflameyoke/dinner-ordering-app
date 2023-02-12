import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './AddMenu.scss';
import { url } from '../../../Helpers/Urls';

interface IAddMenu {
  name: string;
  desc: string;
}

const AddMenu = (): JSX.Element => {
  const initialValues: IAddMenu = {
    name: '',
    desc: ''
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
    name: Yup.string().required('Nazwa zestawu jest wymagana!'),
    desc: Yup.string().required('Opis zestawu jest wymagany!')
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
            <label>Nazwa zestawu: </label>
            <ErrorMessage name="name" component="span" />
            <Field
              autoComplete="off"
              id="name"
              name="name"
              placeholder="Zestaw 1"
              className="addMenu-form__input"
            />
            <label>Opis zestawu: </label>
            <ErrorMessage name="desc" component="span" />
            <Field
              autoComplete="off"
              id="desc"
              name="desc"
              component="textarea"
              className="addMenu-form__input addMenu-form__input--desc"
            />
            <button type="submit" className="addMenu-form__button">
              Dodaj zestaw!
            </button>
          </Form>
        </Formik>
      </div>
    </article>
  );
};

export default AddMenu;
