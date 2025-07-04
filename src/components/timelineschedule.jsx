import React, { useState, useEffect } from 'react';
import DinnerSchedule from '../components/dinnerschedule';
import ConferenceSchedule from '../components/conferenceschedule';
import PosterSession from './postersession';
import { useSchedule } from '../components/schedulecontext';

export default function TimelineSchedule() {
  const {
    selectedDay,
    setSelectedDay,
    triggerScrollToTop,
    setTriggerScrollToTop,
    posterRedirected,
    setPosterRedirected,
  } = useSchedule();

  // ✅ Trigger scroll AFTER poster view is active
  useEffect(() => {
    if (selectedDay === 'poster' && posterRedirected) {
      setTimeout(() => {
        setTriggerScrollToTop(true);
        setPosterRedirected(false);   // ✅ Reset the flag so manual clicks don't trigger it
      }, 100);
    }
  }, [selectedDay]);

  return (
    <div className="bg-[#F0F0F0] w-full py-12 flex flex-col items-center">
      {/* Toggle Buttons */}
      <div className="flex space-x-12">
        <button
          onClick={() => setSelectedDay('dinner')}
          className="flex flex-col items-center transition-opacity duration-200"
          style={{ opacity: selectedDay === 'dinner' ? 1 : 0.6 }}
        >
          <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
            Opening Dinner
          </span>
          <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
            Feb 7th
          </span>
        </button>

        <button
          onClick={() => setSelectedDay('conference')}
          className="flex flex-col items-center transition-opacity duration-200"
          style={{ opacity: selectedDay === 'conference' ? 1 : 0.6 }}
        >
          <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
            Conference
          </span>
          <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
            Feb 8th
          </span>
        </button>

        <button
          onClick={() => setSelectedDay('poster')}
          className="flex flex-col items-center transition-opacity duration-200"
          style={{ opacity: selectedDay === 'poster' ? 1 : 0.6 }}
        >
          <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
            Poster Session
          </span>
          <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
            Feb 8th
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-black w-3/4 mt-8"></div>

      {/* Content Renderer */}
      <div className="mt-8 w-full px-4">
        {selectedDay === 'dinner' ? (
          <DinnerSchedule />
        ) : selectedDay === 'conference' ? (
          <ConferenceSchedule />
        ) : (
          <PosterSession />
        )}
      </div>
    </div>
  );
}
