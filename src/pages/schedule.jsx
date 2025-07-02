import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scientistImage from '../assets/images/scientist.png';
import chimpstumpImage from '../assets/images/chimp2.png';
import centerBranch from '../assets/images/center.png';
import TimelineSchedule from '../components/timelineschedule';


gsap.registerPlugin(ScrollTrigger);

export default function Schedule() {

  const scientistRef = useRef();
  const chimpstumpRef = useRef();
  const centerBranchRef = useRef ();
  const sectionRef = useRef();

  const setupImageAnimation = (ref, positions) => {
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
      setupImageAnimation(centerBranchRef, {
        mobile: {
          set: { position: 'absolute', bottom: '2750px', left: '50%', xPercent: -50, zIndex: 10, scale: 1.5 },
          to: { bottom: '200px', left: '50%', xPercent: -50, scale: 2.7},
        },
        medium: {
          set: { position: 'absolute', bottom: '3000px', left: '50%', xPercent: -50, zIndex: 10, scale: 2 },
          to: { bottom: '200px', left: '50%', xPercent: -50, scale: 2.5 },
        },
        desktop: {
          set: { position: 'absolute', bottom: '4000px', left: '50%', xPercent: -50, zIndex: 10, scale: 1.5 },
          to: { bottom: '200px', left: '50%', xPercent: -50, scale: 3 },
        },
      }),
    []
  );

  useEffect(
    () =>
      setupImageAnimation(chimpstumpRef, {
        mobile: {
          set: { position: 'absolute', bottom: '-500px', right: '-900px', zIndex: 10, scale: 1.5 },
          to: { bottom: '0px', right: '0px', scale: 1.5 },
        },
        medium: {
          set: { position: 'absolute', bottom: '-1000px', right: '-1400px', zIndex: 10, scale: 2 },
          to: { bottom: '0px', right: '-100px', scale: 1.5 },
        },
        desktop: {
          set: { position: 'absolute', bottom: '-1000px', right: '-2500px', zIndex: 10, scale: 1.5 },
          to: { bottom: '100px', right: '0px', scale: 1.7 },
        },
      }),
    []
  );

  useEffect(
    () =>
      setupImageAnimation(scientistRef, {
        mobile: {
          set: { position: 'absolute', bottom: '-500px', left: '-900px', zIndex: 10, scale: 1.5 },
          to: { bottom: '0px', left: '0px', scale: 1.75 },
        },
        medium: {
          set: { position: 'absolute', bottom: '-1000px', left: '-1200px', zIndex: 10, scale: 2 },
          to: { bottom: '0px', left: '0px', scale: 1.5 },
        },
        desktop: {
          set: { position: 'absolute', bottom: '-1000px', left: '-1600px', zIndex: 10, scale: 1.5 },
          to: { bottom: '100px', left: '0px', scale: 2.0 },
        },
      }),
    []
  );

    return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[#F6BB17] w-full min-h-[60vh] px-6 py-40 flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-between space-y-6 md:space-y-0 md:space-x-10 pointer-events-none"
      >
        <img
          ref={centerBranchRef}
          src={centerBranch}
          alt="Branch top center"
          className="w-40 md:w-56 object-contain z-5 rotate-0"
        />
        <img
          ref={chimpstumpRef}
          src={chimpstumpImage}
          alt="Chimp bottom right"
          className="w-40 md:w-56 object-contain z-5 rotate-0"
        />
        <img
          ref={scientistRef}
          src={scientistImage}
          alt="Scientist bottom left"
          className="w-40 md:w-56 object-contain z-5 rotate-0"
        />
        <div className="flex-1 flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black custom-shadow">
              Schedule
            </h1>
            <h2 className="text-xl md:text-2xl text-white drop-shadow-2xl custom-shadow">
              February 2025
            </h2>
          </div>
        </div>
      </section>

      
      <TimelineSchedule />
    </>
  );

}
