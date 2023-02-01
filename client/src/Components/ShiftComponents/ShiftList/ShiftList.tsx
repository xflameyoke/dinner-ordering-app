import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import { url } from '../../../Helpers/Urls';
import './ShiftList.scss';
import { useNavigate } from 'react-router-dom';

export interface IShift {
  id: number;
  shiftName: string;
  hours: string;
}

const ShiftList = (): JSX.Element => {
  const [shiftList, setShiftList] = useState<IShift[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    await axios.get(url.shift).then(({ data }) => {
      setShiftList(data);
    });
    setLoading(false);
  };

  const deleteShift = async (id: number): Promise<void> => {
    await axios
      .delete(`${url.shift}/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(() => {
        setShiftList(
          shiftList.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <article className="shiftList">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {shiftList.map((shift) => {
            return (
              <ul key={shift.id}>
                <li className="shiftList-list">
                  <div>
                    <div>
                      <p className="shiftList-list__title">Nazwa: </p>
                      {shift.shiftName}
                    </div>
                    <div>
                      <p className="shiftList-list__title">Godziny: </p>
                      {shift.hours}
                    </div>
                  </div>
                </li>
                <div className="shiftList__buttons">
                  <button
                    className="shiftList__button"
                    onClick={() => {
                      navigate(`/shift/${shift.id}`);
                    }}
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => {
                      void deleteShift(shift.id);
                    }}
                    className="shiftList__button"
                  >
                    Usuń
                  </button>
                </div>
              </ul>
            );
          })}
        </>
      )}
    </article>
  );
};

export default ShiftList;
