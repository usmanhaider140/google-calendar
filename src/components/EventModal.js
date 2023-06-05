import GlobalContext from '@/context/GlobalContext';
import {
  BookmarkBorder,
  Check,
  Close,
  Delete,
  DragHandle,
  Schedule,
  Segment,
} from '@mui/icons-material';
import React, { useContext, useState } from 'react';

const labelsClasses = [
  'teal',
  'gray',
  'green',
  'blue',
  'yellow',
  'red',
  'purple',
];

/**
 * @module EventModal Component
 * @prop null - There are no props here
 * @description This component is a modal that is used to create new events
 * @returns {JSX}
 * @example import EventModal from '@/components/EventModal';
 * <EventModal />
 */

const EventModal = () => {
  const {
    setShowEventModal,
    daySelected,
    dispatchEvents,
    selectedEvent,
    setSelectedEvent,
  } = useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent?.title || '');
  const [description, setDescription] = useState(
    selectedEvent?.description || '',
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent?.label || 'teal',
  );

  const handleClose = () => {
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  const handleLabel = label => {
    setSelectedLabel(label);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedEvent) {
      dispatchEvents({
        type: 'UPDATE_EVENT',
        payload: {
          id: selectedEvent.id,
          title,
          description,
          label: selectedLabel,
          day: daySelected.valueOf(),
          time: daySelected.format('HH:mm'),
        },
      });
      setSelectedEvent(null);
    } else {
      dispatchEvents({
        type: 'ADD_EVENT',
        payload: {
          id: Date.now(),
          title,
          description,
          label: selectedLabel,
          day: daySelected.valueOf(),
          time: daySelected.format('HH:mm'),
        },
      });
    }
    setShowEventModal(false);
  };

  const handleDelete = () => {
    dispatchEvents({
      type: 'DELETE_EVENT',
      payload: {
        id: selectedEvent.id,
      },
    });
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  return (
    <div className='fixed top-0 left-0 flex items-center justify-center w-full h-screen backdrop-blur-sm'>
      <div className='w-1/3 bg-white rounded-lg shadow-2xl'>
        <header className='flex items-center justify-between px-4 py-2 text-gray-400 bg-gray-100'>
          <DragHandle />
          <div className='space-x-2'>
            {selectedEvent && (
              <button
                onClick={handleDelete}
                className='transition transition-colors hover:text-red-500'>
                <Delete />
              </button>
            )}
            <button onClick={handleClose}>
              <Close />
            </button>
          </div>
        </header>
        <div className='p-3'>
          <div className='grid items-end grid-cols-1/5 gap-y-7'>
            <div></div>
            <input
              type='text'
              name='title'
              placeholder='Add title'
              value={title}
              required
              className='w-full pt-3 pb-2 text-xl font-semibold text-gray-600 border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-400'
              onChange={e => setTitle(e.target.value)}
            />
            <Schedule className='text-gray-400' />
            <p className='text-black'>{daySelected.format('dddd, MMMM DD')}</p>
            <Segment className='text-gray-400' />
            <input
              type='text'
              name='title'
              placeholder='Add a description'
              value={description}
              required
              className='w-full pt-3 pb-2 text-gray-600 border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-400'
              onChange={e => setDescription(e.target.value)}
            />
            <BookmarkBorder className='text-gray-400' />
            <div className='flex gap-x-2'>
              {labelsClasses.map((label, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => handleLabel(label)}
                    className={`w-6 h-6 rounded-full bg-${label}-500 flex items-center justify-center cursor-pointer`}>
                    {label === selectedLabel && (
                      <Check className='w-3 h-3 text-white' />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <footer className='flex justify-end p-3 mt-5 border-t'>
          <button
            type='submit'
            className='px-6 py-2 bg-blue-500 rounded hover:bg-blue-600'
            onClick={handleSubmit}>
            Save
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EventModal;
