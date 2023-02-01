import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../Helpers/Urls';
import { LoadingSpinner } from '../../UI/LoadingSpinner';

const Shift = (): JSX.Element => {
  const { shiftId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [shiftData, setShiftData] = useState({
    id: 1,
    shiftName: '',
    hours: ''
  });

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    await axios
      .get(`${url.shift}/byId/${shiftId as string}`)
      .then(({ data }) => {
        setShiftData(data);
      });
    setLoading(false);
  };

  const editShift = async (option: string): Promise<void> => {
    if (option === 'shiftName') {
      const newShiftName = prompt('Wpisz nową nazwę zmiany');
      await axios.put(
        `${url.shift}/shiftName`,
        {
          newShiftName,
          id: shiftId
        },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    } else if (option === 'hours') {
      const newHours = prompt('Wpisz nowe godziny');
      await axios.put(
        `${url.shift}/hours`,
        {
          newHours,
          id: shiftId
        },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      );
    }
    window.location.reload();
  };

  return (
    <article>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div
            onClick={() => {
              void editShift('shiftName');
            }}
          >
            {shiftData.shiftName}
          </div>
          <div
            onClick={() => {
              void editShift('hours');
            }}
          >
            {shiftData.hours}
          </div>
        </>
      )}
    </article>
  );
};

export default Shift;
