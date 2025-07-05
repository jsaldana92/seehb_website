import React, { useState, useRef, useEffect } from 'react';

import Media2018 from './media/media2018';
import Media2019 from './media/media2019';
import Media2022 from './media/media2022';
import Media2023 from './media/media2023';
import Media2025 from './media/media2025';


export default function ImagesSEEHB() {
  const [selectedDay, setSelectedDay] = useState('2025');
  const scrollContainerRef = useRef(null);
  const selectedButtonRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const button = selectedButtonRef.current;

    if (container && button) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const scrollOffset =
        button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;

      container.scrollTo({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="bg-[#F0F0F0] w-full py-12 flex flex-col items-center">
      {/* Scrollable + Centered Buttons */}
      <div className="w-full overflow-x-auto scrollbar-hide relative"
      ref={scrollContainerRef}>
        <div className="flex">
          <div className="flex space-x-6 px-4 min-w-max mx-auto">
                <div className="w-px h-1/2 bg-[#A0A0A0] self-center" />
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
                <div className="w-px h-1/2 bg-[#A0A0A0] self-center" />
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
              <div className="w-px h-1/2 bg-[#A0A0A0] self-center" />
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
                <div className="w-px h-1/2 bg-[#A0A0A0] self-center" />
            <button
              onClick={() => setSelectedDay('2023')}
              className="flex flex-col items-center transition-opacity duration-200"
              style={{ opacity: selectedDay === '2023' ? 1 : 0.6 }}
            >
              <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
                2023
              </span>
              <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
                Oct 26-27
              </span>
            </button>
                <div className="w-px h-1/2 bg-[#A0A0A0] self-center" />
            <button
              ref={selectedButtonRef}
              onClick={() => setSelectedDay('2025')}
              className="flex flex-col items-center transition-opacity duration-200"
              style={{ opacity: selectedDay === '2025' ? 1 : 0.6 }}
            >
              <span className="text-xl font-semibold border-b-4 pb-1 border-[#626263]">
                2025
              </span>
              <span className="text-sm text-[#00B050] border-b border-[#CFCECE] mt-1 pb-0.5">
                Feb 7-8
              </span>
            </button>
                <div className="w-px h-1/2 bg-[#A0A0A0] self-center" />
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
        {selectedDay === '2025' && <Media2025 />}
      </div>
    </div>
  );
}
