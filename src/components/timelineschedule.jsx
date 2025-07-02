import React, { useState } from 'react';
import DinnerSchedule from '../components/dinnerschedule';
import ConferenceSchedule from '../components/conferenceschedule'

export default function TimelineSchedule() {
  const [selectedDay, setSelectedDay] = useState('dinner');

  return (
    <div className="bg-[#F0F0F0] w-full py-12 flex flex-col items-center">
      {/* Toggle Buttons */}
      <div className="flex space-x-12">
        {/* Opening Dinner */}
        <button
          onClick={() => setSelectedDay('dinner')}
          className="flex flex-col items-center opacity-100 transition-opacity duration-200"
          style={{ opacity: selectedDay === 'dinner' ? 1 : 0.6 }}
        >
          <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
            Opening Dinner
          </span>
          <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
            Feb 7th
          </span>
        </button>

        {/* Conference */}
        <button
          onClick={() => setSelectedDay('conference')}
          className="flex flex-col items-center opacity-100 transition-opacity duration-200"
          style={{ opacity: selectedDay === 'conference' ? 1 : 0.6 }}
        >
          <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
            Conference
          </span>
          <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
            Feb 8th
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-black w-3/4 mt-8"></div>

      {/* Placeholder for dynamic schedule rendering */}
      <div className="mt-8 w-full  px-4">
        {selectedDay === 'dinner' ? (
            <DinnerSchedule />
        ) : (
            <ConferenceSchedule />
            
        )}
      </div>
    </div>
  );
}
