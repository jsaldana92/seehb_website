import React, { useState, useEffect, useRef } from 'react';
import DinnerSchedule from '../components/dinnerschedule';
import ConferenceSchedule from '../components/conferenceschedule';
import PosterSession from './postersession';
import { useSchedule } from '../components/schedulecontext';
import { useConferenceScroll } from '../components/conferencescrollcontext';
import { useLocation } from 'react-router-dom';

export default function TimelineSchedule() {
  // Poster logic
  const {
    selectedDay: posterDay,
    setSelectedDay,
    triggerScrollToTop,
    setTriggerScrollToTop,
    posterRedirected,
    setPosterRedirected,
  } = useSchedule();

  // Conference logic
  const {
    selectedDay: conferenceDay,
    triggerConferenceScroll,
    setTriggerConferenceScroll,
    conferenceRedirected,
    setConferenceRedirected,
  } = useConferenceScroll();

  const location = useLocation();
  const conferenceScrollRef = useRef(null);

  // Final merged logic: prioritize conferenceRedirect if active
  const finalSelectedDay =
    conferenceRedirected || triggerConferenceScroll
      ? conferenceDay
      : posterDay;

  // Handle hash navigation (#dinner, #conference, #poster)
  useEffect(() => {
    const hash = location.hash.replace('#', '');

    if (['dinner', 'conference', 'poster'].includes(hash)) {
      setSelectedDay(hash);
      setTimeout(() => {
        const target = document.getElementById(`${hash}-scroll`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  // Poster scroll effect (existing)
  useEffect(() => {
    if (posterDay === 'poster' && posterRedirected) {
      setTimeout(() => {
        setTriggerScrollToTop(true);
        setPosterRedirected(false);
      }, 100);
    }
  }, [posterDay, posterRedirected]);

  return (
    <div className="bg-[#F0F0F0] w-full py-12 flex flex-col items-center">
      {/* Toggle Buttons */}
      <div className="flex space-x-12">
        <button
          onClick={() => setSelectedDay('dinner')}
          className="flex flex-col items-center transition-opacity duration-200"
          style={{ opacity: finalSelectedDay === 'dinner' ? 1 : 0.6 }}
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
          style={{ opacity: finalSelectedDay === 'conference' ? 1 : 0.6 }}
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
          style={{ opacity: finalSelectedDay === 'poster' ? 1 : 0.6 }}
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
        {finalSelectedDay === 'dinner' ? (
          <div id="dinner">
            <DinnerSchedule />
          </div>
        ) : finalSelectedDay === 'conference' ? (
          <div id="conference">
            <ConferenceSchedule />
          </div>
        ) : (
          <div id="poster">
            <PosterSession />
          </div>
        )}
      </div>
    </div>
  );
}
