import React, { useState } from 'react';

import Media2018 from './media/media2018';
import Media2019 from './media/media2019';
import Media2022 from './media/media2022';
import Media2023 from './media/media2023';
import Media2024 from './media/media2024';
import Media2025 from './media/media2025';


export default function ImagesSEEHB() {
  const [selectedDay, setSelectedDay] = useState('2025');

  return (
    <div className="bg-[#F0F0F0] w-full py-12 flex flex-col items-center">
      {/* Scrollable + Centered Buttons */}
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center">
          <div className="flex space-x-8 px-4 min-w-max mx-auto">
            <button
              onClick={() => setSelectedDay('2018')}
              className="flex flex-col items-center transition-opacity duration-200"
              style={{ opacity: selectedDay === '2018' ? 1 : 0.6 }}
            >
              <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
                2018
              </span>
              <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
                March 2-3
              </span>
            </button>

            <button
              onClick={() => setSelectedDay('2019')}
              className="flex flex-col items-center transition-opacity duration-200"
              style={{ opacity: selectedDay === '2019' ? 1 : 0.6 }}
            >
              <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
                2019
              </span>
              <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
                March 22-23
              </span>
            </button>

            <button
              onClick={() => setSelectedDay('2022')}
              className="flex flex-col items-center transition-opacity duration-200"
              style={{ opacity: selectedDay === '2022' ? 1 : 0.6 }}
            >
              <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
                2022
              </span>
              <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
                Oct 21-22
              </span>
            </button>
            <button
              onClick={() => setSelectedDay('2023')}
              className="flex flex-col items-center transition-opacity duration-200"
              style={{ opacity: selectedDay === '2023' ? 1 : 0.6 }}
            >
              <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
                2023
              </span>
              <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
                Feb 8th
              </span>
            </button>
            <button
              onClick={() => setSelectedDay('2024')}
              className="flex flex-col items-center transition-opacity duration-200"
              style={{ opacity: selectedDay === '2024' ? 1 : 0.6 }}
            >
              <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
                2024
              </span>
              <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
                Feb 8th
              </span>
            </button>
            <button
              onClick={() => setSelectedDay('2025')}
              className="flex flex-col items-center transition-opacity duration-200"
              style={{ opacity: selectedDay === '2025' ? 1 : 0.6 }}
            >
              <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
                2025
              </span>
              <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
                Feb 8th
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-black w-3/4 mt-8"></div>

      {/* Content Renderer */}
      <div className="mt-8 w-full px-4">
        {selectedDay === '2018' && <Media2018 />}
        {selectedDay === '2019' && <Media2019 />}
        {selectedDay === '2022' && <Media2022 />}
        {selectedDay === '2023' && <Media2023 />}
        {selectedDay === '2024' && <Media2024 />}
        {selectedDay === '2025' && <Media2025 />}
      </div>
    </div>
  );
}
