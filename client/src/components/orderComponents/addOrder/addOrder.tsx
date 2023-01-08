import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './addOrder.scss';
import { useNavigate } from 'react-router-dom';

interface DishTypes {
  name: string;
  dish: string;
  ammount: number;
  shift: string;
}

const AddOrder = () => {
  const [menuList, setMenuList] = useState<DishTypes[]>([]);
  const initialValues: DishTypes = {
    name: '',
    dish: '',
    ammount: 1,
    shift: '',
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/menu').then((response) => {
      setMenuList(response.data);
    });
  }, []);

  const onSubmit = (data: DishTypes) => {
    axios
      .post('http://localhost:3001/orders', data, {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate('/orders');
        }
      });
  };

  const validationSchema = Yup.object().shape({
    dinner: Yup.string().required('Nazwa dania jest wymagana!'),
    ammount: Yup.number().max(1),
  });

  return (
    <div className="addOrder">
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
              id="username "
              name="username"
              className="addOrder-form__input"
              placeholder="Jan Kowalski"
            />
            <label>Danie: </label>
            <ErrorMessage name="dish" component="span" />
            <Field
              as="select"
              id="dinner"
              name="dinner"
              placeholder="Rosół"
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
              placeholder="1"
              className="addOrder-form__input"
              type="number"
              min={1}
            />
            <label>Zmiana: </label>
            <ErrorMessage name="shift" component="span" />
            <Field
              autoComplete="off"
              id="shift"
              name="shift"
              className="addOrder-form__input"
            />
            <button type="submit">Złóż zamówienie</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddOrder;
