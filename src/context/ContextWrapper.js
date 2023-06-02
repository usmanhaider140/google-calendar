import React, { useEffect, useReducer, useState } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case 'ADD_EVENT':
      return [...state, payload];
    case 'DELETE_EVENT':
      return state.filter(event => event.id !== payload.id);
    case 'UPDATE_EVENT':
      return state.map(event => {
        if (event.id === payload.id) {
          return {
            ...event,
            ...payload,
          };
        } else {
          return event;
        }
      });
    default:
      return state;
  }
}

function initEvents() {
  if (typeof window !== 'undefined') {
    const events = localStorage.getItem('events');
    if (events) {
      return JSON.parse(events);
    } else {
      return [];
    }
  } else return [];
}

const ContextWrapper = props => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [savedEvents, dispatchEvents] = useReducer(
    savedEventsReducer,
    [],
    initEvents,
  );

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        savedEvents,
        dispatchEvents,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
