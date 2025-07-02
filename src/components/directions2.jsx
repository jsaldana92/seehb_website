import React from 'react';
import icl2 from '../assets/images/icl2.png';
import VeritcalFootsteps from './footsteptrail';
import DiagonalFootsteps from './diagfootsteptrail';

export default function Directions2() {
  return (
    <section
        className="relative w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden border-y-4"
        style={{
            borderColor: '#d6a315',
        }}
        >
        {/* Blurred Background Image */}
        <div
            className="absolute inset-0 z-0"
            style={{
            backgroundImage: `url(${icl2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(3px)', // Adjust the blur radius here
            transform: 'scale(1)', // Prevent edge clipping from blur
        }}
    ></div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

      {/* Footsteps on top */}
      {/* <div className="absolute inset-0 z-30 pointer-events-none">
        <VeritcalFootsteps />
        <DiagonalFootsteps />
      </div>  take out these to re-add the footsteps*/}  

      {/* Heading */}
      <div className="text-center mb-12 z-40 relative text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-outline-shadow">Indian Creek Lodge</h1>
        <p className="text-lg md:text-xl custom-shadow">900 S. Indian Creek Dr. Stone Mountain, GA 30083</p>
        <p className="text-md md:text-lg mt-2 max-w-2xl mx-auto custom-shadow">
          Join us at the lodge from 8:30 am until 4 pm to enjoy a full day of research and networking.
        </p>
      </div>

      {/* Centered Map */}
      <div className="w-full max-w-4xl z-40 relative border-3 shadow-lg" style={{ borderColor: '#d6a315' }}>
        <div className="w-full h-[24rem] md:h-[26rem]">
          <iframe
            title="Indian Creek Lodge Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5553506511583!2d-84.22744932383172!3d33.77215433246709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a974dc9c9b59%3A0xd3b84821efe15e72!2s900%20S%20Indian%20Creek%20Dr%2C%20Stone%20Mountain%2C%20GA%2030083!5e0!3m2!1sen!2sus!4v1751229797309!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            //loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
