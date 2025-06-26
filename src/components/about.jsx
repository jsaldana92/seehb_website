import React from 'react';

export default function About() {
  return (
    <section className="bg-[#F0F0F0] w-full min-h-[60vh] px-6 py-10 flex flex-col md:flex-row items-center justify-center md:items-stretch md:justify-between space-y-6 md:space-y-0 md:space-x-10">
      
      {/* Left: Text content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl text-black text-center md:text-left text-2xl leading-relaxed">
          <p>
            The South Eastern Evolution and Human Behavior (SEEHB) group is a regional meeting that fosters collaboration and informal exchange among researchers and students studying evolution and human behavior. Welcoming disciplines like primatology, paleoanthropology, archaeology, human behavioral ecology, cultural evolution, and evolutionary psychology, SEEHB connects individuals from across the Southeastern U.S., including Georgia, Alabama, the Carolinas, Florida, and Tennessee.
          </p>
        </div>
      </div>

      {/* Right: Placeholder */}
      <div className="flex-1"></div>
    </section>
  );
}
