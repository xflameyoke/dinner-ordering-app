import React, { useContext, useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './AddOrder.scss';
import AuthContext from '../../../Helpers/AuthContext';
import { url } from '../../../Helpers/Urls';

interface IMenu {
  name: string;
}

interface IDish {
  username: string;
  dish: string;
  ammount: number;
  shift: string;
}

interface IShift {
  shiftName: string;
  hours: string;
}

const AddOrder = (): JSX.Element => {
  const { authState } = useContext(AuthContext);
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  const [shiftList, setShiftList] = useState<IShift[]>([]);
  const initialValues: IDish = {
    username: authState.username,
    dish: '',
    ammount: 1,
    shift: ''
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    await axios.get(url.menu).then(({ data }) => {
      setMenuList(data);
    });
    await axios.get(url.shift).then(({ data }) => {
      setShiftList(data);
    });
  };

  const onSubmit = async (data: IDish): Promise<void> => {
    await axios
      .post(url.orders, data, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(({ data }) => {
        if (data.error === true) {
          alert(data.error);
        } else {
          alert('Zamówienie złożone poprawnie!');
        }
      });
  };

  const validationSchema = Yup.object().shape({
    dinner: Yup.string(),
    shift: Yup.string()
  });

  return (
    <article className="addOrder">
      <div className="addOrder-form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Imię i nazwisko: </label>
            <ErrorMessage name="name" component="span" />
            <Field
              autoComplete="off"
              id="username"
              name="username"
              className="addOrder-form__input"
              value={authState.username}
              disabled={true}
            />
            <label>Danie: </label>
            <ErrorMessage name="dinner" component="span" />
            <Field
              as="select"
              id="dinner"
              name="dinner"
              className="addOrder-form__input"
            >
              {menuList.map((menu) => (
                <option value={`${menu.name}`} key={menu.name}>
                  {menu.name}
                </option>
              ))}
            </Field>
            <label>Ilość: </label>
            <ErrorMessage name="ammount" component="span" />
            <Field
              autoComplete="off"
              id="ammount"
              name="ammount"
              value={1}
              className="addOrder-form__input"
              disabled={true}
            />
            <label>Zmiana: </label>
            <ErrorMessage name="shift" component="span" />
            <Field
              as="select"
              id="shift"
              name="shift"
              className="addOrder-form__input"
            >
              {shiftList.map((shift) => (
                <option value={`${shift.shiftName}`} key={shift.shiftName}>
                  {shift.shiftName}, {shift.hours}
                </option>
              ))}
            </Field>
            <button type="submit" className="addOrder-form__button">
              Złóż zamówienie
            </button>
          </Form>
        </Formik>
      </div>
    </article>
  );
};

export default AddOrder;
