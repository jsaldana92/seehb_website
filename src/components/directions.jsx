import React from 'react';
import icl1 from '../assets/images/icl1.png';
import icl2 from '../assets/images/icl2.png';
import VeritcalFootsteps from './footsteptrail';
import DiagonalFootsteps from './diagfootsteptrail'

export default function Directions() {
  return (
    <section className="bg-[#F6BB17] w-full py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Footsteps on top */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <VeritcalFootsteps />
        <DiagonalFootsteps />
      </div>

      {/* Heading */}
      <div className="text-center mb-12 z-20 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-outline-shadow">Indian Creek Lodge</h1>
        <p className="text-lg md:text-xl custom-shadow-sm">900 S. Indian Creek Dr. Stone Mountain, GA 30083</p>
        <p className="text-md md:text-lg mt-2 max-w-2xl mx-auto custom-shadow-sm">
          Join us at the lodge from 8:30 am until 4 pm to enjoy a full day of research and networking.
        </p>
      </div>

      {/* Images + Map */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl w-full z-20 relative">
        <div className="flex flex-col gap-4 w-full md:w-1/4">
          <div className="rounded-lg overflow-hidden shadow-lg h-48">
            <img src={icl1} alt="Indian Creek Lodge 1" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-48">
            <img src={icl2} alt="Indian Creek Lodge 2" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg h-[24rem] md:h-[25rem]">
          <iframe
            title="Indian Creek Lodge Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5553506511583!2d-84.22744932383172!3d33.77215433246709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a974dc9c9b59%3A0xd3b84821efe15e72!2s900%20S%20Indian%20Creek%20Dr%2C%20Stone%20Mountain%2C%20GA%2030083!5e0!3m2!1sen!2sus!4v1751229797309!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
