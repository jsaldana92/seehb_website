// src/components/About.jsx
import React from 'react';
import HoverOrTouchHandler from './hoverortouchhandler';

import seehb2018 from '../assets/images/2018seehb.png';
import seehb2019 from '../assets/images/2019seehb.png';
import seehb2022 from '../assets/images/2022seehb.png';
import seehb2024 from '../assets/images/2024seehb.png';
import seehb2025 from '../assets/images/2025seehb.png';
import xLogo from '../assets/images/x_logo.png'

const ImageCard = ({ src, label }) => (
  <HoverOrTouchHandler className="relative w-full h-full overflow-hidden rounded-md border border-gray-200">
    {(isHovered) => (
      <>
        <img
          src={src}
          alt={`${label} SEEHB`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105 blur-[0.8px]' : ''
          }`}
        />
        <div
          className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-white text-2xl font-bold">{label}</span>
        </div>
      </>
    )}
  </HoverOrTouchHandler>
);

export default function About() {
  return (
    <section className="bg-[#F0F0F0] w-full px-6 py-10 flex flex-col lg:flex-row items-center justify-center md:items-stretch md:justify-between space-y-6 lg:space-y-0 lg:space-x-10 min-h-[60vh]">
      {/* Left: Text content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl text-black text-center lg:text-left text-2xl leading-relaxed custom-shadow-sm">
          <div className="mt-4 w-3/4 h-[3px] bg-gray-500 opacity-50 rounded-full mx-auto lg:mx-0" />
          <p>
            The South Eastern Evolution and Human Behavior (SEEHB) group is a regional meeting that fosters collaboration
            and informal exchange among researchers and students studying evolution and human behavior. 
          </p>
          <p className="mt-4">
            Welcoming disciplines
            like primatology, paleoanthropology, archaeology, human behavioral ecology, cultural evolution, and evolutionary
            psychology, SEEHB connects individuals from across the Southeastern U.S., including Georgia, Alabama, the
            Carolinas, Florida, and Tennessee.
          </p>
            
            <div className="mt-4 w-3/4 h-[3px] bg-gray-500 opacity-50 rounded-full mx-auto lg:mx-0" />
                {/* Social media links on the right */}
                <section  className="flex justify-center py-2">
                  <div className="flex gap-4">
                    <a
                      href="https://x.com/SouthEasternEHB"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={xLogo} alt="X Logo" className="h-10 w-10 hover:opacity-80 transition" />
                    </a>
                  </div>
                  
                  {/* Add more icons here in the future */}
                </section>
          </div>
      </div>

      {/* Right: Grid of images with overlay */}
      <div className="flex-1 flex flex-col space-y-2">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-2">
          <ImageCard src={seehb2024} label="2024" />
          <ImageCard src={seehb2022} label="2022" />
        </div>

        {/* Bottom row */}
        <div className="grid [grid-template-columns:3fr_2fr] gap-2">
          {/* Large 2025 image */}
          <ImageCard src={seehb2025} label="2025" />

          {/* Stacked 2019 + 2018 */}
          <div className="flex flex-col gap-2 h-full">
            <ImageCard src={seehb2019} label="2019" />
            <ImageCard src={seehb2018} label="2018" />
          </div>
        </div>
      </div>
    </section>
  );
}
