import React from 'react';

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: index => {},
  smallCalendarMonth: null,
  setSmallCalendarMonth: month => {},
  daySelected: null,
  setDaySelected: day => {},
  showEventModal: false,
  setShowEventModal: () => {},
  savedEvents: [],
  dispatchEvents: () => {},
});

export default GlobalContext;
