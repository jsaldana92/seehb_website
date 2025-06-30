// src/components/Institutions.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import HoverOrTouchHandler from './hoverortouchhandler'; // ✅ Import global handler

// Import logos
import gsu_logo from '../assets/logos/gsu_logo.png';
import emory_logo from '../assets/logos/emory_logo.png';
import zooatl_logo from '../assets/logos/zooatl_logo.png';
import clemson_logo from '../assets/logos/clemson_logo.png';
import duke_logo from '../assets/logos/duke_logo.png';
import eh_logo from '../assets/logos/eh_logo.png';
import fltech_logo from '../assets/logos/fltech_logo.png';
import ksu_logo from '../assets/logos/ksu_logo.png';
import uab_logo from '../assets/logos/uab_logo.png';
import uga_logo from '../assets/logos/uga_logo.png';
import uncc_logo from '../assets/logos/uncc_logo.png';
import ut_logo from '../assets/logos/ut_logo.png';

const logos = [
  { img: gsu_logo, title: 'Georgia State University', subtitle: '' },
  { img: emory_logo, title: 'Emory University', subtitle: '' },
  { img: zooatl_logo, title: 'Zoo Atlanta', subtitle: '' },
  { img: clemson_logo, title: 'Clemson University', subtitle: '' },
  { img: duke_logo, title: 'Duke University', subtitle: '' },
  { img: eh_logo, title: 'Emory & Henry College', subtitle: '' },
  { img: fltech_logo, title: 'Florida Institute of Technology', subtitle: '' },
  { img: ksu_logo, title: 'Kennesaw State University', subtitle: '' },
  { img: uab_logo, title: 'University of Alabama at Birmingham', subtitle: '' },
  { img: uga_logo, title: 'University of Georgia', subtitle: '' },
  { img: uncc_logo, title: 'University of North Carolina', subtitle: '' },
  { img: ut_logo, title: 'University of Tennessee', subtitle: '' },
];

export default function Institutions() {
  const containerRef = useRef();
  const tweenRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = containerRef.current.querySelector('.carousel-track');
      const trackWidth = track.scrollWidth / 2;

      tweenRef.current = gsap.to(track, {
        x: -trackWidth,
        duration: 70,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % trackWidth),
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const pauseScroll = () => {
    if (tweenRef.current) tweenRef.current.pause();
  };

  const resumeScroll = () => {
    if (tweenRef.current) tweenRef.current.play();
  };

  return (
    <section className="bg-[#F0F0F0] pt-30 pb-35 md:pt-40 md:pb-45 w-full flex flex-col items-start" ref={containerRef}>
      <div className="w-full max-w-7xl pl-4 pr-4 md:pl-8 md:pr-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 custom-shadow text-white text-center md:text-left">
          Previous Participating Institutions:
        </h2>
      </div>

      <div className="overflow-hidden w-full relative">
        <div className="flex carousel-track w-[200%]">
          {[...logos, ...logos].map((logo, index) => (
            <HoverOrTouchHandler
              key={index}
              className="w-60 aspect-square flex-shrink-0 mx-6 relative drop-shadow-lg"
            >
              {(isHovered) => {
                if (isHovered) pauseScroll();
                else resumeScroll();

                return (
                  <div className="w-full h-full relative">
                    <img
                      src={logo.img}
                      alt={logo.title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition duration-300 ease-in-out ${
                        isHovered ? 'brightness-40' : 'brightness-100'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 flex flex-col justify-center px-2 text-white text-center transition duration-300 ease-in-out ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <h3 className="text-xl font-bold drop-shadow-md custom-shadow whitespace-normal break-words">
                        {logo.title}
                      </h3>
                      <p className="text-md drop-shadow-md custom-shadow whitespace-normal break-words">
                        {logo.subtitle}
                      </p>
                    </div>
                  </div>
                );
              }}
            </HoverOrTouchHandler>
          ))}
        </div>
      </div>
    </section>
  );
}
