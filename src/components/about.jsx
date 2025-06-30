import React from 'react';
import seehb2018 from '../assets/images/2018seehb.png';
import seehb2019 from '../assets/images/2019seehb.png';
import seehb2022 from '../assets/images/2022seehb.png';
import seehb2024 from '../assets/images/2024seehb.png';
import seehb2025 from '../assets/images/2025seehb.png';

export default function About() {
  return (
    <section className="bg-[#F0F0F0] w-full px-6 py-10 flex flex-col lg:flex-row items-center justify-center md:items-stretch md:justify-between space-y-6 lg:space-y-0 lg:space-x-10 min-h-[60vh]">
      
      {/* Left: Text content */}
      <div className="flex-1 flex items-center justify-center">
         {/* Accent line (¾ width of text) */}
            <div className="max-w-2xl text-black text-center lg:text-left text-2xl leading-relaxed custom-shadow-sm">

          <div className="mt-4 w-3/4 h-[3px] bg-gray-500 opacity-50 rounded-full mx-auto lg:mx-0 " />
          <p>
            The South Eastern Evolution and Human Behavior (SEEHB) group is a regional meeting that fosters collaboration and informal exchange among researchers and students studying evolution and human behavior. Welcoming disciplines like primatology, paleoanthropology, archaeology, human behavioral ecology, cultural evolution, and evolutionary psychology, SEEHB connects individuals from across the Southeastern U.S., including Georgia, Alabama, the Carolinas, Florida, and Tennessee.
          </p>

          {/* Accent line (¾ width of text) */}
            <div className="mt-4 w-3/4 h-[3px] bg-gray-500 opacity-50 rounded-full mx-auto lg:mx-0 " />
            

        </div>
      </div>

      {/* Right: Bento Grid with hover overlays */}
        <div className="flex-1 flex flex-col space-y-2">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-2">
            {[
                { src: seehb2024, label: "2024" },
                { src: seehb2022, label: "2022" },
            ].map(({ src, label }) => (
            <div key={label} className="relative w-full group overflow-hidden rounded-md border-1 border-gray-200 aspect-[3/2]">
                <img src={src} alt={`${label} SEEHB`} className="w-full h-full  object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[0.8px]" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-2xl font-bold">{label}</span>
                </div>
            </div>
            ))}
        </div>

        {/* Bottom row */}
        <div className="grid [grid-template-columns:3fr_2fr] gap-2">
            {/* 2025 */}
            <div className="relative w-full h-full group overflow-hidden rounded-md border-1 border-gray-200">
            <img src={seehb2025} alt="2025 SEEHB" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[0.8px]" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-2xl font-bold">2025</span>
            </div>
            </div>

            {/* 2019 + 2018 stacked */}
            <div className="flex flex-col gap-2 h-full">
            {[
                { src: seehb2019, label: "2019" },
                { src: seehb2018, label: "2018" },
            ].map(({ src, label }) => (
                <div key={label} className="relative w-full h-1/2 group overflow-hidden rounded-md border-1 border-gray-200">
                <img src={src} alt={`${label} SEEHB`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[0.8px]" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-2xl font-bold">{label}</span>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </section>
  );
}
