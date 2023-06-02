import React, { useContext } from 'react';
import { PlusIcon } from '@/assets/plus';
import GlobalContext from '@/context/GlobalContext';

const CreateEventButton = () => {
  const { setShowEventModal } = useContext(GlobalContext);
  const handleEventModal = () => {
    setShowEventModal(true);
  };
  return (
    <button
      className='flex items-center justify-between gap-3 p-2 px-5 font-semibold text-gray-500 border rounded-full shadow-md hover:shadow-2xl '
      onClick={handleEventModal}>
      <PlusIcon /> Create
    </button>
  );
};

export default CreateEventButton;
