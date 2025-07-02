import React from 'react';

export default function DinnerSchedule() {
  return (
    <div className="w-full bg-[#F0F0F0] py-12 flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-4 px-4">
        <h1 className="text-black text-3xl font-bold inline-block px-4 py-2">
          Casa de Brosnan
        </h1>
        <p className="text-[#626262] font-semibold mt-0 text-lg">RSVP for Location</p>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-black opacity-75 w-1/2 mb-10"></div>

      {/* Kickoff Dinner Block */}
      <div className="flex items-center justify-center w-full px-6">
        {/* Rectangle block */}
        <div className="w-3 h-16 bg-[#636363] mr-4"></div>

        {/* Text block */}
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-black">Kickoff Dinner</h2>
          <p className="text-md font-semibold text-[#00B050] mt-1">6:30 - 8:00</p>
        </div>
      </div>
    </div>
  );
}
