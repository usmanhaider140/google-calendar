import React from 'react';
import Day from './Day';

const Month = ({ month }) => {
  return (
    <div className='grid flex-1 grid-cols-7 grid-rows-5'>
      {month.map((days, idx) => {
        return days.map((day, i) => {
          return <Day day={day} key={i} rowIndex={idx} />;
        });
      })}
    </div>
  );
};

export default Month;
