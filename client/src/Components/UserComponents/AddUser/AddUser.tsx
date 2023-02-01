import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './AddUser.scss';
import { url } from '../../../Helpers/Urls';

interface IUser {
  username: string;
  userType: string;
  userGroup: number | string;
  userToken: number | string;
  userPIN: number | string;
}

interface IGroup {
  groupId: number;
  groupDesc: string;
}

const AddUser = (): JSX.Element => {
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  const initialValues: IUser = {
    username: '',
    userGroup: '',
    userType: '',
    userToken: '',
    userPIN: ''
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    await axios.get(url.group).then(({ data }) => {
      setGroupList(data);
    });
  };

  const onSubmit = async (data: IUser): Promise<void> => {
    await axios
      .post(url.users, data, {
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
    username: Yup.string().required('Imię i nazwisko jest wymagane!'),
    userGroup: Yup.number().required('Wybór grupy jest wymagany!'),
    userType: Yup.string().required('Typ użytkownika jest wymagany!'),
    userToken: Yup.number()
      .required('Numer token musi zawierać 9 cyfr!')
      .test(
        'len',
        'Token użytkownika musi wynosić 9 cyfr!',
        (val) => val?.toString().length === 9
      ),
    userPIN: Yup.string()
      .required('Kod PIN musi zawierać 4 znaki!')
      .test('len', 'Kod PIN musi zawirać 4 znaki!', (val) => val?.length === 4)
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
            <label>Grupa Użytkownika: </label>
            <ErrorMessage name="userGroup" component="span" />
            <Field
              as="select"
              id="userGroup"
              name="userGroup"
              className="addUser-form__input"
            >
              {groupList.map((group) => (
                <option value={`${group.groupId}`} key={group.groupId}>
                  {group.groupId}, {group.groupDesc}
                </option>
              ))}
            </Field>
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
            <button type="submit" className="addUser-form__button">
              Dodaj użytkownika
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
