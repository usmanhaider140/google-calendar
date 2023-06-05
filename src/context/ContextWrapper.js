import React, { useEffect, useMemo, useReducer, useState } from 'react';
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
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

  useEffect(() => {
    const _labels = savedEvents.map(event => event.label);
    setLabels(
      [...new Set(_labels)].map(label => ({
        label,
        checked: true,
      })),
    );
  }, [savedEvents]);

  const updateLabel = label => {
    setLabels(prevLabels =>
      prevLabels.map(l => {
        if (l.label === label) {
          return {
            ...l,
            checked: !l.checked,
          };
        } else {
          return l;
        }
      }),
    );
  };

  const filteredEvents = useMemo(() => {
    return savedEvents.filter(event =>
      labels
        .filter(label => label.checked)
        .map(lbl => lbl.label)
        .includes(event.label),
    );
  }, [savedEvents, labels]);

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
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
