import React, { createContext, useContext, useState } from 'react';

const ConferenceScrollContext = createContext();

export function ConferenceScrollProvider({ children }) {
  const [triggerConferenceScroll, setTriggerConferenceScroll] = useState(false);
  const [conferenceRedirected, setConferenceRedirected] = useState(false); // <-- NEW
  const [selectedDay, setSelectedDay] = useState('dinner'); // <-- OPTIONAL if you want it

  return (
    <ConferenceScrollContext.Provider
      value={{
        triggerConferenceScroll,
        setTriggerConferenceScroll,
        conferenceRedirected,
        setConferenceRedirected,
        selectedDay,
        setSelectedDay,
      }}
    >
      {children}
    </ConferenceScrollContext.Provider>
  );
}

export function useConferenceScroll() {
  return useContext(ConferenceScrollContext);
}
