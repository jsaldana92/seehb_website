import React, { createContext, useContext, useState } from 'react';

const ScheduleContext = createContext();

export function ScheduleProvider({ children }) {
  const [selectedDay, setSelectedDay] = useState('dinner');
  const [triggerScrollToTop, setTriggerScrollToTop] = useState(false);
  const [posterRedirected, setPosterRedirected] = useState(false);

  return (
    <ScheduleContext.Provider
      value={{
        selectedDay,
        setSelectedDay,
        triggerScrollToTop,
        setTriggerScrollToTop,
        posterRedirected,
        setPosterRedirected,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  return useContext(ScheduleContext);
}
