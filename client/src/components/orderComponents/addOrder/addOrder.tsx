import React, { useContext, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './addOrder.scss';
import AuthContext from '../../../helpers/authContext';

interface MenuList {
  name: string;
}
interface DishTypes {
  username: string;
  dish: string;
  ammount: number;
  shift: string;
}

interface ShiftTypes {
  name: string;
  hours: string;
}

const AddOrder = (): JSX.Element => {
  const { authState } = useContext(AuthContext);
  const [menuList, setMenuList] = useState<MenuList[]>([]);
  const [shiftList, setShiftList] = useState<ShiftTypes[]>([]);
  const initialValues: DishTypes = {
    username: authState.username,
    dish: '',
    ammount: 1,
    shift: '',
  };

  useEffect(() => {
    axios.get('http://localhost:3001/menu').then((response) => {
      setMenuList(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/shift').then((response) => {
      setShiftList(response.data);
    });
  }, []);

  const onSubmit = (data: DishTypes) => {
    axios
      .post('http://localhost:3001/orders', data, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert('Zamówienie złożone poprawnie!');
        }
      });
  };

  const validationSchema = Yup.object().shape({
    dinner: Yup.string(),
    shift: Yup.string(),
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
                <option value={`${menu.name}`}>{menu.name}</option>
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
              type="number"
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
                <option value={`${shift.name}`}>{shift.name}</option>
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
