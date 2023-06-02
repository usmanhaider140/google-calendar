import React, { useContext } from 'react';
import logo from '../assets/logo.png';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import GlobalContext from '@/context/GlobalContext';
import dayjs from 'dayjs';

/**
 * @module CalendarHeader Component
 * @prop null - There are no props here
 * @description This component is a header that is used to show the current month and navigate to previous or next month
 * @returns {JSX}
 * @example import CalendarHeader from '@/components/CalendarHeader';
 * <CalendarHeader />
 */

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month(),
    );
  };

  return (
    <header className='flex items-center px-4 py-2'>
      <div className='flex items-center w-64'>
        <Image src={logo} alt='Google Calendar Logo' className='w-8 h-8 mr-2' />
        <h1 className='mr-10 text-xl font-bold text-gray-500'>Calendar</h1>
      </div>
      <button
        onClick={handleReset}
        className='px-4 py-2 mr-5 transition-colors border rounded hover:bg-gray-100'>
        Today
      </button>
      <button className='px-4 py-2 mr-5' onClick={handlePrevMonth}>
        <span className='mx-2 text-gray-600 cursor-pointer'>
          <ChevronLeft />
        </span>
      </button>
      <p className='mr-5 text-lg font-bold text-gray-600'>
        {dayjs().month(monthIndex).format('MMMM YYYY')}
      </p>
      <button className='px-4 py-2 mr-5 ' onClick={handleNextMonth}>
        <span className='mx-2 text-gray-600 cursor-pointer'>
          <ChevronRight />
        </span>
      </button>
    </header>
  );
};

export default CalendarHeader;
