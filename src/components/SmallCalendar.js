import React, { useContext, useEffect, useState } from 'react';
import { getMonth } from '@/utils/util';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import GlobalContext from '@/context/GlobalContext';

const SmallCalendar = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIndex(currentMonthIndex - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex + 1);
  };

  const handleReset = () => {
    setCurrentMonthIndex(dayjs().month());
  };

  const getDayClass = day => {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currentDay = day.format(format);
    const selectedDay = daySelected && daySelected.format(format);
    if (nowDay === currentDay) {
      return 'bg-blue-500 rounded-full text-white w-6 h-6';
    } else if (currentDay === selectedDay) {
      return 'bg-blue-200 rounded-full text-blue-600 w-6 h-6';
    } else return '';
  };

  const handleCalendarMonth = day => {
    setSmallCalendarMonth(currentMonthIndex);
    setDaySelected(day);
  };

  return (
    <div className='mt-9 '>
      <header className='flex justify-between'>
        <p className='flex-1 font-bold text-gray-500'>
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            'MMMM YYYY',
          )}
        </p>
        <button className='' onClick={handlePrevMonth}>
          <span className='mx-2 text-gray-600 cursor-pointer'>
            <ChevronLeft />
          </span>
        </button>
        {/* <p className='mr-5 text-lg font-bold text-gray-600'>
          {dayjs().month(currentMonthIndex).format('MMMM YYYY')}
        </p> */}
        <button className='' onClick={handleNextMonth}>
          <span className='ml-2 text-gray-600 cursor-pointer'>
            <ChevronRight />
          </span>
        </button>
      </header>

      <div className='grid grid-cols-7 grid-rows-6'>
        {currentMonth[0].map((day, index) => {
          return (
            <p key={index} className='pt-2 text-xs text-center text-gray-400'>
              {day.format('dd')}
            </p>
          );
        })}
        {currentMonth.map(week => {
          return week.map((day, index) => {
            return (
              <button
                onClick={() => handleCalendarMonth(day)}
                key={index}
                className={`py-1 ${getDayClass(day)}`}>
                <p className='text-xs text-center'>{day.format('D')}</p>
              </button>
            );
          });
        })}
      </div>
    </div>
  );
};

export default SmallCalendar;
