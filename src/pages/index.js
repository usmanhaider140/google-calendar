import { useState, useContext, useEffect } from 'react';
import CalendarHeader from '@/components/CalendarHeader';
import Month from '@/components/Month';
import Sidebar from '@/components/Sidebar';
import { getMonth } from '@/utils/util';
import GlobalContext from '@/context/GlobalContext';
import EventModal from '@/components/EventModal';

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <>
      {showEventModal && <EventModal />}
      <div className='flex flex-col w-screen h-screen text-black bg-white'>
        <CalendarHeader />
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
}
