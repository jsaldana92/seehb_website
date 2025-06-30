// src/components/steeringcommittee.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HoverOrTouchHandler from './hoverortouchhandler';

import brosnan from '../assets/images/brosnan.png';
import benitez from '../assets/images/benitez.png';
import frye from '../assets/images/frye.png';
import gnanadesikan from '../assets/images/gnanadesikan.png';
import reilly from '../assets/images/reilly.png';
import saldana from '../assets/images/saldana.png';
import mistry from '../assets/images/mistry.png';

import gsu_logo from '../assets/logos/gsu_logo.png';
import emory_logo from '../assets/logos/emory_logo.png';
import eh_logo from '../assets/logos/eh_logo.png';
import harvard_logo from '../assets/logos/harvard_logo.png';

import bottomLeftBranch from '../assets/images/bottom_left.png';
import bottomRightBranch from '../assets/images/bottom_right.png';

gsap.registerPlugin(ScrollTrigger);

const committee = [
  { img: brosnan, first: 'Sarah', last: 'Brosnan', logo: gsu_logo, institution: 'Georgia State University' },
  { img: benitez, first: 'Marcela', last: 'Benitez', logo: emory_logo, institution: 'Emory University' },
  { img: frye, first: 'Brett', last: 'Frye', logo: eh_logo, institution: 'Emory & Henry College' },
  { img: gnanadesikan, first: 'Gita', last: 'Gnanadesikan', logo: emory_logo, institution: 'Emory University' },
  { img: reilly, first: 'Olivia', last: 'Reilly', logo: harvard_logo, institution: 'Harvard University' },
  { img: saldana, first: 'Jhonatan', last: 'Saldana', logo: gsu_logo, institution: 'Georgia State University' },
  { img: mistry, first: 'Arianna', last: 'Mistry', logo: emory_logo, institution: 'Emory University' },
];

export default function SteeringCommittee2() {
  const sectionRef = useRef();
  const branchBottomLeftRef = useRef();
  const branchBottomRightRef = useRef();

  const setupBranchAnimation = (ref, positions) => {
    let ctx;
    const runAnimation = () => {
      ctx = gsap.context(() => {
        const triggerElement = sectionRef.current;
        const el = ref.current;
        if (!triggerElement || !el) return;

        const mm = gsap.matchMedia();

        mm.add(
          {
            isMobile: '(max-width: 767px)',
            isMedium: '(min-width: 768px) and (max-width: 1023px)',
            isDesktop: '(min-width: 1024px)',
          },
          (context) => {
            const setting = context.conditions.isMobile
              ? positions.mobile
              : context.conditions.isMedium
              ? positions.medium
              : positions.desktop;

            gsap.set(el, setting.set);
            gsap.to(el, {
              ...setting.to,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: triggerElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                markers: false,
              },
            });
          }
        );

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      }, sectionRef);
    };

    if (document.readyState === 'complete') {
      setTimeout(runAnimation, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(runAnimation, 100);
      });
    }

    return () => {
      ctx?.revert();
      window.removeEventListener('load', runAnimation);
    };
  };

  useEffect(
    () =>
      setupBranchAnimation(branchBottomRightRef, {
        mobile: {
          set: { position: 'absolute', bottom: '-500px', right: '-900px', zIndex: 10, scale: 1.5 },
          to: { bottom: '0px', right: '0px', scale: 2.5 },
        },
        medium: {
          set: { position: 'absolute', bottom: '-1000px', right: '-1400px', zIndex: 10, scale: 2 },
          to: { bottom: '100px', right: '100px', scale: 2.5 },
        },
        desktop: {
          set: { position: 'absolute', bottom: '-100px', right: '-200px', zIndex: 10, scale: 1.5 },
          to: { bottom: '-50px', right: '0px', scale: 3.7 },
        },
      }),
    []
  );

  useEffect(
    () =>
      setupBranchAnimation(branchBottomLeftRef, {
        mobile: {
          set: { position: 'absolute', bottom: '-500px', left: '-900px', zIndex: 10, scale: 1.5 },
          to: { bottom: '0px', left: '0px', scale: 2.5 },
        },
        medium: {
          set: { position: 'absolute', bottom: '-1000px', left: '-1200px', zIndex: 10, scale: 2 },
          to: { bottom: '100px', left: '100px', scale: 2.5 },
        },
        desktop: {
          set: { position: 'absolute', bottom: '-100px', left: '-160px', zIndex: 100, scale: 1.5 },
          to: { bottom: '-25px', left: '0px', scale: 3.5 },
        },
      }),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6BB17] py-20 w-full flex flex-col items-center overflow-hidden"
    >
      <div className="w-full pl-4 pr-4 md:pl-4 md:pr-8 text-right">
        <h2 className="text-2xl md:text-3xl custom-shadow-sm font-bold text-black text-center md:text-right">
          This year's conference is organized by our dedicated steering committee
        </h2>
      </div>

      {/* Committee Grid */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-center">
        {committee.map((person, idx) => (
          <HoverOrTouchHandler key={idx}>
            {(isHovered) => (
              <div className="relative w-40 aspect-square group overflow-hidden rounded shadow-lg cursor-pointer">
                <img
                  src={person.img}
                  alt={`${person.first} ${person.last}`}
                  className="w-full h-full object-cover transition duration-300 ease-in-out"
                />
                {person.logo && (
                  <div
                    className={`absolute inset-0 transition duration-300 ease-in-out ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    } pointer-events-none`}
                  >
                    <img
                      src={person.logo}
                      alt="logo"
                      className="w-full h-full object-cover brightness-40 blur-[0.2px]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white custom-shadow font-bold text-center text-sm px-2">
                        {person.institution}
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={`absolute bottom-2 right-2 text-md custom-shadow text-white text-right transition-opacity duration-300 ease-in-out ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="font-semibold leading-none">{person.first}</div>
                  <div className="font-semibold leading-none">{person.last}</div>
                </div>
              </div>
            )}
          </HoverOrTouchHandler>
        ))}
      </div>

      {/* RSVP Section */}
      <img
        ref={branchBottomRightRef}
        src={bottomRightBranch}
        alt="Branch bottom right"
        className="w-40 md:w-56 object-contain z-5 absolute bottom-0 right-0 pointer-events-none"
      />
      <img
        ref={branchBottomLeftRef}
        src={bottomLeftBranch}
        alt="Branch bottom left"
        className="w-40 md:w-56 object-contain z-5 absolute bottom-0 left-0 pointer-events-none"
      />
      <h2 className="text-2xl md:text-3xl font-bold custom-shadow text-black text-center mt-48 mb-6 z-10">
        Let us know if you'll be attending!
      </h2>
      <button className="bg-white text-black font-semibold px-6 py-2 rounded shadow-md hover:bg-gray-200 transition z-10">
        RSVP
      </button>
    </section>
  );
}
