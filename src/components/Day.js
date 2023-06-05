import GlobalContext from '@/context/GlobalContext';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';

const Day = ({ day, rowIndex }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents: savedEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  function getCurrentDayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-500 text-white rounded-full w-6 h-6 font-bold,'
      : '';
  }

  useEffect(() => {
    const events = savedEvents.filter(event => event.day === day.valueOf());
    setDayEvents(events);
  }, [savedEvents, day]);

  const handleEventModal = () => {
    setDaySelected(day);
    setShowEventModal(true);
  };

  const handleEvent = event => {
    if (event) setSelectedEvent(event);
    setDaySelected(day);
    setShowEventModal(true);
  };

  return (
    <div className='flex flex-col border border-gray-200'>
      <header className='flex flex-col items-center'>
        {rowIndex === 0 && (
          <p className='mt-1 text-sm text-gray-400'>
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p className={`p-1 my-1 text-xs text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div className='flex-1 cursor-pointer' onClick={handleEventModal}>
        {dayEvents.length > 0 &&
          dayEvents.map((event, i) => {
            return (
              <>
                <div
                  key={i}
                  onClick={() => {
                    handleEvent(event);
                  }}
                  data-tooltip-target='tooltip-detail'
                  className={`p-1 m-1 text-xs text-gray-600 rounded-full bg-${event.label}-200`}>
                  {event.title}
                </div>
                <div
                  id='tooltip-detail'
                  role='tooltip'
                  class='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'>
                  Tooltip content
                  <div class='tooltip-arrow' data-popper-arrow></div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Day;
