import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './AddGroup.scss';
import { url } from '../../../Helpers/Urls';

interface IAddGroup {
  groupId: number | string;
  groupDesc: string;
}

const AddGroup = (): JSX.Element => {
  const initialValues: IAddGroup = {
    groupId: '',
    groupDesc: ''
  };

  const onSubmit = async (data: IAddGroup): Promise<void> => {
    await axios
      .post(url.group, data, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(({ data }) => {
        if (data.error === true) {
          alert(data.error);
        } else {
          alert('Dodano grupę!');
          window.location.reload();
        }
      });
  };

  const validationSchema = Yup.object().shape({
    groupId: Yup.number().required('Numer grupy jest wymagany!'),
    groupDesc: Yup.string().required('Opis grupy jest wymagany!')
  });

  return (
    <article className="addGroup">
      <div className="addGroup-form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>ID grupy: </label>
            <ErrorMessage name="groupId" component="span" />
            <Field
              autoComplete="off"
              id="groupId"
              name="groupId"
              type="number"
              step="1"
              className="addGroup-form__input"
            />
            <label>Opis grupy: </label>
            <ErrorMessage name="groupDesc" component="span" />
            <Field
              autoComplete="off"
              id="groupDesc"
              name="groupDesc"
              className="addGroup-form__input"
            />
            <button type="submit" className="addGroup-form__button">
              Dodaj grupę
            </button>
          </Form>
        </Formik>
      </div>
    </article>
  );
};

export default AddGroup;
